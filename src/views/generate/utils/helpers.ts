import { form } from '../utils/form.config'
import { supabase } from '@/supabase'
import { v4 as uuidv4 } from 'uuid'

const { user } = useGeneral()

export const generatePrompt = () => {
  return `
Create a strictly regulated promotional banner for the ${form.value.niche} industry. The banner is for a company named "${form.value.companyName}", and the logo must be placed at the top of the image. The image must explicitly depict ${form.value.imageContent} exactly as described, without any omissions, alterations, or creative interpretations.

The primary colors must be ${form.value.colors}, and no additional shades or variations are allowed. The call-to-action text must be included exactly as written: "${form.value.ctaText}", positioned at the bottom center without modification. No other text, symbols, or elements should be added to the image. The design must strictly adhere to the ${form.value.designStyle} style, ensuring no stylistic deviations.

The image must be precisely 1920x1080 pixels—no resizing, cropping, or aspect ratio changes are permitted. All text and symbols must be rendered with absolute clarity and legibility, ensuring perfect readability without distortions, blurring, or misalignment.

You must not alter, add, remove, or interpret any elements differently from what is explicitly provided by me. Any deviation from the specified instructions is strictly prohibited. The design must be perfectly balanced and optimized for online advertising, ensuring professional visual quality. The inclusion of the call-to-action text is mandatory and cannot be omitted under any circumstances.

Be aware All textes and icons that a wrote is required, Don't write tyour own text, only text that i wrote `
}

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
