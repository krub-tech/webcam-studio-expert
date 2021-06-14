<template>
  <div v-if="districts.length" class="city-districts form-module">
    <MultiSelect
      :placeholder="'Район'"
      :options="districts"
      :selected="selected"
      @selectedOption="$emit('districtSelect', $event)"
    />
  </div>
</template>

<script>
import MultiSelect from '@/components/form/MultiSelect'

export default {
  name: 'DistrictsSelect',
  components: {
    MultiSelect,
  },
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
}
</script>
