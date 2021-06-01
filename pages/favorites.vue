<template>
  <div class="studio-wrapper">
    <StudioSidebar :studios="studios" />
    <Studio v-if="!$store.getters.isMobile" :studio="studio" />
    <div v-if="!studio" class="error">
      <h1>В избранном пока нет ни одной студии</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  data() {
    return {
      studio: {},
      studios: [],
    }
  },
  mounted() {
    this.getFavorites()
  },
  methods: {
    getFavorites() {
      if (localStorage.favorites) {
        this.$store.commit('studios/setFavorites', JSON.parse(localStorage.favorites))
        const studios = JSON.parse(localStorage.favorites)
        const [studio] = studios
        this.studio = studio
        this.studios = studios
      }
    },
  },
}
</script>

<style lang="scss">
.studio-wrapper {
  .error {
    display: grid;
    place-items: center;
  }
}
</style>
