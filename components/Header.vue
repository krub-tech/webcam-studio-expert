<template>
  <header class="header-wrapper">
    <div class="header">
      <div class="header--top">
        <button class="header--burger" @click="$store.dispatch('menuToggle')">
          <span class="header--burger-icon" />
          <span class="header--burger-text">Меню</span>
        </button>
        <Logo />
        <div class="header--btns">
          <Like class="header--btns-favorites" @click.native="toFavoritesPage" />
          <button class="header--btns-mail" />
          <!-- <button class="header--btns-profile" /> -->
        </div>
      </div>
    </div>
    <Navbar v-if="$store.getters.isMenuOpen" />
    <!-- <button class="close-btn" /> -->
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
    this.$store.dispatch(
      'cities/updateCurrent',
      this.$route.params.city || 'sankt-peterburg'
    )
    this.$store.dispatch('studios/updateCurrents')
    if (sessionStorage.districts) {
      this.$store.dispatch(
        'cities/setDistrictsSelected',
        JSON.parse(sessionStorage.districts)
      )
    }
    if (sessionStorage.metro) {
      this.$store.dispatch('cities/setMetroSelected', JSON.parse(sessionStorage.metro))
    }
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
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 5px 20px 0px rgba(#5b5b83, 0.04);
  &.bg_gradient {
    &::before {
      content: '';
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      background: linear-gradient(90deg, #c45792 0%, #7f53c4 100%);
      opacity: 0.6;
    }
  }
  .close-btn {
    top: 60px;
    right: 16px;
    z-index: 1;
  }
}
.header {
  height: inherit;
  white-space: nowrap;
  & > * {
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--fr);
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
  &--top {
    display: flex;
    height: var(--fr-3);
    background-color: white;
  }

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
}

@media screen and (min-width: 420px) {
  .header-wrapper {
    height: 90px;
    min-width: 1024px;
    .close-btn {
      display: none;
    }
  }
  .header {
    & > * {
      padding: 0 var(--fr-2);
    }
    &--top {
      height: 90px;
    }
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

  .header-turn {
    // height: 90px;
    .header--burger {
      display: flex;
      color: var(--black);
      background: linear-gradient(90deg, #d9f4ff 0%, #e9dbff 100%);
      border-radius: 8px;
      padding: 0.625rem 0.75rem;
      &-text {
        display: inline-block;
        margin-left: 0.75rem;
      }
    }
    .logo--desc,
    .header--btns-mail {
      display: none;
    }
  }
}
@media screen and (min-width: 1360px) {
  .header {
    width: 1290px;
    margin: 0 auto;
  }
  .header--top {
    padding: 0;
  }
}
</style>
