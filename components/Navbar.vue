<template>
  <div class="nav-wrapper">
    <nav class="nav">
      <div v-if="cities && $store.state.cities.current" class="nav--city">
        <Select
          class="select--cities"
          :options="cities.map((city) => city.name)"
          :value="$store.state.cities.current.name"
          @selectedOption="selectCityHandle"
        />
      </div>
      <div class="nav--inner">
        <div class="nav--item">
          <Select
            class="select--for_models"
            :options="for_models"
            :value="`Моделям`"
            static-placeholder
            @selectedOption="forModelsClickHandle"
          />
        </div>
        <a
          href="#"
          class="nav--item nav--item-certificate"
          @click.prevent="toCertificate"
        >
          Сертификация
        </a>
        <a href="#" class="nav--item" @click.prevent="toAddStudio">Добавить студию</a>
      </div>
    </nav>
  </div>
</template>

<script>
import Select from '@/components/Select'

export default {
  components: {
    Select,
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      for_models: [
        'Каталог студий',
        'Индивидуальный подбор студии',
        'Полезные ссылки',
        'Оставить жалобу',
      ],
    }
  },
  computed: {
    cities() {
      return this.$store.state.cities.uniques
    },
  },
  methods: {
    selectCityHandle(city) {
      const cityData = this.cities.find((el) => el.name === city)
      this.$store.dispatch('cities/updateCurrent', cityData.id)
      this.$store.dispatch('filter/reset')
      this.$router.push({
        name: 'city',
        params: { city: cityData.id },
      })
      this.$store.commit('menuClose')
    },
    forModelsClickHandle(data) {
      switch (data) {
        case 'Каталог студий':
          this.$router.push('/')
          break
        case 'Индивидуальный подбор студии':
          this.$store.commit('modals/setCurrent', 'SpecSelection')
          break
        case 'Полезные ссылки':
          this.$router.push({
            name: 'links-category',
            params: { category: 'telegram_channels' },
          })
          break
        case 'Оставить жалобу':
          this.$store.commit('modals/setCurrent', 'Claim')
          break
        default:
          break
      }
      this.$store.commit('menuClose')
    },
    toCertificate() {
      this.$router.push({ name: 'certificate' })
      this.$store.commit('menuClose')
    },
    toAddStudio() {
      this.$store.commit('modals/setCurrent', 'Proposal')
      this.$store.commit('menuClose')
    },
  },
}
</script>

<style lang="scss">
@mixin small-point {
  position: relative;
  margin-right: 28px;
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    top: 50%;
    transform: translateY(-25%);
    border-radius: 50%;
    background-color: var(--black);
    opacity: 0.1;
    right: -40px;
    @content;
  }
}
.slide-up-enter-active,
.slide-up-leave-active {
  position: fixed;
  top: 60px;
}
.slide-up-enter,
.slide-up-leave-to {
  z-index: -1;
  top: -480px;
}

.nav-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #fbfbfd;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;
  padding-top: 30px;
}
.nav {
  white-space: nowrap;
  width: 312px;
  position: absolute;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  border-radius: var(--fr);
  box-shadow: 0px 0px 30px rgba(91, 91, 131, 0.22);
  background-color: var(--white);
  .select {
    flex-shrink: 2;
    border-radius: 0.375rem;
    &--cities {
      .options {
        width: 264px;
      }
    }
    &--for_models {
      .options {
        width: 314px;
      }
    }
  }
  .nav--inner {
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0;
  }
  .nav--item {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--grey);
    padding-left: var(--fr);
    &[href] {
      color: inherit;
      &:last-of-type {
        border: none;
      }
    }
  }
  .nav--city {
    @extend .nav--item;
  }
}

@media screen and (min-width: 420px) {
  .nav-wrapper {
    justify-content: flex-start;
    height: 60px;
    min-width: 1024px;
    position: static;
    overflow: auto;
    background: linear-gradient(90deg, #d9f4ff 0%, #e9dbff 100%);
    padding-top: 0;
    border-radius: 0;
    &::before {
      display: none;
    }
  }
  .nav {
    width: 1010px;
    height: var(--fr-3);
    flex-wrap: nowrap;
    align-items: center;
    background: none;
    box-shadow: none;
    padding-left: var(--fr-2);
    margin: 0;
    .select {
      padding: 8px 10px;
      &:hover {
        background-color: rgba(#ffffff, 0.7);
        border-radius: 6px;
      }
    }
    .nav--inner {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      flex-grow: 2;
    }
    .nav--item {
      width: max-content;
      height: var(--fr-l);
      display: flex;
      align-items: center;
      border-bottom: none;
      &[href] {
        font: inherit;
        color: inherit;
        margin-left: var(--fr-2);
      }
    }
    .nav--city {
      border-bottom: none;
      padding-left: 0;
    }
  }
  .select--for_models,
  .nav--item-certificate {
    @include small-point;
  }
  .nav--item-certificate {
    &::after {
      right: -46px;
    }
  }
}
@media screen and (min-width: 1280px) {
  .slide-up-enter-active,
  .slide-up-leave-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  .slide-up-enter,
  .slide-up-leave-to {
    opacity: 0;
    top: 0;
  }
  .nav-wrapper {
    justify-content: center;
  }
  .nav {
    width: 1220px;
    padding: 0;
  }
}
</style>
