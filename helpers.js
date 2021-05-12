import CyrillicToTranslit from 'cyrillic-to-translit-js'

function toTranslite(city) {
  const result = new CyrillicToTranslit().transform(city)
  return result.split(' ').join('-').toLowerCase()
}

function toCyrillic(city) {
  const result = new CyrillicToTranslit().reverse(city)
  return result
    .split('-')
    .map((word) => {
      return word[0].toUpperCase() + word.substr(1)
    })
    .join('-')
}

export { toTranslite, toCyrillic }
