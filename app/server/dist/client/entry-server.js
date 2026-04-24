import { jsx as _jsx } from "react/jsx-runtime";
import { routes } from '../shared/reactRouter/index.js';
import { Provider } from 'react-redux';
import { createStaticHandler, createStaticRouter, StaticRouterProvider, } from 'react-router-dom';
export async function render(url, store) {
    const handler = createStaticHandler(routes);
    const request = new Request(url);
    // ⭐ Required so loaders get access to store
    const queryResult = await handler.query(request, {
        requestContext: { store },
    });
    if (queryResult instanceof Response) {
        throw queryResult;
    }
    const context = queryResult;
    const router = createStaticRouter(handler.dataRoutes, context);
    return {
        app: (_jsx(Provider, { store: store, children: _jsx(StaticRouterProvider, { router: router, context: context, hydrate: false }) })),
        routerContext: context,
        appState: store.getState(),
    };
}
