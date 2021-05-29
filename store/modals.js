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
  resetForm(ctx, form) {
    console.log(form)
    ctx.commit('setAnswerTo', [])
    ctx.commit('setPhotos', [])
    form.reset()
    form.querySelector('.modal--photos-files').innerHTML = ''
  },
  errorsHandler(ctx, errors) {
    const keys = []
    Object.entries(errors).forEach((el) => {
      const key = el[0]
      const value = el[1]
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
  async submit(ctx, payload) {
    const formData = new FormData(payload.form)

    formData.append('message_type', payload.message_type)
    ctx.state.answer_to.forEach((el) => {
      formData.append('answer_to', el)
    })
    ctx.state.photos.forEach((el, idx) => {
      if (idx < 5) formData.append(`file_${idx + 1}`, el)
      else return false
    })

    if (ctx.state.errMsgElems?.length) {
      ctx.state.errMsgElems.forEach((key) => {
        const invalidElem = document.getElementById(key)

        if (invalidElem) {
          const errMsgElem = document.querySelector(`.for-${key}`)
          invalidElem.classList.remove('invalid')
          console.log(errMsgElem)
          if (errMsgElem) errMsgElem.innerText = ''
        }
      })
    }

    try {
      let request
      if (payload.message_type === 'feedback' || payload.message_type === 'complaint') {
        request = await this.$api.messages.messageInput(formData)
      }
      if (payload.message_type === 'certification') {
        formData.append('studio', 1)
        request = await this.$api.messages.messageRequest(formData)
      }
      if (payload.message_type === 'proposal') {
        Object.entries(payload.data).forEach((value) => {
          if (value[1]) formData.append(value[0], value[1])
        })
        formData.forEach((value, key) => {
          console.log(key)
          console.log(value)
        })
        request = await this.$api.studios.postToDB(formData)
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
