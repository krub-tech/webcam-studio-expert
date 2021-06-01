<template>
  <div class="select" :class="{ open: isOpenSelect }" @click="toggle">
    {{ value }}
    <img src="@/assets/svg/i-arrow.svg" class="arrow" />
    <ul v-show="isOpenSelect" class="options">
      <li
        v-for="option in options"
        :key="option.id"
        class="option"
        :value="option"
        :selected="isSelected(option)"
        @click="optionClickHandler(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
      default: 'Сделайте выбор',
    },
    selected: {
      type: [Array, String],
      default: null,
    },
  },
  data() {
    return {
      isOpenSelect: false,
      selectedOption: null,
    }
  },
  methods: {
    openSelect() {
      this.isOpenSelect = true
      document.addEventListener('click', this.notSelectClickListener)
    },
    closeSelect() {
      this.isOpenSelect = false
      document.removeEventListener('click', this.notSelectClickListener)
    },
    toggle() {
      if (this.isOpenSelect && this.$parent.$options.name !== 'MultiSelect') {
        this.closeSelect()
      } else this.openSelect()
    },
    notSelectClickListener(e) {
      if (!this.$el.contains(e.target)) {
        this.closeSelect()
      }
    },
    optionClickHandler(option) {
      this.$emit('selectedOption', option)
    },
    isSelected(payload) {
      if (this.selected) {
        return this.selected.includes(payload)
      }
      return this.value === payload
    },
  },
}
</script>
