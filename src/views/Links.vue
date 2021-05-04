<template>
    <main v-if="usefulLinks" class="links--category-list">
        <div class="links--category-title">
            <button class="btn-back" @click="$router.go(-1)" />
            <h1 class="links--category">
                {{ usefulLinksOptionsCategories[$route.params.category] }}
            </h1>
        </div>
        <article v-for="article in usefulLinks" :key="article.id" class="link" @click="linkClickHandle(article.link)">
            <img :src="article.image" :alt="article.title">
            <div class="link--title">
                <p class="link--title-name">
                    {{ article.title }}
                </p>
                <p class="link--title-followers">
                    {{ article.sub_title }}
                </p>
            </div>
            <p class="link--desc">
                {{ article.description }}
            </p>
        </article>
    </main>
</template>

<script>
export default {
  name: 'Links',
  computed: {
    usefulLinksOptionsCategories() {
      return this.$store.getters.usefulLinksOptions.categories;
    },
    usefulLinks() {
      return this.$store.getters.usefulLinks;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
  watch: {
    windowWidth(width) {
      if (width > 420) {
        this.$router.push('/links');
      }
    },
  },
  mounted() {
    this.$store.dispatch('getLinksOptionsFromDB');
    this.$store.dispatch(
      'getLinksFromDB',
      `?category=${this.$store.state.links.currentLinksCategory}`,
    );
  },
  methods: {
    linkClickHandle(link) {
      window.location.href = link;
    },
  },
};
</script>

<style lang="scss">
.links--category-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // white-space: nowrap;
}
.links--category {
    font-size: 18px;
    margin: 40px 0;
}
.links--category-title {
    width: 90%;
    display: flex;
    align-items: center;
}
.link--title {
    display: flex;
    flex-wrap: wrap;
    &-name {
        width: 100%;
        margin-bottom: 16px;
    }
}
.link--desc {
    display: inline-block;
    margin-top: 16px;
}
.link {
    width: 90%;
}
</style>
