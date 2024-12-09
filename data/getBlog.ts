// Define the Blog type to ensure type safety and clarity
interface BlogType {
  _id: string;
  name: string;
  content?: string;
  category: string;
  image: string;
  // Add other properties as needed based on your API response
}

// Retry function to handle retries in case of failure
const fetchWithRetry = async <T>(
  url: string,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "force-cache", // Next.js caching feature
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status is not ok
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const result: T = await response.json();
    return result;
  } catch (error) {
    if (retries === 0) {
      throw new Error("Max retries reached. Failed to fetch data.");
    }
    console.warn(`Retrying... (${retries} retries left)`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return fetchWithRetry<T>(url, retries - 1, delay);
  }
};

/// Function to fetch blogs with a default API URL
export const GetBlogs = async (
  apiUrl: string = "http://localhost:3000/api/blog"
): Promise<BlogType[]> => {
  try {
    // Call the retry-enabled fetch function
    const result = await fetchWithRetry<{ data: BlogType[] }>(apiUrl);

    // Validate the response data structure: Ensure it has a "data" property which is an array
    if (!result || !Array.isArray(result)) {
      throw new Error("Invalid API response structure.");
    }

    // Return the blog data
    return result;
  } catch (error: unknown) {
    // Log detailed error for debugging
    console.error("An error occurred while fetching blog data:", error);

    // Handle specific error cases more gracefully
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }

    // Rethrow error for further handling by the caller
    throw error;
  }
};
