<!-- eslint-disable max-len -->
<template>
  <div class="col-lg-3 col-md-4">
    <nuxt-link
        :to="`/country/${country.alpha3Code}`"
        class="card mb-4 border-0 shadow-sm text-decoration-none text-reset al-element al-text mx-5 mx-md-0"
    >
      <the-lazy-image
          class="card-img-top shadow-sm"
          img-class="flag rounded-top"
          :alt="country.name"
          :src="country.flag"
      />
      <div class="card-body p-4">
        <h5 class="card-title text-truncate fw-bold">{{ country.name }}</h5>
        <div class="my-3 small">
          <the-label title="Population:" :text="country.population.toLocaleString()" />
          <the-label title="Region:" :text="country.region" />
          <the-label title="Capital:" :text="country.capital" />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import Country from '~~/types/Country';

defineProps({
  country: {
    type: Object as () => Country,
    required: true,
  },
});

</script>
