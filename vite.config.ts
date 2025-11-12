// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()]
// });

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/openapi": {
        target: "https://apis.data.go.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openapi/, ""),
      },
      "/api": {
        // target: "http://develop.i-keeper.synology.me",
        // changeOrigin: true,
        // timeout: 120000,
        // configure: (proxy) => {
        //   proxy.on("error", (err) => {
        //     console.error("Proxy error:", err);
        //   });
        //   proxy.on("proxyReq", (proxyReq, req) => {
        //     console.log(" Proxying request:", req.url);
        //   });
        // },
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
