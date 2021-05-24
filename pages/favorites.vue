<template>
  <div class="studio-wrapper">
    <StudioSidebar :studios="studios" />
    <Studio v-if="!$store.getters.isMobile" :studio="studio" />
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
    if (localStorage.favorites) {
      const studios = JSON.parse(localStorage.favorites)
      const [studio] = studios
      this.studio = studio
      this.studios = studios
    }
  },
}
</script>

<style></style>
