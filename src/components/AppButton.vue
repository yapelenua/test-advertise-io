<template>
  <button
    class="hover:bg-neutral-700 text-white rounded-[12px] w-full transition duration-300 ease-in-out
            bg-gray-500 hover:text-white border-gray-500 px-[21px] py-[12px] font-bold font-inter text-sm"
    @click="$emit('buttonClick')"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineEmits(['buttonClick'])
</script>
