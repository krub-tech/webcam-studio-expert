<template>
    <div id="app">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import throttle from 'lodash.throttle';

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'default-layout';
    },
  },
  mounted() {
    this.$store.dispatch('getUniqueCities');
    this.$store.dispatch('optionsStudiosFromDB');
    this.$store.dispatch('studiosFromDB');
    this.$store.dispatch('allStudiosLength');
    this.$store.dispatch('getClientFavoritesStudiosFromLS');

    this.$store.commit('updateWindowWidth', window.innerWidth);
    window.addEventListener('resize', this.throttle(this.resizeHandle, 500));
  },
  methods: {
    resizeHandle() {
      this.$store.commit('updateWindowWidth', window.innerWidth);
    },
    throttle,
  },
};
</script>

<style lang="scss">
#app {
    user-select: none;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
