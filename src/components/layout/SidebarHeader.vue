<template>
  <div class="flex items-center justify-between">
    <div
      class="hover:bg-neutral-700 p-[12px]
    flex items-center justify-center rounded-full transition duration-300 ease-in-out"
      @click="isSidebarVisible = !isSidebarVisible"
    >
      <IconSidebarHeader class="cursor-pointer" />
    </div>
    <div
      v-if="isSidebarVisible"
      class="hover:bg-neutral-700 p-[12px]
    flex items-center justify-center rounded-full transition duration-300 ease-in-out"
    >
      <IconTooltipIcon class="cursor-pointer w-full h-full" @click="suggestedPrompt"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconSidebarHeader from '~icons/icon/SidebarHeaderIcon'
import IconTooltipIcon from '~icons/icon/tooltipIcon'

const { isSidebarVisible } = useGeneral()
const { suggestedPrompt } = useGenerate()
</script>
