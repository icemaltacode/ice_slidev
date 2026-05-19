<template>
  <div class="comparisons">
    <slot />
  </div>
</template>

<style scoped>
.comparisons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 1.5rem;
  align-items: stretch;
  margin: 0.5rem 0;
}

.comparisons :deep(> div) {
  border: 1.5px solid #cbd5e1;
  border-radius: 12px;
  padding: 1.75rem 1.25rem;
  min-height: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
}

.comparisons :deep(h2) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 22pt;
  color: black;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.comparisons :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 16pt;
  color: black;
  margin: 0;
  line-height: 1.4;
}

.comparisons :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
  text-align: left;
  width: 100%;
}

.comparisons :deep(li) {
  position: relative;
  padding-left: 1.25em;
  margin: 0.35em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 16pt;
  color: black;
  line-height: 1.3;
}

.comparisons :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
}
</style>
