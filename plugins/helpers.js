export default ({ app }, inject) => {
  inject('toArray', (array, payload) => {
    const idx = array.indexOf(payload)
    if (idx === -1) array.push(payload)
    else array.splice(idx, 1)
    return array
  })
  inject('isChecked', (arr, key) => {
    let bool = false
    if (arr) {
      arr.forEach((el) => {
        if (el !== key) return
        bool = !bool
      })
    }
    return bool
  })
  inject('previewImg', (data) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      data.preview.src = reader.result
    }
    if (data.file) {
      reader.readAsDataURL(data.file)
    }
  })
  inject('scrollToTop', () => {
    const el = document.getElementById('__layout')
    el.scrollTo(0, 0)
  })
}
