<template>
  <article
    class="card"
    @click="
      toStudio($event, {
        name: data.name.split(' ').join('-').toLowerCase(),
        id: data.id,
      })
    "
  >
    <div class="card--inner">
      <div class="card--img">
        <img :src="data.avatar" :alt="data.name" />
        <img :src="data.image_1" :alt="data.name" />
      </div>
      <div class="card--title">
        <!-- :class="{ 'card--title-best': data.haveCrown }" -->
        <h3>{{ data.name }}</h3>
        <Like :id="data.id" />
      </div>
      <template v-for="type in Object.values(data.studio_type)">
        <p
          v-if="studiosOptions && studiosOptions.studio_type"
          :key="type"
          class="card--studio-type"
        >
          {{ studiosOptions.studio_type[type] }}
        </p>
      </template>
      <div class="card--row">
        <div
          v-for="icon in Array.from(data.working_with_model_types)"
          :key="icon"
          class="card--model_types"
        >
          <img :src="require(`../assets/svg/i-${icon}.svg`)" />
        </div>
        <template v-if="studiosOptions && studiosOptions.models_age">
          <div
            v-for="age in Object.values(data.models_age)"
            :key="age"
            class="card--models_age"
          >
            {{ studiosOptions.models_age[age] }}
          </div>
        </template>
        <div class="card--min_payout_percentage">
          {{ data.min_payout_percentage }}-{{ data.max_payout_percentage }}%
        </div>
      </div>
    </div>
    <p
      class="card--address"
      :class="{ 'card--address-with-certificate': data.certified }"
    >
      {{ data.address }}
    </p>
    <template v-if="data.certified">
      <span class="card--line" />
      <div class="card--certificate">Студия<a href="#">сертифицирована</a></div>
    </template>
  </article>
</template>

<script>
import Like from '@/components/buttons/Like'

export default {
  name: 'Card',
  components: { Like },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    studiosOptions() {
      return this.$store.state.studios.options
    },
  },
  methods: {
    arrayFromObject(object) {
      return object ? Object.values(object) : []
    },
    toStudio(e, data) {
      if (e.target.tagName !== 'BUTTON')
        this.$router.push({
          name: 'city-name-id',
          params: {
            city: this.$route.params.city,
            name: data.name,
            id: data.id,
          },
        })
    },
  },
}
</script>

<style lang="scss">
@mixin small-point {
  position: relative;
  margin-right: 28px;
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    top: 50%;
    transform: translateY(-25%);
    border-radius: 50%;
    background-color: var(--black);
    opacity: 0.1;
    right: -18px;
    @content;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  padding: var(--fr);
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 0px 30px rgba(#5b5b83, 0.02);
  &--img {
    display: flex;
    overflow: hidden;
    border: 2px solid var(--color-second);
    border-radius: 8px;
    margin-bottom: var(--fr);
    height: 130px;
    img {
      width: 50%;
      object-fit: cover;
    }
  }
  &--title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: var(--fr);
      margin: 24px 0;
    }
    &-best {
      position: relative;
      padding-left: 30px;
      &::before {
        content: '';
        position: absolute;
        width: var(--fr);
        height: 18px;
        left: 0;
        background-image: url('~@/assets/svg/crown.svg');
      }
    }
  }
  &--studio-type {
    position: relative;
    display: inline-block;
    margin-bottom: 25px;
    margin-right: 30px;
    &:not(:last-of-type) {
      @include small-point;
    }
  }
  &--row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > * {
      margin-bottom: 20px;
    }
    & > *:not(:last-of-type) {
      @include small-point;
    }
    & > *:nth-child(5) {
      margin-right: 32px;
    }
  }
  &--model_types {
    min-width: var(--fr);
    display: inline-block;
  }
  &--models_age {
    height: 100%;
  }
  &--address {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    bottom: 24px;
    &-with-certificate {
      margin-bottom: 24px;
    }
  }
  &--line {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 56px;
    width: 100%;
    height: 1px;
    background-color: var(--grey);
  }
  &--certificate {
    width: max-content;
    height: 36px;
    position: relative;
    display: flex;
    align-items: flex-end;
    margin-left: 28px;
    &::before {
      content: '';
      position: absolute;
      width: var(--fr);
      height: 22px;
      left: -30px;
      bottom: 0;
      transform: translateY(12.5%);
      background-image: url('~@/assets/svg/i-cert.svg');
    }
    a {
      text-decoration: none;
      color: var(--blue);
      margin-left: 0.25rem;
    }
  }
}

@media screen and (min-width: 390px) and (max-width: 420px) {
  .card {
    &--img {
      height: 150px;
    }
  }
}

@media screen and (min-width: 420px) {
  .card {
    .card--row {
      & > *:nth-child(4) {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
