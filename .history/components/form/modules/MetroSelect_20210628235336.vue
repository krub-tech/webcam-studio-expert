<template>
  <div v-if="metro.length" class="city-metro form-module">
    <MultiSelect
      :placeholder="'Метро'"
      :options="metro"
      :selected="selected"
      @selectedOption="$emit('metroSelect', $event)"
    />
  </div>
</template>

<script>
import MultiSelect from '@/components/from/MultiSelect'

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
}
</script>
