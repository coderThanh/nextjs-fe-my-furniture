import request, { Variables } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";

export async function fetcher(
  input: RequestDestination | URL | string,
  options?: RequestInit
) {
  const res = await fetch(input, {
    headers: {
      Authorization: "bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
    },
    ...options,
  });

  // Recommendation: handle errors
  if (!res.ok) {
    const error = new Error("Failed to fetch data");
    error.message = await res.json();

    throw error;
  }

  const data = await res.json();

  return data;
}

export const fetcherGraphSQL = async <T>(
  query: string,
  variables?: Variables,
  requestHeaders?: GraphQLClientRequestHeaders
): Promise<T> => {
  const res = await request<T>(
    process.env.NEXT_PUBLIC_HOST_ROOT + "/graphql",
    query,
    variables,
    {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN,
      ...requestHeaders,
    }
  );

  return res;
};
