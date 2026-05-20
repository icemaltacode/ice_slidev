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
  <div class="slidev-layout content-with-code">
    <img :src="iceLogo" class="cwc-logo" alt="ICE" />

    <div class="cwc-body">
      <slot>
        <h1>Slide Title</h1>
        <ul>
          <li>Body Level One
            <ul>
              <li>Body Level Two
                <ul>
                  <li>Body Level Three</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </slot>
    </div>

    <div class="cwc-code">
      <slot name="code">
        <div class="cwc-code-placeholder">Code goes here</div>
      </slot>
    </div>

    <div v-if="slots.annotations" class="cwc-annotations">
      <slot name="annotations" />
    </div>

    <div class="cwc-unit">
      <span class="cwc-unit-bar"></span>
      <span class="cwc-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-with-code {
  position: relative;
  background: white;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.cwc-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cwc-body {
  width: 45%;
}

.cwc-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.cwc-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.cwc-body :deep(ul ul) {
  padding-left: 1em;
  margin-top: 0.25em;
}

.cwc-body :deep(li) {
  position: relative;
  padding-left: 1em;
  margin: 0.2em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.2;
}

.cwc-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.cwc-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.25;
  margin: 0.4em 0;
}

.cwc-code {
  position: absolute;
  right: 7rem;
  top: 7rem;
  bottom: 4rem;
  width: 45%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
}

.cwc-code :deep(.slidev-code-wrapper) {
  width: 100%;
  height: 100%;
}

.cwc-code :deep(pre),
.cwc-code :deep(pre.shiki),
.cwc-code :deep(pre.slidev-code) {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 1.5rem 1.75rem !important;
  border-radius: 8px !important;
  font-family: var(--ice-font-mono) !important;
  font-size: 18pt !important;
  line-height: 1.45 !important;
  background: #121212 !important;
  overflow: auto;
  box-sizing: border-box;
}

.cwc-code :deep(pre code) {
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
}

.cwc-code-placeholder {
  width: 100%;
  height: 100%;
  background: #f1f5f9;
  border: 1.5px dashed #94a3b8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-family: var(--ice-font-sans);
  font-size: 18pt;
}

.cwc-annotations {
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

.cwc-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.cwc-annotations :deep(p),
.cwc-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.cwc-annotations :deep(ul) {
  list-style: none;
  padding-left: 0.85em;
  margin: 0;
}

.cwc-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.cwc-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.cwc-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.cwc-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cwc-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.cwc-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
