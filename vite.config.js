import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
/** Project Pages use /<repo>/; CI sets `VITE_BASE_PATH` (see GitHub workflow). */
function viteBase() {
    const raw = process.env.VITE_BASE_PATH?.trim();
    if (!raw || raw === "/")
        return "/";
    return `${raw.replace(/\/+$/, "")}/`;
}
export default defineConfig({
    base: viteBase(),
    plugins: [vue()],
});
