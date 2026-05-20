import { useNav } from '@slidev/client'
import { computed } from 'vue'

/**
 * Walks backwards from the current slide and returns the `unit` frontmatter
 * value from the most recent slide whose layout is `unit_title`.
 *
 * Used by content_* layouts so a deck author only sets the unit number once
 * (on the unit divider slide) and every content slide between unit_title
 * slides inherits it automatically.
 *
 * Returns undefined if no preceding unit_title slide has a `unit` value.
 */
export function useUnit() {
  const { currentSlideNo, slides } = useNav()
  return computed<string | undefined>(() => {
    const all = slides.value || []
    const idx = (currentSlideNo.value || 1) - 1
    for (let i = idx; i >= 0; i--) {
      const fm: any = (all[i] as any)?.meta?.slide?.frontmatter
      if (fm?.layout === 'unit_title' && fm?.unit !== undefined && fm?.unit !== null) {
        return String(fm.unit)
      }
    }
    return undefined
  })
}
