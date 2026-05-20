<script setup lang="ts">
import { computed, useSlots } from 'vue'
import iceLogo from '../assets/ice_logo_black.png'
import imacFrame from '../assets/imac.png'
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
  <div class="slidev-layout content-desktop">
    <img :src="iceLogo" class="cd-logo" alt="ICE" />

    <div class="cd-body">
      <slot>
        <h1>Our Progress</h1>
        <p>Some text about what the student is seeing.</p>
      </slot>
    </div>

    <img :src="arrow" class="cd-arrow" alt="" />

    <div class="cd-desktop">
      <img :src="imacFrame" class="cd-frame" alt="" />
      <div class="cd-screen">
        <slot name="screen">
          <div class="cd-screen-default"></div>
        </slot>
      </div>
    </div>

    <div v-if="slots.annotations" class="cd-annotations">
      <slot name="annotations" />
    </div>

    <div class="cd-unit">
      <span class="cd-unit-bar"></span>
      <span class="cd-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-desktop {
  position: relative;
  background: #f4ddd5;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.cd-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cd-body {
  width: 40%;
}

.cd-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.cd-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
  margin: 0;
}

.cd-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.cd-body :deep(ul ul) {
  margin-top: 0.3em;
  padding-left: 1em;
}

.cd-body :deep(li) {
  position: relative;
  padding-left: 1em;
  margin: 0.3em 0;
  font-family: var(--ice-font-sans);
  font-weight: 700;
  font-size: 28pt;
  color: black;
  line-height: 1.25;
}

.cd-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.cd-arrow {
  position: absolute;
  left: 36%;
  top: 38%;
  width: 12%;
  height: auto;
  opacity: 0.95;
  pointer-events: none;
}

.cd-desktop {
  position: absolute;
  right: 4rem;
  top: 5rem;
  width: 50%;
}

.cd-frame {
  width: 100%;
  display: block;
  position: relative;
  z-index: 2;
}

.cd-screen {
  position: absolute;
  top: 6%;
  left: 4.5%;
  right: 6%;
  bottom: 34%;
  z-index: 1;
  overflow: hidden;
}

.cd-screen :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cd-screen-default {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #f59e0b 0%,
    #dc2626 30%,
    #7c3aed 70%,
    #1e1b4b 100%
  );
}

.cd-annotations {
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

.cd-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.cd-annotations :deep(p),
.cd-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.cd-annotations :deep(ul) {
  list-style: none;
  padding-left: 0.85em;
  margin: 0;
}

.cd-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.cd-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.cd-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.cd-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cd-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.cd-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
