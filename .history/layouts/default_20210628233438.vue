<template>
  <div class="page-body">
    <div v-if="$store.state.modals.current" class="modal-wrapper">
      <div class="modal-wrapper--inner">
        <component :is="modal" />
        <button class="close-btn" @click="$closeModal" />
      </div>
    </div>
    <Header class="top" />
    <div class="center">
      <Title v-if="$store.state.title" />
      <transition name="sidebar">
        <Aside v-show="sidebarShow" />
      </transition>
      <Nuxt />
    </div>
    <Footer v-if="!$store.getters.isMobile" class="bottom" />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'StudiosLayout',
  components: {
    Header,
  },
  data() {
    return {
      modal: null,
    }
  },
  computed: {
    sidebarShow() {
      if (this.$store.getters.isMobile) return this.$store.state.isSidebarOpen
      return true
    },
    modalCurrent() {
      return this.$store.state.modals.current
    },
  },
  watch: {
    modalCurrent(newV, oldV) {
      this.$store.commit('modals/setPrev', oldV)
      this.modal = () => import(`@/components/modals/${this.modalCurrent}.vue`)
    },
    $route() {
      this.$scrollToTop()
    },
  },
}
</script>

<style lang="scss">
#__nuxt {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#__layout {
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}

.page-body {
  display: grid;
  grid-template-areas:
    'top'
    'center';
  grid-template-columns: minmax(300px, 100%);
  .top {
    grid-area: top;
  }
  .center {
    grid-area: center;
    display: grid;
    grid-template-areas:
      'title'
      'main';
    grid-template-rows: max-content 1fr;
    grid-template-columns: 100%;
    position: relative;
    top: 60px;
    height: 100%;
    min-height: 100vh;
    .page-title {
      grid-area: title;
    }
    aside {
      grid-area: aside;
      position: absolute;
      z-index: 1;
    }
    .studios {
      grid-area: main;
    }
  }
  .bottom {
    grid-area: bottom;
  }
}

.modal-wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  z-index: 3;
}
.modal-wrapper--inner {
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 80px 0;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(90deg, #c45792 0%, #7f53c4 100%);
    opacity: 0.6;
  }
  & > *:not(button) {
    width: 350px;
    height: max-content;
    background-color: #fbfbfd;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 28px;
    overflow: auto;
  }
  .close-btn {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 80px;
    right: 50%;
    transform: translateX(175px);
    background-color: rgba(255, 255, 255, 0);
    &:active {
      transform: translateY(2px) translateX(175px);
    }
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  width: 100%;
  transition: all 1s;
  left: 0;
  position: absolute;
  z-index: 1;
}

.sidebar-enter,
.sidebar-leave-to {
  width: 100%;
  left: -420px;
  position: absolute;
  z-index: 1;
}

@media screen and (min-width: 420px) {
  .page-body {
    grid-template-areas:
      'top'
      'center'
      'bottom';
    grid-template-rows: auto 1fr auto;
    .center {
      display: grid;
      grid-template-areas:
        'title title'
        'aside main';
      grid-template-rows: max-content 1fr;
      grid-template-columns: 300px 630px;
      grid-column-gap: 30px;
      position: relative;
      top: 150px;
      aside {
        position: relative;
      }
    }
  }
}

@media screen and (min-width: 1280px) {
  .page-body {
    justify-items: center;
    .center {
      width: 1250px;
      grid-template-columns: 300px 920px;
      aside {
        position: relative;
      }
    }
  }
}
</style>
