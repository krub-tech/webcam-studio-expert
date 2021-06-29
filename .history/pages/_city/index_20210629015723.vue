<template>
  <div class="studios">
    <main class="studios--content">
      <Card v-for="studio in studios" :key="studio.id" :data="studio" />
    </main>
    <Pagination :length="$store.state.studios.allWithParamsLength" />
  </div>
</template>

<script>
export default {
  name: 'StudiosByCity',
  async asyncData({ $api, route, store }) {
    const idx = store.state.cities.uniques.findIndex(
      (el) => el.id === route.params.city
    )
    const cityName = store.state.cities.uniques[idx].name
    store.commit('cities/updateCurrentById', route.params.city)
    if (idx !== -1) {
      store.dispatch('cities/updateCurrent', route.params.city)
    } else {
      store.dispatch('cities/updateCurrent', 'sankt-peterburg')
      router.push('/sankt-peterburg')
      alert(`${route.params.city} нет в базе городов`)
    }

    const studios = await $api.studios.getByQuery(store.getters['studios/query'])
    store.commit('studios/updateCurrentStudios', studios.results)

    store.commit('setTitle', `Вебкам студии г. ${cityName}`)
    return { cityName }
  },
  data() {
    return {
      studiosByCityLength: 0,
      cityName: null,
    }
  },
  head() {
    return {
      title: `Вебкам студии ${this.cityName}`,
      meta: [
        {
          description:
            'Подбери себе вебкам студию для заработка по любым параметрам, используя удобные фильтры и подробную информацию.',
        },
      ],
    }
  },
  computed: {
    studios() {
      return this.$store.state.studios.currents
    },
    currentCity() {
      return this.$store.state.cities.current?.name
    },
  },
  created() {
    this.$store.commit('setTitle', `Вебкам студии г. ${this.cityName}`)
  },
}
</script>

<style lang="scss">
.studios {
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  .card {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 420px) {
  .studios {
    padding: 0;
    &--content {
      display: grid;
      grid-template-columns: repeat(2, 300px);
      grid-column-gap: 30px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .studios {
    &--content {
      grid-template-columns: repeat(3, 295px);
      grid-column-gap: 20px;
    }
  }
}
</style>
