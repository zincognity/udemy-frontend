// @ts-check
import node from "@astrojs/node";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://udemy.incognity.dev",
    output: "server",
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [react()],

    adapter: node({
        mode: "standalone",
    }),

    server: {
        host: true,
    },
});
