<template>
  <section class="studio-wrapper">
    <StudioSidebar v-if="!$store.getters.isMobile" :studios="studios" />
    <Studio :studio="studio" />
  </section>
</template>

<script>
export default {
  name: 'StudioById',
  async asyncData(context) {
    const studio = await context.$api.studios.getById(context.route.params.id)
    const studios = await context.$api.studios
      .getByQuery(context.store.getters['studios/query'])
      .then((r) => r.results)
    return { studio, studios }
  },
  data: () => ({
    studio: {},
    studios: [],
  }),
  head() {
    return {
      title: `Вебкам студия ${this.studio.name}`,
      meta: [
        {
          description: this.studio.advantages,
        },
      ],
    }
  },
  // computed: {
  //   studios() {
  //     return this.$store.state.studios.currents
  //   },
  // },
}
</script>
