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
      userPrompt.value = `Create a strictly regulated promotional banner for the affiliate marketing industry. The banner is for a company named "Arbitrage Pro", and the logo must be placed at the top of the image. The image must explicitly depict a confident marketer analyzing campaign performance on multiple screens with financial graphs and conversion rates, exactly as described, without any omissions, alterations, or creative interpretations.

The primary colors must be blue, black, and white, and no additional shades or variations are allowed. The call-to-action text must be included exactly as written: "Maximize Your ROI Now!", positioned at the bottom center without modification. The design must strictly adhere to the modern and professional style, ensuring no stylistic deviations.

The image must be precisely 1080x1080 pixels—no resizing, cropping, or aspect ratio changes are permitted. All text and symbols must be rendered with absolute clarity and legibility, ensuring perfect readability without distortions, blurring, or misalignment.

You must not alter, add, remove, or interpret any elements differently from what is explicitly provided by me. Any deviation from the specified instructions is strictly prohibited. The design must be perfectly balanced and optimized for online advertising, ensuring professional visual quality. The inclusion of the call-to-action text is mandatory and cannot be omitted under any circumstances.

Be aware All textes and icons that a wrote is required,Dont write tyour own text, only text that i wrote`
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
