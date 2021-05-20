export default ({ $axios }) => {
  $axios.onRequest((config) => {
    // Django CSRF configuration
    if (config.method !== 'get') {
      config.xsrfCookieName = 'csrftoken'
      config.xsrfHeaderName = 'X-CSRFToken'
    }
  })
}
