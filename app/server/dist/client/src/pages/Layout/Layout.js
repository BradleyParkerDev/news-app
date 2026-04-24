import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/custom/Navbar/Navbar.js';
import { useUIUtility, useAuthUtility, useUserUtility, } from '../../hooks/index.js';
import { Toaster } from '../../components/custom/toast/sonner.js';
const Layout = () => {
    const auth = useAuthUtility();
    const ui = useUIUtility();
    const user = useUserUtility(ui);
    // Apply layout classes to the document body safely on the client.
    useEffect(() => {
        const bodyClasses = [
            ui.theme,
            'bg-background',
            'flex',
            'justify-center',
        ];
        document.body.classList.add(...bodyClasses);
        return () => {
            document.body.classList.remove(...bodyClasses);
        };
    }, [ui.theme]);
    // Lock outer document scroll when the navbar drawer is open.
    useEffect(() => {
        const previousHtmlOverflow = document.documentElement.style.overflow;
        if (ui.navDrawerIsOpen) {
            document.documentElement.style.overflow = 'hidden';
        }
        else {
            document.documentElement.style.overflow = previousHtmlOverflow;
        }
        return () => {
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [ui.navDrawerIsOpen]);
    return (_jsxs("div", { id: "container", className: `relative min-h-dvh w-screen max-w-[1400px] ${ui.navDrawerIsOpen ? 'shadow-lg dark:shadow-white/5' : ''}`, children: [_jsx(Navbar, { ui: ui, auth: auth, user: user }), _jsx("div", { onClick: () => {
                    ui.closeAvatarPopover();
                    // ui.closeAvatarPopoverWithRedux();
                }, id: "content", className: `min-h-[calc(100dvh-4rem)] w-full`, children: _jsx(Outlet, { context: { ui, auth, user } }) }), _jsx(Toaster, {})] }));
};
export default Layout;
