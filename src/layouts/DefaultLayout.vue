<template>
  <div class="layout-wrapper">
    <div class="window-top"></div>
    <Header :class="{ isModalOpen: $store.state.isModalOpen }" />
    <router-view class="content" />
    <transition name="modal">
      <div class="modal-wrapper" v-if="$store.state.modals.modal">
        <div class="modal-wrapper--inner">
          <component
            :is="$store.state.modals.modal.name"
            v-if="!$store.state.modals.isSended"
          />
          <ModalSendSuccess v-if="$store.state.modals.isSended" />
          <button class="close-btn" @click="closeModal" v-if="closeBtnIsShow" />
        </div>
      </div>
    </transition>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModalSendSuccess from "@/components/modal/ModalSendSuccess";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
    ModalSendSuccess,
  },
  computed: {
    closeBtnIsShow() {
      if (this.$store.state.modals.isSended) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    closeModal() {
      if (
        this.$store.state.modals.modal.name == "Terms" ||
        this.$store.state.modals.modal.name == "Privacy" ||
        this.$store.state.modals.modal.name == "EnglishDesc"
      ) {
        this.$store.dispatch("updateModal", {
          name: this.$store.state.modals.modal.from,
          from: this.$store.state.modals.modal.name,
        });
      } else {
        this.$store.dispatch("updateModal", null);
      }
    },
    notModalClickListener: function(e) {
      if (e.target.classList.value.includes("modal-wrapper--inner")) {
        this.closeModal();
      }
    },
  },
  updated() {
    if (this.$store.state.modals.modal != null) {
      this.$el.addEventListener("mousedown", this.notModalClickListener);
    } else {
      this.$el.removeEventListener("mousedown", this.notModalClickListener);
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/main.scss";

.layout-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.content {
  margin-top: 60px;
}

.isModalOpen {
  position: static;
}

.modal-wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  z-index: 2;
}
.modal-wrapper--inner {
  min-height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 80px 0;
  overflow: hidden;
  &::before {
    content: "";
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
    position: absolute;
    top: 55px;
    right: 50%;
    transform: translateX(200px);
    &:active {
      transform: translateX(200px);
    }
  }
}

@media screen and (min-width: 420px) {
  .content {
    margin-top: 150px;
  }
}
</style>
