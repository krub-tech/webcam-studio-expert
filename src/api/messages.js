import { client } from './client';

export function getMessageOptions() {
  return client.get('message/options/');
}
