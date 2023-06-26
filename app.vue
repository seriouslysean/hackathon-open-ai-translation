<script setup>
const { data } = await useFetch('/api/translate');
</script>

<template>
  <div class="app">
    <h1>OpenAI Translation</h1>
    <p><strong>Input (EN):</strong> Fly free with products that are light on you, and light on your wallet</p>
    <p><strong>Output (FR):</strong> {{ data.text }}</p>

    <!-- <form @submit="onSubmit">
      <label for="from">English</label>
      <input type="text" name="from" />

      <label for="from">English</label>
      <input type="text" name="from" />

      <label for="from">English</label>
      <input type="text" name="from" />
    </form> -->
  </div>
</template>
