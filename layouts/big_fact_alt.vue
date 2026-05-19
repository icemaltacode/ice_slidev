<template>
  <div class="slidev-layout big-fact-alt">
    <div class="bfa-content">
      <slot>
        <h1>100%</h1>
        <p>Of all bacon is tasty.</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.big-fact-alt {
  background: #201f27;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.bfa-content {
  text-align: center;
  max-width: 90%;
}

.bfa-content :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 250pt;
  color: #7B31FE;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bfa-content :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: #fdfcfe;
  margin: -2.5rem 0 0;
  line-height: 1.2;
}
</style>
