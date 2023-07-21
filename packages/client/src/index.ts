import axios from 'axios'
export * as axios from 'axios'
import { getClientConfig, ClientProps, ClientConfig } from './config'
export type { Message, Conversation, User, State, Event, ModelFile as File, Bot, Integration } from './gen'
export * from './gen/errors'
import { ApiClient as AutoGeneratedClient } from './gen/client'

export class Client extends AutoGeneratedClient {
  public readonly config: ClientConfig

  public constructor(clientProps: ClientProps = {}) {
    const clientConfig = getClientConfig(clientProps)
    const { host, headers, withCredentials, timeout } = clientConfig

    const axiosClient = axios.create({
      maxBodyLength: 100 * 1024 * 1024, // 100MB
      maxContentLength: 1024 * 1024 * 1024, // 100MB
      timeout: timeout ?? 60_000,
      withCredentials,
      headers,
    })

    super(undefined, host, axiosClient)

    this.config = clientConfig
  }
}