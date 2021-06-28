<template>
  <aside ref="linksNav" class="links--nav">
    <ul v-if="options">
      <li
        v-for="el in categories"
        :key="el.category"
        :count="el.count"
        :class="{ active: isCurrent(el.category) }"
        @click="linkCategoryClickHandle(el.category)"
      >
        {{ options.categories[el.category] }}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'LinksSidebar',
  props: {
    options: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentCategory() {
      return this.$route.params.category
    },
    usefulLinksOptions() {
      return this.$store.state.links?.options
    },
  },
  methods: {
    isCurrent(category) {
      return this.currentCategory === category
    },
    linkCategoryClickHandle(category) {
      this.$router.push({ name: 'links-category', params: { category } })
    },
  },
}
</script>

<style></style>
