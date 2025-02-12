const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://royalcomplains-backend.onrender.com";

export { BASE_URL };
