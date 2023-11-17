// import { restTransportByFetchBrowser } from '@/helpers/api-by-fetch'

// const { get: getByTransport } = restTransportByFetchBrowser()

// //
// export const useServerGetList = (
//   url: string,
//   body?: {
//     searchOption?: { [key: string]: any }
//     pagination?: { [key: string]: any }
//   },
//   config?: any,
// ) => {
//   const options = { ...body?.searchOption, ...body?.pagination }

//   const get = async () => {
//     try {
//       let res = null

//       res = getByTransport(url, options, config)

//       const json = await res.json()

//       if (res.ok) {
//         if (json?.data) {
//           return json?.data
//         }
//       }

//       handleError(json?.data?.errors)

//       return null // useSWR require return null if error
//     } catch (errorAPI) {
//       console.log(errorAPI)
//       return null
//     } finally {
//       // _addLoadingTime(startTime, setLoading)
//     }
//   }

//   return { get, options, url }
// }

// //
// export const useServerGetDetailById = (
//   url: string,
//   body: { id: string; options?: { [key: string]: any } },
//   config?: any,
// ) => {
//   //
//   const urlRequest = new URL(
//     process.env.NEXT_PUBLIC_DOMAIN_API + url + `/${body.id}`,
//   )

//   const options = { ...body?.options }

//   const get = async () => {
//     try {
//       let res = null

//       res = getByTransport(url, options, config)

//       const json = await res.json()

//       if (res.ok) {
//         if (json?.data) {
//           return json?.data
//         }
//       }

//       handleError(json?.data?.errors)

//       return null // useSWR require return null if error
//     } catch (errorAPI) {
//       console.log(errorAPI)
//       return null
//     }
//   }

//   return { get, options, url, id: body.id }
// }

// //
// export const useServerGetGrapQL = (
//   url: string,
//   body?: {
//     searchOption?: { [key: string]: any }
//     pagination?: { [key: string]: any }
//   },
//   config?: any,
// ) => {
//   const options = { ...body?.searchOption, ...body?.pagination }

//   const get = async () => {
//     try {
//       let res = null

//       res = getByTransport(url, options, config)

//       const json = await res.json()

//       if (res.ok) {
//         if (json?.data) {
//           return json?.data
//         }
//       }

//       handleError(json?.data?.errors)

//       return null // useSWR require return null if error
//     } catch (errorAPI) {
//       console.log(errorAPI)
//       return null
//     } finally {
//       // _addLoadingTime(startTime, setLoading)
//     }
//   }

//   return { get, options, url }
// }

// //
// const handleError = (errors?: string | string[]) => {
//   if (Array.isArray(errors) && errors.length > 0) {
//     console.log(errors[0])
//   } else {
//     console.log(new Error('Something went wrong'))
//   }
// }
