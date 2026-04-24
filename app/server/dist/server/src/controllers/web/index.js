import { createUiService } from '../../services/index.js';
const web = async (req, res) => {
    const ui = createUiService(req, res);
    try {
        await ui.handlePageRendering();
    }
    catch (err) {
        console.error(err);
        if (!res.headersSent)
            res.status(500).send('SSR Failure');
    }
};
export default web;
