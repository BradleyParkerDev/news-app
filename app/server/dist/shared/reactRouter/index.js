import { jsx as _jsx } from "react/jsx-runtime";
import { pages } from '../../client/src/pages/index.js';
const { Layout, HomePage, AuthPage, UserPage, BusinessPage, EntertainmentPage, GeneralPage, HealthPage, SciencePage, SportsPage, TechnologyPage, SettingsPage, NotFoundPage, } = pages;
export const routes = [
    {
        path: '/',
        element: _jsx(Layout, {}),
        children: [
            { index: true, element: _jsx(HomePage, {}) },
            { path: '/auth', element: _jsx(AuthPage, {}) },
            { path: '/settings', element: _jsx(SettingsPage, {}) },
            { path: '/user/:userName', element: _jsx(UserPage, {}) },
            { path: '/business', element: _jsx(BusinessPage, {}) },
            { path: '/entertainment', element: _jsx(EntertainmentPage, {}) },
            { path: '/general', element: _jsx(GeneralPage, {}) },
            { path: '/health', element: _jsx(HealthPage, {}) },
            { path: '/science', element: _jsx(SciencePage, {}) },
            { path: '/sports', element: _jsx(SportsPage, {}) },
            { path: '/technology', element: _jsx(TechnologyPage, {}) },
            { path: '*', element: _jsx(NotFoundPage, {}) },
        ],
    },
];
