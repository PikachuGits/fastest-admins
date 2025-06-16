import type { RsbuildPlugin } from '@rsbuild/core';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 替换模板变量，如 <%= LOADING_APP_TITLE %>
 */
function replaceTemplateVars(template: string, vars: Record<string, string>): string {
  return template.replace(/<%=\s*(\w+)\s*%>/g, (_, key) => vars[key] ?? '');
}

/**
 * 读取 loading 的 HTML 模板
 */
async function getLoadingRawByHtmlTemplate(loadingTemplate?: string) {
  let appLoadingPath = loadingTemplate ? join(process.cwd(), loadingTemplate) : '';

  // fallback to default if not provided or file doesn't exist
  if (!loadingTemplate || !fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    appLoadingPath = join(__dirname, './default-loading.html');
    console.log(`[plugin] 使用默认 loading.html: ${appLoadingPath}`);
  } else {
    console.log(`[plugin] 使用自定义 loading.html: ${appLoadingPath}`);
  }

  return await fsp.readFile(appLoadingPath, 'utf8');
}

/**
 * Rsbuild 插件：注入 App Loading HTML
 */
export function rsbuildPluginAppLoading(options?: {
  loadingTemplate?: string;
}): RsbuildPlugin {
  return {
    name: 'rsbuild-plugin-app-loading',
    async setup(api: any) {
      const title = process.env.LOADING_APP_TITLE ?? '';
      if (typeof title !== 'string') {
        throw new Error('LOADING_APP_TITLE must be a string');
      }

      let loadingHtml = await getLoadingRawByHtmlTemplate(options?.loadingTemplate);

      loadingHtml = replaceTemplateVars(loadingHtml, {
        LOADING_APP_TITLE: title,
      });
      api.modifyHTML((html: string) => {
        return html.replace('</body>', `${loadingHtml}</body>`);
      });
    },
  };
}
