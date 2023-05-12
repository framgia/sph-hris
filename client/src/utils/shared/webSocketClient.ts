import { createClient, Client } from 'graphql-ws'

let client: Client | null = null

export function getWebsocketClient(): Client {
  if (client == null) {
    client = createClient({
      url: process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL as string
    })
  }

  return client
}
