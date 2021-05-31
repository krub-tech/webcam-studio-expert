<template>
  <div />
</template>

<script>
export default {
  name: 'Main',
  middleware: 'redirect-to-spb',
  watch: {
    $route() {
      this.isActive = false
    },
  },
}
</script>
