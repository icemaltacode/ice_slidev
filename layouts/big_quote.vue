<template>
  <div class="slidev-layout big-quote">
    <div class="bq-quote">
      <slot>
        <h1>&ldquo;Cogito, ergo sum&rdquo;</h1>
      </slot>
    </div>
    <div class="bq-attribution">
      --<slot name="attribution">René Descartes</slot>
    </div>
  </div>
</template>

<style scoped>
.big-quote {
  position: relative;
  background: #ebe7f3;
  color: black;
  padding: 4rem 5rem;
}

.bq-quote {
  position: absolute;
  left: 5rem;
  right: 5rem;
  top: 38%;
  transform: translateY(-50%);
}

.bq-quote :deep(h1),
.bq-quote :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 85pt;
  color: black;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.bq-attribution {
  position: absolute;
  left: 5rem;
  bottom: 3rem;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: #848594;
  line-height: 1.2;
}
</style>
