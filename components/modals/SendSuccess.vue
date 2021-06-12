<template>
  <div class="sendSuccess modal">
    <p>Заявка отправлена, скоро с Вами свяжутся</p>
    <button
      class="modal--submit"
      @click.prevent="$store.commit('modals/setCurrent', null)"
    >
      Закрыть
    </button>
  </div>
</template>

<script>
export default {
  name: 'SendSuccess',
}
</script>

<style lang="scss">
.close-btn {
  display: none;
}
.sendSuccess {
  p {
    text-align: center;
    margin-bottom: 28px;
  }
}
</style>
