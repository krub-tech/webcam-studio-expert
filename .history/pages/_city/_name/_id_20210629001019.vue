<template>
  <Studio :studio="studio" />
</template>

<script>
export default {
  name: 'StudioById',
  async asyncData(context) {
    context.store.commit('setTitle', null)
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
  beforeMount() {
    const el = document.querySelector('.page-body .center')
    el.classList.add('padding')
  },
  beforeDestroy() {
    const el = document.querySelector('.page-body .center')
    el.classList.remove('padding')
  },
}
</script>

<style lang="scss">
.padding {
  padding: 15px;
}
</style>
