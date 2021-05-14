<template>
  <div class="page-body">
    <Header />
    <Nuxt class="content" />
  </div>
</template>

<script>
import Header from '@/components/Header'

import { getStudiosByCity, getStudiosOptions } from '@/api/studios'
import { getDistrictsByCity, getUniqueCities } from '@/api/cities'

export default {
  name: 'StudiosLayout',
  components: {
    Header,
  },
  async fetch() {
    const citiesUniques = await this.getUniqueCities()
    this.$store.commit('cities/updateUniquesCities', citiesUniques)
    const studios = await this.getStudiosByCity(
      this.toCyrillic(this.$route.params.city)
    )
    this.$store.commit('studios/updateCurrentStudios', studios.results)
    const options = await this.getStudiosOptions()
    this.$store.commit('studios/updateStudiosOptions', options)
  },
  mounted() {},
  methods: {
    getStudiosByCity,
    getStudiosOptions,
    getUniqueCities,
    getDistrictsByCity,
    toCyrillic(translit) {
      return this.$toCyrillic(translit)
    },
  },
}
</script>

<style lang="scss">
.content {
  position: absolute;
  top: 150px;
}
</style>
