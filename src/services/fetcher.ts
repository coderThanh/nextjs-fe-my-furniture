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
