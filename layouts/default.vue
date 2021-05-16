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
    const options = await this.getStudiosOptions()
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
    query: {
      async handler(newQuery) {
        const studios = await this.getStudiosByQuery(newQuery)
        this.$store.commit('studios/updateCurrentStudios', studios.results)
      },
      deep: true,
    },
    cityCurrent: {
      async handler(newCity) {
        const cityStudios = await this.getStudiosByQuery({
          city: newCity,
        })
        this.$store.commit('studios/updateCityStudiosLength', cityStudios.count)
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit(
      'cities/updateCitiesCurrentById',
      this.$route.params.city
    )
  },
  methods: {
    getStudiosByQuery,
    getStudiosOptions,
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
