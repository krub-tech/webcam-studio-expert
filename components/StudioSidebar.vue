<template>
  <div>
    <MobileListCard v-for="studio in studios" :key="studio.id" :studio="studio" />
  </div>
</template>

<script>
import MobileListCard from '@/components/MobileListCard'

// import { getStudiosByCity } from '@/api/studios'

export default {
  name: 'StudioSidebar',
  components: {
    MobileListCard,
  },
  props: {
    studios: {
      type: Array,
      required: true,
    },
  },

  methods: {
    // getStudiosByCity,
  },
}
</script>

<style></style>
