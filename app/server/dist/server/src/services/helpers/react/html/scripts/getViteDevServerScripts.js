export const getViteDevServerScripts = (routerContext, appState) => {
    let css = '';
    let js = '';
    const viteDevServer = `
	<!-- React-refresh preamble required by @vitejs/plugin-react -->
<script type="module">
	import RefreshRuntime from "http://localhost:4001/@react-refresh";

	RefreshRuntime.injectIntoGlobalHook(window);
	window.$RefreshReg$ = () => {};
	window.$RefreshSig$ = () => (type) => type;
	window.__vite_plugin_react_preamble_installed__ = true;
</script>
<!-- Vite Dev Server -->
<script type="module" src="http://localhost:4001/@vite/client"></script>
<script type="module" src="http://localhost:4001/entry-client.tsx"></script>

`;
    const hydrationScripts = `
	<!-- Hydration Data -->
	<script>
window.__ROUTER_CONTEXT__ = ${JSON.stringify(routerContext)};
window.__APPLICATION_STATE__ = ${JSON.stringify(appState)};
</script>`;
    const scripts = {
        css,
        js,
        viteDevServer,
        hydrationScripts,
    };
    return scripts;
};
