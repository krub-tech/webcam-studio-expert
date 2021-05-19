export function getStudiosOptions(client) {
  return client.$get('user/options/')
}

export function getStudiosByQuery(client, query) {
  console.log('query', query)
  return client.$get('user/studios/', { params: query })
}

export function getStudioById(client, id) {
  return client.$get(`user/studios/${id}/`)
}
