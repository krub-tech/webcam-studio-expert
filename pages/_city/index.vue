<template>
  <div>
    <h1>{{ city }}</h1>
    <p>Path: {{ $route.path }}</p>
  </div>
</template>

<script>
import { getDistrictsByCity } from '@/api/cities'
export default {
  name: 'StudiosByCity',
  layout: 'studios',
  asyncData({ params }) {
    const city = params.cityName
    return { city }
  },
  data() {
    return {
      disticts: null,
    }
  },
  async fetch() {
    this.disticts = await this.getDistrictsByCity(this.city)
  },
  methods: {
    getDistrictsByCity,
  },
}
</script>

<style></style>
