import dotenv from 'dotenv';
import { getProductionScripts } from './getProductionScripts.js';
import { getViteDevServerScripts } from './getViteDevServerScripts.js';
// Load environment variables from .env file
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'production';
export const generateScripts = (routerContext, appState) => {
    if (NODE_ENV === 'production') {
        const scripts = getProductionScripts(routerContext, appState);
        return scripts;
    }
    else {
        const scripts = getViteDevServerScripts(routerContext, appState);
        return scripts;
    }
};
