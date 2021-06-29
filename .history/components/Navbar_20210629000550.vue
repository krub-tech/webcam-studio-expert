<template>
  <nav class="page-nav">
    <div class="nav">
      <Select
        class="select-cities"
        :options="cities.map((city) => city.name)"
        :value="$store.state.cities.current.name"
        @selectedOption="selectCityHandle"
      />
      <div class="nav--inner">
        <Select
          class="nav--item"
          :options="for_models"
          :value="`Моделям`"
          static-placeholder
          @selectedOption="forModelsClickHandle"
        />

        <Select
          class="nav--item"
          :options="for_studios"
          :value="`Студиям`"
          static-placeholder
          @selectedOption="forStudiosClickHandle"
        />

        <a href="#" class="nav--item">Специалистам</a>
        <a href="#" class="nav--item">Статьи и новости</a>
      </div>
    </div>
  </nav>
</template>

<script>
import Select from '@/components/form/Select'

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
        'Тренинги',
        'Полезные ссылки',
        'Психологическая помощь',
        'Черный список студий',
        'Оставить жалобу',
      ],
      for_studios: [
        'Добавление в каталог',
        'Сертификация',
        'Специалисты',
        'Тренинги для админов',
        'Помощь в организации тренингов',
        'Полезное студиям',
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
        case 'Тренинги':
          this.$router.push({
            name: 'trainings',
          })
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
    forStudiosClickHandle(data) {
      switch (data) {
        case 'Добавление в каталог':
          this.toAddStudio()
          break
        case 'Сертификация':
          this.toCertificate()
          break
        case 'Специалисты':
          break
        case 'Тренинги для админов':
          break
        case 'Помощь в организации тренингов':
          break
        case 'Полезное студиям':
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
    right: -20px;
    @content;
  }
}
.nav {
  white-space: nowrap;
  width: 312px;
  position: absolute;
  height: max-content;

  border-radius: var(--fr);
  box-shadow: 0px 0px 30px rgba(91, 91, 131, 0.22);
  background-color: var(--white);
  .select {
    border-radius: 0.375rem;
    &-cities {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid var(--grey);
      .options {
        width: 264px;
      }
    }
    &.nav--item {
      @include small-point;
      .options {
        width: 314px;
      }
      .arrow {
        display: none;
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
    &[href] {
      color: inherit;
      &:last-of-type {
        border: none;
      }
    }
    .select {
      .arrow {
        display: none;
      }
    }
  }
}

@media screen and (min-width: 420px) {
  .page-nav {
    width: 100%;
    background: linear-gradient(90deg, #d9f4ff 0%, #e9dbff 100%);
  }
  .nav {
    width: 960px;
    height: var(--fr-3);
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background: none;
    box-shadow: none;
    padding-left: 30px;
    margin: 0;
    position: relative;

    .select {
      &:hover {
        background-color: rgba(#ffffff, 0.7);
        border-radius: 6px;
      }
    }
    .nav--inner {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-end;
      flex-grow: 2;
    }
    .nav--item {
      width: max-content;
      height: 28px;
      display: flex;
      align-items: center;
      border-bottom: none;
      margin-left: 36px;
      &[href] {
        font: inherit;
        color: inherit;
        padding: 0 12px;
        &:not(:last-of-type) {
          @include small-point;
        }
        &:last-of-type {
          padding-right: 0;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
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
  .nav {
    width: 1250px;
    .nav--inner {
      justify-content: center;
    }
  }
}
</style>
