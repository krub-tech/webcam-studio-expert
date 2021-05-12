<template>
  <div></div>
</template>

<script>
import { toTranslite } from '@/helpers'
import { getUniqueCities } from '@/api/cities'
export default {
  name: 'Main',
  middleware: 'redirect-to-spb',
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
