<script setup lang="ts">
import { useNav, useSlideContext } from '@slidev/client'
const { currentPage, total } = useNav()
const { $slidev } = useSlideContext()
</script>

<template>
  <div class="slidev-layout default">
    <div class="default-body ice-prose">
      <slot />
    </div>
    <footer class="default-footer">
      <span class="brand">{{ $slidev.configs.title || 'ICE' }}</span>
      <span class="page">{{ currentPage }} / {{ total }}</span>
    </footer>
  </div>
</template>

<style scoped>
.default {
  display: flex;
  flex-direction: column;
}
.default-body {
  flex: 1;
  min-height: 0;
}
.default-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--ice-border);
  font-size: 0.75rem;
  color: var(--ice-fg-muted);
  letter-spacing: 0.04em;
}
.brand {
  font-weight: 600;
  color: var(--ice-primary);
  text-transform: uppercase;
}
.page {
  font-variant-numeric: tabular-nums;
}
</style>
