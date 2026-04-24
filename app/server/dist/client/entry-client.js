import { jsx as _jsx } from "react/jsx-runtime";
// app/client/entry-client.tsx
import { hydrateRoot, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from '../shared/redux/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../shared/reactRouter/index.js';
import './index.css';
// Vite Dev Server ping Express
if (import.meta.env.DEV) {
    import('./src/services/dev/pingBackend.js');
}
// Read payloads
const routerContext = window.__ROUTER_CONTEXT__;
const appState = window.__APPLICATION_STATE__;
// Recreate router with routerContext
const router = createBrowserRouter(routes, {
    hydrationData: routerContext,
});
// Recreate redux store with appState
const store = createStore(appState);
// Build app tree
const rootElement = document.getElementById('root');
const app = (_jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }));
// Hydrate OR render
if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
}
else {
    createRoot(rootElement).render(app);
}
