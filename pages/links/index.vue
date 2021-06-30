<template>
  <div>
    <h1 class="mobile">
      Полезные ссылки для<br />
      вебкам-моделей
    </h1>
    <LinksSidebar
      class="links--nav-main"
      :options="$store.state.links.options"
      :categories="categories"
    />
  </div>
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
h1.mobile {
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  margin: 28px 20px;
}
.links--nav-main {
  margin-top: 30px;
}
@media screen and (min-width: 420px) {
  h1.mobile {
    text-align: left;
    br {
      display: none;
    }
  }
}
</style>
