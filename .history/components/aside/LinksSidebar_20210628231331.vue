<template>
  <aside ref="linksNav" class="links--nav">
    <ul v-if="usefulLinksOptions">
      <li
        v-for="el in countByCategories"
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
    count: {
      type: Number,
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
}
</script>

<style></style>
