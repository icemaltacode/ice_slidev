<script setup lang="ts">
import iceLogo from '../assets/ice_logo.png'

withDefaults(
  defineProps<{
    unit?: string | number
  }>(),
  { unit: '1.1' },
)
</script>

<template>
  <div class="slidev-layout ice-contents" :style="{ '--unit-prefix': `'${unit}.'` }">
    <img :src="iceLogo" class="ct-logo" alt="ICE" />
    <div class="ct-body">
      <slot>
        <h1>Content</h1>
        <ul>
          <li>Content Item 1</li>
          <li>Content Item 2</li>
          <li>Content Item 3</li>
          <li>Content Item 4</li>
          <li>Content Item 5</li>
          <li>Content Item 6</li>
          <li>Content Item 7</li>
          <li>Content Item 8</li>
        </ul>
      </slot>
    </div>
    <div class="ct-unit">
      <span class="ct-unit-bar"></span>
      <span class="ct-unit-text">Unit #{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.ice-contents {
  position: relative;
  background: #201f27;
  color: white;
  padding: 6rem 4rem 4rem;
}

.ct-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.ct-body {
  position: relative;
  height: 100%;
}

.ct-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  margin: 0;
  color: white;
  line-height: 1;
  letter-spacing: -0.01em;
}

.ct-body :deep(ul) {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 2rem;
  row-gap: 10rem;
  counter-reset: item;
}

.ct-body :deep(li) {
  counter-increment: item;
  padding-top: 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 40pt;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.ct-body :deep(li)::before {
  content: var(--unit-prefix) counter(item);
  display: block;
  width: fit-content;
  color: white;
  font-weight: 500;
  font-size: 40pt;
  font-family: var(--ice-font-sans);
  line-height: 1;
  letter-spacing: -0.05em;
  border-top: 2px solid #ecd5bf;
  padding-top: 0.5rem;
  margin-bottom: 0.1rem;
}

.ct-unit {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.ct-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: white;
  letter-spacing: 0.01em;
  line-height: 1;
}

.ct-unit-bar {
  display: block;
  width: 1px;
  height: 40px;
  background: white;
}
</style>
