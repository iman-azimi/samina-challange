import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Layouts(),
    Components({
      extensions: ["vue", "md", "tsx", "jsx"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Pages({
      extendRoute(route) {
        if (
          route.path === "/login" ||
          route.path === "/register" ||
          route.path === "/" ||
          route.path === "/admin/login"
        ) {
          return route;
        }
        return {
          ...route,
          meta: { requireAuth: true },
        };
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    mainFields: [
      'browser',
      'module',
      'main',
      'jsnext:main',
      'jsnext'
    ]
  },
});
