<template>
  <div class="two-columns">
    <slot />
  </div>
</template>

<style scoped>
.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  align-items: start;
  margin: 0.5rem 0;
}

.two-columns :deep(> div) {
  min-width: 0;
}

.two-columns :deep(h2) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 32pt;
  color: #7B31FE;
  margin: 0 0 0.75rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.two-columns :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.two-columns :deep(li) {
  position: relative;
  padding-left: 0.85em;
  margin: 0.35em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.25;
}

.two-columns :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
}

.two-columns :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.3;
  margin: 0.4em 0;
}
</style>
