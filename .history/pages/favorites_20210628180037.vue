<template>
  <div class="favorites-wrapper">
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
.favorites-wrapper {
  padding: 20px 30px 0;
  background-color: var(--color-second);
  .studio--sidebar {
    margin: 0;
  }
  .error {
    display: grid;
    place-items: center;
  }
}
@media screen and (min-width: 420px) {
  .favorites-wrapper {
    display: grid;
    grid-template-columns: 300px 640px;
    grid-template-areas: 'studios-list studio';
    grid-column-gap: var(--fr-2);
    padding: var(--fr-2);
  }
}
@media screen and (min-width: 1280px) {
  .favorites-wrapper {
    justify-content: center;
  }
}
</style>
