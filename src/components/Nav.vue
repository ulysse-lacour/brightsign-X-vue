<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink :to="Tr.i18nRoute({ name: 'home' })">{{ $t('nav.home') }}</RouterLink>
        </li>

        <li>
          <RouterLink :to="Tr.i18nRoute({ name: 'other' })">{{ $t('nav.other') }}</RouterLink>
        </li>
      </ul>
    </nav>

    <LanguageSwitcher></LanguageSwitcher>
  </header>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'

export default {
  components: { LanguageSwitcher },
  setup() {
    return { Tr }
  }
}
</script>
