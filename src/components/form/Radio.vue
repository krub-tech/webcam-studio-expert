<template>
    <div class="radio">
        <input :id="`${$vnode.key}`" type="radio" :name="selector" :class="{ active: isSelect }">
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
  },
  computed: {
    isSelect() {
      return this.$parent.filterQuery[this.selector][0] === this.$vnode.key;
    },
  },
};
</script>

<style lang="scss"></style>
