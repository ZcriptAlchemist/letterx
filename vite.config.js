import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    // Define custom environment variables here (optional)
    API_KEY: "AIzaSyB9yDiYb5aCZlshkllkk0gYJksln8XCOOc",
  },
});
