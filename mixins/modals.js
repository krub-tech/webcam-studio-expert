export const modals = {
  computed: {
    selectedDevices() {
      return this.nameByKeys('devices')
    },
  },
  methods: {
    nameByKeys(selector) {
      return Object.values(this.formData[selector]).map((el) => {
        return this.options[selector][el]
      })
    },
    checkboxHandle(payload, selector) {
      this.$toArray(this.formData[selector], payload)
    },
    rangeHandle(payload, selector) {
      this.formData[selector] = payload.toString()
    },
    selectHandle(payload, selector) {
      Object.entries(this.options[selector]).forEach(([key, value]) => {
        if (payload.includes(value)) {
          if (selector === 'staff_gender') {
            this.formData[selector] = key
          } else {
            let res
            Object.entries(this.options[selector]).forEach(([k, val]) => {
              if (val !== payload) {
                return false
              }
              res = k
            })
            this.$toArray(this.formData[selector], res)
          }
        }
      })
    },
    answerToHandler(answer) {
      this.$store.commit('modals/updateAnswerTo', answer)
    },
    filesInputHandle(e) {
      this.$store.dispatch('modals/filesInputHandle', {
        el: this.$el,
        input: e.target,
      })
    },
  },
}
