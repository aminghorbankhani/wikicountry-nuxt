<template>
  <div class="position-relative">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search-icon" />
    <input
        class="form-control al-element al-text search-input py-3 w-100 border-0 shadow-sm"
        name="search"
        placeholder="Search for a country..."
        v-model="text"
        autocomplete="off"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  parentText: {
    type: String as () => string,
    required: true,
  },
});

const text = ref(props.parentText);
const emit = defineEmits(['update']);

watch(
  () => props.parentText,
  (value: string): void => {
    if (!value) { text.value = ''; }
  },
);

watch(
  text,
  (value: string): void => {
    emit('update', value);
  },
);

</script>
