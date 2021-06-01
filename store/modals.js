/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

export const state = () => ({
  current: null,
  options: null,
  answer_to: [],
  photos: [],
  errMsgElems: [],

  address: null,
})

export const actions = {
  filesInputHandle(ctx, data) {
    const previews = data.el.querySelector('.modal--photos-files')
    Object.values(data.input.files).forEach((value, idx) => {
      if (idx < 5 && ctx.state.photos.length < 5) {
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

        ctx.commit('updatePhotos', value)

        previewWrapper.addEventListener('click', () => {
          previewWrapper.remove()
          if (!ctx.photos?.length) data.input.value = ''
          ctx.commit('updatePhotos', value)
        })
      }
    })
  },
  filesToFormData(ctx, payload) {
    ctx.state.photos.forEach((el, idx) => {
      if (idx < 5) payload.formData.append(`${payload.key}_${idx + 1}`, el)
      else return false
    })
  },
  specDataAdd(ctx, payload) {
    Object.entries(payload.data).forEach(([key, value]) => {
      if (value?.length && typeof value !== 'string') {
        value.forEach((l) => payload.formData.append(key, l))
      } else if (typeof value === 'string' || key === 'avatar')
        payload.formData.append(key, value)
    })
  },

  resetForm(ctx, form) {
    ctx.commit('setAnswerTo', [])
    ctx.commit('setPhotos', [])
    form.reset()
    form.querySelector('.modal--photos-files').innerHTML = ''
  },
  errorsHandler(ctx, errors) {
    const keys = []
    Object.entries(errors).forEach(([key, value]) => {
      const invalidElem = document.getElementById(key)
      keys.push(key)
      if (invalidElem) {
        const errMsgElem = document.querySelector(`.for-${key}`)

        invalidElem.classList.add('invalid')
        errMsgElem.innerText = value
      }
    })
    ctx.commit('setErrMsgElems', keys)
  },
  clearErrors(ctx) {
    if (ctx.state.errMsgElems?.length) {
      ctx.state.errMsgElems.forEach((key) => {
        const invalidElem = document.getElementById(key)

        if (invalidElem) {
          const errMsgElem = document.querySelector(`.for-${key}`)
          invalidElem.classList.remove('invalid')
          if (errMsgElem) errMsgElem.innerText = ''
        }
      })
    }
  },

  async submit(ctx, payload) {
    const formData = new FormData(payload.form)

    formData.append('message_type', payload.message_type)
    ctx.state.answer_to.forEach((el) => {
      formData.append('answer_to', el)
    })

    ctx.dispatch('clearErrors')

    try {
      let request

      if (payload.message_type === 'feedback' || payload.message_type === 'complaint') {
        ctx.dispatch('filesToFormData', { key: 'file', formData })
        request = await this.$api.messages.messageInput(formData)
      }
      if (payload.message_type === 'certification') {
        ctx.dispatch('filesToFormData', { key: 'file', formData })
        formData.append('studio', 1)
        request = await this.$api.messages.messageRequest(formData)
      }
      if (payload.message_type === 'proposal') {
        ctx.dispatch('filesToFormData', { key: 'image', formData })
        ctx.dispatch('specDataAdd', { data: payload.data, formData })

        formData.forEach((value, key) => {
          console.log(key)
          console.log(value)
        })

        request = await this.$api.studios.postToDB(formData)
      }
      if (payload.message_type === 'specselection') {
        // ctx.dispatch('filesToFormData', { key: 'file', formData })
        // formData.append('studio', 1)

        ctx.dispatch('specDataAdd', { data: payload.data, formData })
        formData.forEach((value, key) => {
          console.log(key)
          console.log(value)
        })

        request = await this.$api.messages.specSelection(formData)
      }

      console.log(request)
      ctx.dispatch('resetForm', payload.form)
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('errors', error.response.data)
        ctx.dispatch('errorsHandler', error.response.data)
      }
    }
  },
}

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
  },
  setOptions(state, payload) {
    state.options = payload
  },
  setAnswerTo(state, payload) {
    state.answer_to = payload
  },
  updateAnswerTo(state, payload) {
    this.$toArray(state.answer_to, payload)
  },
  setPhotos(state, payload) {
    state.photos = payload
  },
  updatePhotos(state, payload) {
    this.$toArray(state.photos, payload)
  },
  setErrMsgElems(state, payload) {
    state.errMsgElems = payload
  },
}
