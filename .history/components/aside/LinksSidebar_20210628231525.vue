<template>
  <aside ref="linksNav" class="links--nav">
    <ul v-if="usefulLinksOptions">
      <li
        v-for="el in cnt"
        :key="el.category"
        :count="el.count"
        :class="{ active: isCurrent(el.category) }"
        @click="linkCategoryClickHandle(el.category)"
      >
        {{ usefulLinksOptions.categories[el.category] }}
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'LinksSidebar',
  props: {
    options: {
      type: Array,
    },
    cnt: {
      type: Number,
      default: 0,
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
