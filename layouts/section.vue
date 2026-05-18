<template>
  <div class="slidev-layout section">
    <div class="section-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--ice-bg-soft);
}
.section-body :deep(h1) {
  font-size: 3.5rem;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
}
.section-body :deep(h1)::after {
  content: '';
  display: block;
  width: 4rem;
  height: 5px;
  background: var(--ice-primary);
  margin-top: 1.25rem;
  border-radius: 3px;
}
.section-body :deep(p) {
  font-size: 1.25rem;
  color: var(--ice-fg-muted);
  max-width: 60ch;
}
</style>
