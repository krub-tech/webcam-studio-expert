export const modals = {
  computed: {
    selectedDevices() {
      return this.nameByKeys('devices')
    },
    years() {
      const now = new Date().getFullYear()
      const res = []
      for (let i = 0; i < 20; i += 1) {
        res.push(now - 18 - i)
      }
      return res
    },
    options() {
      return this.$store.state.modals.options
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
      if (!this.formData.answer_to) this.formData.answer_to = []
      this.$toArray(this.formData.answer_to, answer)
    },
    filesInputHandle(e) {
      if (!this.files) this.files = []
      const previews = this.$el.querySelector('.modal--photos-files')
      Object.values(e.target.files).forEach((value, idx) => {
        if (idx < 5 && this.files.length < 5) {
          let preview
          if (value.type?.match('image')) {
            preview = document.createElement('img')
            this.$previewImg({ preview, file: value })
          } else {
            preview = document.createElement('div')
            preview.innerText = value.name
            preview.classList.add('badge')
          }
          const previewWrapper = document.createElement('div')
          previewWrapper.classList.add('preview-wrapper')
          previewWrapper.appendChild(preview)
          previews.appendChild(previewWrapper)

          this.$toArray(this.files, value)

          previewWrapper.addEventListener('click', () => {
            previewWrapper.remove()
            if (!this.files?.length) e.target.value = ''
            this.$toArray(this.files, value)
          })
        }
      })
    },
    phoneInputHandle(e, selector) {
      this.$phoneFormat(e)
      this.formData[selector] = e.target.value.replace(/\D/g, '')
    },

    filesToFormData(formData, key) {
      this.files?.forEach((el, idx) => {
        if (idx < 5) formData.append(`${key}_${idx + 1}`, el)
        else return false
      })
    },
    errorsHandler(err) {
      Object.entries(err).forEach(([key, value]) => {
        const invalidElem = document.getElementById(key)
        if (invalidElem) {
          const errMsgElem = document.querySelector(`.for-${key}`)

          invalidElem.classList.add('invalid')
          errMsgElem.innerText = value
        }
      })
      this.errors = err
    },
    clearErrors() {
      if (this.errors) {
        Object.keys(this.errors).forEach((key) => {
          const invalidElem = document.getElementById(key)

          if (invalidElem) {
            const errMsgElem = document.querySelector(`.for-${key}`)
            invalidElem.classList.remove('invalid')
            if (errMsgElem) errMsgElem.innerText = ''
          }
        })
      }
    },
    formDataAdd(payload) {
      Object.entries(payload.data).forEach(([key, value]) => {
        if (value?.length && typeof value !== 'string') {
          value.forEach((l) => payload.formData.append(key, l))
        } else if (typeof value === 'string' || key === 'avatar')
          payload.formData.append(key, value)
      })
    },
  },
}
