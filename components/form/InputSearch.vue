<template>
  <div class="input-search">
    <input
      :id="id"
      type="text"
      :value="value"
      @focus="focusHandle"
      @input="inputHandle($event.target.value)"
    />
    <label for="id" />
    <ul v-if="value && !isChoose" class="results">
      <li
        v-for="(result, key) in results"
        :key="result.id"
        @click="resultChooseHandle(results[key])"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  props: {
    value: {
      type: String,
      default: () => '',
    },
    results: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      input: null,
      isChoose: false,
    }
  },
  methods: {
    focusHandle() {
      // this.value = null
      this.inputHandle(null)
    },
    inputHandle(data) {
      this.isChoose = false
      this.$emit('value', data)
    },
    resultChooseHandle(result) {
      this.isChoose = true
      if (result) this.$emit('choose', result)
    },
  },
}
</script>

<style lang="scss">
@mixin input-invalid {
  border: 1px solid red;
  margin-bottom: 0;
  & + label {
    width: 100%;
    min-height: 28px;
    display: flex;
    justify-content: flex-start;
    color: red;
    font-size: 12px;
  }
  @content;
}

.input-search {
  height: 40px;
  position: relative;
  input {
    width: 100%;
    height: inherit;
    background-color: var(--white);
    border: 1px solid #c4c4cd;
    border-radius: 4px;
    padding: 10px 12px;

    &::placeholder {
      font-family: 'Averta CY';
      font-size: 1rem;
    }
    & + label {
      display: none;
    }
  }
  &.invalid {
    input {
      @include input-invalid;
    }
  }
  &.invalidMessageFromDB {
    @include input-invalid;
    & + label {
      position: relative;
    }
  }
}
.results {
  max-height: 300px;
  overflow: auto;
  scrollbar-width: none;
  list-style: none;
  position: absolute;
  left: 0;
  right: 0;
  transform: translateY(100%);
  border-radius: 0.5rem;
  bottom: -0.75rem;
  box-shadow: 0px 0px 100px #e1f0f9;
  z-index: 1;
  &::-webkit-scrollbar {
    width: 1.5rem;
    &-thumb {
      border: 0.5rem solid white;
      border-radius: 2rem;
      background-color: var(--grey);
    }
    &-track {
      background: white;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    &-button {
      display: none;
    }
  }
  li {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: white;
    padding-left: 16px;
    cursor: pointer;
    &:active,
    &.active {
      color: #e95ba8;
    }
  }
}
</style>
