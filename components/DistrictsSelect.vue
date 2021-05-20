<template>
  <div v-if="districts.length" class="city-districts form-module">
    <MultiSelect
      :placeholder="'Район'"
      :options="districts"
      :selected="selected"
      @selectedOption="districtsSelect($event)"
    />
  </div>
</template>

<script>
export default {
  name: 'DistrictsSelect',
  props: {
    districts: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    districtsSelect(payload) {
      this.$store.dispatch('cities/updateDistrictsSelected', payload)
    },
  },
}
</script>
