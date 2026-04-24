import fs from 'fs';
import path from 'path';
export const getProductionScripts = (routerContext, appState) => {
    // Vite writes a manifest mapping original entrypoints to hashed assets.
    // We read it at runtime so SSR can emit the correct bundle URLs.
    let css = '';
    let js = '';
    let viteDevServer = '';
    let hydrationScripts = '';
    const manifestPath = path.resolve(process.cwd(), 'app/client/dist/.vite/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const entry = manifest['index.html'] ||
        Object.values(manifest).find((item) => item && item.isEntry);
    const prodJsBundle = entry?.file;
    if (!entry || !prodJsBundle) {
        throw new Error('Client prodJsBundle not found in manifest.json');
    }
    // Ensure asset URLs are absolute so nested routes (e.g., /user/123) resolve them.
    const toAbsolute = (assetPath) => assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    // If the entry generated CSS, emit it as <link> tags.
    const cssFiles = Array.isArray(entry.css) ? entry.css : [];
    const cssLinks = cssFiles
        .map((href) => `<link rel="stylesheet" href="${toAbsolute(href)}">`)
        .join('\n');
    // Inject serialized router hydration data + Redux state, then the client bundle.
    hydrationScripts = `
	<!-- Hydration Data -->
	<script>
window.__ROUTER_CONTEXT__ = ${JSON.stringify(routerContext)};
window.__APPLICATION_STATE__ = ${JSON.stringify(appState)};
</script>`;
    css = cssLinks;
    js = `
<script type="module" src="${toAbsolute(prodJsBundle)}"></script>`;
    const scripts = {
        css,
        js,
        viteDevServer,
        hydrationScripts,
    };
    return scripts;
};
