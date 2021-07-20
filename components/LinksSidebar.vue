<template>
  <aside class="links--nav">
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
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isCurrent(category) {
      return this.$route.params.category === category
    },
    linkCategoryClickHandle(category) {
      this.$router.push({ name: 'links-category', params: { category } })
    },
    linkClickHandle(link) {
      window.open(link)
    },
  },
}
</script>

<style lang="scss">
.links--nav {
  ul {
    width: 320px;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
  }

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

    &::after {
      content: attr(count);
      position: absolute;
      color: #8b8ba3;
      right: 20px;
    }

    &.active {
      color: #e95ba8;
      font-weight: bold;

      &::after {
        font-weight: normal;
      }
    }
  }
}
@media screen and (min-width: 420px) {
  .links--nav {
    grid-area: aside;

    ul {
      margin: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
@media screen and (min-width: 1280px) {
  .links--nav {
    ul {
      border-radius: 20px;
    }
  }
}
</style>
