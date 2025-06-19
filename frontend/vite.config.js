// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     fs: {
//       allow: ['..', path.resolve(__dirname, 'node_modules/@fortawesome')]
//     }
//   }
// });
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Example:
  // root: path.resolve(__dirname, 'src'),
  // Add your Vite config here
};
