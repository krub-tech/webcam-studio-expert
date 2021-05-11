<template>
  <div class="studios--results">
    <Cards />
  </div>
</template>

<script>
import Cards from '@/components/Cards'

import { getDistrictsByCity } from '@/api/cities'
export default {
  name: 'StudiosByCity',
  components: {
    Cards,
  },
  layout: 'studios',
  asyncData({ params }) {
    const city = params.city
    return { city }
  },
  data() {
    return {
      disticts: null,
    }
  },
  async fetch() {
    this.disticts = await this.getDistrictsByCity(this.city)
  },
  methods: {
    getDistrictsByCity,
  },
}
</script>

<style lang="scss">
.studios--results {
  grid-area: cont;
}
@media screen and (min-width: 420px) {
  .studios--results {
    padding-left: var(--fr-l);
  }
}
@media screen and (min-width: 13600px) {
  .studios--results {
    padding-left: var(--fr-2);
  }
}
</style>
