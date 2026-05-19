<template>
  <div class="three-columns">
    <slot />
  </div>
</template>

<style scoped>
.three-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  align-items: start;
  margin: 0.5rem 0;
}

.three-columns :deep(> div) {
  min-width: 0;
}

.three-columns :deep(h2) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 28pt;
  color: #7B31FE;
  margin: 0 0 0.75rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.three-columns :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.three-columns :deep(li) {
  position: relative;
  padding-left: 1.25em;
  margin: 0.3em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 22pt;
  color: black;
  line-height: 1.25;
}

.three-columns :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
}

.three-columns :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 22pt;
  color: black;
  line-height: 1.3;
  margin: 0.4em 0;
}
</style>
