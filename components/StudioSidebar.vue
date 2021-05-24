<template>
  <aside>
    <article
      v-for="studio in studios"
      :key="studio.id"
      class="studio--mobile-list-card"
      @click="
        toStudio($event, {
          city: studio.city.id,
          name: studio.name.split(' ').join('-').toLowerCase(),
          id: studio.id,
        })
      "
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
  </aside>
</template>

<script>
import Like from '@/components/buttons/Like'

export default {
  name: 'StudioSidebar',
  components: {
    Like,
  },
  props: {
    studios: {
      type: Array,
      required: true,
    },
  },

  methods: {
    toStudio(e, data) {
      if (e.target.tagName !== 'BUTTON') {
        this.$router.push({
          name: 'city-name-id',
          params: {
            city: data.city,
            name: data.name,
            id: data.id,
          },
        })
      }
    },
  },
}
</script>

<style></style>
