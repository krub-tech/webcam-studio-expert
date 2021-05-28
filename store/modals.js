/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

export const state = () => ({
  current: null,
  answer_to: [],
  photos: [],
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
    Object.values(data.event.target.files).forEach((value) => {
      let preview
      console.log(data.event.target.files)
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
        if (!ctx.photos?.length) data.event.target.files = null
        ctx.commit('updatePhotos', value)
      })
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
        el.nextElementSibling.innerText = ''
      })

    try {
      const request = await this.$api.messages.messageInput(formData)
      console.log(request)
      ctx.dispatch('resetForm', payload.from)
    } catch (error) {
      console.log('errors', error.response.data)
      ctx.dispatch('errorsHandler', error.response.data)
    }

    payload.form.files = null
  },
  resetForm(ctx, form) {
    ctx.commit('setAnswerTo', [])
    ctx.commit('setPhotos', [])
    form.querySelector('.modal--photos-files').innerHTML = ''
    form.reset()
  },
  errorsHandler(ctx, errors) {
    console.log(errors)
    Object.entries(errors).forEach((el) => {
      const key = el[0]
      const value = el[1]
      const invalidElem = document.getElementsByName(key)

      invalidElem[0].nextElementSibling.innerText = value
      invalidElem[0].classList.add('invalid')
    })
  },
}

export const mutations = {
  setCurrent(state, payload) {
    state.current = payload
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
}
