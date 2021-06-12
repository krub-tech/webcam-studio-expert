import geoEndpoint from '~/api/geo'
import messagesEndpoint from '~/api/messages'
import studiosEndpoint from '~/api/studios'
import usefulLinksEndpoint from '~/api/usefulLinks'

export default ($axios) => ({
  geo: geoEndpoint($axios),
  messages: messagesEndpoint($axios),
  studios: studiosEndpoint($axios),
  usefulLinks: usefulLinksEndpoint($axios),
})
