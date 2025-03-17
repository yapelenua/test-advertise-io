export const form = ref({
  niche: 'Healthcare',
  companyName: 'MediCare Hospital',
  imageContent: 'a team of doctors and nurses collaborating in a modern hospital. A doctor explains a diagnosis to a patient using digital medical charts on a screen, while another team member prepares for a procedure. The environment is professional, caring, and technologically advanced.',
  colors: 'blue, white, light gray',
  ctaText: 'Providing Compassionate & Advanced Healthcare!',
  designStyle: 'clean, professional, and reassuring'
})

export const formConfig = ref([
  {
    label: 'Enter a niche',
    model: form.value.niche,
    placeholder: 'e.g Healthcare'
  },
  {
    label: 'Enter a company name',
    model: form.value.companyName,
    placeholder: 'e.g IT Company'
  },
  {
    label: 'Enter an image content',
    model: form.value.imageContent,
    placeholder: 'e.g Person with laptop'
  },
  {
    label: 'Enter additional colors',
    model: form.value.colors,
    placeholder: 'e.g blue, green, white'
  },
  {
    label: 'Enter a call-to-action text',
    model: form.value.ctaText,
    placeholder: 'e.g Get Started'
  },
  {
    label: 'Enter a design style',
    model: form.value.designStyle,
    placeholder: 'e.g Minimalistic, Future'
  }
])
