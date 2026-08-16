export async function GET(req) {
  try {
      // Create a response with a success message
      const response = new Response(
          JSON.stringify({ message: "Logged out successfully" }),
          {
              status: 200,
              headers: { "Content-Type": "application/json" },
          }
      );

      // Clear the auth token by setting a cookie with Max-Age=0
      response.headers.append(
          "Set-Cookie",
          `authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
      );

      return response;
  } catch (error) {
      console.error("Error during logout:", error);

      // Return an error response in case of failure
      return new Response(
          JSON.stringify({ message: "Failed to log out", error: error.message }),
          {
              status: 500,
              headers: { "Content-Type": "application/json" },
          }
      );
  }
}