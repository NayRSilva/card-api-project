import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const viteConfig = defineViteConfig({
    plugins: [react()],
});

const vitestConfig = defineVitestConfig({
    test: {
        globals: true,
        environment: "jsdom", // Simulates the DOM for React tests
        setupFiles: "./src/test/setup.ts", // Setup file for global configurations
    },
});

export default mergeConfig(viteConfig, vitestConfig);
