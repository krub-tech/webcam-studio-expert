export default ({ $axios }) => {
  $axios.onRequest((config) => {
    // Django CSRF configuration
    config.xsrfCookieName = 'csrftoken'
    config.xsrfHeaderName = 'X-CSRFToken'
  })
}
