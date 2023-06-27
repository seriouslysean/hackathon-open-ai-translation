<script setup>
const url = ref('');
const keywords = ref('');
const translation = ref('');
</script>


<template>
    <section class="text-generate container">
        <h2 class="text-generate__heading">Generate Text</h2>
        <form>
            <label for="generate-url">URL Title Generator</label>
            <textarea ref="generate-url" type="text" name="generate-url" v-model="url"></textarea>

            <label for="generate-keywords">Keywords</label>
            <textarea ref="generate-keywords" type="text" name="generate-keywords" v-model="keywords"></textarea>

            <div class="buttons">
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>

        <div class="text-generate__translation" v-if="translation">
            <label for="generate-text-translated">Translation</label>
            <textarea
            name="generate-text-translated"
            class="text-generate__translation-text"
            readonly>{{ translation }}</textarea>
            <div class="buttons">
                <button>Copy Title</button>
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
