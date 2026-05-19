<script setup lang="ts">
import { computed } from 'vue'
import logoMac from '../assets/logo-mac.svg'
import logoWindows from '../assets/logo-windows.svg'
import logoLinux from '../assets/logo-linux.svg'

const props = defineProps<{
  name: 'mac' | 'windows' | 'linux'
}>()

const src = computed(() => ({
  mac: logoMac,
  windows: logoWindows,
  linux: logoLinux,
}[props.name]))
</script>

<template>
  <img :src="src" class="inline-logo" :alt="name" />
</template>

<style scoped>
.inline-logo {
  display: inline-block;
  height: 1em;
  width: auto;
  vertical-align: -0.15em;
  margin: 0 0.05em;
}
</style>
