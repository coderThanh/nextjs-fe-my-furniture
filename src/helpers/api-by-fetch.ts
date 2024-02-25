export const restTransportByFetchBrowser = () => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN

  const baseURL = `${process.env.NEXT_PUBLIC_HOST_API}:${process.env.NEXT_PUBLIC_HOST_PORT}`

  //
  const getGrapQl = async (
    query: string,
    variables: { [key: string]: any } = {},
    config: { [key: string]: any } = {},
  ) => {
    const urlRequest = new URL(baseURL + '/graphql')

    return await fetch(urlRequest.toString(), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ query: query, variables: variables }),
      cache: process.env.NODE_ENV == 'development' ? 'no-store' : 'reload',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      next:
        process.env.NODE_ENV == 'development'
          ? {}
          : {
              revalidate: 1200,
            },
      ...config,
    })
  }

  //
  const get = async (
    url: string,
    params: { [key: string]: any } = {},
    config: { [key: string]: any } = {},
  ) => {
    const urlRequest = new URL(baseURL + url)

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const element = params[key]

        if (element) {
          urlRequest.searchParams.append(key, element)
        }
      }
    }

    return await fetch(urlRequest.toString(), {
      method: 'GET',
      credentials: 'include',
      cache: process.env.NODE_ENV == 'development' ? 'no-store' : 'reload',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      next:
        process.env.NODE_ENV == 'development'
          ? {}
          : {
              revalidate: 1200,
            },
      ...config,
    })
  }

  //
  const post = async (
    url: string,
    data: { [key: string]: any },
    config: { [key: string]: any } = {},
  ) => {
    const urlRequest = new URL(baseURL + url)

    return await fetch(urlRequest.toString(), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      cache: 'no-store',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      ...config,
    })
  }

  return { get, post, getGrapQl }
}
