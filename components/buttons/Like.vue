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
    async likeClickHandle() {
      if (this.id) {
        const studio = await this.$api.studios.getById(this.id)
        if (!localStorage.favorites) {
          localStorage.favorites = JSON.stringify([studio])
        } else {
          const favorites = JSON.parse(localStorage.favorites)
          favorites.forEach((value, idx) => {
            if (value.id !== this.id) {
              favorites.push(studio)
            } else if (value.id === this.id) {
              console.log(value.id === this.id)
              favorites.splice(idx, 1)
            }
            console.log(favorites)
          })
          localStorage.favorites = JSON.stringify(favorites)
        }
        this.isLiked = this.isLike()
      } else return false
    },
    isLike() {
      let result = false
      if (this.id) {
        if (localStorage.favorites) {
          JSON.parse(localStorage.favorites).forEach((el) => {
            if (this.id === el.id) result = true
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
