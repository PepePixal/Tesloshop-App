import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({disableOxcRecommendation: true}), tailwindcss()],
  resolve: {
		alias: {

			// "@": path.resolve(__dirname, "./src"),
			
			// Reemplazamos __dirname por import.meta.dirname
            "@": path.resolve(import.meta.dirname, "./src"),
		},
	},
})
