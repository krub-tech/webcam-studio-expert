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
