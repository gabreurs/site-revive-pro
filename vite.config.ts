import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Baixa todos os arquivos referenciados por *.asset.json para dentro do dist/
// no mesmo caminho usado pelas URLs (`/__l5e/assets-v1/<id>/<filename>`),
// para que funcionem em hospedagem estática (Hostinger), onde o proxy do
// CDN da Lovable não existe.
function downloadLovableAssets(): Plugin {
  const CDN_BASE = "https://id-preview--59d7974b-a8cb-4ca0-8fee-65f150ddc60a.lovable.app";
  return {
    name: "download-lovable-assets",
    apply: "build",
    async closeBundle() {
      const root = path.resolve(__dirname, "src");
      const outDir = path.resolve(__dirname, "dist");
      const pointers: string[] = [];
      const walk = (dir: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const p = path.join(dir, entry.name);
          if (entry.isDirectory()) walk(p);
          else if (entry.name.endsWith(".asset.json")) pointers.push(p);
        }
      };
      walk(root);

      let ok = 0;
      let fail = 0;
      for (const ptr of pointers) {
        try {
          const json = JSON.parse(fs.readFileSync(ptr, "utf-8"));
          const url: string = json.url;
          if (!url?.startsWith("/__l5e/")) continue;
          const dest = path.join(outDir, url);
          if (fs.existsSync(dest)) {
            ok++;
            continue;
          }
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          const res = await fetch(CDN_BASE + url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(dest, buf);
          ok++;
        } catch (e) {
          fail++;
          console.warn(`[assets] falhou: ${ptr}`, e);
        }
      }
      console.log(`[assets] baixados: ${ok}, falhas: ${fail}`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    downloadLovableAssets(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
