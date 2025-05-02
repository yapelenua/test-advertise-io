<template>
    <div class="p-6 min-h-screen">
      <h2 class="text-2xl font-bold mb-4 text-white">Suggestions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="bg-white p-4 rounded-2xl shadow hover:shadow-md transition max-w-[300px] max-h-[200px] hover:bg-gray-300 overflow-hidden cursor-pointer"
          @click="onHandleClick(suggestion)"
        >
          <p class="text-gray-800 line-clamp-5">{{ suggestion }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";

  const { input } = useGenerate()
  
  const suggestions = ref([
    `Write me short values for adverizing image generation with 6 punkts
  Niche
  Company name
  Image content
  Additional colors
  Call to action
  design style
  
  For It company`,
    `Create an eye-catching advertisement banner for an IT company showcasing their expertise in cutting edge technology and innovative solutions. Highlight the company’s commitment to client satisfaction and advanced technology integration. Use vibrant colors and modern design elements to attract attention. Ensure the banner is visually appealing and conveys the message clearly. Include the company’s logo and a call to action such as “Discover More” or “Contact Us Today”.`,
  ]);


  const onHandleClick = (suggestion: string) => {
    input.value = suggestion
  }
  </script>
  