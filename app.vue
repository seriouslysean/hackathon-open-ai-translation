<script setup>
// import styles from './global.css?inline'
// import custom from './custom.css?inline'

const languages = ref([
  { name: 'Choose Locale', locale: '' },
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

function onCopy() {
  if (location.protocol !== 'https:') {
    alert('Copy will only work over https');
    return;
  }
  navigator.clipboard.writeText(translation.value);
}

onMounted(() => {
  textEl.value.focus();
});
</script>


<template>
  <div class="app">
    <h1>URBN Hackathon SEO Translations</h1>

    <form @submit.prevent="onSubmit">
      <div class="row">
        <label for="text">Text (in English)</label>
        <input ref="textEl" type="text" name="text" v-model="text" />
      </div>

      <div class="row">
        <label for="locale">Translate To</label>
        <select name="locale" v-model="locale">
          <option v-for="language in languages" :key="language.locale" :value="language.locale" :selected="locale">
            {{ language.name }}
          </option>
        </select>
      </div>

      <div class="row">
        <button style="margin-right: 20px" type="submit">Submit</button>
        <button class="resetbutton" type="reset">Reset</button>
      </div>
    </form>

    <hr>

    <textarea readonly>{{ translation }}</textarea>
    <button @click="onCopy">Copy</button>
  </div>
</template>

<style>
label {
  display: block;
}
</style>
