<template>
    <div class="multiselect">
        <nSelect 
            :placeholder="placeholder" 
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
import nSelect from '@/components/nSelect';

import { eventBus } from '@/main';

export default {
  name: 'MultiSelect',
  components: {
    nSelect,
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
    };
  },
  mounted() {
    eventBus.$on('resetSelects', this.clearSelected);
  },
  methods: {
    selectOption(payload) {
      if (this.getIdx(payload) === -1) this.selectedOptions.push(payload);
      else this.removeOption(payload);
      this.$emit('selectedOptions', this.selectedOptions);
    },
    getIdx(payload) {
      return this.selectedOptions.indexOf(payload);
    }, 
    removeOption(payload) {
      this.selectedOptions.splice(this.getIdx(payload), 1);
      this.$emit('selectedOptions', this.selectedOptions);
    },
    clearSelected() {
      this.selectedOptions = [];
    },
  },
};
</script>

<style lang="scss">

</style>
