<template>
  <div class="py-5">
    <Head>
      <Title>{{ country ? country.current.name : 'Country' }}</Title>
    </Head>
    <div class="container">
      <div class="mb-5">
        <button @click="router.back()" class="btn al-element al-text px-3 shadow-sm border-0">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          <span class="ms-2">Back</span>
        </button>
      </div>
      <the-loading v-if="pending" />
      <div v-else class="row">
        <div class="col-md-5">
          <the-lazy-image
            img-class="w-100 flag"
            :alt="country.current.name"
            :src="country.current.flag"
          />
        </div>
        <div class="col-md-6 offset-md-1">
          <h3 class="my-4 fw-bold al-text">{{ country.current.name }}</h3>
          <div class="row">
            <div class="col-md-6 mb-4">
              <the-label title="Native Name:" :text="country.current.nativeName" />
              <the-label title="Population:" :text="country.current.population.toLocaleString()" />
              <the-label title="Region:" :text="country.current.region" />
              <the-label title="Sub Region:" :text="country.current.subregion" />
              <the-label title="Capital:" :text="country.current.capital" />
            </div>
            <div class="col-md-6 mb-4">
              <the-label
                title="Top Level Domain:"
                :text="country.current.topLevelDomain?.join(', ')"
              />
              <the-label
                title="Currencies:"
                :text="country.current.currencies.map(item => item.name).join(', ')"
              />
              <the-label
                title="Languages:"
                :text="country.current.languages.map(item => item.name).join(', ')"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex flex-column flex-md-row align-items-baseline">
              <strong class="me-3 fw-semi-bold flex-shrink-0 al-text">Border Countries:</strong>
              <div class="d-flex flex-row flex-wrap">
                <nuxt-link
                  v-for="borderCountry in country.borders"
                  :key="borderCountry.name"
                  :to="`/country/${borderCountry.alpha3Code}`"
                  class="btn btn-sm shadow-sm px-3 mt-2 me-2 al-element al-text border-0"
                >
                  {{ borderCountry.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Country from '~~/types/Country';

const router = useRouter();
const route = useRoute();

const { pending, data: country } = useLazyAsyncData(`country-${route.params.code}`, async () => {
  let borderCountries;
  const currentCountry = await $fetch<Country>(`https://restcountries.com/v2/alpha/${route.params.code}`);
  if (currentCountry.borders?.length) {
    borderCountries = await $fetch<Country[]>(`https://restcountries.com/v2/alpha?codes=${currentCountry.borders.join(',')}`);
  }

  return {
    current: currentCountry,
    borders: borderCountries,
  };
});
</script>
