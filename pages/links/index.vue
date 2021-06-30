<template>
  <LinksSidebar
    class="links--nav-main"
    :options="$store.state.links.options"
    :categories="categories"
  />
</template>

<script>
export default {
  async asyncData({ $api }) {
    const categories = await $api.usefulLinks.getCountByCategory()

    return { categories }
  },
  data() {
    return {
      categories: {},
    }
  },
}
</script>

<style lang="scss">
.links--nav-main {
  margin-top: 30px;
}
</style>
