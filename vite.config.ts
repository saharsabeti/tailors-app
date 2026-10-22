import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '@': resolve(__dirname, './src'),
    },
    extensions: ['.web.tsx', '.tsx', '.web.ts', '.ts', '.jsx', '.js', '.json'],
  },
  define: { __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'), 'process.env.EXPO_OS': JSON.stringify('web') },
  server: { port: 5173 },
});
