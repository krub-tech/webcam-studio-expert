export function postFormData(client, data) {
  return client.$post(data.query, data.formData)
}
