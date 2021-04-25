<template>
  <div class="select-wrapper">
    <div class="select" :class="{ open: isOpenSelect }" @click="toggleSelect">
      <template v-if="!selectedOption || multiple">
        {{ placeholder }}
      </template>
      <template v-else>
        {{ selectedOption }}
      </template>
      <img src="@/assets/svg/i-arrow.svg" class="arrow" />
      <ul class="options" v-show="isOpenSelect">
        <li
          v-for="(option, idx) in optionsComputed"
          class="option"
          :key="idx"
          :value="option"
          :class="{ active: isSelected(option) }"
          @click.prevent="optionClickHandler(option)"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <div class="selected-options" v-if="multiple">
      <span
        class="selected-option"
        v-for="(item, idx) in parentArrayValues"
        :key="item"
        @click="removeSelectedOption(idx)"
        >{{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Сделайте выбор",
    },
    selector: {
      type: String,
      required: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    parentObjName: {
      type: String,
      required: false,
    },
    callback: {
      type: Boolean,
      required: false,
    },
    staticPlaceholder: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isOpenSelect: false,
      selectedOption: null,
    };
  },
  computed: {
    optionsStudios() {
      return this.$store.state.studios.optionsStudios || {};
    },
    optionsComputed() {
      if (this.optionsStudios[this.selector])
        return this.optionsStudios[this.selector];
      else return this.options;
    },
    parentArrayKeys() {
      if (this.$parent[this.parentObjName])
        return this.$parent[this.parentObjName][this.selector];
    },
    parentArrayValues() {
      if (this.parentArrayKeys) {
        let result = [];
        this.parentArrayKeys.map((el) => {
          if (this.optionsStudios[this.selector]) {
            result.push(this.optionsStudios[this.selector][el]);
          }
        });
        return result;
      }
    },
  },
  methods: {
    openSelect() {
      this.isOpenSelect = true;
      document.addEventListener("click", this.notSelectClickListener);
    },
    closeSelect() {
      this.isOpenSelect = false;
      document.removeEventListener("click", this.notSelectClickListener);
    },
    toggleSelect() {
      if (this.multiple) {
        this.openSelect();
      } else {
        this.isOpenSelect ? this.closeSelect() : this.openSelect();
      }
    },
    notSelectClickListener(e) {
      if (!this.$el.querySelector(".select").contains(e.target)) {
        this.closeSelect();
      }
    },
    optionClickHandler(option, idx) {
      this.selectedOption = option;

      if (this.multiple) {
        if (this.optionsStudios[this.selector]) {
          const parentArrayObject = this.optionsStudios[this.selector];
          for (let [key, value] of Object.entries(parentArrayObject)) {
            if (option === value) {
              if (!this.parentArrayKeys.includes(key)) {
                this.parentArrayKeys.push(key);
              } else {
                const idx = this.parentArrayKeys.indexOf(key);
                this.parentArrayKeys.splice(idx, 1);
              }
            }
          }
        } else {
          const parentArrayObject = this.$parent[this.parentObjName][
            this.selector
          ];

          if (!parentArrayObject.includes(option)) {
            parentArrayObject.push(option);
          } else {
            const idx = parentArrayObject.indexOf(option);
            parentArrayObject.splice(idx, 1);
          }
        }
        this.selectedOption = null;
      }

      if (this.callback) {
        this.$emit("selectedOption", this.selectedOption);
      }

      if (this.staticPlaceholder) this.selectedOption = this.placeholder;
    },
    removeSelectedOption(idx) {
      this.parentArrayKeys.splice(idx, 1);
    },
    isSelected(item) {
      if (this.multiple && this.optionsStudios[this.selector]) {
        return this.parentArrayValues.includes(item);
      } else if (this.multiple) {
        return this.$parent[this.parentObjName][this.selector].includes(item);
      } else {
        return this.selectedOption == item;
      }
    },
  },
};
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
  .arrow {
    width: 12px;
    height: 8px;
    margin-left: 8px;
  }
  .options {
    width: 220px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
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
    &:active,
    &.active {
      color: #e95ba8;
    }
  }
}
.selected-options {
  display: flex;
  flex-wrap: wrap;
  overflow: visible;
  border-radius: 0;
  padding: 1rem 0.5rem 0;
  z-index: 0;
  span {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: var(--fr-l);
    background-color: #ffbee1;
    padding: 0.375rem var(--fr-l) 0.375rem var(--fr-m);
    border-radius: 0.375rem;
    position: relative;
    margin-bottom: 0.5rem;
    &::after {
      content: "";
      width: var(--fr-l);
      height: var(--fr-l);
      position: absolute;
      top: 0;
      right: 0;
      background: no-repeat center url("~@/assets/svg/i-cross.svg");
      background-size: contain;
    }
    &:not(:last-of-type) {
      margin-right: var(--fr-m);
    }
  }
}
</style>
