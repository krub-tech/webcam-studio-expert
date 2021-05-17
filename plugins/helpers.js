export default ({ app }, inject) => {
  inject('toArray', (array, payload) => {
    const idx = array.indexOf(payload)
    if (idx === -1) array.push(payload)
    else array.splice(idx, 1)
    return array
  })
}
