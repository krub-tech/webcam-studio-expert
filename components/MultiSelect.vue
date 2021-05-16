<template>
  <div class="multiselect">
    <Select
      :value="placeholder"
      :options="options"
      :selected="selected"
      static-placeholder
      @selectedOption="selectOption"
    />
    <div v-if="selected.length" class="selected-options">
      <span
        v-for="option in selected"
        :key="option"
        class="badge"
        @click="removeOption(option)"
      >
        {{ option }}
      </span>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'

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
  data() {
    return {
      selectedOptions: this.selected,
    }
  },
  methods: {
    selectOption(payload) {
      if (this.getIdx(payload) === -1) this.selectedOptions.push(payload)
      else this.removeOption(payload)
      this.$emit('selectedOptions', this.selectedOptions)
    },
    getIdx(payload) {
      return this.selectedOptions.indexOf(payload)
    },
    removeOption(payload) {
      this.selectedOptions.splice(this.getIdx(payload), 1)
      this.$emit('selectedOptions', this.selectedOptions)
    },
  },
}
</script>

<style lang="scss"></style>
