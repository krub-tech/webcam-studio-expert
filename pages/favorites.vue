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
  computed: {
    studio() {
      return this.$store.state.studios.favorites[0]
    },
    studios() {
      return this.$store.state.studios.favorites
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
