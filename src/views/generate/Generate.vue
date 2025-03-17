<template>
  <div class="flex flex-col w-full h-full">
    <div class="pt-[16px] flex justify-between w-full px-[40px]">
      <h1 class="text-3xl font-bold text-white align-start">Generate</h1>
      <div>
        <button
          class="bg-neutral-700 text-white rounded-[12px]
      hover:bg-gray-500 hover:text-white border-gray-500 px-[21px] py-[12px] font-bold font-inter mr-[8px] text-sm"
          @click="preferedOption = 'manual'"
        >
          Manual
        </button>
        <button
          class="bg-neutral-700 text-white rounded-[12px]
      hover:bg-gray-500 hover:text-white border-gray-500 px-[21px] py-[12px] font-bold font-inter mr-[8px] text-sm"
          @click="preferedOption = 'option'"
        >
          Option
        </button>
      </div>
    </div>
    <Loader v-if="isLoading" />
    <GenerateForm />
    <SuccesImagePrewiev />
  </div>
</template>
<script lang="ts" setup>
import { useGenerate } from './store/modules/generate.store'

const { isLoading, preferedOption } = useGenerate()
</script>
