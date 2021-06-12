<template>
  <div class="range">
    <label :for="label">{{ label }}</label>
    <input
      :id="label"
      type="range"
      :min="minV"
      :max="max"
      :defMin="min"
      :data="value"
      :value="value"
      :class="{ dirty: value > minV }"
      @input="rangeHandle($event)"
    />
  </div>
</template>

<script>
import throttle from 'lodash.throttle'

export default {
  name: 'Range',
  props: {
    label: {
      type: String,
      required: false,
    },
    val: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {}
  },
  computed: {
    value() {
      if (this.val > 0) return this.val
      return this.minV
    },
    minV() {
      return this.min - 1
    },
  },
  methods: {
    rangeHandle(data) {
      if (data.target.value < this.min) {
        this.$emit('valueChange', [])
      } else {
        this.$emit('valueChange', [data.target.value])
      }
    },
    throttle,
  },
}
</script>

<style lang="scss">
@mixin input-range-thumb {
  appearance: none;
  width: 0.5rem;
  height: 1rem;
  background-color: rgba(#606074, 0.7);
  border-radius: 0.25rem;
  &:active {
    background-color: rgba(#e95ba8, 0.7);
  }
  @content;
}
@mixin input-range-track {
  width: inherit;
  height: 2px;
  background-color: #d3d3e1;
  @content;
}
@mixin input-range-pseudo {
  position: absolute;
  transform: translateY(-7px);
  color: #222226;
  font-size: 1rem;
  @content;
}

.range {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  input[type='range'] {
    width: 100%;
    background: transparent;
    position: relative;
    margin: 0 2rem;
    &::after {
      content: attr(defMin);
      @include input-range-pseudo;
      left: -2rem;
    }
    &::before {
      content: attr(max);
      @include input-range-pseudo;
      right: -2rem;
    }
    &::-webkit-slider-thumb {
      @include input-range-thumb;
      transform: translateY(-7px);
    }
    &::-webkit-slider-runnable-track {
      @include input-range-track;
    }
    &::-moz-range-thumb {
      @include input-range-thumb;
    }
    &::-moz-range-track {
      @include input-range-track;
    }
    &::-ms-thumb {
      @include input-range-thumb;
    }
    &::-ms-track {
      @include input-range-track;
    }
    &.dirty {
      &::after {
        content: attr(data);
        color: #e95ba8 !important;
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
  label {
    margin-bottom: var(--fr-l);
  }
}
</style>
