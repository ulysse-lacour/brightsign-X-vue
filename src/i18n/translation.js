import i18n from '@/i18n'

const Trans = {
  // Get the current locale
  get currentLocale() {
    return i18n.global.locale.value
  },

  // Set the current locale
  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  // Modify route to include current locale
  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params
      }
    }
  },

  // Get the default locale
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  // Guess the default locale based on user preferences
  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale()
    if (userPersistedLocale) {
      return userPersistedLocale
    }
    const userPreferredLocale = Trans.getUserLocale()
    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }
    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }

    return Trans.defaultLocale
  },

  // Check if a locale is supported
  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale)
  },

  // Get the user's preferred locale
  getUserLocale() {
    const locale = window.navigator.language || window.navigator.userLanguage || Trans.defaultLocale
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },

  // Get the persisted locale from local storage
  getPersistedLocale() {
    const persistedLocale = localStorage.getItem('user-locale')
    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  // Get the supported locales from environment variables
  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(',')
  },

  // Switch the language and update locale
  async switchLanguage(newLocale) {
    Trans.currentLocale = newLocale
    document.querySelector('html').setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)
  },

  // Middleware for route to handle locale
  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale
    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale())
    }
    await Trans.switchLanguage(paramLocale)
    return next()
  }
}

export default Trans
