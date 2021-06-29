<template>
  <header class="page-header">
    <div class="header">
      <button class="header--burger" @click="$store.dispatch('menuToggle')">
        <span class="header--burger-icon" />
        <span class="header--burger-text">Меню</span>
      </button>
      <Logo />
      <div class="header--btns">
        <Like class="header--btns-favorites" @click.native="toFavoritesPage" />
        <button
          class="header--btns-mail"
          @click="$store.commit('modals/setCurrent', 'Feedback')"
        />
        <!-- <button class="header--btns-profile" /> -->
      </div>
    </div>

    <Navbar v-if="$store.getters.isMenuOpen" />
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import Like from '@/components/buttons/Like'
import Navbar from '@/components/Navbar'
import throttle from 'lodash.throttle'

export default {
  name: 'Header',
  components: {
    Logo,
    Like,
    Navbar,
  },
  data() {
    return {
      scroll: 0,
      scrollCount: 0,
      pageOffset: 0,
    }
  },
  mounted() {
    this.$nextTick(() => this.resizeHandle())
    window.addEventListener('resize', this.throttle(this.resizeHandle, 500))

    const idx = this.$store.state.cities.uniques.findIndex(
      (el) => el.id === this.$route.params.city
    )
    if (idx !== -1) {
      this.$store.dispatch('cities/updateCurrent', this.$route.params.city)
    } else {
      // this.$store.dispatch('cities/updateCurrent', 'sankt-peterburg')
      // this.$router.push('/sankt-peterburg')
      // alert(`${this.$route.params.city} нет в базе городов`)
    }

    if (sessionStorage.districts) {
      this.$store.dispatch(
        'cities/setDistrictsSelected',
        JSON.parse(sessionStorage.districts)
      )
    }
    if (sessionStorage.metro) {
      this.$store.dispatch('cities/setMetroSelected', JSON.parse(sessionStorage.metro))
    }
    if (localStorage.favorites)
      this.$store.commit('studios/setFavorites', JSON.parse(localStorage.favorites))
  },
  methods: {
    throttle,
    getFirstFavoritesStudio() {
      if (localStorage.favoritesIndexes) {
        return JSON.parse(localStorage.favoritesIndexes).find((item, idx) => idx === 0)
      }
    },
    toFavoritesPage() {
      this.$router.push({
        name: 'favorites',
      })
    },
    resizeHandle() {
      this.$store.commit('updateWindowWidth', window.innerWidth)
    },
  },
}
</script>

<style lang="scss">
@mixin icon {
  display: none;
  width: var(--fr);
  height: var(--fr);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @content;
}
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 5px 20px 0px rgba(#5b5b83, 0.04);
  .close-btn {
    top: 60px;
    right: 16px;
    z-index: 1;
  }
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: white;
  padding: 0 15px;
  &--btns {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    &-favorites {
      display: inline-block;
      background-image: url('~@/assets/svg/i-heart-dark.svg') !important;
      &.like {
        min-width: 20px;
        min-height: 20px;
      }
      &.liked {
        background-image: url('~@/assets/svg/i-heart-fill.svg') !important;
      }
    }
    &-mail {
      @include icon;
      background-image: url('~@/assets/svg/i-mail.svg');
    }
    &-profile {
      @include icon;
      background-image: url('~@/assets/svg/i-profile.svg');
    }
  }
  &--burger {
    font: normal 1rem 'Averta CY';
    display: flex;
    align-items: center;
    &-icon {
      @include icon;
      display: inline-block;
      background-image: url('~@/assets/svg/i-burger.svg');
    }
    &-text {
      display: none;
    }
  }
}

@media screen and (min-width: 420px) {
  .page-header {
    z-index: 2;
    height: 90px;
    min-width: 1024px;
    .close-btn {
      display: none;
    }
  }
  .header {
    height: 90px;
    width: 960px;
    padding-left: 30px;
    padding-right: 0;
    &--burger {
      display: none;
    }
    &--btns {
      & > *:not(:last-of-type) {
        margin-right: 3rem;
      }
    }
    &--btns-favorites,
    &--btns-mail {
      display: inline-block;
    }
    &--btns-favorites {
      background-position-x: center;
      min-width: 20px;
      min-height: 20px;
    }
    &--btns-profile {
      display: inline-block;
    }
  }
}
@media screen and (min-width: 1280px) {
  .page-header,
  .page-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .header {
    width: 1250px;
    padding-left: 0;
  }
}
</style>
