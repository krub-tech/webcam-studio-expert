<template>
  <div class="logo">
    <img
      :src="require(`../assets/svg/${logo}.svg`)"
      alt="webcam studio expert"
    />
    <p class="logo--title" @click="logoClickHandle">
      webcam studio <i>expert</i>
    </p>
    <p class="logo--desc">Каталог и сертификация вебкам-студий</p>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    logo: {
      type: String,
      default: 'i-logo',
    },
  },
  methods: {
    logoClickHandle() {
      if (this.$route.path !== '/') this.$router.push('/')
      else return false
    },
  },
}
</script>

<style lang="scss">
.logo {
  height: max-content;
  display: flex;
  align-items: center;
  &--title {
    cursor: pointer;
    font-family: 'Hind', sans-serif;
    text-transform: uppercase;
    i {
      font-style: normal;
    }
  }
  &--desc {
    display: none;
    color: var(--dark-grey);
    padding-bottom: 0.25rem;
    margin: 0 var(--fr-3);
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  }
}
@media screen and (min-width: 420px) {
  .logo {
    &--title {
      font-size: 1.5rem;
    }
    &--desc {
      display: inline-block;
    }
  }
}
</style>
