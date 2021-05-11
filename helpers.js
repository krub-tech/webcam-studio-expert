import CyrillicToTranslit from 'cyrillic-to-translit-js'

function toTranslite(city) {
  const result = new CyrillicToTranslit().transform(city)
  return result.split(' ').join('-').toLowerCase()
}

function toCyrillic(city) {
  return new CyrillicToTranslit().reverse(city)
}

export { toTranslite, toCyrillic }
