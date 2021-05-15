<template>
  <div class="radio">
    <input
      :id="`${$vnode.key}`"
      type="radio"
      :name="selector"
      :class="{ active: isSelected }"
    />
    <label :for="`${$vnode.key}`">
      {{ item }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    item: {
      type: String,
      required: true,
    },
    selector: {
      type: String,
      default: '',
    },
    selected: {
      type: String,
      required: false,
    },
  },
  computed: {
    isSelected() {
      return this.selected === this.$vnode.key
    },
  },
}
</script>

<style lang="scss"></style>
