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
}
</script>

<style></style>
