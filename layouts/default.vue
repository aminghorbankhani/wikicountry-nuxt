<template>
    <div class="wrapper" :class="{'dark-mode': darkMode}">
      <the-header />
      <slot />
    </div>
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../assets/styles/app.css';

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - WikiCountry (Nuxt3)` : 'WikiCountry (Nuxt3)'),
});

const darkMode = useDarkMode();

</script>
