<template>
  <div class="page-body">
    <Header />
    <Nuxt class="content" />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'StudiosLayout',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
.content {
  position: absolute;
  top: 60px;
}

@media screen and (min-width: 420px) {
  .content {
    top: 150px;
  }
}
</style>
