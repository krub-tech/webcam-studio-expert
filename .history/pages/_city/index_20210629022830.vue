<template>
  <div class="studios">
    <div class="page-title">
      <h1>Вебкам студии г. {{ currentCity }}</h1>
      <button
        :class="{ dirty: isFilterDirt }"
        class="filter-btn"
        @click="$store.dispatch('sidebarToggle')"
      >
        Фильтр
      </button>
      <div class="studios--count">
        <span class="studios--count-current">
          {{ $store.state.studios.allWithParamsLength }}
        </span>
        /{{ $store.state.studios.allByCityLength }}
      </div>
      <div class="form-module">
        <Select
          class="form-module"
          :options="sortingTypes"
          :value="ordering"
          @selectedOption="sortingSelect"
        />
      </div>
    </div>
    <main class="studios--content">
      <Card v-for="studio in studios" :key="studio.id" :data="studio" />
    </main>
    <Pagination :length="$store.state.studios.allWithParamsLength" />
  </div>
</template>

<script>
import Select from '@/components/form/Select'

export default {
  name: 'StudiosByCity',
  components: {
    Select,
  },
  async asyncData({ $api, route, store }) {
    const idx = store.state.cities.uniques.findIndex(
      (el) => el.id === route.params.city
    )
    const cityName = store.state.cities.uniques[idx].name
    store.commit('cities/updateCurrentById', route.params.city)

    const studios = await $api.studios.getByQuery(store.getters['studios/query'])
    store.commit('studios/updateCurrentStudios', studios.results)

    store.commit('setTitle', `Вебкам студии г. ${cityName}`)
    return { cityName }
  },
  data() {
    return {
      studiosByCityLength: 0,
      cityName: null,
      sortingTypes: ['По умолчанию', 'По названию', 'По процентам'],
      ordering: 'Сортировка',
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
    isFilterDirt() {
      return this.$store.state.filter.query
    },
  },
  created() {
    this.$store.commit('setTitle', `Вебкам студии г. ${this.cityName}`)
  },
  methods: {
    sortingSelect(data) {
      let ordering
      switch (data) {
        case 'По умолчанию':
          ordering = null
          break
        case 'По названию':
          ordering = 'name'
          break
        case 'По процентам':
          ordering = 'min_payout_percentage'
          break
        default:
          break
      }

      this.ordering = data
      this.$store.commit('studios/updateOrdering', ordering)
      this.$store.dispatch('studios/updateCurrents')
    },
  },
}
</script>

<style lang="scss">
.page-title {
  height: 140px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  justify-content: center;
  h1 {
    width: 100%;
    font-size: 18px;
    text-align: center;
  }
  .filter-btn {
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #e5e5ef;
    padding: 12px;
    border-radius: 8px;
    padding-left: 50px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 16px;
      width: 20px;
      height: 16px;
      background-image: url('~@/assets/svg/i-filter.svg');
      background-position: 0;
      background-size: contain;
      background-repeat: no-repeat;
    }
    &.dirty {
      &::after {
        content: '';
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        background-image: url('~@/assets/svg/i-point.svg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
      }
    }
  }
  .studios--count {
    margin: 0 auto;
    &-current {
      color: #e95ba8;
      font-weight: 700;
    }
    position: relative;
  }
  .form-module {
    margin: 0;
    .select {
      position: relative;
      .options {
        position: absolute;
        width: 180px;
        left: -50px;
      }
      .arrow {
        display: none;
      }
    }
  }
}

.studios {
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  .card {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 420px) {
  .page-title {
    position: relative;
    left: -320px;
    width: 945px;
    padding: 0;
    padding-left: 30px;
    justify-content: space-between;
    h1 {
      width: max-content;
      font-size: 22px;
    }
    .filter-btn,
    .studios--count {
      display: none;
    }
  }
  aside {
    top: 140px;
  }
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
