/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

export const state = () => ({
  current: null,
  options: null,
  answer_to: [],
  photos: [],
  address: '',
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
      const invalidElem = document.getElementsByName(key)
      if (invalidElem[0]) {
        invalidElem[0].nextElementSibling.innerText = value
        invalidElem[0].classList.add('invalid')
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

    const invalids = payload.form.querySelectorAll('.invalid')
    if (invalids)
      invalids.forEach((el) => {
        el.classList.remove('invalid')
        if (el?.nextElementSibling) el.nextElementSibling.innerText = ''
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
}
