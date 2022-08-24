<template>
  <div class="mb-1 al-text">
    <strong class="fw-semi-bold">{{ title }}</strong>
    <span class="ms-1">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
});
</script>
