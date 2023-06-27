<script setup>
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook('page:start', () => {
  loading.value = true;
});
nuxtApp.hook('page:finish', () => {
  loading.value = false;
});
</script>

<template>
  <div class="app">
    <SiteHeader />

    <main class="main">
      <TextTranslate class="main__column main__column--translate" />
      <TextGenerate class="main__column main__column--generate" />
    </main>

    <SiteLoader v-if="loading" />
  </div>
</template>

<style lang="scss">
@use '~/assets/scss/global.scss';

.main {
  display: grid;
  grid-template-areas:
    'translate generate';

  &__column--translate {
    grid-area: translate;
  }

  &__column--generate {
    grid-area: generate;
  }
}
</style>
