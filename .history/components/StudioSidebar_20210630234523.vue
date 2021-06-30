<template>
  <aside class="studio--sidebar">
    <div class="studio--sidebar-header">
      <button class="btn-filter" @click="$router.push({ name: 'city' })">
        <img src="@/assets/svg/i-back_arrow.svg" />
        К фильтру
      </button>
      <button
        class="btn-favorites"
        :class="{ btn_favorites_active: favoritesOpen }"
        @click="$router.push({ name: 'favorites' })"
      >
        Избранное
      </button>
    </div>

    <article
      v-for="studio in studios"
      :key="studio.id"
      class="studio--sidebar-card"
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
  computed: {
    favoritesOpen() {
      return this.$route.name === 'favorites'
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
<style lang="scss">
.studio--sidebar {
  display: block;
  min-width: 300px;
  margin: 0 var(--fr-l);
  grid-area: studios-list;
  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--fr-l);
    button {
      height: var(--fr-2);
      padding: 0.75rem;
      border-radius: 0.5rem;
    }
    .btn-filter {
      display: flex;
      align-items: center;
      background-color: #e5e5ef;
      img {
        margin-right: var(--fr-m);
      }
    }
    .btn-favorites {
      background-color: var(--white);
      border: 1px solid #c4c4cd;
      &.btn_favorites_active {
        border: 1px solid #ff93cd;
      }
    }
  }
  &-card {
    cursor: pointer;
    background-color: var(--white);
    color: #606074;
    border-radius: 0.5rem;
    padding: var(--fr);
    margin-bottom: 0.75rem;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      .name {
        font-weight: bold;
      }
    }
    .desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      .address {
        font-size: 16px;
      }
    }
    .certificate {
      position: relative;
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
        font-size: 16px;
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
@media screen and (min-width: 420px) {
  .studio--sidebar {
    margin: 0;
  }
}
</style>
