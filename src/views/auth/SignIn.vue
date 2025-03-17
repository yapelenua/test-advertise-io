<template>
  <div class="w-full flex justify-center mt-[80px] max-w-[928px]">
    <el-form :model="signInForm" label-position="top" class="w-[448px]" @submit.prevent="login">
      <el-form-item label="Email">
        <el-input
          v-model="signInForm.userEmail"
          clearable
          placeholder="Enter your email"
        />
      </el-form-item>

      <el-form-item label="Password">
        <el-input
          v-model="signInForm.userPassword"
          clearable
          placeholder="Enter your password"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          class="bg-zink-500 text-white rounded-[12px]
        hover:bg-gray-500 hover:text-white border-gray-500
        px-[21px] py-[12px] font-bold font-inter text-sm w-full h-full mt-[24px]"
        >
          Sign In
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import { ElNotification } from 'element-plus'

const { isAuthImageAviable } = useGeneral()

const signInForm = ref({
  userEmail: '',
  userPassword: ''
})

const router = useRouter()

const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: signInForm.value.userEmail,
      password: signInForm.value.userPassword
    })
    if (error) {
      throw error
    } else {
      ElNotification({
        title: 'Success',
        message: 'User logged in successfully',
        type: 'success'
      })
      router.push('/generate')
      isAuthImageAviable.value = false
    }
  } catch (error) {
    ElNotification({
      title: 'Error',
      message: `${error}`,
      type: 'error'
    })
  }
}
</script>
