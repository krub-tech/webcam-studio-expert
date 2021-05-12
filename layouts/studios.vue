<template>
  <div class="page-body">
    <Header />
    <section class="studios">
      <div class="studios--title">
        <h1>Вебкам студии г. {{ toCyrillic($route.params.city) }}</h1>
        <p>Место для SEO-подстрочника</p>
      </div>
      <!-- <aside class="filter-wrapper">
      <button class="filter-btn" @click="filterMobShow = !filterMobShow" />
      <Filt
        :class="{ open_filter: filterMobShow }"
        @close="filterMobShow = !filterMobShow"
      />
    </aside> -->
      <div class="studios--count">
        <p class="studios--count-current">
          {{ currentStudiosLength }}
        </p>
        /{{ studiosByCityLength }}
      </div>
      <div class="sort-wrapper">
        <div class="select-wrapper sort">
          <Select
            :options="sortingTypes"
            :placeholder="`Сортировка`"
            @selectedOption="sortSelectOptionHandle"
          />
        </div>
      </div>
      <Nuxt />
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Select from '@/components/Select'
import { getStudiosByCity } from '@/api/studios'
import { toCyrillic } from '@/helpers'

export default {
  name: 'StudiosLayout',
  components: {
    Select,
    Header,
  },
  data() {
    return {
      sortingTypes: ['По умолчанию', 'По названию', 'По процентам'],
      studiosByCityLength: 0,
    }
  },
  async fetch() {
    const studios = await getStudiosByCity(
      this.toCyrillic(this.$route.params.city)
    )
    this.studiosByCityLength = studios.count
  },
  methods: {
    getStudiosByCity,
    toCyrillic,
    sortSelectOptionHandle(data) {
      let query
      switch (data) {
        case 'По названию':
          query = 'name'
          break
        case 'По процентам':
          query = 'min_payout_percentage'
          break
        default:
          break
      }
      console.log(query)
      // this.$store.dispatch('sortStudios', query)
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

.studios {
  top: 150px;
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
    .filt {
      width: 100%;
      max-width: 420px;
      position: absolute;
      top: 0;
      left: -420px;
      z-index: 3;
      transition: left 500ms;
      background-color: #fbfbfd;
    }
    .open_filter {
      left: 0;
    }
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
      .filt {
        position: relative;
        left: 0;

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
}

@media screen and (min-width: 1360px) {
  .studios {
    justify-content: center;
    grid-template-columns: 300px 1000px;
    &--title {
      padding-left: 0;
    }
  }
}
</style>
