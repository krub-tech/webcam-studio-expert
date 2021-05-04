<template>
    <header class="header-wrapper" :class="{ bg_gradient: bg_gradient }">
        <div class="header">
            <div class="header--top">
                <button class="header--burger" @click="burgerClickHandle">
                    <span class="header--burger-icon" />
                    <span class="header--burger-text">Меню</span>
                </button>
                <Logo />
                <div class="header--btns">
                    <Like class="header--btns-favorites" @click.native="toFavorites" />
                    <button class="header--btns-mail" @click="$store.dispatch('updateModal', { name: 'Feedback' })" />
                    <!-- <button class="header--btns-profile" /> -->
                </div>
            </div>
        </div>
        <Navbar :is-menu-open="isMenuOpen" />
        <button v-if="isMenuOpen" class="close-btn" @click="$store.commit('menuHide')" />
    </header>
</template>

<script>
//   v-scroll="throttle(this.scrollHandle, 250)"
//  :class="{ 'header-turn': !this.isMenuOpen }"
import Logo from '@/components/Logo';
import Like from '@/components/buttons/Like';
import Navbar from '@/components/Navbar';

import scroll from '@/directives/scroll';
import throttle from 'lodash.throttle';

export default {
  name: 'Header',
  components: {
    Logo,
    Like,
    Navbar,
  },
  directives: {
    scroll,
  },
  data() {
    return {
      scroll: 0,
      scrollCount: 0,
      pageOffset: 0,
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },
    isMenuOpen() {
      return this.$store.state.isMenuOpen;
    },
    bg_gradient() {
      return this.isMenuOpen && this.$store.state.windowWidth < 420;
    },
  },
  watch: {
    windowWidth(val) {
      if (val < 420) {
        this.$store.commit('menuHide');
      } else {
        this.$store.commit('menuOpen');
      }
    },
  },
  methods: {
    // scrollHandle() {
    //   if (window.scrollY > this.scrollTop) {
    //     this.$store.commit('toggleIsMenuOpen')
    //   } else if (window.innerWidth > 420) {
    //     this.$store.commit('toggleIsMenuOpen')
    //   }
    //   this.scrollTop = window.scrollY
    // },
    burgerClickHandle() {
      if (this.isMenuOpen) this.$store.commit('menuHide');
      else this.$store.commit('menuOpen');
    },
    toFavorites() {
      this.$store.commit('favoritesOpen');
      const firstFavoriteStudio = Array.from(this.$store.state.favorites.favoritesStudios)[0].id;
      this.$nextTick(() => this.$router.push(`/studio/${firstFavoriteStudio}`));
    },
    throttle,
  },
};
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
            content: "";
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
        font: normal 1rem "Averta CY";
        display: flex;
        align-items: center;
        &-icon {
            @include icon;
            display: inline-block;
            background-image: url("~@/assets/svg/i-burger.svg");
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
            background-image: url("~@/assets/svg/i-heart-dark.svg") !important;
            &.like {
                min-width: 20px;
                min-height: 20px;
            }
            &.liked {
                background-image: url("~@/assets/svg/i-heart-fill.svg") !important;
            }
        }
        &-mail {
            @include icon;
            background-image: url("~@/assets/svg/i-mail.svg");
        }
        &-profile {
            @include icon;
            background-image: url("~@/assets/svg/i-profile.svg");
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
