<template>
  <div v-if="pagesLength > 1" class="pagination">
    <button v-if="pageNumber - paginationPadding - 1 > 0">...</button>
    <template v-for="paginationNumber in paginationNumbers">
      <button
        :key="paginationNumber"
        :class="{
          'pagination--btn-active': pageNumber === paginationNumber,
        }"
        @click="paginate(+paginationNumber)"
      >
        {{ paginationNumber }}
      </button>
    </template>
    <button
      v-if="pageNumber + paginationPadding >= pagesLength"
      :class="{
        'pagination--btn-active': pageNumber === pagesLength,
      }"
      @click="paginate(+pagesLength)"
    >
      {{ pagesLength }}
    </button>
    <button v-else>...</button>
  </div>
</template>

<script>
export default {
  name: 'Paginate',
  data() {
    return {
      paginationRange: 4,
    }
  },
  computed: {
    currentStudiosLength() {
      return this.$store.getters.currentStudiosLength
    },
    pageNumber() {
      return this.$store.getters.pageNumber
    },
    pagesLength() {
      return Math.round(
        this.currentStudiosLength / this.$store.getters.paginationSize
      )
    },
    paginationPadding() {
      return Math.round(this.paginationRange / 2)
    },
    paginationNumbers() {
      const paginationNumbers = []
      const start = this.pageNumber - this.paginationPadding
      const end = start + this.paginationRange
      for (let i = start; i <= end; i++) {
        if (i > 0 && i < this.pagesLength) paginationNumbers.push(i)
      }
      return paginationNumbers
    },
  },
  mounted() {},
  methods: {
    paginate(pageNumber) {
      this.$store.dispatch('paginate', pageNumber)
    },
  },
}
</script>

<style lang="scss">
.pagination {
  height: var(--fr-2);
  width: max-content;
  background-color: var(--white);
  border: 1px solid rgba(#c4c4cd, 0.4);
  border-radius: 0.5rem;
  padding: 0.25rem;
  button {
    width: var(--fr-2);
    height: 2rem;
  }
  &--btn-active {
    background-color: #ffc5e4;
    border-radius: 0.375rem;
  }
}
</style>
