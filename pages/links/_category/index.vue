<template>
  <section class="links">
    <template v-if="$store.getters.isMobile">
      <button class="btn-back" @click="$router.push({ name: 'links' })" />
      <h1>{{ usefulLinksOptions.categories[currentCategory] }}</h1>
    </template>
    <template v-else>
      <h1>Полезные ссылки для вебкам-моделей</h1>
      <LinksSidebar :options="usefulLinksOptions" :categories="countByCategories" />
    </template>

    <main v-if="links" class="links--list">
      <article
        v-for="link in links"
        :key="link.id"
        class="link"
        @click="linkClickHandle(link.link)"
      >
        <img :src="link.image" :alt="link.title" />
        <div class="link--title">
          <p class="link--title-name">
            {{ link.title }}
          </p>
          <p class="link--title-followers">
            {{ link.sub_title }}
          </p>
        </div>
        <p class="link--desc">
          {{ link.description }}
        </p>
      </article>
    </main>
  </section>
</template>

<script>
export default {
  name: 'Links',

  async asyncData({ $api, route }) {
    const [links, countByCategories] = await Promise.all([
      $api.usefulLinks.getByCategory({ category: route.params.category }),
      $api.usefulLinks.getCountByCategory(),
    ])
    return { links, countByCategories }
  },
  data: () => ({
    links: [],
    countByCategories: {},
  }),

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

<style lang="scss">
.links {
  // min-height: 100vh;
  .btn-back {
    position: absolute;
    left: 15px;
    top: 20px;
  }
  h1 {
    font-size: 20px;
    padding: 30px 80px;
    text-align: center;
  }
}

.links--list {
  padding: 0 15px;
}
.link--title {
  flex-wrap: wrap;
  &-name {
    margin-bottom: 16px;
  }
  &-followers {
    margin-bottom: 38px;
  }
}

.link {
  min-height: 120px;
  background-color: #fefeff;
  box-shadow: 0px 0px 30px rgba(91, 91, 131, 0.02);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;

  img {
    display: block;
    width: 80px;
    height: 80px;
    object-fit: cover;
    float: left;
    margin-right: 20px;
  }
}

.link--title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  &-name {
    color: #4b74dc;
    font-weight: bold;
    font-size: 18px;
  }

  &-followers {
    color: #606074;
  }
}

.link--desc {
  line-height: 20px;
}

@media screen and (min-width: 420px) {
  .links {
    display: grid;
    grid-template-areas: 'title title' 'aside links';
    grid-template-rows: min-content max-content;
    grid-template-columns: 320px max-content;

    h1 {
      grid-area: title;
      white-space: nowrap;
      font-size: 22px;
      text-align: left;
      padding: 60px 40px;
    }
  }

  .links--list {
    display: block;
    grid-area: links;
    padding-left: 40px;

    .link {
      width: 640px;
    }

    .link--title {
      &-name {
        width: max-content;
      }
    }

    .link--desc {
      display: block;
      margin-top: 0;
    }
  }
  .link--title {
    flex-wrap: nowrap;
    &-name,
    &-followers {
      margin-bottom: 0;
    }
  }
}

@media screen and (min-width: 1280px) {
  .links {
    justify-content: center;
  }
}
</style>
