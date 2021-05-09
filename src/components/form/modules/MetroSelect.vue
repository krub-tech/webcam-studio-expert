<template>
    <div v-if="metroList.length" class="city-metro form-module">
        <MultiSelect
            :placeholder="'Метро'"
            :options="metroList"
            :selected="selected"
            @selectedOptions="metroSelect"
        />
    </div>
</template>

<script>
import MultiSelect from '@/components/MultiSelect';

import { getMetroByCity } from '@/api/cities';

export default {
  name: 'MetroSelect',
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
      metroList: [],
    };
  },
  computed: {
    selected() {
      return this.$store.state.cities.selectedMetro;
    },
  },
  watch: {
    city: {
      async handler() {
        this.getMetro();
      },
      deep: true,
    },
  },
  mounted() {
    this.getMetro();
  },
  methods: {
    getMetroByCity,
    async getMetro() {
      const response = await getMetroByCity(this.city);
      this.metroList = [...new Set(response.map((el) => el.name))];
    },
    metroSelect(payload) {
      localStorage.selectedMetro = JSON.stringify(payload);
      this.$store.dispatch('updateSelectedMetro', payload);
    },
  },
};
</script>

<style lang="scss"></style>
