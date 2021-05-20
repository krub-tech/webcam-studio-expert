<template>
  <div v-if="districts.length" class="city-districts form-module">
    <MultiSelect
      :placeholder="'Район'"
      :options="districts"
      :selected="selected"
      @selectedOptions="districtsSelect"
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
  },
}
</script>
