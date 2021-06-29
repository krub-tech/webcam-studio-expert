<template>
  <aside>
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
  name: 'Links',
  props: {
    options: {
      type: Array,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isCurrent(category) {
      return this.$route.params.category === category
    },
  },
}
</script>

<style></style>
