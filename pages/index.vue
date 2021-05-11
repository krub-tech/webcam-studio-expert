<template>
  <div class="container">
    <div>
      <h1 class="title">webcam-expert</h1>
      <div v-for="city in cities" :key="city">
        <NuxtLink
          :to="{
            name: 'city',
            params: { city: toTranslite(city) },
          }"
          ><p>{{ city }}</p></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import { toTranslite } from '@/helpers'
import { getUniqueCities } from '@/api/cities'
export default {
  name: 'Main',
  data() {
    return {
      cities: null,
    }
  },
  async fetch() {
    const response = await this.getUniqueCities()
    this.cities = response
  },
  methods: {
    getUniqueCities,
    toTranslite,
  },
}
</script>

<style></style>
