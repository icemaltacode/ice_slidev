<template>
  <div class="slidev-layout statement-alt">
    <div class="sta-content">
      <slot>
        <h1>Important Statement</h1>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.statement-alt {
  background: #201f27;
  color: #7B31FE;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.sta-content {
  text-align: center;
  max-width: 80%;
}

.sta-content :deep(h1),
.sta-content :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 77pt;
  color: #7B31FE;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
</style>
