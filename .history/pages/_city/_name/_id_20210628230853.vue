<template>
  <section class="studio-wrapper">
    <StudioSidebar v-if="!$store.getters.isMobile" :studios="studios" />
    <Studio :studio="studio" />
  </section>
</template>

<script>
import StudioSidebar from '@/components/aside/StudioSidebar'

export default {
  name: 'StudioById',
  components: {
    StudioSidebar,
  },
  async asyncData(context) {
    const studio = await context.$api.studios.getById(context.route.params.id)
    return { studio }
  },
  data: () => ({
    studio: {},
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
  computed: {
    studios() {
      return this.$store.state.studios.currents
    },
  },
}
</script>
