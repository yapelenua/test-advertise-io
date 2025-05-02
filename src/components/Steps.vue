<template>
    <div class="w-full mb-[40px] justify-center mx-auto">
        <el-steps :active="2" :space="200" direction="horizontal" style="margin: 0 auto">
            <el-step />
            <el-step />
            <el-step />
        </el-steps>
    </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const active = ref(0)
  
  const next = () => {
    if (active.value++ > 2) active.value = 0
  }
  </script>