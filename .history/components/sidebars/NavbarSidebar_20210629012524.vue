<template>
  <nav class="links-nav">
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
  </nav>
</template>

<script>
export default {
  name: 'NavbarSidebar',
  data: () => ({
    countByCategories: {},
  }),
  async fetch() {
    const response = await this.$api.usefulLinks.getCountByCategory()
    this.countByCategories = response
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
      if (this.$store.getters.isMobile) {
        this.$store.commit('setTitle', this.usefulLinksOptions.categories[category])
        this.$store.commit('sidebarClose')
      }
    },
  },
}
</script>

<style lang="scss">
aside {
  top: 140px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.links-nav {
  ul {
    width: 320px;
    border-radius: 20px;
    overflow: hidden;
    li {
      width: 100%;
      height: 56px;
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: #fefeff;
      border-bottom: 1px solid var(--grey);
      padding-left: var(--fr);
      &.active {
        color: #e95ba8;
        font-weight: 700;
      }
      &::after {
        content: attr(count);
        position: absolute;
        color: #8b8ba3;
        right: 20px;
      }
    }
  }
}
@media screen and (min-width: 420px) {
  aside {
    top: 0;
  }
  .links-nav {
    ul {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      li {
        padding-left: 30px;
      }
    }
  }
}
</style>
