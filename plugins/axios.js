import Cookie from 'js-cookie'

export default ({ $axios, store }, inject) => {
  $axios.onRequest((config) => {
    if (config.method !== 'get') {
      config.headers['X-CSRFTOKEN'] = Cookie.get('csrftoken')
    }
  })
}
