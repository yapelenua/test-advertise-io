import { defineStore } from 'pinia'
import { form, formConfig } from '../../utils/form.config'

export const useGenerateStore = defineStore('generateStore', () => {
  const isLoading = ref(false)
  const imageUrl = ref()
  const preferedOption = ref('option')
  const images = ref()
  const userPrompt = ref('')


  const suggestedPrompt = () => {
    if (preferedOption.value === 'option') {
      form.value.niche = 'Healthcare',
      form.value.companyName = 'MediCare Hospital',
      form.value.imageContent = 'a team of doctors and nurses collaborating in a modern hospital. A doctor explains a diagnosis to a patient using digital medical charts on a screen, while another team member prepares for a procedure. The environment is professional, caring, and technologically advanced.',
      form.value.colors = 'blue, white, light gray',
      form.value.ctaText = 'Providing Compassionate & Advanced Healthcare!',
      form.value.designStyle = 'clean, professional, and reassuring'
    } else if (preferedOption.value === 'manual') {
      userPrompt.value = `Create a strictly regulated promotional banner for the fintech industry. The banner is for a company named "FinSecure", and the logo must be placed at the top of the image. The image must explicitly depict a secure digital transaction process on a mobile device, with a shield icon representing cybersecurity, exactly as described, without any omissions, alterations, or creative interpretations.

The primary colors must be blue and white, and no additional shades or variations are allowed. The call-to-action text must be included exactly as written: "Secure Your Payments Now!", positioned at the bottom center without modification. No other text, symbols, or elements should be added to the image. The design must strictly adhere to the modern and minimalistic style, ensuring no stylistic deviations.

The image must be precisely 1920x1080 pixels—no resizing, cropping, or aspect ratio changes are permitted. All text and symbols must be rendered with absolute clarity and legibility, ensuring perfect readability without distortions, blurring, or misalignment.

You must not alter, add, remove, or interpret any elements differently from what is explicitly provided by me. Any deviation from the specified instructions is strictly prohibited. The design must be perfectly balanced and optimized for online advertising, ensuring professional visual quality. The inclusion of the call-to-action text is mandatory and cannot be omitted under any circumstances.

Be aware: All texts and icons that I wrote are required. Do not write your own text—only the text that I provided.`
    }
  }


  return {
    userPrompt,
    suggestedPrompt,
    images,
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
