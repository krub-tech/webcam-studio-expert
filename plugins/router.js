import { dynamicRoutes } from '../routes'
import { getUniqueCities } from '../api/cities'
import { toTranslite } from '../helpers'

export default ({ app }) => {
  // Every time the route changes (fired on initialization too)
  app.router.beforeEach(async (to, from, next) => {
    const registredRoutes = await dynamicRoutes()
    const cityRoutes = await getUniqueCities()
    cityRoutes.forEach((city) => {
      registredRoutes.push(`/${toTranslite(city)}`)
    })
    registredRoutes.push('/')
    console.log(registredRoutes)
    if (!registredRoutes.includes(to.path)) next(from.path)
    else next()
  })
}
