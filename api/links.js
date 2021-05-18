import { client } from './client'

export function getLinksOptions() {
  return client.get('useful_links/options/')
}

export function getLinks(category) {
  return client.get(`useful_links/links/${category}`)
}

export function linksCategoryLength() {
  return client.get('useful_links/count/')
}
