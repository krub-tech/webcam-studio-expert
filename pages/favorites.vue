<template>
  <div class="favorites-wrapper">
    <Studio v-if="!$store.getters.isMobile" :studio="studio" />
    <StudioSidebar v-else :studios="studios" />
    <div v-if="!studio" class="error">
      <h1>В избранном пока нет ни одной студии</h1>
    </div>
  </div>
</template>

<script>
import StudioSidebar from '@/components/sidebars/StudioSidebar'

export default {
  name: 'Favorites',
  components: {
    StudioSidebar,
  },
  computed: {
    studio() {
      return this.$store.state.studios.favorites[0]
    },
    studios() {
      return this.$store.state.studios.favorites
    },
  },
  beforeMount() {
    this.$store.commit('setTitle', null)
    const el = document.querySelector('.page-body .center')
    el.classList.add('padding')
  },
  beforeDestroy() {
    const el = document.querySelector('.page-body .center')
    el.classList.remove('padding')
  },
}
</script>

<style lang="scss">
.padding {
  padding: 30px;
}
.favorites-wrapper {
  grid-area: main;
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
  }
}
@media screen and (min-width: 1280px) {
  .favorites-wrapper {
    justify-content: center;
  }
}
</style>
