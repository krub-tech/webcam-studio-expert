<template>
  <div class="multirange">
    <div class="range">
      <label :for="label">{{ label }}</label>
      <input
        type="range"
        class="first"
        :id="label"
        :min="minV"
        :max="max"
        :defMin="min"
        :data="minValue"
        :value="minValue"
        :class="{ dirty: minValue > minV }"
        @input="rangeMinHandle($event)"
      />
    </div>
    <div class="range">
      <input
        type="range"
        class="second"
        :min="min"
        :max="maxV"
        :defMax="max"
        :data="maxValue"
        :value="maxValue"
        :class="{ dirty: maxValue < maxV }"
        @input="rangeMaxHandle($event)"
      />
    </div>
  </div>
</template>

<script>
import Range from '@/components/form/Range'
export default {
  name: 'MultiRange',
  props: {
    label: {
      type: String,
      required: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    maxInVal: {
      type: Array,
      required: true,
    },
    minInVal: {
      type: Array,
      required: true,
    },

    max: {
      type: Number,
      default: 100,
    },
  },
  components: {
    Range,
  },
  computed: {
    minValue() {
      if (this.minInVal > 0) return this.minInVal
      else return this.minV
    },
    minV() {
      return this.min - 1
    },
    maxValue() {
      if (this.maxInVal > 0) return this.maxInVal
      else return this.maxV
    },
    maxV() {
      return this.max + 1
    },
  },
  methods: {
    rangeMinHandle(e) {
      if (e.target.value > this.maxValue) e.target.value = this.maxValue
      if (e.target.value < this.min) {
        this.$emit('valueMinChange', [])
      } else {
        this.$emit('valueMinChange', [e.target.value])
      }
    },
    rangeMaxHandle(e) {
      if (e.target.value < this.minValue) e.target.value = this.minValue
      if (e.target.value > this.max) {
        this.$emit('valueMaxChange', [])
      } else {
        this.$emit('valueMaxChange', [e.target.value])
      }
    },
  },
}
</script>

<style lang="scss">
.multirange {
  position: relative;

  input.first {
    &::before {
      display: none;
    }
    &.dirty {
      &::-webkit-slider-thumb {
        background-color: #e95ba8;
      }
      &::-moz-range-thumb {
        background-color: #e95ba8;
      }
      &::-ms-thumb {
        background-color: #e95ba8;
      }
    }
  }

  input.second {
    bottom: 2px;
    &::-webkit-slider-runnable-track {
      height: 0;
    }
    &::after {
      display: none;
    }
    &::before {
      content: attr(defMax);
    }

    &.dirty {
      &::before {
        content: attr(data);
        color: #e95ba8;
      }

      &::-webkit-slider-thumb {
        background-color: #e95ba8;
      }
      &::-moz-range-thumb {
        background-color: #e95ba8;
      }
      &::-ms-thumb {
        background-color: #e95ba8;
      }
    }
  }
}
</style>
