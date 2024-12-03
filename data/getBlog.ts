import axios, { AxiosError } from "axios";

// Define the Blog type to ensure type safety and clarity
interface BlogType {
  _id: string;
  name: string;
  content: string;
  category: string;
  image: string;
  // Add other properties as needed based on your API response
}

// Function to fetch blogs with a default API URL
export const GetBlogs = async (
  apiUrl: string = "http://localhost:3000/api/blog"
): Promise<BlogType[]> => {
  try {
    // Make an HTTP GET request to the API endpoint
    const response = await axios.get<BlogType[]>(apiUrl);

    // Check if the response status is not 200 and handle the error
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    // Return the blog data if the response is successful
    return response.data;
  } catch (error: unknown) {
    // Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);

      // Throw a new error with a more descriptive message
      throw new Error(
        `Failed to fetch blogs: ${
          error.response?.data?.message || error.message
        }`
      );
    }

    // Handle general JavaScript errors
    if (error instanceof Error) {
      console.error("General Error:", error.message);
      throw new Error(`An error occurred: ${error.message}`);
    }

    // Catch-all for unknown error types
    console.error("Unknown Error:", error);
    throw new Error("Failed to fetch blogs due to an unknown error.");
  }
};
