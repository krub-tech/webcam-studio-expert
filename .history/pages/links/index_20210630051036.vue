<template>
  <LinksSidebar :options="$store.state.links.options" :categories="categories" />
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

<style></style>
