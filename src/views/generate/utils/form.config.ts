export const form = ref({
  niche: '',
  companyName: '',
  imageContent: '',
  colors: '',
  ctaText: '',
  designStyle: ''
})

export const formConfig = ref([
  {
    label: 'Enter a niche',
    model: 'niche',
    placeholder: 'e.g Healthcare'
  },
  {
    label: 'Enter a company name',
    model: 'companyName',
    placeholder: 'e.g IT Company'
  },
  {
    label: 'Enter an image content',
    model: 'imageContent',
    placeholder: 'e.g Person with laptop'
  },
  {
    label: 'Enter additional colors',
    model: 'colors',
    placeholder: 'e.g blue, green, white'
  },
  {
    label: 'Enter a call-to-action text',
    model: 'ctaText',
    placeholder: 'e.g Get Started'
  },
  {
    label: 'Enter a design style',
    model: 'designStyle',
    placeholder: 'e.g Minimalistic, Future'
  }
])
