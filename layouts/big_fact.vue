<template>
  <div class="slidev-layout big-fact">
    <div class="bf-content">
      <slot>
        <h1>100%</h1>
        <p>Of all bacon is tasty.</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.big-fact {
  background: #ebe7f3;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.bf-content {
  text-align: center;
  max-width: 90%;
}

.bf-content :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 250pt;
  color: black;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bf-content :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  margin: -2.5rem 0 0;
  line-height: 1.2;
}
</style>
