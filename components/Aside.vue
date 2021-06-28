<template>
  <aside>
    <component
      :is="sidebar"
      :studios="studios"
      @close="$store.commit('sidebarClose')"
    />
  </aside>
</template>

<script>
export default {
  data() {
    return {
      sidebar: null,
      studios: null,
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    $route(newV) {
      console.log(newV)
      this.getComponentName(newV.name)
    },
  },
  mounted() {
    this.getComponentName(this.$route.name)
  },
  methods: {
    getComponentName(routeName) {
      let component
      switch (routeName) {
        case 'city':
          component = 'FiltSidebar'
          break
        case 'city-name-id':
          component = 'StudioSidebar'
          this.studios = this.$store.state.studios.currents
          break
        case 'links-category':
          component = 'NavbarSidebar'
          break
        case 'favorites':
          component = 'StudioSidebar'
          this.studios = JSON.parse(localStorage.favorites)
          break
        default:
          break
      }
      this.sidebar = () => import(`@/components/sidebars/${component}.vue`)
    },
  },
}
</script>

<style></style>
