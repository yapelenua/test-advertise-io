import { form } from '../utils/form.config'
import { supabase } from '@/supabase'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const { user } = useGeneral()
const { isLoading, imageUrl, preferedOption, userPrompt } = useGenerate()


export const generatePrompt = () => {
  return `
 Create a promotional banner for the ${form.value.niche} industry.
  The banner is for a company named '${form.value.companyName}', 
  and the logo should be placed in a top of picture.
  The image should depict ${form.value.imageContent}.
  Include ${form.value.colors} as the primary colors.
  Add a call-to-action text that says, '${form.value.ctaText}' 
  positioned at the bottom center.
  The banner should have a ${form.value.designStyle} style. 
  Ensure the overall design is visually balanced and optimized for use in online advertisements.
  Be aware, call to action text is required `
}

const imageWidth = computed(() => form.value.imageSize.split('x')[0])
const imageHeight = computed(() => form.value.imageSize.split('x')[1])

export const base64ToFile = (base64Url: string, filename: string): File => {
  const arr = base64Url.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export async function uploadImage (url: string) {
  const imageId = uuidv4()
  const fileName = `${user.value.id}/${imageId}.png`

  const file = base64ToFile(url, fileName)

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error.message)
    return
  }

  const { error: urlError } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)

  if (urlError) {
    console.error('Error getting public URL:', urlError.message)
    return
  }

  console.log('Image uploaded successfully', data)
}

export async function generateImage () {
  isLoading.value = true
  const prompt = preferedOption.value === 'option' ? generatePrompt() : userPrompt.value

  console.log(imageWidth.value, imageHeight.value)

  try {
    const response = await axios.post('https://advertise-io-be.onrender.com/image', {
      prompt,
      width: Number(imageWidth.value),
      height: Number(imageHeight.value)
    })

    imageUrl.value = response.data.image
  } catch (error) {
    console.error('Error fetching response:', error.response?.data || error.message)
    throw error
  } finally {
    isLoading.value = false
  }
}