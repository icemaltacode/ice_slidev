<script setup lang="ts">
import quotes from '../assets/quotes.png'
import squiggle from '../assets/squiggle.png'
</script>

<template>
  <div class="slidev-layout big-quote-alt">
    <img :src="quotes" class="bqa-quotes" alt="" />
    <div class="bqa-quote">
      <slot>
        <p>I like big butts and I cannot lie</p>
        <p class="bqa-attribution">&mdash; Sir Mix-a-Lot</p>
      </slot>
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

.bqa-quote :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 30pt;
  color: #fdfcfe;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.bqa-quote :deep(.bqa-attribution),
.bqa-quote :deep(p + p) {
  font-weight: 700;
  font-size: 30pt;
  margin-top: 0.1em;
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
