<script setup>
const languages = ref([
  { name: 'Choose Locale', locale: '', selected: true },
  { name: 'English (en-GB)', locale: 'en-GB' },
  { name: 'French (fr-CA)', locale: 'fr-CA' },
  { name: 'German (de-DA)', locale: 'de-DE' },
  { name: 'Italian (it-IT)', locale: 'it-IT' },
  { name: 'Spanish (es-ES)', locale: 'es-ES' },
]);

const textEl = ref(null);
const text = ref('');
const locale = ref('');
const translation = ref('');

async function onSubmit() {
  if (!text.value || !locale.value) {
    alert('Text and locale required');
    return;
  }
  // TODO Convert to composable maybe `useTranslation(text, locale)`
  const { data: translatedText } = await useFetch('/api/translate', {
    method: 'post',
    query: {
      text,
      locale,
    },
  });
  translation.value = translatedText.value;
}

async function onSubmitURL() {
  alert('url submit');
}

function onCopy() {
  if (location.protocol !== 'https:') {
    alert('Copy will only work over https');
    return;
  }
  navigator.clipboard.writeText(translation.value);
}

function onCopyURL() {
  if (location.protocol !== 'https:') {
    alert('Copy will only work over https');
    return;
  }

  alert('copy url not built yet');
  navigator.clipboard.writeText('TODO');
}

onMounted(() => {
  textEl.value.focus();
});
</script>


<template>
  <div class="app">
    <SiteHeader />

    <main class="main container">
      <!-- translate -->
      <section class="translation">
        <form @submit.prevent="onSubmit">
          <label for="text">Text (in English)</label>
          <textarea ref="textEl" type="text" name="text" v-model="text"></textarea>

          <label for="locale">Translate To</label>
          <select name="locale" v-model="locale">
            <option v-for="language in languages" :key="language.locale" :value="language.locale" :selected="language.selected">
              {{ language.name }}
            </option>
          </select>

          <div class="buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </div>
        </form>

        <div class="translation" v-if="translation">
          <label for="text-translated">Translation</label>
          <textarea name="text-translated" class="text-translated" readonly>{{ translation }}</textarea>
          <div class="buttons">
            <button @click="onCopy">Copy</button>
          </div>
        </div>
      </section>

      <hr />

      <!-- translate -->
      <section class="generation">
          <form @submit.prevent="onSubmitURL">
            <label for="url">URL Title Generator</label>
            <textarea ref="url" type="text" name="text" v-model="url"></textarea>

            <label for="keywords">Keywords</label>
            <textarea ref="keywords" type="text" name="text" v-model="keywords"></textarea>

            <div class="buttons">
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>

            <label for="text-translated">URL output</label>
            <textarea name="text-translated" class="text-translated" readonly>{{ translation }}</textarea>
            <div class="buttons">
              <button @click="onCopyURL">Copy Title</button>
            </div>
          </form>
      </section>
    </main>
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/global.scss";

.container {
    max-width: 600px;
    margin: 0 auto;
}

.translation {
  border-top: 2px dotted var(--bg-outline);
  margin-top: var(--spacer-primary);
}

.text-translated {
  margin-bottom: var(--spacer-secondary);
}
</style>
