<template>
    <div class="max-w-xl mx-auto p-4 bg-neutral-700 rounded-2xl shadow-md flex flex-col space-y-4 max-h-[600px]">
      <div class="h-96 overflow-y-auto space-y-3">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="[
            'px-4 py-2 rounded-lg max-w-[80%]',
            msg.role === 'user' ? 'ml-auto bg-white text-black' : 'mr-auto bg-white text-gray-800'
          ]"
        >
          <p class="text-sm whitespace-pre-line">{{ msg.text }}</p>
        </div>
      </div>
  
      <form @submit.prevent="sendMessage" class="flex gap-2">
        <el-input
          v-model="input"
          type="textarea"
          resize="none"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Type your message..."
          class="flex-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-none"
        />
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {{ loading ? '...' : 'Send' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'

  const { input } = useGenerate()
  
  const loading = ref(false)
  const messages = ref([])
  
  const sendMessage = async () => {
    if (!input.value.trim()) return
  
    const userMessage = input.value.trim()
    messages.value.push({ role: 'user', text: userMessage })
    input.value = ''
    loading.value = true
  
    try {
      const res = await axios.post('https://advertise-io-be.onrender.com/chat', {
        prompt: userMessage,
      })
  
      console.log(res)
      const botText = res.data.response.length
          ? res.data.response
          : '🤷 No response.'
  
      messages.value.push({ role: 'bot', text: botText })
    } catch (err) {
      messages.value.push({ role: 'bot', text: '⚠️ Error fetching response.' })
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  </script>
  