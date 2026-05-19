<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout showcase">
    <div class="sc-title">
      <slot>
        <h1>We&rsquo;re Done!</h1>
      </slot>
    </div>

    <div class="sc-grid">
      <div class="sc-main">
        <slot name="main">
          <div class="sc-placeholder">Main image</div>
        </slot>
      </div>
      <div class="sc-right">
        <div class="sc-top">
          <slot name="top">
            <div class="sc-placeholder">Top image</div>
          </slot>
        </div>
        <div class="sc-bottom">
          <slot name="bottom">
            <div class="sc-placeholder">Bottom image</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.showcase {
  position: relative;
  background: white;
  color: black;
  padding: 3rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.sc-title :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 56pt;
  color: #7B31FE;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.sc-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 1.25rem;
  min-height: 0;
}

.sc-main,
.sc-top,
.sc-bottom {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  background: #f1f5f9;
}

.sc-right {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 1.25rem;
  min-height: 0;
}

.sc-main :deep(img),
.sc-top :deep(img),
.sc-bottom :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.sc-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 20pt;
  background: #f1f5f9;
  border: 1.5px dashed #94a3b8;
  border-radius: 6px;
}
</style>
