<template>
  <div class="slider">
    <div class="slides">
      <div v-for="slide in data" :key="slide" class="slide">
        <img :src="slide" />
      </div>
    </div>
    <template v-if="data.length > 1">
      <button class="slide-next" @click="next">
        <img src="@/assets/svg/i-slider-arrow.svg" alt="" />
      </button>
      <button class="slide-prev" @click="prev">
        <img src="@/assets/svg/i-slider-arrow.svg" alt="" />
      </button>
      <div class="points">
        <span
          v-for="point in data.length"
          :key="point"
          class="point"
          :class="{ active: point - 1 == count }"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
      sliderWidth: 0,
      touchStart: 0,
      touchEnd: 0,
    }
  },
  computed: {},
  mounted() {
    this.optimizeWidth()
    this.handleTouch()
  },
  updated() {
    this.optimizeWidth()
    window.addEventListener('resize', this.optimizeWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.optimizeWidth)
  },
  methods: {
    prev() {
      if (this.count === 0) this.count = this.data.length
      this.count -= 1
      this.move()
    },
    next() {
      this.count += 1
      if (this.count === this.data.length) this.count = 0
      this.move()
    },
    move() {
      this.$el.querySelector('.slides').style.left = `-${
        this.count * this.sliderWidth
      }px`
    },
    optimizeWidth() {
      this.sliderWidth = this.$el.offsetWidth
      this.$el.querySelectorAll('.slide').forEach((slide) => {
        slide.style.width = `${this.$el.offsetWidth}px`
      })
    },
    handleTouch() {
      this.$el.addEventListener('touchstart', (e) => {
        this.touchStart = e.touches[0].clientX
      })
      this.$el.addEventListener('touchend', (e) => {
        this.touchEnd = e.changedTouches[0].clientX
        if (this.touchStart < this.touchEnd) {
          this.prev()
        } else if (this.touchStart > this.touchEnd) {
          this.next()
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.slider {
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  button {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(#232328, 0.5);
    cursor: pointer;
    img {
      width: 6px;
      height: 10px;
    }
  }
  .slide-next {
    right: 0;
    border-radius: 6px 0 0 6px;
    img {
      margin-left: 2px;
    }
  }
  .slide-prev {
    left: 0;
    border-radius: 0 6px 6px 0;
    img {
      transform: rotate(180deg);
      margin-right: 2px;
    }
  }
}
.slides {
  display: flex;
  position: relative;
  left: 0;
  width: max-content;
  height: 100%;
  transition: all ease 0.5s;
}
.slide {
  img {
    height: 100%;
    object-fit: cover;
  }
}
.points {
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(#232328, 0.4);
  padding: 0.125rem;
  border-radius: var(--fr);
}
.point {
  display: block;
  width: 0.25rem;
  height: 0.25rem;
  background-color: white;
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 0.25rem;
  }
  &.active {
    background-color: #565661;
  }
}
@media screen and (min-width: 420px) {
  .slider {
    button {
      width: var(--fr-2);
      height: var(--fr-2);
      img {
        width: var(--fr-m);
        height: var(--fr);
      }
    }
    .slide-next {
      right: 0;
      border-radius: 6px 0 0 6px;
      img {
        margin-left: 4px;
      }
    }
    .slide-prev {
      left: 0;
      border-radius: 0 6px 6px 0;
      img {
        transform: rotate(180deg);
        margin-right: 4px;
      }
    }
    .points {
      padding: 0.25rem;
    }
    .point {
      width: 0.375rem;
      height: 0.375rem;
      &:not(:last-of-type) {
        margin-right: 0.375rem;
      }
    }
  }
}
</style>
