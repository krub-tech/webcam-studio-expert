<template>
  <article
    class="studio--mobile-list-card"
    @click="toStudio($event, studio.id)"
  >
    <div class="title">
      <p class="name">
        {{ studio.name }}
      </p>
      <p class="percent">
        {{ studio.min_payout_percentage }}-{{ studio.max_payout_percentage }}%
      </p>
    </div>
    <div class="desc">
      <p class="address">
        {{ studio.address }}
      </p>
      <Like :id="studio.id" />
    </div>

    <div v-if="studio.certified" class="certificate">
      <a href="#">Сертифицирована</a>
    </div>
  </article>
</template>

<script>
import Like from '@/components/buttons/like'
export default {
  name: 'MobileListCard',
  components: {
    Like,
  },
  props: {
    studio: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
