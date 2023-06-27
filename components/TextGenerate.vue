<script setup>
const url = ref('');
// const keywords = ref('');
const seoTitle = ref('');
const seoDescription = ref('');
const seoCopy = ref('');

async function onSubmit() {
  if (!url.value) {
    alert('URL required');
    return;
  }
  // TODO Convert to composable maybe `useGenerate(url)`
  const { data: response } = await useFetch('/api/generate', {
    method: 'post',
    query: {
      url,
    },
  });
  debugger;
  seoTitle.value = response.value?.title || '';
  seoDescription.value = response.value?.description || '';
  seoCopy.value = response.value?.seoCopy || '';
}
const hasTranslations = computed(() => !!seoTitle.value || !!seoDescription.value || !!seoCopy.value);
</script>


<template>
    <section class="text-generate container">
        <h2 class="text-generate__heading">Generate SEO Content</h2>
        <form @submit.prevent="onSubmit">
            <label for="generate-url">Page URL</label>
            <input ref="generate-url" type="text" name="generate-url" v-model="url" />

            <!-- <label for="generate-keywords">Keywords</label>
            <textarea ref="generate-keywords" type="text" name="generate-keywords" v-model="keywords"></textarea> -->

            <div class="buttons">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>

        <div class="text-generate__translation" v-if="hasTranslations">
            <div class="row">
                <label for="generate-text-translated">SEO Title</label>
                <textarea
                name="generate-text-translated"
                class="text-generate__translation-text"
                readonly
                v-model="seoTitle"></textarea>
                <div class="buttons">
                    <button>Copy SEO Title</button>
                </div>
            </div>
            <div class="row">
                <label for="generate-text-translated">SEO Description</label>
                <textarea
                name="generate-text-translated"
                class="text-generate__translation-text"
                readonly
                v-model="seoDescription"></textarea>
                <div class="buttons">
                    <button>Copy SEO Description</button>
                </div>
            </div>
            <div class="row">
                <label for="generate-text-translated">SEO Copy</label>
                <textarea
                name="generate-text-translated"
                class="text-generate__translation-text"
                readonly
                v-model="seoCopy"></textarea>
                <div class="buttons">
                    <button>Copy SEO Copy</button>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.text-generate {
    &__heading {
      text-align: center;
    }

    &__translation {
        margin-top: var(--spacer-primary);
    }

    &__translation-text {
        margin-bottom: var(--spacer-secondary);
    }
}
</style>
