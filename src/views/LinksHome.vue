<template>
  <section class="links">
    <h1>Полезные ссылки для вебкам-моделей</h1>
    <aside class="links--nav">
      <ul v-if="usefulLinksOptions">
        <li
          v-for="link in usefulLinksLengthByCategory"
          :key="link.category"
          :count="link.count"
          :class="{ active: isCurrent(link.category) }"
          @click="linkCategoryClickHandle(link.category)"
        >
          {{ usefulLinksOptions[link.category] }}
        </li>
      </ul>
    </aside>
    <main class="links--list" v-if="usefulLinks">
      <article
        class="link"
        v-for="article in usefulLinks"
        :key="article.id"
        @click="linkClickHandle(article.link)"
      >
        <img :src="article.image" :alt="article.title" />
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
  </section>
</template>

<script>
export default {
  name: "LinksHome",
  data() {
    return {};
  },
  computed: {
    currentCategory() {
      return this.$store.state.links.currentLinksCategory;
    },
    usefulLinksOptions() {
      return this.$store.getters.usefulLinksOptions.categories;
    },
    usefulLinks() {
      return this.$store.getters.usefulLinks;
    },
    usefulLinksLengthByCategory() {
      return this.$store.getters.usefulLinksLengthByCategory;
    },
  },
  methods: {
    isCurrent(str) {
      if (this.$store.state.windowWidth < 420) return false;
      else return this.currentCategory == str;
    },
    linkCategoryClickHandle(category) {
      this.$store.commit("loadCurrentLinksCategory", category);
      this.$store.dispatch(
        "getLinksFromDB",
        `api/useful_links/links?category=${category}`
      );
      if (this.$store.state.windowWidth < 420)
        this.$router.push(`/links/${this.currentCategory}`);
    },
    linkClickHandle(link) {
      window.location.href = link;
    },
  },
  mounted() {
    this.$store.dispatch("getLinksOptionsFromDB");
    this.$store.dispatch("getLinksLengthByCategory");
    this.$store.dispatch(
      "getLinksFromDB",
      `api/useful_links/links?category=${this.currentCategory}`
    );
  },
  beforeUpdate() {},
};
</script>

<style lang="scss">
.links {
  min-height: calc(100vh - 448px);
  h1 {
    font-size: 20px;
    padding: 30px 80px;
    text-align: center;
  }
}
.links--list {
  display: none;
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
  .links {
    display: grid;
    grid-template-areas:
      "title title"
      "aside links";
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
  .links--nav {
    grid-area: aside;
    ul {
      margin: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
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
}
@media screen and (min-width: 1360px) {
  .links {
    justify-content: center;
  }
  .links--nav {
    ul {
      border-radius: 20px;
    }
  }
}
</style>
