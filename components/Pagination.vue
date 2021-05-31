<template>
  <div v-if="pagesLength > 1" class="pagination">
    <button v-if="pageNumber - 1 > 0">...</button>
    <div v-for="paginationNumber in paginationNumbers" :key="paginationNumber">
      <button
        :class="{
          'pagination--btn-active': pageNumber === paginationNumber,
        }"
        @click="paginate(+paginationNumber)"
      >
        {{ paginationNumber }}
      </button>
    </div>
    <button
      v-if="pageNumber + 2 >= pagesLength"
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
  props: {
    length: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    pageNumber() {
      return this.$store.state.studios.page
    },
    pagesLength() {
      return Math.round(this.length / 12)
    },
    paginationNumbers() {
      const paginationNumbers = []
      const start = this.pageNumber - 2
      const end = start + 4
      for (let i = start; i <= end; i += 1) {
        if (i > 0 && i < this.pagesLength) {
          paginationNumbers.push(i)
        }
      }
      return paginationNumbers
    },
  },
  methods: {
    paginate(pageNumber) {
      this.$store.dispatch('studios/paginate', pageNumber)
      this.$nextTick().then(this.$scrollToTop())
    },
  },
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  align-self: center;
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
