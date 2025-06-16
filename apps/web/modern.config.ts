import path from 'node:path';
import { rsbuildPluginAppLoading } from '@fastest/plugins/loading';
import { appTools, defineConfig } from '@modern-js/app-tools';
import { routerPlugin } from '@modern-js/plugin-router-v7';
import tailwindcssPlugin from '@modern-js/plugin-tailwindcss';

/**
 * https://modernjs.dev/en/configure/app/usage
 */
export default defineConfig({
  runtime: {
    router: true,
  },
  source: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, '../../public'),
    },
  },

  builderPlugins: [rsbuildPluginAppLoading({})],
  plugins: [
    tailwindcssPlugin(),
    routerPlugin(),
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
});
