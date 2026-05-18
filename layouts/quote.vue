<template>
  <div class="slidev-layout quote">
    <div class="quote-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.quote {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ice-bg-soft);
}
.quote-body {
  max-width: 70%;
  position: relative;
  padding-left: 3rem;
}
.quote-body::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -1.5rem;
  font-size: 6rem;
  color: var(--ice-primary);
  font-family: Georgia, serif;
  line-height: 1;
}
.quote-body :deep(p) {
  font-size: 1.75rem;
  line-height: 1.4;
  color: var(--ice-fg);
  font-weight: 300;
}
.quote-body :deep(p:last-child) {
  font-size: 1rem;
  color: var(--ice-fg-muted);
  margin-top: 1.5rem;
}
</style>
