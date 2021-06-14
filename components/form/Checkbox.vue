<template>
  <div class="checkbox">
    <input type="checkbox" :class="{ active: checked }" />
    <label>
      {{ item }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    item: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@mixin filter-item {
  background-color: #fefeff;
  border: 1px solid #c4c4cd;
  border-radius: 0.5rem;
  padding: var(--fr-m) 0.875rem;
}

.checkbox {
  white-space: nowrap;
  display: inline-block;
  &:not(:last-of-type) {
    margin-right: var(--fr-m);
  }

  input[type='checkbox'] {
    display: none;
    & + label {
      height: var(--fr-2);
      display: inline-block;
      @include filter-item;
      margin-bottom: var(--fr-m);
    }
    &.active + label {
      border: 2px solid var(--pink);
    }
  }
}
</style>
