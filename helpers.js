import CyrillicToTranslit from 'cyrillic-to-translit-js'

function toTranslite(city) {
  const result = new CyrillicToTranslit().transform(city)
  return result.split(' ').join('-').toLowerCase()
}

function toCyrillic(city) {
  const result = new CyrillicToTranslit().reverse(city)
  if (result) {
    return result
      .split('-')
      .map((word) => {
        return word[0].toUpperCase() + word.substr(1)
      })
      .join('-')
  }
}

function toArray(array, payload) {
  const idx = array.indexOf(payload)
  if (idx === -1) array.push(payload)
  else array.splice(idx, 1)
  return array
}

export { toTranslite, toCyrillic, toArray }
