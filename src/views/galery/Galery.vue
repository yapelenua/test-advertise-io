<template>
  <div class="w-full">
    <div class="pt-[16px] flex justify-start w-full px-[40px]">
      <h1 class="text-3xl font-bold text-white align-start">Galery</h1>
    </div>
    <div v-if="images && images.length" class="px-[40px] py-[32px] flex gap-[16px] flex-wrap">
      <div
        v-for="image in images"
        :key="image.id"
        class="group flex flex-col bg-zink-900 rounded-[12px] transition duration-300
        ease-in-out hover:scale-110 hover:h-[130px] hover:bg-zink-800 opacity-80 hover:opacity-100"
      >
        <img
          v-if="image.name !== '.emptyFolderPlaceholder'"
          :src="`https://xgsaeheapvvspgtxwsaw.supabase.co/storage/v1/object/public/images/${user.id}/${image.name}`"
          alt="Uploaded Image"
          class="w-[170px] h-[95px] object-cover rounded-[12px] hover:rounded-t-[12px]"
          @click="openModal('ImageModal',{
            imageName: image.name
          })"
        >
        <div
          class="opacity-0 group-hover:opacity-100 flex w-full justify-center
          gap-[16px] my-[10px] transition-opacity duration-200"
        >
          <el-icon class="text-white cursor-pointer" @click="downloadImage(image.name)"><Download /></el-icon>
          <el-icon class="text-red-500 cursor-pointer" @click="deleteImage(image.name)"><DeleteFilled /></el-icon>
        </div>
      </div>
    </div>
    <div v-if="isEmpty">
      <el-empty description="No images yet">
        <router-link to="/generate" class="primary text-white">Let's generate</router-link>
      </el-empty>
    </div>
    <Loader v-if="isLoading" />
  </div>
</template>
<script setup lang="ts">
import { supabase } from '@/supabase'
import { ElNotification } from 'element-plus'
import { DeleteFilled, Download } from '@element-plus/icons-vue'

const { user } = useGeneral()
const { openModal } = useModals()

const images = ref()
const isLoading = ref(false)
const isEmpty = ref(false)

async function getImagesByProfile () {
  try {
    isLoading.value = true
    const { data } = await supabase
      .storage
      .from('images')
      .list(user.value.id)

    images.value = data
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: `${error}`,
      type: 'error'
    })
    isLoading.value = false
    images.value.length === 0 ? isEmpty.value = true : isEmpty.value = false
  } finally {
    isLoading.value = false
    images.value.length === 0 ? isEmpty.value = true : isEmpty.value = false
  }
}

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

onMounted(() => {
  getImagesByProfile()
})
</script>
