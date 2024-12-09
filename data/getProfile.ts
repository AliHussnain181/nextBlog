export async function GetProfile() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      {
        cache: "force-cache", // Ensures data is cached if possible
        credentials: "include", // Include cookies with the request
      }
    );

    if (!response.ok) {
      console.log(`Error fetching profile: ${response.status} ${response.statusText}`);
      return null; // Gracefully handle non-2xx status codes
    }

    const user = await response.json();

    // Optional: Validate structure of `user` (e.g., check required fields)
    if (!user) {
      console.log("Invalid user data received");
      return null;
    }

    return user.user; // Return the user object
  } catch (error) {
    console.log("Error occurred while fetching user profile:", error);
    return null; // Return null to handle gracefully in UI
  }
}
