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
    <div class="heading">
      <small>URBN Hackathon</small>
      <h1>SEO Translations</h1>
    </div>

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
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Playfair+Display:900');

* {
  box-sizing: border-box;
}

:root {
  --bg-outline: #000000;
  --bg-primary: #EFEFCC;
  --bg-secondary: #CCCC66;
  --bg-tertiary: #FFFFFF;
  --font-body: 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;
  --font-heading: 'Playfair Display', 'Georgia', serif;
  --font-size-body: 1em;
  --font-size-title: 2em;
  --font-size-heading: 1.5em;
  --spacer-primary: 2em;
  --spacer-secondary: 0.5em;
}

html {
  background: #000;
  background-image: linear-gradient(
    var(--bg-primary),
    var(--bg-primary),
    var(--bg-primary),
    var(--bg-secondary)
  );
  height: 100%;
  font-size: 20px;
}

body {
  padding: var(--spacer-primary);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
}

.app {
  background: var(--bg-tertiary);
  padding: var(--spacer-primary);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: -2px 19px 39px -5px rgba(0, 0, 0, 0.52);
  -webkit-box-shadow: -2px 19px 39px -5px rgba(0, 0, 0, 0.52);
}

.heading {
  border-bottom: 2px dotted var(--bg-outline);
  text-align: center;
}

.heading small {
  letter-spacing: 0.5em;
  text-transform: uppercase;
}

.heading h1 {
  font-family: var(--font-heading);
  font-size: var(--font-size-title);
  line-height: 1em;
  margin-top: 0.25em;
  font-size: 3em;
  background: linear-gradient(#666, #666, #000);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

label {
  font-family: var(--font-heading);
  font-size: var(--font-size-heading);
  display: block;
  margin: var(--spacer-secondary) 0;
  width: 100%;
}

button,
input,
select,
textarea {
  display: block;
  margin: var(--spacer-secondary) 0;
  width: 100%;
  border: 1px solid var(--bg-outline);
  min-height: 3em;
}

input,
textarea {
  padding: var(--spacer-secondary) var(--spacer-secondary);
}

textarea {
  display: block;
  margin: var(--spacer-secondary) 0;
  padding: var(--spacer-secondary) var(--spacer-secondary);
  width: 100%;
  min-height: 6em;
}

.buttons {
  display: flex;
  column-gap: 1em;
  margin-top: var(--spacer-secondary);
}

.translation {
  border-top: 2px dotted var(--bg-outline);
  margin-top: var(--spacer-primary);
}

.text-translated {
  margin-bottom: var(--spacer-secondary);
}
</style>
