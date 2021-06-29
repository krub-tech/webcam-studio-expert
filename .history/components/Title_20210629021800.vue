<template>
  <div class="page-title">
    <h1>{{ title }}</h1>
    <template v-if="isMainTitle"> </template>
  </div>
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
