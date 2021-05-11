<template>
  <div class="select" :class="{ open: isOpenSelect }" @click="toggle">
    <template v-if="!selectedOption && placeholder">
      {{ placeholder }}
    </template>
    <template v-if="selectedOption">
      {{ selectedOption }}
    </template>
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
    placeholder: {
      type: String,
      default: 'Сделайте выбор',
    },
    staticPlaceholder: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      isOpenSelect: false,
      selectedOption: null,
    }
  },
  // mounted() {
  //   eventBus.$on('resetSelects', this.clearSelected)
  // },
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
      if (!this.staticPlaceholder) this.selectedOption = option
      this.$emit('selectedOption', option)
    },
    isSelected(payload) {
      if (this.selected) {
        return this.selected.includes(payload)
      } else {
        return this.selectedOption === payload || this.placeholder === payload
      }
    },
    clearSelected() {
      this.selectedOption = null
    },
  },
}
</script>

<style lang="scss">
.select {
  width: max-content;
  line-height: 1;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  .options {
    max-height: 300px;
    overflow-y: auto;
    overflow-x: none;
    scrollbar-width: none;
    list-style: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    border-radius: 0.5rem;
    z-index: 1;
    &::-webkit-scrollbar {
      width: 1.5rem;
      &-thumb {
        border: 0.5rem solid white;
        border-radius: 2rem;
        background-color: var(--grey);
      }
      &-track {
        background: white;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
      &-button {
        display: none;
      }
    }
  }
  .option {
    display: flex;
    align-items: center;
    background-color: white;
  }
  .arrow {
    width: 12px;
    height: 8px;
    margin-left: 8px;
  }
}
</style>
