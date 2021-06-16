<template>
  <section class="studios">
    <div v-if="currentCity" class="studios--title">
      <h1>Вебкам студии г. {{ currentCity }}</h1>
      <p>работа и вакансии для веб-моделей</p>
    </div>
    <aside class="filter-wrapper">
      <button class="filter-btn" @click="isOpenFilter = true" />
      <Filt :class="{ isOpenFilter }" @close="isOpenFilter = false" />
    </aside>
    <div class="studios--count" :class="{ dirty: isFilterDirt }">
      <p class="studios--count-current">
        {{ $store.state.studios.allWithParamsLength }}
      </p>
      /{{ $store.state.studios.allByCityLength }}
    </div>
    <div class="sort-wrapper">
      <div class="select-wrapper sort">
        <Select
          :options="sortingTypes"
          :value="ordering"
          @selectedOption="sortingSelect"
        />
      </div>
    </div>
    <div class="studios--results">
      <Cards :studios="studios" :length="$store.state.studios.allWithParamsLength" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'StudiosByCity',
  data() {
    return {
      sortingTypes: ['По умолчанию', 'По названию', 'По процентам'],
      studiosByCityLength: 0,
      ordering: 'Сортировка',
      isOpenFilter: false,

      cityName: null,
    }
  },
  async fetch() {
    const currentCity = this.$route.params.city

    const studios = await this.$api.studios.getByQuery({
      ...this.$store.getters['studios/query'],
      city: currentCity,
    })
    this.$store.commit('studios/updateCurrentStudios', studios.results)
    const idx = this.$store.state.cities.uniques.findIndex(
      (el) => el.id === currentCity
    )
    this.cityName = this.$store.state.cities.uniques[idx].name
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
@mixin item {
  background-color: #fefeff;
  border: 1px solid #c4c4cd;
  border-radius: 0.5rem;
  padding: var(--fr-m) 0.875rem;
}

@media screen and (max-width: 420px) {
  .filter {
    width: 100%;
    max-width: 420px;
    position: absolute;
    top: -1000px;
    left: -420px;
    z-index: 3;
    transition: left 500ms;
    background-color: #fbfbfd;
    animation: close 1000ms;
    @keyframes close {
      0% {
        top: 0;
      }
      50% {
        top: 0;
      }
      100% {
        top: -1000px;
      }
    }
  }
  .isOpenFilter {
    animation: open 500ms;
    left: 0;
    top: 0;
    @keyframes open {
      0% {
        left: -420px;
      }
      100% {
        left: 0;
      }
    }
  }
}

.studios {
  white-space: nowrap;
  display: grid;
  grid-template-areas:
    'title title title'
    'filter count sort'
    'cont cont cont';
  grid-template-columns: repeat(3, minmax(100px, 31%));
  justify-content: center;
  position: relative;
  &--title {
    grid-area: title;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 18px;
    }
    p {
      line-height: 1.4;
    }
  }
  .filter-wrapper,
  .sort-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-bottom: var(--fr-l);
  }
  .filter-wrapper {
    grid-area: filter;
    height: min-content;
  }
  .pageCounter-wrapper {
    grid-area: counter;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 1rem;
    i {
      font-style: normal;
      font-weight: bold;
      color: var(--pink);
    }
  }
  .sort-wrapper {
    grid-area: sort;
    justify-content: flex-end;
    .select {
      display: block;
      text-align: center;
      min-width: max-content;
      @include item;
      padding: 0;
      .options {
        left: -60px;
      }
      img {
        display: none;
      }
    }
  }
}
.studios--count {
  grid-area: count;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 0;
  padding-right: 1rem;
  padding-bottom: var(--fr-l);
  &-current {
    display: inline-block;
    color: #e95ba8;
    font-weight: bold;
  }
  &.dirty {
    &::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      width: 20px;
      height: 20px;
      background-image: url('~@/assets/svg/i-point.svg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}
.studios--results {
  grid-area: cont;
  // min-height: 100vh;
}

.filter-btn {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--fr-2);
  background-color: #e5e5ef;
  padding: 0.75rem;
  border-radius: 0.5rem;
  &::after {
    content: '';
    position: absolute;
    left: 1rem;
    width: var(--fr);
    height: 1rem;
    background-image: url('~@/assets/svg/i-filter.svg');
    background-position: left;
    background-size: contain;
    background-repeat: no-repeat;
  }
  &::before {
    content: 'Фильтр';
    position: absolute;
    right: 0.7rem;
  }
}

@media screen and (min-width: 420px) {
  .studios {
    display: grid;
    grid-template-areas:
      'title sort'
      'filter cont';
    grid-template-columns: 300px 660px;
    justify-content: flex-start;
    &--title {
      height: 140px;
      align-items: flex-start;
      padding-left: var(--fr-2);
      h1 {
        font-size: 1.375rem;
      }
      p {
        display: block;
        color: #606074;
        line-height: 1.4;
      }
    }
    .filter-wrapper {
      align-items: flex-start;
      .filter {
        position: relative;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
    .sort-wrapper {
      .select {
        background-color: var(--white);
        border: 1px solid rgba(#c4c4cd, 0.4);
        img {
          display: inline-block;
        }
        &::after {
          display: block;
          top: 0;
          transform: translateY(75%) translateX(-50%);
        }
      }
    }
    .filter-wrapper,
    .sort-wrapper {
      padding-bottom: 0;
    }
    .filter-btn {
      display: none;
    }
  }
  .studios--count {
    display: none;
  }
  .studios--results {
    padding-left: var(--fr-l);
  }
}

@media screen and (min-width: 1280px) {
  .studios {
    justify-content: center;
    grid-template-columns: 300px 910px;
    &--title {
      padding-left: 0;
    }
  }
  .studios--results {
    padding-left: var(--fr-l);
  }
}
</style>
