<template>
  <main v-if="studio && studiosOptions" class="studio">
    <div class="studio--title">
      <button class="btn-back" @click="$router.go(-1)" />
      <h2>{{ studio.name }}</h2>
      <div class="studio--btn-like">
        <Like :id="studio.id" />
      </div>
      <button
        class="studio--btn-interview"
        @click.prevent="$store.commit('modals/setCurrent', 'Interview')"
      >
        Оставить заявку
      </button>
    </div>
    <div class="studio--main">
      <div class="studio--avatar">
        <img :src="studio.avatar" :alt="studio.name" />
      </div>
      <div class="onoff-years">
        <template v-if="studio.studio_type">
          <p
            v-for="type in Object.values(studio.studio_type)"
            :key="type"
            class="studio--studio_type"
          >
            {{ studiosOptions.studio_type[type] }}
          </p>
        </template>
        <template v-if="studio.models_age">
          <p
            v-for="age in Object.values(studio.models_age)"
            :key="age"
            class="studio--models_age"
          >
            {{ studiosOptions.models_age[age] }}
          </p>
        </template>
      </div>
      <div class="work-with-perc-cert">
        <template v-if="studio.working_with_model_types">
          <p
            v-for="icon in Object.values(studio.working_with_model_types)"
            :key="icon"
            class="studio--model_types"
          >
            <img :src="require(`@/assets/svg/i-${icon}.svg`)" />
            <span class="title">
              {{ studiosOptions.working_with_model_types[icon] }}
            </span>
          </p>
        </template>
        <p class="studio--min_payout_percentage">
          {{ studio.min_payout_percentage }}-{{ studio.max_payout_percentage }}%
        </p>
        <template v-if="studio.certified">
          <p class="studio--certificate">Студия<a href="#">сертифицирована</a></p>
        </template>
      </div>
    </div>
    <span class="clr" />
    <div class="studio--address">
      {{ studio.address }}
    </div>
    <div v-if="studio.metro && studio.metro.length" class="studio--metro">
      <p v-for="metro in studio.metro" :key="metro.id">
        {{ metro.station_name }} <b>{{ metro.distance }} м.</b>
      </p>
    </div>
    <div class="studio--conditions">
      <h3>Условия работы</h3>
      <template v-if="studio.conditions">
        <p
          v-for="condition in Object.values(studio.conditions)"
          :key="condition"
          class="studio--condition"
        >
          {{ studiosOptions.conditions[condition] }}
        </p>
        <p class="studio--condition">от {{ studio.shift_length }} ч в день</p>
        <p class="studio--condition">
          от {{ studio.max_shifts_per_week }} дней в неделю
        </p>
        <p
          v-if="studio.support_staff.find((el) => el === 'trainer')"
          class="studio--condition"
        >
          Есть тренеры
        </p>
        <p
          v-if="studio.support_staff.find((el) => el === 'operator_translator')"
          class="studio--condition"
        >
          Есть операторы
        </p>
        <p class="studio--condition condition-staff_gender">
          Пол администраторов:
          <span>{{ studiosOptions.staff_gender[studio.staff_gender] }}</span>
        </p>
      </template>
    </div>
    <div class="studio--devices">
      <h3>Оборудование</h3>
      <template v-if="studio.devices">
        <p
          v-for="device in Object.values(studio.devices)"
          :key="device"
          class="studio--device"
        >
          {{ studiosOptions.devices[device] }}
        </p>
      </template>
    </div>
    <div class="studio--sites">
      <h3>Работа на сайтах</h3>
      <template v-if="studio.work_with_sites">
        <p
          v-for="site in Object.values(studio.work_with_sites)"
          :key="site"
          class="studio--site"
        >
          <a href="#">
            {{ studiosOptions.work_with_sites[site] }}
          </a>
        </p>
      </template>
    </div>
    <div class="studio--slider">
      <Slider :data="slides" />
    </div>
    <h5 v-if="studio.advantages" class="studio--remark">
      <div v-html="studio.advantages" />
    </h5>
    <div v-if="studio.bonuses_for_models" class="studio--bonus">
      <h4>Бонусы</h4>
      <div v-html="studio.bonuses_for_models" />
    </div>
    <div class="studio--desc">
      <h4>Описание студии</h4>
      <div v-html="studio.description" />
    </div>
    <div class="studio--interview">
      <div
        class="studio--btn-like"
        :class="{ liked: isLiked }"
        @click="mobileLikeClickHandle"
      >
        <Like :id="studio.id" />
      </div>
      <button
        class="studio--btn-interview"
        @click.prevent="$store.commit('modals/setCurrent', 'Interview')"
      >
        Записаться на собеседование
      </button>
    </div>
    <div class="studio--contacts">
      <p>
        <a :href="studio.site" target="_blank">{{ studio.site }}</a>
      </p>
      <p>
        <a :href="`tel:${studio.phone}`">{{ studio.phone }}</a>
      </p>
      <div>
        <a :href="`https://wa.me/${studio.phone}`" class="studio--btn-whtsp" />
        <a :href="`viber://add?number=${studio.phone}`" class="studio--btn-viber" />
      </div>
    </div>
  </main>
</template>

<script>
import Like from '@/components/buttons/Like'

export default {
  name: 'Studio',
  components: {
    Like,
  },
  props: {
    studio: {
      type: Object,
      required: true,
    },
  },
  computed: {
    studiosOptions() {
      return this.$store.state.studios.options
    },
    slides() {
      const result = []
      for (let i = 0; i < 5; i += 1) {
        const fieldName = `image_${i}`
        if (this.studio[fieldName]) result.push(this.studio[fieldName])
      }
      return result
    },
    isLiked() {
      let result = false
      this.$store.state.studios.favorites.forEach((el) => {
        if (el.id === this.studio.id) result = true
      })
      return result
    },
  },
  methods: {
    mobileLikeClickHandle() {
      if (this.$store.getters.isMobile)
        this.$store.dispatch('studios/toFavorites', this.studio.id)
    },
  },
}
</script>

<style lang="scss">
@mixin line-height {
  line-height: 1.5rem;
}
@mixin bottom-line {
  padding-bottom: var(--fr-l);
  border-bottom: 1px solid #eeeef6;
  margin-bottom: var(--fr-2);
}
@mixin row-gap {
  margin-bottom: var(--fr-l);
}
@mixin small-point {
  position: relative;
  margin-right: 30px;
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
@mixin small-point-from-left {
  position: relative;
  margin-left: 12px;
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    bottom: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: var(--black);
    opacity: 0.1;
    left: -18px;
    @content;
  }
}
@mixin icon {
  display: none;
  width: var(--fr);
  height: var(--fr);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @content;
}

.studio {
  min-width: 300px;
  p {
    display: inline-block;
  }
  h4 {
    font-size: 1.125rem;
  }
}
.studio--title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include row-gap;

  h2 {
    font-size: 1.5rem;
    flex-grow: 2;
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
  .studio--btn-interview {
    display: none;
  }
}
.studio--btn-like {
  width: var(--fr-2);
  height: var(--fr-2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4cd;
  border-radius: 0.5rem;
  cursor: pointer;
}
.studio--btn-interview {
  height: var(--fr-2);
  background: linear-gradient(86.42deg, #b4dbff 0%, #bef3ff 100%);
  border-radius: 0.5rem;
  padding: var(--fr-m) 1rem;
}
.studio--avatar {
  float: left;
  width: 50%;
  height: 130px;
  padding-right: var(--fr-l);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 2px solid #f1f1f8;
    border-radius: 8px;
  }
}
.studio--studio_type {
  width: 100%;
}
.studio--models_age:not(:last-of-type) {
  margin-right: 1rem;
  @include small-point;
}
.studio--main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .onoff-years {
    float: left;
    width: 50%;
    height: 130px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px 0;
  }
  .work-with-perc-cert {
    clear: both;
    width: 100%;
    margin-top: var(--fr);
  }
}
.studio--model_types {
  display: inline-block;
  width: 50%;
  margin-bottom: 1rem;
  img {
    width: max-content;
    display: inline-block;
    transform: translateY(25%);
  }
  .title {
    display: inline-block;
    margin-left: 0.5rem;
  }
}
.studio--min_payout_percentage {
  font-weight: bold;
  margin-right: var(--fr);
}
.studio--certificate {
  width: max-content;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin: 0.5rem 0;
  margin-left: var(--fr-l);
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
.studio--address {
  height: 120px;
  display: flex;
  align-items: center;
  position: relative;
  line-height: 1.3;
  border-top: 1px solid #eeeef6;
  border-bottom: 1px solid #eeeef6;
  margin: var(--fr-l) 0 var(--fr-2) 0;
  padding-left: var(--fr-2);
  &::before {
    content: '';
    position: absolute;
    width: var(--fr);
    height: var(--fr);
    left: 0;
    background-image: url('~@/assets/svg/i-location.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
.studio--metro {
  margin: var(--fr-l) 0 var(--fr-2) 0;
  padding-bottom: 40px;
  border-bottom: 1px solid #eeeef6;
  p {
    line-height: 2;
    &:not(:last-of-type) {
      @include small-point;
    }
    b {
      color: var(--dark-grey);
    }
  }
}
.studio--conditions {
  @include row-gap;
  h3 {
    font-weight: normal;
    color: #8b8ba3;
    margin-bottom: 1rem;
  }
}
.studio--condition {
  line-height: 2rem;
  &:not(:last-of-type) {
    @include small-point;
  }
}
.studio--devices,
.studio--sites {
  @extend .studio--conditions;
}
.studio--device,
.studio--site {
  @extend .studio--condition;
  a {
    color: var(--blue);
  }
}
.studio--slider {
  height: 200px;
  @include row-gap;
}
.studio--remark {
  display: none;
}
.studio--bonus {
  padding-bottom: 40px;
  border-bottom: 1px solid #eeeef6;
  margin-bottom: 40px;
  white-space: pre-line;
  & > *:not(h4) {
    font-weight: normal;
    font-size: 1rem;
    @include line-height;
  }
}
.studio--desc {
  white-space: pre-wrap;
  & > * {
    font-weight: normal;
    font-size: 1rem;
    @include line-height;
  }
}

.studio--ul {
  padding-left: var(--fr);
  list-style: none;
}
.studio--li {
  position: relative;
  @include line-height;
  &:not(:first-child) {
    margin-top: 1rem;
  }
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
    left: -18px;
  }
}
.studio--interview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-top: 1px solid #eeeef6;
  border-bottom: 1px solid #eeeef6;
  margin: var(--fr-2) 0;
  padding: 0 var(--fr);
  .studio--btn-like {
    width: 100%;
    background-position: 5% center;
    margin-top: var(--fr-2);
    @include row-gap;
    .like {
      display: none;
    }
    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      left: calc(20px + 7vw);
      background-image: url('~@/assets/svg/i-heart.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
    &::after {
      content: 'Добавить в избранное';
      width: 100%;
      height: 100%;
      padding-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.liked {
      border: 1px solid #ff74bf;
      &::before {
        background-image: url('~@/assets/svg/i-heart-fill.svg');
      }
    }
  }
  .studio--btn-interview {
    width: 100%;
    margin-bottom: var(--fr-2);
  }
}
.studio--contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: var(--fr-l);
  p {
    margin-bottom: 1rem;
  }
  div {
    display: flex;
    align-items: center;
  }
}
.studio--btn-whtsp,
.studio--btn-viber {
  width: 1.5rem;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.studio--btn-whtsp {
  background-image: url('~@/assets/svg/i-whatsapp.svg');
  @include small-point;
}
.studio--btn-viber {
  background-image: url('~@/assets/svg/i-viber.svg');
}

.clr {
  display: block;
  clear: both;
}

@media screen and (min-width: 420px) {
  .studio {
    grid-area: main;
    width: 640px;
    background-color: white;
    border-radius: 1rem;
    padding: var(--fr-2) var(--fr-l) var(--fr) var(--fr-l);
  }
  .studio--title {
    @include bottom-line;
    .studio--btn-interview {
      display: block;
    }
  }
  .studio--btn-interview {
    margin-left: 1rem;
  }
  .studio--avatar {
    width: 150px;
  }
  .studio--main {
    display: block;
    .onoff-years {
      width: 410px;
      height: 40px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      padding: 0;
    }
    .work-with-perc-cert {
      clear: none;
      float: left;
      width: 410px;
      height: 80px;
      margin-left: 0;
      margin-top: 0;
      p {
        width: max-content;
      }
    }
  }
  .studio--studio_type {
    width: max-content;
    @include small-point;
  }
  .studio--model_types {
    width: max-content;
    &:not(:first-child):not(:nth-child(4)) {
      @include small-point-from-left;
    }
    &:first-child {
      margin-right: 18px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        bottom: 0;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: var(--black);
        opacity: 0.1;
        right: -18px;
      }
    }
    margin-right: 1.5rem;
  }
  .studio--min_payout_percentage {
    margin-top: 6px;
    margin-left: 8px;
  }
  .studio--address {
    margin: var(--fr-l) 0 var(--fr-2);
  }
  .studio--slider {
    height: 360px;
  }
  .studio--remark {
    display: block;
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5rem;
    border: 1px solid #e5e5f0;
    border-radius: 6px;
    padding: 1rem var(--fr);
    @include row-gap;
  }
  .studio--interview {
    position: relative;
    flex-direction: row;
    .studio--btn-like {
      display: flex;
      width: var(--fr-2);
      position: absolute;
      left: 0;
      background-position: center;
      margin: 0;
      .like {
        display: block;
      }
      &.liked {
        background-color: #fefeff;
        border: 1px solid #c4c4cd;
      }
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
    .studio--btn-interview {
      width: max-content;
      margin: var(--fr-2) 0;
    }
  }
  .studio--contacts {
    flex-direction: row;
    p {
      margin-bottom: 0;
      @include small-point;
    }
  }
}

.condition-staff_gender {
  span {
    text-transform: lowercase;
  }
}

@media screen and (min-width: 1280px) {
  .studio-wrapper {
    justify-content: center;
  }
}
</style>
