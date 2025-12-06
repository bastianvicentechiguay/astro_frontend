// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
   // 👇 ESTO ES LO QUE TE FALTABA
   image: {
       domains: ['strapibackend-47t6.onrender.com'],
   },


   vite: {
       plugins: [tailwindcss()]
   }
});
