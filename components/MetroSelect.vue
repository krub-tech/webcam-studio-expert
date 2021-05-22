<template>
  <div class="city-metro form-module">
    <MultiSelect
      :placeholder="'Метро'"
      :options="metro"
      :selected="selected"
      @selectedOption="metroSelect($event)"
    />
  </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect'

export default {
  name: 'MetroSelect',
  components: {
    MultiSelect,
  },
  props: {
    metro: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    metroSelect(payload) {
      const metroData = this.$store.state.cities.metro.find(
        (el) => el.station_name === payload
      )
      this.$store.dispatch('cities/updateMetroSelected', metroData.id)
    },
  },
}
</script>
