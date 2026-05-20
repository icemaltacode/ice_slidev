<script setup lang="ts">
import { useSlots } from 'vue'
import QrcodeVue from 'qrcode.vue'
import iceLogo from '../assets/ice_logo_black.png'

withDefaults(
  defineProps<{
    url?: string
    caption?: string
  }>(),
  {
    url: 'https://bit.ly/3E1JOrJ',
    caption: 'Slides | Projects | Bonus Material | Self-Study Resources',
  },
)

const slots = useSlots()
</script>

<template>
  <div class="slidev-layout student-area">
    <img :src="iceLogo" class="sa-logo" alt="ICE" />

    <div class="sa-title">
      <slot name="title">
        <h1>Your Student Area</h1>
      </slot>
    </div>

    <div class="sa-qr-block">
      <div class="sa-qr-card">
        <div class="sa-qr-code">
          <QrcodeVue
            :value="url"
            :size="280"
            level="H"
            background="#000000"
            foreground="#ffffff"
            render-as="svg"
          />
        </div>
        <div class="sa-qr-label">SCAN ME</div>
      </div>
      <div class="sa-qr-url">{{ url }}</div>
    </div>

    <div class="sa-right">
      <div class="sa-caption">
        <slot name="caption">{{ caption }}</slot>
      </div>
      <div class="sa-tablet">
        <slot name="screen">
          <div class="sa-tablet-placeholder">Tablet screen content</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.student-area {
  position: relative;
  background: #ebe7f3;
  color: black;
  padding: 4rem 4.5rem 3rem;
}

.sa-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.sa-title :deep(h1) {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 60pt;
  color: #7B31FE;
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.sa-qr-block {
  position: absolute;
  /* Centered between slide-title left edge (padding 4.5rem) and tablet left edge (50% - 4rem) */
  left: calc(25% + 0.25rem);
  top: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.sa-qr-card {
  background: #0a0a0a;
  border-radius: 18px;
  padding: 1.5rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.sa-qr-code {
  background: #0a0a0a;
}

.sa-qr-code :deep(svg),
.sa-qr-code :deep(canvas) {
  display: block;
  width: 280px;
  height: 280px;
}

.sa-qr-label {
  font-family: var(--ice-font-sans);
  font-weight: 900;
  font-size: 22pt;
  color: white;
  letter-spacing: 0.05em;
}

.sa-qr-url {
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 18pt;
  color: black;
}

.sa-right {
  position: absolute;
  right: 8.5rem;
  bottom: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.sa-caption {
  text-align: center;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 26pt;
  color: black;
  letter-spacing: 0;
}

.sa-tablet {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sa-tablet :deep(img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.sa-tablet-placeholder {
  width: 80%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 2.5% / 3.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-family: var(--ice-font-sans);
  font-weight: 500;
  font-size: 22pt;
}
</style>
