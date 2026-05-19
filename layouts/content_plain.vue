<script setup lang="ts">
import { useSlots } from 'vue'
import iceLogo from '../assets/ice_logo_black.png'

withDefaults(
  defineProps<{
    unit?: string | number
  }>(),
  { unit: '1.1.1' },
)

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout content-plain">
    <img :src="iceLogo" class="cp-logo" alt="ICE" />
    <div class="cp-body">
      <slot>
        <h1>Topic Title Here</h1>
        <p>Replace with your content.</p>
      </slot>
    </div>
    <div v-if="slots.annotations" class="cp-annotations">
      <slot name="annotations" />
    </div>
    <div class="cp-unit">
      <span class="cp-unit-bar"></span>
      <span class="cp-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-plain {
  position: relative;
  background: white;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.cp-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cp-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.cp-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.cp-body :deep(li) {
  position: relative;
  padding-left: 1.5em;
  margin: 0.3em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 33pt;
  color: black;
  line-height: 1.25;
}

.cp-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.cp-body :deep(ul ul) {
  margin-top: 0.3em;
  padding-left: 1.5em;
}

.cp-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 33pt;
  color: black;
  line-height: 1.25;
  margin: 0.5em 0;
}

.cp-annotations {
  position: absolute;
  left: 4.5rem;
  bottom: 3rem;
  right: 7rem;
  font-family: var(--ice-font-sans);
  font-weight: 400;
  font-style: italic;
  font-size: 21pt;
  color: black;
  line-height: 1.3;
}

.cp-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.cp-annotations :deep(p),
.cp-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.cp-annotations :deep(ul) {
  list-style: none;
  padding-left: 1.25em;
  margin: 0;
}

.cp-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.cp-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.cp-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.cp-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cp-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.cp-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
