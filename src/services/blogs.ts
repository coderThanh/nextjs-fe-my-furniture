import AppApi from "@/models/api";

export async function getBlogs(queryString?: string, options?: RequestInit) {
  var url: string = AppApi.blogs;

  if (queryString) {
    url += "?" + queryString;
  }

  const res = await fetch(url, {
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
