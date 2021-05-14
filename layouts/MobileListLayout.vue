<template>
  <section class="studio--mobile-list">
    <Nuxt />
  </section>
</template>

<script>
export default {
  name: 'MobileListLayout',
}
</script>

<style lang="scss">
.studio--mobile-list {
  display: block;
  min-width: 300px;
  margin: 0 var(--fr-l);
  margin-top: 70px;
  grid-area: studios-list;
  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--fr-l);
    button {
      height: var(--fr-2);
      padding: 0.75rem;
      border-radius: 0.5rem;
    }
    .btn-filter {
      display: flex;
      align-items: center;
      background-color: #e5e5ef;
      img {
        margin-right: var(--fr-m);
      }
    }
    .btn-favorites {
      background-color: var(--white);
      border: 1px solid #c4c4cd;
      &.btn_favorites_active {
        border: 1px solid #ff93cd;
      }
    }
  }
  &-card {
    cursor: pointer;
    background-color: var(--white);
    color: #606074;
    border-radius: 0.5rem;
    padding: var(--fr);
    margin-bottom: 0.75rem;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      .name {
        font-weight: bold;
      }
    }
    .desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .address {
        font-size: 16px;
      }
    }
    .certificate {
      position: relative;
      margin-left: var(--fr-l);
      &::before {
        content: '';
        position: absolute;
        width: var(--fr);
        height: 22px;
        left: -30px;
        bottom: 0;
        transform: translateY(12.5%);
        background-image: url('~@/assets/svg/i-cert.svg');
      }
      a {
        font-size: 16px;
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
@media screen and (min-width: 420px) {
  .studio--mobile-list {
    margin: 0;
  }
}
</style>
