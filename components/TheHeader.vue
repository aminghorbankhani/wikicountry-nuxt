<template>
    <div class="navbar al-element al-text shadow-sm py-3">
    <div class="container d-flex justify-content-between">
        <router-link to="/" class="navbar-brand d-flex align-items-center al-text">
            <strong>Where in the world?</strong>
        </router-link>
        <button class="btn al-text" @click="toggleMode">
            <font-awesome-icon icon="fa-regular fa-moon" class="small" />
            <span class="ms-1">Dark Mode</span>
        </button>
    </div>
    </div>
</template>

<script setup lang="ts">
const darkMode = useDarkMode();

const darken = () => {
  document.querySelector('body')?.classList.add('dark-mode');
  darkMode.value = true;
  window.localStorage.setItem('darkMode', 'yes');
};

const lighten = () => {
  document.querySelector('body')?.classList.remove('dark-mode');
  darkMode.value = false;
  window.localStorage.removeItem('darkMode');
};

onBeforeMount(() => {
  if (window.localStorage.getItem('darkMode')) {
    darken();
  }
});

const toggleMode = () => {
  if (darkMode.value || document.querySelector('body')?.classList.contains('dark-mode')) {
    lighten();
  } else {
    darken();
  }
};

</script>
