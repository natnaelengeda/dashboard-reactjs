import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server:{
    port: 9000,
  }
  // root: 'src',
  // build:  {
  //   outDir: 'build',
  // },
});
