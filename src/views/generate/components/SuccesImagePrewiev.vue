<template>
  <div v-if="imageUrl && !isLoading" class="flex flex-col justify-center items-center">
    <h3 class="text-lg font-bold mb-2 text-white text-4xl">🎉🥳 Congratulations!</h3>
    <p class="text-gray-500 mx-[40px]">Here is your generated content.</p>
    <img :src="imageUrl" alt="Generated Ad Image" class="rounded-lg shadow-lg w-[500px] h-[500px] mt-[20px]">
    <AppButton class="mt-[20px] max-w-[500px]" @buttonClick="onNewGenerate()">Generate new</AppButton>
    <AppButton class="mt-[20px] max-w-[500px]" @buttonClick="onRegenerate()">Regenerate</AppButton>
    <AppButton class="mt-[20px] max-w-[500px]" @buttonClick="uploadImage(imageUrl)">Save</AppButton>
  </div>
</template>
<script lang="ts" setup>
import { useGenerate } from '../store/modules/generate.store'
import { form } from '../utils/form.config'
import { generateImage, uploadImage } from '../utils/helpers'

const { isLoading, imageUrl, userPrompt } = useGenerate()

const onNewGenerate = () => {
  imageUrl.value = ''
}

const onRegenerate = () => {
  form.value.designStyle += ' '
  userPrompt.value += ' '
  generateImage()
}
</script>
