<template>
  <button
    class="like"
    :class="{ liked: isLiked }"
    @click.prevent="likeClickHandle"
  />
</template>

<script>
export default {
  name: 'Like',
  props: {
    id: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      // isLiked: false,
    }
  },
  computed: {
    isLiked() {
      let result = false
      this.$store.state.favorites.favoritesStudios.map((el) => {
        if (el.id == this.id) result = true
      })
      return result
    },
  },
  methods: {
    likeClickHandle() {
      this.id
        ? this.$store.dispatch('addStudioToFavoritesStudios', this.id)
        : false
    },
  },
  mounted() {},
}
</script>

<style lang="scss">
.like {
  min-width: 40px;
  min-height: 40px;
  background-image: url('~@/assets/svg/i-heart.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  &.liked {
    background-image: url('~@/assets/svg/i-heart-fill.svg');
  }
}
</style>
