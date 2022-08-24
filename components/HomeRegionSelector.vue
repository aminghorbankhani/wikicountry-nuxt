<!-- eslint-disable max-len -->
<template>
  <div class="dropdown open">
    <button
        @click="toggleDropdown"
        class="btn py-3 px-4 al-element al-text shadow-sm dropdown-toggle border-0 w-200p d-flex justify-content-between align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
    >
      <span v-if="!filter">Filter by region</span>
      <span v-else>{{ filter }}</span>
      <font-awesome-icon icon="fa-solid fa-chevron-down" class="small ms-4" />
    </button>
    <ul ref="dropdownMenu" class="dropdown-menu w-200p border-0 shadow-sm al-element mt-2">
      <li v-for="region in regions" :key="region">
        <button
            @click="toggleRegionFilter(region)"
            class="dropdown-item al-text d-flex justify-content-between align-items-center py-2"
        >
          <span>{{ region }}</span>
          <font-awesome-icon v-if="region === filter" icon="fa-solid fa-check" class="small" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const filter = ref('');
const regions = ref(
  [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ],
);
const dropdownMenu = ref<HTMLElement>();
const dropdownVisibility = ref(false);
const router = useRouter();

watchEffect(() => {
  filter.value = route.query.region?.toString() || '';
});

const toggleDropdown = () => {
  if (dropdownVisibility.value) {
    dropdownVisibility.value = false;
    dropdownMenu.value?.classList.remove('show');
  } else {
    dropdownVisibility.value = true;
    dropdownMenu.value?.classList.add('show');
  }
};

const toggleRegionFilter = (region: string) => {
  if (region === filter.value) {
    filter.value = '';
    router.push('/');
  } else {
    filter.value = region;
    router.push({ query: { region: filter.value } });
  }
  toggleDropdown();
};
</script>
