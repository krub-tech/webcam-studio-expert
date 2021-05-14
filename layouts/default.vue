<template>
  <div class="page-body">
    <Header />
    <Nuxt class="content" />
  </div>
</template>

<script>
import Header from '@/components/Header'

import {
  getStudiosByCity,
  getStudiosByQuery,
  getStudiosOptions,
} from '@/api/studios'
import { getDistrictsByCity, getUniqueCities } from '@/api/cities'

export default {
  name: 'StudiosLayout',
  components: {
    Header,
  },
  beforeRouteEnter(to, from, next) {
    console.log('routeUpdate')
    this.$store.commit(
      'cities/updateCitiesCurrent',
      this.$toCyrillic(this.$route.params.city)
    )
    next()
  },
  async fetch() {
    const citiesUniques = await this.getUniqueCities()
    this.$store.commit('cities/updateCitiesUniques', citiesUniques)

    const studios = await this.getStudiosByQuery(this.query)
    this.$store.commit('studios/updateCurrentStudios', studios.results)
    const options = await this.getStudiosOptions()
    this.$store.commit('studios/updateStudiosOptions', options)
  },
  computed: {
    query() {
      return this.$store.getters['studios/query']
    },
  },
  watch: {
    query: {
      async handler(newQuery) {
        console.log('query change', newQuery)
        const studios = await this.getStudiosByQuery(newQuery)
        this.$store.commit('studios/updateCurrentStudios', studios.results)
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    getStudiosByCity,
    getStudiosByQuery,
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
