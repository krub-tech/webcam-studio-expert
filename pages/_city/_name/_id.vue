<template>
  <section class="studio-wrapper">
    <StudioSidebar :studios="studios" />
    <Studio :studio="studio" />
  </section>
</template>

<script>
export default {
  name: 'StudioById',
  async asyncData(context) {
    const studio = await context.$api.studios.getById(context.route.params.id)
    return { studio }
  },
  data: () => ({
    studio: {},
  }),
  computed: {
    studios() {
      return this.$store.state.studios.currents
    },
  },
}
</script>
