import { defineAppSetup } from '@slidev/types'
// @ts-expect-error - exported from the package index, no types published for it
import { addSyncMethod } from '@slidev/client'

/* LET THE DECK BE SYNCHRONISED BY WHOEVER IS EMBEDDING IT.
 *
 * Slidev already syncs a deck's shared state - which slide, which click step, and the
 * annotations drawn over it - between a presenter and its viewers. What it syncs THROUGH is
 * the thing that does not survive `slidev build`:
 *
 *     __SLIDEV_HAS_SERVER__: options.mode !== "build"
 *
 * With the dev server that is a websocket. In a built deck it is false, and `syncState.ts`
 * falls back to a `BroadcastChannel` - same origin, SAME BROWSER. It joins two tabs on one
 * machine and can never reach another person. Every deck we publish is a build, so out of
 * the box an educator's annotations are drawn for an audience of one.
 *
 * `addSyncMethod` is Slidev's own door for exactly this: register another transport and it
 * is attached to every state channel, including the ones already running. So this file adds
 * one, and the transport is the page around the deck.
 *
 * IT IS A PIPE AND NOTHING ELSE. What travels is whatever Slidev put in the channel, opaque,
 * unread and uninterpreted - which is what keeps this from being a commitment to Slidev's
 * internal state shape across upgrades. A version that adds a field to `shared` needs no
 * change here. It is also what keeps the DECISIONS out of the theme: who may lead, who
 * follows, whether anybody is in a lesson at all, and which parts of a channel are wanted -
 * none of that is knowable here and none of it is asked.
 *
 * INERT WITHOUT A PARENT, and that is required rather than tidy. A deck is opened three other
 * ways - at its published URL, under `slidev dev`, and as a PDF export - and in none of them
 * is there anybody to sync with. `window.parent === window` is the whole test, and every post
 * is addressed to this deck's own origin, so a page that framed one of ours from somewhere
 * else would receive nothing.
 *
 * `updating` is Slidev's own flag for "this change came FROM a sync", and dropping those is
 * what stops a follower echoing every patch back at the room.
 */

const MESSAGE = 'ice:deck-sync'

interface Patch { kind: typeof MESSAGE, channel: string, data: unknown }

const framed = () => typeof window !== 'undefined' && window.parent !== window

export default defineAppSetup(() => {
  if (!framed()) return

  addSyncMethod({
    init(channel: string, onUpdate: (data: any) => void, _state: object, _persist?: boolean) {
      window.addEventListener('message', (e: MessageEvent) => {
        /* Same origin only - the deck and the player are served from one bucket, so this is
         * never a cross-origin conversation and anything that is, is not ours. */
        if (e.origin !== window.location.origin) return
        const m = e.data as Patch
        if (m?.kind !== MESSAGE || m.channel !== channel || !m.data) return
        onUpdate(m.data)
      })

      /* Announce the channel, so the page around us knows a deck is listening on it without
       * having to know what Slidev's channels are called. */
      window.parent.postMessage(
        { kind: MESSAGE, channel, data: null } satisfies Patch,
        window.location.origin,
      )

      return (state: object, updating = false) => {
        // Came from a sync; sending it back is how a room ends up in a loop.
        if (updating) return
        window.parent.postMessage(
          { kind: MESSAGE, channel, data: JSON.parse(JSON.stringify(state)) } satisfies Patch,
          window.location.origin,
        )
      }
    },
  })
})
