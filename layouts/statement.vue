<template>
  <div class="slidev-layout statement">
    <div class="st-content">
      <slot>
        <h1>Important Statement</h1>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.statement {
  background: #ebe7f3;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.st-content {
  text-align: center;
  max-width: 80%;
}

.st-content :deep(h1),
.st-content :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 77pt;
  color: black;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
</style>
