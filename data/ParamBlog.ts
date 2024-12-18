import { BlogType } from "@/Types";

export const getBlogData = async (id: string): Promise<BlogType> => {
  if (!id) {
    throw new Error("Blog ID is required");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
      cache: "no-cache",
    });

    // Check if the response status is in the range 200-299
    if (!response.ok) {
      const errorData = await response.json(); // Get error message from response
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "Failed to fetch blog data."
        }`
      );
    }

    const result = await response.json();
    
    return result.data;
  } catch (error: any) {
    console.error("An error occurred while fetching blog data:", error);
    throw error; // Rethrow the error for further handling by the caller
  }
};
