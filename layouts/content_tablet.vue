<script setup lang="ts">
import { computed, useSlots } from 'vue'
import iceLogo from '../assets/ice_logo_black.png'
import { useUnit } from '../composables/useUnit'

const props = defineProps<{
  unit?: string | number
}>()

const inheritedUnit = useUnit()
const unit = computed(() => props.unit ?? inheritedUnit.value ?? '1.1.1')

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout content-tablet">
    <img :src="iceLogo" class="ct-logo" alt="ICE" />

    <div class="ct-body">
      <slot>
        <h1>On the Tablet</h1>
        <p>Some text about what the student is seeing.</p>
      </slot>
    </div>

    <div class="ct-tablet">
      <slot name="screen">
        <div class="ct-screen-default"></div>
      </slot>
    </div>

    <div v-if="slots.annotations" class="ct-annotations">
      <slot name="annotations" />
    </div>

    <div class="ct-unit">
      <span class="ct-unit-bar"></span>
      <span class="ct-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-tablet {
  position: relative;
  background: #f4ddd5;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.ct-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.ct-body {
  width: 38%;
}

.ct-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.ct-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
  margin: 0;
}

.ct-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.ct-body :deep(ul ul) {
  margin-top: 0.3em;
  padding-left: 1em;
}

.ct-body :deep(li) {
  position: relative;
  padding-left: 1em;
  margin: 0.3em 0;
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
}

.ct-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.ct-tablet {
  position: absolute;
  right: calc(5rem + 40px);
  top: 5rem;
  bottom: 0;
  width: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.ct-tablet :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.ct-screen-default {
  width: 90%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(
    180deg,
    #c084fc 0%,
    #6b21a8 35%,
    #1f1b4d 70%,
    #000 100%
  );
  border-radius: 2.5% / 3.5%;
}

.ct-annotations {
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

.ct-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.ct-annotations :deep(p),
.ct-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.ct-annotations :deep(ul) {
  list-style: none;
  padding-left: 0.85em;
  margin: 0;
}

.ct-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.ct-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.ct-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.ct-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.ct-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.ct-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
