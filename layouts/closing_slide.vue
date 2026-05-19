<script setup lang="ts">
import iceLogo from '../assets/ice_logo.png'

withDefaults(
  defineProps<{
    dates?: string
  }>(),
  { dates: () => `2023 - ${new Date().getFullYear()}` },
)
</script>

<template>
  <div class="slidev-layout closing-slide">
    <img :src="iceLogo" class="cs-logo" alt="ICE" />
    <div class="cs-text">
      <slot>
        <p class="cs-copyright">© {{ dates }} Institute of Computer Education Ltd.</p>
        <p>
          The contents of this document are copyright to the Institute of
          Computer Education Ltd, unless otherwise stated, and must not be
          reproduced without permission.
        </p>
        <p>
          Every effort has been made to trace all of the copyright holders,
          but if any have been inadvertently overlooked the Institute of
          Computer Education Ltd. will be pleased to make the necessary
          arrangements at the first opportunity. Please contact us directly.
          While the Institute of Computer Education Ltd. has taken all
          reasonable care in the preparation of this work, the Institute of
          Computer Education Ltd. makes no representation, express or
          implied, with regard to the accuracy of the information contained
          in this work and cannot accept any legal responsibility or
          liability for any errors or omissions from the work or the
          consequences thereof. The reader assumes sole responsibility for
          the selection of these materials to achieve its intended results.
          Products and services that are referred to in this work may be
          either trademarks and/or registered trademarks of their respective
          owners. The editors and author/s make no claim to these trademarks.
        </p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.closing-slide {
  position: relative;
  background: #201f27;
  color: white;
  padding: 4rem 5rem;
}

.cs-logo {
  position: absolute;
  top: 2.25rem;
  right: 3rem;
  width: 72px;
  height: auto;
}

.cs-text {
  position: absolute;
  left: 5rem;
  right: 5rem;
  bottom: 3rem;
}

.cs-text :deep(p) {
  font-family: var(--ice-font-sans);
  font-weight: 400;
  font-size: 14pt;
  line-height: 1.45;
  color: white;
  margin: 0 0 0.75rem;
  max-width: 95%;
}

.cs-text :deep(p):last-child {
  margin-bottom: 0;
}

.cs-text :deep(.cs-copyright) {
  font-weight: 500;
}
</style>
