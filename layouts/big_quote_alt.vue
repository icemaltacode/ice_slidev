<script setup lang="ts">
import quotes from '../assets/quotes.png'
import squiggle from '../assets/squiggle.png'
</script>

<template>
  <div class="slidev-layout big-quote-alt">
    <img :src="quotes" class="bqa-quotes" alt="" />
    <div class="bqa-quote">
      <slot>
        <h1>&ldquo;I like big butts and I cannot lie&rdquo;</h1>
      </slot>
    </div>
    <div class="bqa-attribution">
      &mdash; <slot name="attribution">Sir Mix-a-Lot</slot>
    </div>
    <img :src="squiggle" class="bqa-squiggle" alt="" />
  </div>
</template>

<style scoped>
.big-quote-alt {
  position: relative;
  background: #201f27;
  color: #fdfcfe;
  padding: 4rem;
}

.bqa-quotes {
  position: absolute;
  left: 50%;
  top: 18%;
  transform: translateX(-50%);
  width: 110px;
  height: auto;
}

.bqa-quote {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  text-align: center;
  max-width: 80%;
}

.bqa-quote :deep(h1),
.bqa-quote :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 30pt;
  color: #fdfcfe;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.bqa-attribution {
  position: absolute;
  left: 50%;
  top: 56%;
  transform: translateX(-50%);
  text-align: center;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 20pt;
  color: #b8b6c0;
  letter-spacing: 0;
}

.bqa-attribution :deep(p) {
  color: inherit;
  margin: 0;
  display: inline;
}

.bqa-attribution :deep(em) {
  font-style: italic;
}

.bqa-squiggle {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: auto;
  opacity: 0.85;
}
</style>
