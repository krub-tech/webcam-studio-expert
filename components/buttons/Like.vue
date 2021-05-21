<template>
  <button class="like" :class="{ liked: isLiked }" @click.prevent="likeClickHandle" />
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
      isLiked: false,
    }
  },
  mounted() {
    this.isLiked = this.isLike()
  },
  methods: {
    likeClickHandle() {
      if (this.id) {
        if (!localStorage.favoritesIndexes) {
          localStorage.favoritesIndexes = JSON.stringify([this.id])
        } else {
          localStorage.favoritesIndexes = JSON.stringify(
            this.$toArray(JSON.parse(localStorage.favoritesIndexes), this.id)
          )
        }
        this.isLiked = this.isLike()
      } else return false
    },
    isLike() {
      let result = false
      if (this.id) {
        if (localStorage.favoritesIndexes) {
          JSON.parse(localStorage.favoritesIndexes).forEach((id) => {
            if (this.id === id) result = true
          })
        }
      }
      return result
    },
  },
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
