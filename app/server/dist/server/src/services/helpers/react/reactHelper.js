import dotenv from 'dotenv';
import { render } from '../../../../../client/entry-server.js';
import { renderToString } from 'react-dom/server';
import { loggerFactory } from '../../../lib/logger/index.js';
import { generateHtml } from './html/generateHtml.js';
import { generateHtmlStream } from './html/generateHtmlStream.js';
dotenv.config();
const STREAM_HTML = process.env.STREAM_HTML?.toLowerCase() === 'true';
export const reactHelper = {
    streamHtml: STREAM_HTML,
    async renderAppToPipeableStream(page) {
        if (!page.res) {
            throw new Error('Response object is required for renderAppToPipeableStream.');
        }
        const start = Date.now();
        const { app, routerContext, appState } = await render(page.url, page.store);
        await generateHtmlStream({
            res: page.res,
            app,
            routerContext,
            appState,
        });
        const duration = Date.now() - start;
        loggerFactory.uiService.info(`[SSR][STREAM] ${page.path} - ${duration}ms`);
    },
    async renderAppToString(page) {
        const start = Date.now();
        const { app, routerContext, appState } = await render(page.url, page.store);
        const htmlCreatedFromReactApp = renderToString(app);
        const html = generateHtml(htmlCreatedFromReactApp, routerContext, appState);
        const duration = Date.now() - start;
        loggerFactory.uiService.info(`[SSR][STRING] ${page.path} - ${duration}ms`);
        return html;
    },
};
