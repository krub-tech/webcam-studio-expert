import { toTranslite } from './helpers'
import { getUniqueCities } from './api/cities'
import { getStudiosByCity } from './api/studios'

const dynamicRoutes = async () => {
  const cities = await getUniqueCities()
  const routes = []
  await Promise.all(
    cities.map(async (city) => {
      const studiosByCity = await getStudiosByCity(city)
      studiosByCity.results.forEach((studio) => {
        return routes.push(
          `/${toTranslite(city).toLowerCase()}/${studio.name
            .split(' ')
            .join('-')
            .toLowerCase()}`
        )
      })
    })
  )
  return routes
}

export { dynamicRoutes }
