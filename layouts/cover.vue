<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $slidev } = useSlideContext()
</script>

<template>
  <div class="slidev-layout cover">
    <div class="cover-bar" />
    <div class="cover-eyebrow">{{ $slidev.configs.title || 'ICE Course' }}</div>
    <div class="cover-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-left: 4.5rem;
}
.cover-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--ice-primary) 0%,
    var(--ice-primary-strong) 100%
  );
}
.cover-eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--ice-primary);
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.cover-body :deep(h1) {
  font-size: 4rem;
  line-height: 1.05;
  margin: 0 0 1.25rem;
  letter-spacing: -0.03em;
}
.cover-body :deep(p) {
  font-size: 1.35rem;
  color: var(--ice-fg-muted);
  max-width: 60ch;
  margin: 0;
}
</style>
