<template>
  <section v-if="isVisible" class="secondary-layout">
    <main v-if="links" class="secondary-layout--list">
      <article
        v-for="link in links"
        :key="link.id"
        class="secondary-layout--item"
        @click="linkClickHandle(link.link)"
      >
        <img :src="link.image" :alt="link.title" />
        <div class="secondary-layout--item_title">
          <p class="secondary-layout--item_title-name">
            {{ link.title }}
          </p>
          <p class="secondary-layout--item_title-followers">
            {{ link.sub_title }}
          </p>
        </div>
        <p class="secondary-layout--item_desc">
          {{ link.description }}
        </p>
      </article>
    </main>
  </section>
</template>

<script>
export default {
  name: 'Links',
  async asyncData({ $api, route, store }) {
    const links = await $api.usefulLinks.getByCategory({
      category: route.params.category,
    })
    return { links }
  },
  data: () => ({
    links: [],
  }),
  computed: {
    isVisible() {
      if (this.$store.getters.isMobile) return !this.$store.state.isSidebarOpen
      return true
    },
  },
  beforeDestroy() {
    // this.$store.commit('setTitle', null)
  },
  methods: {
    linkClickHandle(link) {
      window.open(link)
    },
  },
}
</script>

<style lang="scss"></style>
