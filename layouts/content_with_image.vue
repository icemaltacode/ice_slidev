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
  <div class="slidev-layout content-with-image">
    <img :src="iceLogo" class="cwi-logo" alt="ICE" />

    <div class="cwi-body">
      <slot>
        <h1>Slide Title</h1>
        <ul>
          <li>Body Level One
            <ul>
              <li>Body Level Two
                <ul>
                  <li>Body Level Three
                    <ul>
                      <li>Body Level Four
                        <ul>
                          <li>Body Level Five</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </slot>
    </div>

    <div class="cwi-image">
      <slot name="image">
        <div class="cwi-image-placeholder">Image goes here</div>
      </slot>
    </div>

    <div v-if="slots.annotations" class="cwi-annotations">
      <slot name="annotations" />
    </div>

    <div class="cwi-unit">
      <span class="cwi-unit-bar"></span>
      <span class="cwi-unit-text">#{{ unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.content-with-image {
  position: relative;
  background: white;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.cwi-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cwi-body {
  width: 45%;
}

.cwi-body :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0 0 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.cwi-body :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.cwi-body :deep(ul ul) {
  padding-left: 1.5em;
  margin-top: 0.25em;
}

.cwi-body :deep(li) {
  position: relative;
  padding-left: 1.5em;
  margin: 0.2em 0;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.2;
}

.cwi-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  top: 0;
  color: inherit;
  font-weight: 500;
}

.cwi-body :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  line-height: 1.25;
  margin: 0.4em 0;
}

.cwi-image {
  position: absolute;
  right: 7rem;
  top: 7rem;
  bottom: 4rem;
  width: 45%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.cwi-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.cwi-image-placeholder {
  width: 100%;
  height: 100%;
  background: #f1f5f9;
  border: 1.5px dashed #94a3b8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-family: var(--ice-font-sans);
  font-size: 18pt;
}

.cwi-annotations {
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

.cwi-annotations::before {
  content: '--';
  display: block;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: inherit;
  margin-bottom: 0.15em;
}

.cwi-annotations :deep(p),
.cwi-annotations :deep(li) {
  margin: 0.2em 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  font-size: inherit;
  color: black;
}

.cwi-annotations :deep(ul) {
  list-style: none;
  padding-left: 1.25em;
  margin: 0;
}

.cwi-annotations :deep(li) {
  position: relative;
  padding-left: 0;
}

.cwi-annotations :deep(li)::before {
  content: '-';
  position: absolute;
  left: -1em;
  color: black;
}

.cwi-annotations :deep(:not(pre) > code) {
  font-family: 'Menlo', ui-monospace, monospace;
  font-weight: 400;
  font-style: normal;
  font-size: inherit;
  color: #7B31FE;
  background: none;
  border: none;
  padding: 0;
}

.cwi-unit {
  position: absolute;
  right: 2rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.cwi-unit-bar {
  display: block;
  width: 1px;
  height: 64px;
  background: black;
}

.cwi-unit-text {
  writing-mode: sideways-lr;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 34pt;
  color: black;
  letter-spacing: 0.01em;
  line-height: 1;
}
</style>
