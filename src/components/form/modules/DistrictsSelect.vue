<template>
    <div v-if="districtsList.length" class="city-districts form-module">
        <MultiSelect
            :placeholder="'Район'"
            :options="districtsList"
            :selected="selected"
            @selectedOptions="districtsSelect"
        />
    </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect';

import { getDistrictsByCity } from '@/api/cities';

export default {
  name: 'DistrictsSelect',
  components: {
    MultiSelect,
  },
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      districtsList: [],
    };
  },
  computed: {
    selected() {
      return this.$store.state.cities.selectedDistricts;
    },
  },
  watch: {
    city: {
      async handler() {
        this.districtsList = await getDistrictsByCity(this.city);
      },
      deep: true,
    },
  },
  async mounted() {
    this.districtsList = await getDistrictsByCity(this.city);
  },
  methods: {
    getDistrictsByCity,
    districtsSelect(payload) {
      localStorage.selectedDistricts = JSON.stringify(payload);
      this.$store.dispatch('updateSelectedDistricts', payload);
    },
  },
};
</script>

<style lang="scss"></style>
