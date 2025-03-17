<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center">
    <div class="loader" />
  </div>
</template>
<script lang="ts" setup>
import { useGenerate } from '../store/modules/generate.store'

const { isLoading } = useGenerate()
</script>
<style>
.loader {
  width: 120px;
  height: 22px;
  border-radius: 40px;
  color: #9a9a9a;
  border: 2px solid;
  position: relative;
}
.loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  width: 25%;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  background: currentColor;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
    50% {left:100%;transform: translateX(calc(-100% - 4px))}
}
</style>
