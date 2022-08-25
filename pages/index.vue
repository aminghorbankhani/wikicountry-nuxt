<template>
  <div class="py-5">
    <Head>
      <Title>Home</Title>
    </Head>
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
        <home-search-input
          class="col-md-6 col-lg-4 col-12 mb-4 mb-md-0"
          @update="handleSearch"
          :parent-text="searchedText"
        />
        <home-region-selector />
      </div>
      <the-loading v-if="pending || searchedLoading || regionLoading" />
      <div v-else-if="preparedCountries.length" class="row">
        <home-country-column
            v-for="country in preparedCountries"
            :country="country"
            :key="country.name"
        />
      </div>
      <div v-else class="row">
        <div class="col-12">
          <div class="card al-text al-element border-0 shadow-sm">
            <div class="card-body p-4">
              <h5 class="card-title m-0">No result was found.</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Country from '../types/Country';

const regionLoading = ref(false);
const regionFilteredResult = ref<Country[]>([]);

const searchedLoading = ref(false);
const searchedText = ref('');
const searchedResult = ref<Country[]>([]);
const searchController = ref<AbortController>();

const router = useRouter();
const route = useRoute();

const { data: countries, pending } = await useLazyFetch<Country[]>('https://restcountries.com/v2/all');

const preparedCountries = computed<Country[]|[]>(() => {
  if (route.query.region) { return regionFilteredResult.value; }
  if (searchedText.value) { return searchedResult.value; }
  return countries.value || [];
});

watchEffect(async (): Promise<void> => {
  if (route.query.region) {
    searchedText.value = '';
    regionLoading.value = true;
    regionFilteredResult.value = await $fetch<Country[]>(`https://restcountries.com/v2/region/${route.query.region}`);
    regionLoading.value = false;
  }
});

const search = async (text: string): Promise<void> => {
  searchedLoading.value = true;
  if (searchController.value) {
    searchController.value.abort();
  }
  searchController.value = new AbortController();
  const { signal } = searchController.value;

  try {
    searchedResult.value = await $fetch<Country[]>(
      `https://restcountries.com/v2/name/${text}`,
      { signal },
    );
    searchedLoading.value = false;
  } catch (error: Error) {
    if (error.response?.status === 404) {
      searchedResult.value = [];
      searchedLoading.value = false;
    } else if (error.response) {
      searchedLoading.value = false;
    }
  }
};

const handleSearch = async (value: string): Promise<void> => {
  if (route.query.region && value) {
    router.push('/');
  }
  searchedText.value = value;
  await search(value);
};

</script>
