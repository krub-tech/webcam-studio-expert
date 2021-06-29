<template>
  <LinksSidebar :options="$store.state.links.options" :categories="" />
</template>

<script>
export default {
  async asyncData({ $api, route }) {
    const categories = await $api.usefulLinks.getCountByCategory(),

    return { categories }
  },
  data() {
    return {

    }
  },
}
</script>

<style></style>
