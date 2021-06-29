<template>
  <div></div>
</template>

<script>
export default {
  name: 'Title',
  data() {
    return {
      sortingTypes: ['По умолчанию', 'По названию', 'По процентам'],
      ordering: 'Сортировка',
    }
  },
  computed: {
    title() {
      return this.$store.state.title
    },
    isMainTitle() {
      return this.$route.name === 'city'
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
@media screen and (min-width: 420px) {
  .page-title {
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
}

@media screen and (min-width: 1280px) {
  .page-title {
    // padding-left: 15px;
  }
}
</style>
