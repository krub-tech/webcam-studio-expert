import createApi from '~/api/index'

export default (ctx, inject) => {
  inject('api', createApi(ctx.$axios))
}
