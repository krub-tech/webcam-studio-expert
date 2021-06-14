<template>
  <div class="multiselect">
    <Select
      :value="placeholder"
      :options="options"
      :selected="selected"
      static-placeholder
      @selectedOption="$emit('selectedOption', $event)"
    />
    <div v-if="selected.length" class="selected-options">
      <span
        v-for="option in selected"
        :key="option"
        class="badge"
        @click="$emit('selectedOption', option)"
      >
        {{ option }}
      </span>
    </div>
  </div>
</template>

<script>
import Select from '@/components/form/Select'

export default {
  name: 'MultiSelect',
  components: {
    Select,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Сделайте выбор',
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
