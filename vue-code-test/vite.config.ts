import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: '/',
		proxy: {
			'/api': {
				// target: 'http://haofenqi-mapi-envc.test.weicai.com.cn/',
				target: 'http://127.0.0.1:7002/',
				// target: 'http://10.205.88.144:28115/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		}
	},
	plugins: [vue()],
});
