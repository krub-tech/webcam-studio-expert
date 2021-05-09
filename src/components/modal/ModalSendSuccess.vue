<template>
    <div class="sendSuccess modal">
        <p>Заявка отправлена, скоро с Вами свяжутся</p>
        <button class="modal--submit" @click.prevent="modalClose">
            Закрыть
        </button>
    </div>
</template>

<script>
export default {
  name: 'ModalSendSuccess',
  methods: {
    modalClose() {
      this.$store.commit('modalClose');
      this.$store.state.modals.isSent = false;
    },
  },
};
</script>

<style lang="scss">
.sendSuccess {
    p {
        text-align: center;
        margin-bottom: 28px;
    }
}
</style>
