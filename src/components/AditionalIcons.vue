<template>
    <el-icon class="text-white cursor-pointer" @click="downloadImage(props.imageName)"><Download /></el-icon>
    <el-icon class="text-red-500 cursor-pointer" @click="deleteImage(props.imageName)"><DeleteFilled /></el-icon>
</template>
<script setup lang="ts">
import { supabase } from '@/supabase'
import { ElNotification } from 'element-plus'
import { Download, DeleteFilled } from '@element-plus/icons-vue'

const { user } = useGeneral()
const { images } = useGenerate()
const props = defineProps<{
    imageName: string
}>()

async function deleteImage (imageName: string) {
  const filePath = `${user.value.id}/${imageName}`
  console.log('Deleting file:', filePath)

  try {
    const { error } = await supabase
      .storage
      .from('images')
      .remove([filePath])

    if (error) {
      console.error('Error deleting file:', error)
      throw error
    }

    images.value = images.value.filter((img: any) => img.name !== imageName)

    ElNotification({
      title: 'Success',
      message: 'Image successfully deleted',
      type: 'success'
    })
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: `Error deleting image: ${error.message}`,
      type: 'error'
    })
  }
}

const downloadImage = async (imageName: string) => {
  const { data, error } = await supabase.storage
    .from('images')
    .download(`${user.value.id}/${imageName}`)

  if (error) {
    throw error
  }

  const url = URL.createObjectURL(data)

  const link = document.createElement('a')
  link.href = url
  link.download = imageName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
</script>