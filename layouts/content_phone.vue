<script setup lang="ts">
import { computed, useSlots } from 'vue'
import iceLogo from '../assets/ice_logo_black.png'
import arrow from '../assets/arrow.png'
import { useUnit } from '../composables/useUnit'

const props = defineProps<{
  unit?: string | number
}>()

const inheritedUnit = useUnit()
const unit = computed(() => props.unit ?? inheritedUnit.value ?? '1.1.1')

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout content-phone">
    <img :src="iceLogo" class="cph-logo" alt="ICE" />

    <div class="cph-body">
      <slot>
        <h1>Our Progress</h1>
        <p>Some text about what the student is seeing.</p>
      </slot>
    </div>

    <img :src="arrow" class="cph-arrow" alt="" />

    <div class="cph-phone">
      <slot name="screen">
        <div class="cph-screen-default"></div>
      </slot>
    </div>

    <div v-if="slots.annotations" class="cph-annotations">
      <slot name="annotations" />
    </div>

    <div class="cph-unit">
      <span class="cph-unit-bar"></span>
      <span class="cph-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-phone {
  position: relative;
  background: #f4ddd5;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.cph-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cph-body {
  width: 55%;
}

.cph-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.cph-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
  margin: 0;
}

.cph-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.cph-body :deep(ul ul) {
  margin-top: 0.3em;
  padding-left: 1em;
}

.cph-body :deep(li) {
  position: relative;
  padding-left: 1em;
  margin: 0.3em 0;
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
}

.cph-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.cph-arrow {
  position: absolute;
  left: 55%;
  top: 38%;
  width: 14%;
  height: auto;
  opacity: 0.95;
  pointer-events: none;
}

.cph-phone {
  position: absolute;
  right: calc(5rem + 80px);
  top: 5rem;
  bottom: 0;
  width: 24%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.cph-phone :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.cph-screen-default {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    #c084fc 0%,
    #6b21a8 35%,
    #1f1b4d 70%,
    #000 100%
  );
  border-radius: 7% / 4%;
}

.cph-annotations {
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

.cph-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.cph-annotations :deep(p),
.cph-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.cph-annotations :deep(ul) {
  list-style: none;
  padding-left: 0.85em;
  margin: 0;
}

.cph-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.cph-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.cph-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.cph-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cph-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.cph-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
