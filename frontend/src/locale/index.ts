import { createI18n } from 'vue-i18n'

// supported languages
import en from './en'

export const getLocale = () => {
  // Default language is english
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  messages: {
    en,
  },
})

export default i18n
