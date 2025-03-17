import { defineStore } from 'pinia'

export const useGenerateStore = defineStore('generateStore', () => {
  const isLoading = ref(false)
  const imageUrl = ref()
  const preferedOption = ref('option')

  return {
    imageUrl,
    isLoading,
    preferedOption
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGenerateStore, import.meta.hot))
}

export function useGenerate () {
  const store = useGenerateStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
