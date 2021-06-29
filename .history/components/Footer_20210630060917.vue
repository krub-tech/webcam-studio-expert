<template>
  <footer class="footer-wrapper">
    <div class="footer">
      <div class="footer--top">
        <Logo :logo="`i-logo_footer`" />
        <router-link to="/"> Каталог студий </router-link>
      </div>
      <div class="footer--mid">
        <div class="footer--mid-inner">
          <a href="#" @click.prevent="modalLinkClickHandle('SpecSelection')"
            >Индивидуальный подбор студии</a
          >
          <a
            href="#"
            @click.prevent="
              $router.push({
                name: 'links-category',
                params: { category: 'telegram_channels' },
              })
            "
          >
            Полезные ссылки
          </a>
          <a href="#" @click.prevent="modalLinkClickHandle('Proposal')"
            >Добавить студию</a
          >
          <router-link to="/certificate"> Сертификация </router-link>
          <a href="#" @click.prevent="modalLinkClickHandle('Claim')">Оставить жалобу</a>
          <a href="#" @click.prevent="modalLinkClickHandle('Feedback')"
            >Обратная связь</a
          >
        </div>
      </div>
      <div class="footer--bott">
        <div class="footer--bott-inner">
          <p>© 2021 webcam-studio.expert</p>
          <a href="#" to="/terms_of_use" @click.prevent="modalLinkClickHandle('Terms')"
            >Пользовательское соглашение</a
          >
          <a
            href="#"
            to="/privacy_policy"
            @click.prevent="modalLinkClickHandle('Privacy')"
            >Политика конфиденциальности</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  name: 'Footer',
  components: {
    Logo,
  },
  data() {
    return {}
  },
  methods: {
    modalLinkClickHandle(name) {
      this.$store.commit('modals/setCurrent', name)
      //   this.$scrollToTop()
    },
  },
}
</script>

<style lang="scss">
@mixin three-col {
  width: 1024px;
  display: grid;
  align-items: center;
  justify-content: flex-start;
  grid-template-columns: repeat(3, 1fr);
  font-size: 0.875rem;
  padding-left: var(--fr-2);
  @media screen and (min-width: 1280px) {
    width: 1290px;
  }
}

@media screen and (min-width: 420px) {
  .footer-wrapper {
    min-width: 1024px;
    position: relative;
    top: 150px;
    right: 0;
    left: 0;
    background: linear-gradient(180deg, #313136 0%, #674780 100%);
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 38px;
      z-index: 0;
      background-color: rgba(#000000, 0.2);
    }
  }
  .footer {
    display: flex;
    flex-wrap: wrap;
    height: 278px;
    white-space: nowrap;
    a {
      color: var(--white);
    }
    .logo {
      color: #ff93cd;
      i {
        color: #7bd0ff;
      }
      &--title,
      img {
        filter: drop-shadow(0px 0px 50px #ffc5e4);
      }
      &--desc {
        color: #aa9ab8;
      }
    }
    &--top {
      height: 110px;
      width: 960px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(#c4c4c4, 0.1);
      padding-left: var(--fr-2);
    }
    &--mid {
      height: 130px;
      display: flex;
      align-items: center;
      &-inner {
        @include three-col;
        row-gap: var(--fr);
        grid-template-rows: repeat(2, 1fr);
      }
    }
    &--bott {
      &-inner {
        position: relative;
        z-index: 1;
        p {
          color: #aa9ab8;
        }
        @include three-col;
        height: inherit;
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .footer-wrapper {
    display: flex;
    justify-content: center;
  }
  .footer {
    width: 1220;
    justify-content: center;
  }
  .footer--top {
    width: 1220px;
    margin: 0;
    padding-left: 0;
  }
  .logo {
    flex-grow: 2;
    justify-content: space-between;
  }
  .logo--desc {
    margin: 0;
  }
}
</style>
