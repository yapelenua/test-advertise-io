<template>
  <div class="bg-stone-950 flex items-center px-[40px] py-[12px] justify-between">
    <div class="flex items-center gap-[16px]">
      <IconLittleLogo />
      <p class="font-bold text-lg text-white">Advertise.Io</p>
    </div>
    <div v-if="!user">
      <RouterLink
        v-for="button in buttons"
        :key="button.label"
        :to="button.href"
        class="bg-neutral-700 text-white rounded-[12px]
        hover:bg-gray-500 hover:text-white border-gray-500 px-[21px] py-[12px] font-bold font-inter mr-[8px] text-sm"
      >
        {{ button.label }}
      </RouterLink>
    </div>
    <button
      v-else
      class="bg-neutral-700 text-white rounded-[12px]
        hover:bg-gray-500 hover:text-white border-gray-500 px-[21px] py-[12px] font-bold font-inter mr-[8px] text-sm"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>
<script lang="ts" setup>
import IconLittleLogo from '~icons/icon/littleLogo'
import { supabase } from '@/supabase'

const { user } = useGeneral()

const router = useRouter()

const buttons = ref([
  { label: 'Sign in', href: '/auth/sign-in' },
  { label: 'Sign up', href: '/auth/sign-up' }
])

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  } else {
    user.value = null
    console.log('Sign out success')
    router.push('/auth/login')
  }
}
</script>
