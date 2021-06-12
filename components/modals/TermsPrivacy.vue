<template>
  <p class="modal--agree">
    Нажимая “Отправить”, Вы соглашаетесь с
    <a href="#" @click.prevent="$store.commit('modals/setCurrent', 'Terms')">
      пользовательским соглашением
    </a>
    и
    <a href="#" @click.prevent="$store.commit('modals/setCurrent', 'Privacy')">
      политикой конфиденциальности
    </a>
  </p>
</template>

<script>
export default {
  name: 'TermsPrivacy',
}
</script>

<style></style>
