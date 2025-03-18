<template>
  <div v-if="!imageUrl && !isLoading" class="w-full flex justify-center items-center" :class="{ 'h-full': preferedOption === 'manual' }">
    <div v-if="preferedOption === 'option'" class="mb-[50px] h-full overflow-y-auto">
      <el-form
      :model="form"
      label-position="top"
      class="w-[450px]"
    >
      <el-form-item
        v-for="field in formConfig"
        :key="field.model"
        :label="field.label"
      >
        <el-input v-model="form[field.model]" clearable :placeholder="field.placeholder" />
      </el-form-item>
    </el-form>
    <AppButton @buttonClick="generateImage()">Generate</AppButton>
    </div>

    <el-form
      v-if="preferedOption === 'manual'"
      :model="form"
      label-position="top"
      class="w-[450px]"
    >
      <el-form-item label="Enter your custom prompt">
        <el-input v-model="userPrompt" clearable type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" />
      </el-form-item>
      <el-form-item>
        <AppButton @buttonClick="generateImage()">Generate</AppButton>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useGenerate } from '../store/modules/generate.store'
import { form, formConfig } from '../utils/form.config'
import axios from 'axios'
import { generatePrompt, uploadImage } from '../utils/helpers'

const { isLoading, imageUrl, preferedOption, userPrompt } = useGenerate()


async function generateImage () {
  isLoading.value = true
  const prompt = preferedOption.value === 'option' ? generatePrompt() : userPrompt.value

  try {
    const response = await axios.post('https://advertise-io-be.onrender.com/query', {
      prompt
    })

    imageUrl.value = response.data.image

    uploadImage(imageUrl.value)
  } catch (error) {
    console.error('Error fetching response:', error.response?.data || error.message)
    throw error
  } finally {
    isLoading.value = false
  }
}
</script>
