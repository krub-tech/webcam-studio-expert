<template>
  <div class="page-body">
    <Header />
    <Nuxt class="content" />
  </div>
</template>

<script>
import Header from '@/components/Header'

import { getStudiosByQuery, getStudiosOptions } from '@/api/studios'

export default {
  name: 'StudiosLayout',
  components: {
    Header,
  },
  async fetch() {
    const options = await this.getStudiosOptions(this.$axios)
    this.$store.commit('studios/updateStudiosOptions', options)
  },
  computed: {
    query() {
      return this.$store.getters['studios/query']
    },
    cityCurrent() {
      return this.$store.state.cities.current.id
    },
  },
  watch: {
    cityCurrent: {
      handler(newCity) {
        this.updateCityStudiosLength(newCity)
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit(
      'cities/updateCitiesCurrentById',
      this.$route.params.city
    )
    this.$store.dispatch('studios/updateCurrents')
  },
  methods: {
    getStudiosByQuery,
    getStudiosOptions,
    async updateCityStudiosLength(newCity) {
      const cityStudios = await this.getStudiosByQuery(this.$axios, {
        city: newCity,
      })
      this.$store.commit('studios/updateAllByCityLength', cityStudios.count)
    },
  },
}
</script>

<style lang="scss">
.content {
  position: absolute;
  top: 60px;
}

@media screen and (min-width: 420px) {
  .content {
    top: 150px;
  }
}
</style>
