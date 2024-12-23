import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy:{
      '/api':'http://192.168.100.51:8001'
    },
   
  },
});
