import CyrillicToTranslit from 'cyrillic-to-translit-js'

function toTranslite(city) {
  return new CyrillicToTranslit().transform(city)
}

function toCyrillic(city) {
  return new CyrillicToTranslit().reverse(city)
}

export { toTranslite, toCyrillic }
