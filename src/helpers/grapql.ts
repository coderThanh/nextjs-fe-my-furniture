// Can delete

import { GraphQLClient } from 'graphql-request'

export const grapTransport = () => {
  const endpoint = `${process.env.NEXT_PUBLIC_HOST_API}:${process.env.NEXT_PUBLIC_HOST_PORT}/graphql`

  const client = new GraphQLClient(endpoint)

  client.setHeader(
    'Authorization',
    `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  )
  client.setHeader('Content-Type', `application/json`)

  const get = async (document, variabale = {}, config = {}) => {
    try {
      const res: any = await client.request(document, variabale, {
        ...config,
      })

      if (res) return res

      if (res?.error?.message) {
        console.log(res?.errors.message)
      }

      return null
    } catch (error) {
      if (error?.response?.error?.message)
        console.error(
          `Something wrong when fetch \n`,
          error?.response?.error?.message,
        )

      if (error?.response?.errors)
        console.error(
          `Something wrong when fetch \n`,
          error?.response?.errors[0]?.message,
        )

      return null
    }
  }

  return { get }
}
