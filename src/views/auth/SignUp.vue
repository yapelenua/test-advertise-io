<template>
  <div class="w-full flex justify-center mt-[80px] max-w-[928px]">
    <el-form
      ref="signUpFormRef"
      :model="signUpForm"
      label-position="top"
      class="w-full grid grid-cols-2 gap-6"
      :rules="signUpRules"
      @submit.prevent="register"
    >
      <!-- Left Column -->
      <div class="flex flex-col space-y-4">
        <el-form-item label="Name">
          <el-input v-model="signUpForm.userName" clearable placeholder="Enter your name" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="signUpForm.userEmail" clearable placeholder="Enter your email" />
        </el-form-item>

        <el-form-item>
          <el-button
            class="bg-zink-500 text-white rounded-[12px] hover:bg-gray-500 hover:text-white border-gray-500
            px-[21px] py-[12px] font-bold font-inter text-sm w-full h-full mt-[24px]"
            native-type="submit"
          >
            Sign Up
          </el-button>
        </el-form-item>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col space-y-4">
        <el-form-item label="Password">
          <el-input v-model="signUpForm.userPassword" clearable placeholder="Enter your password" type="password" />
        </el-form-item>

        <el-form-item label="Confirm Password">
          <el-input
            v-model="signUpForm.confirmPassword"
            clearable placeholder="Confirm your password"
            type="password"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '@/supabase'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
const signUpForm = ref({
  userName: '',
  userEmail: '',
  userPassword: '',
  confirmPassword: ''
})
const signUpFormRef = ref()

const confirmPasswordValidator = (_: any, value: string, callback: any) => {
  if (value !== signUpForm.value.userPassword) {
    callback(new Error('Passwords do not match'))
  } else {
    callback()
  }
}

const signUpRules = reactive({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)],
  confirmPassword: [useRequiredRule(), { validator: confirmPasswordValidator, trigger: 'blur' }]
})

const router = useRouter()

const register = () => {
  signUpFormRef.value?.validate(async (isValid: boolean) => {
    if (isValid) {
      try {
        const { userEmail, userPassword } = signUpForm.value
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword
        })

        if (error) throw error

        const { user } = data
        ElNotification({
          title: 'Success',
          message: 'User registered successfully, check your email',
          type: 'success'
        })
        console.log('User registered successfully:', user)
        router.push('/auth/login')
      } catch (error: any) {
        ElNotification({
          title: 'Error',
          message: `Registration error: ${error.message}`,
          type: 'error'
        })
        console.error('Registration error:', error)
      }
    } else {
      ElNotification({
        title: 'Error',
        message: 'Please fill in all fields',
        type: 'error'
      })
    }
  })
}
</script>
