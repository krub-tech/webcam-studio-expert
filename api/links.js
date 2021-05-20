export function getLinksOptions(client) {
  return client.$get('useful_links/options/')
}

export function getLinks(client, category) {
  return client.$get(`useful_links/links/${category}`)
}

export function linksCategoryLength(client) {
  return client.$get('useful_links/count/')
}
