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
  previewImg(ctx, data) {
    const reader = new FileReader()
    reader.onloadend = () => {
      data.preview.src = reader.result
    }
    if (data.file) {
      reader.readAsDataURL(data.file)
    }
  },
  filesInputHandle(ctx, data) {
    const previews = data.el.querySelector('.modal--photos-files')
    Object.values(data.files).forEach((value) => {
      let preview
      if (value.type?.match('image')) {
        preview = document.createElement('img')
        ctx.dispatch('previewImg', { preview, file: value })
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
        if (!ctx.photos?.length) data.files = null
        ctx.commit('updatePhotos', value)
      })
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
    Object.entries(errors).forEach((el) => {
      const key = el[0]
      const value = el[1]
      const invalidElem = document.getElementById(key)

      if (invalidElem) {
        const errMsgElem = document.querySelector(`.for-${key}`)
        ctx.commit('updateErrMsgElems', key)
        invalidElem.classList.add('invalid')
        errMsgElem.innerText = value
      }
    })
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

    if (ctx.state.errMsgElems?.length)
      ctx.state.errMsgElems.forEach((key) => {
        const invalidElem = document.getElementById(key)

        if (invalidElem) {
          const errMsgElem = document.querySelector(`.for-${key}`)
          invalidElem.classList.remove('invalid')
          errMsgElem.innerText = ''
        }
      })

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
        if (ctx.state.address)
          formData.append('address_json', JSON.stringify(ctx.state.address))
        formData.delete('message_type')
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

    payload.form.files = null
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
  setAddress(state, payload) {
    state.address = payload
  },
  updateErrMsgElems(state, payload) {
    this.$toArray(state.errMsgElems, payload)
  },
}
