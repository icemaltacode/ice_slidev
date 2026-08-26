import { defineShikiSetup } from '@slidev/types'
import { transformerNotationWordHighlight } from '@shikijs/transformers'

export default defineShikiSetup(() => ({
  themes: {
    light: 'catppuccin-macchiato',
    dark: 'catppuccin-macchiato',
  },
  /* Lets a code fence say that only PART of a line is new:
   *
   *     fig, ax = plt.subplots(2, 1, sharex=True)  # [!code word:, sharex=True]
   *
   * The marker is stripped from the rendered code and the matched text is wrapped in
   * `.highlighted-word`, which styles/code.css exempts from the dimming. Without this the
   * whole line has to be either bright or grey, and the ICE decks' progressive code -
   * previous lines dimmed, the new one in colour - loses the cases where a single argument
   * was added. See the comment in code.css for why the dim had to move onto the tokens.
   */
  transformers: [transformerNotationWordHighlight()],
}))
