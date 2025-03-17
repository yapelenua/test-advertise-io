<template>
  <div
    class="h-full bg-stone-950 p-[16px] transition-all duration-300 ease-in-out"
    :class="isSidebarVisible ? 'w-[300px]' : 'w-[80px]'"
  >
    <SidebarHeader />
    <RouterLink
      v-for="item in navigation"
      :key="item.name"
      :to="{ name: item.name }"
      class="text-white w-full
      flex items-center justify-start py-[10px] px-[12px] rounded-[16px] mt-[12px]
      hover:bg-neutral-700 transition duration-300 ease-in-out font-inter font-medium text-sm cursor-pointer gap-[12px]"
      :class="route.name === item.name ? 'bg-neutral-700' : ''"
    >
      <component :is="item.icon" />
      <p v-if="isSidebarVisible">{{ item.label }}</p>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { defaultLayoutRoutes } from '@/router/routes'

const route = useRoute()
const { isSidebarVisible } = useGeneral()

const navigation = [
  ...defaultLayoutRoutes.children?.map(route => ({
    name: route.name as string,
    label: route.meta?.label || '',
    icon: route.meta?.icon
  })) || []
]
</script>
