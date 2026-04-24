import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuButton } from './MenuButton.js';
import { NavLogo } from './NavLogo.js';
import { UIThemeSwitch } from './UIThemeSwitch.js';
import { NavUserButton } from './NavUserButton.js';
import { NavUserAvatar, NavUserAvatarFallback, NavUserAvatarImage, } from './NavUserAvatar.js';
import { Briefcase as Business, Clapperboard as Entertainment, Newspaper as General, HeartPulse as Health, FlaskConical as Science, Trophy as Sports, Cpu as Technology, Settings, } from 'lucide-react';
import { useLocation } from 'react-router-dom';
const navItems = [
    { label: 'Business', icon: _jsx(Business, {}), path: '/business' },
    { label: 'Entertainment', icon: _jsx(Entertainment, {}), path: '/entertainment' },
    { label: 'General', icon: _jsx(General, {}), path: '/general' },
    { label: 'Health', icon: _jsx(Health, {}), path: '/health' },
    { label: 'Science', icon: _jsx(Science, {}), path: '/science' },
    { label: 'Sports', icon: _jsx(Sports, {}), path: '/sports' },
    { label: 'Technology', icon: _jsx(Technology, {}), path: '/technology' },
];
export const NavDrawer = ({ ui, auth, user }) => {
    const isOpen = ui.navDrawerIsOpen;
    const drawerWidth = 300;
    const { pathname } = useLocation();
    const userInitials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
        user.userName?.[0]?.toUpperCase() ||
        'U';
    const createNavDrawerHeader = () => {
        return (_jsxs("div", { id: "drawer-header", className: `flex items-center gap-3 px-4 py-3 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'}`, children: [_jsx(MenuButton, { ui: ui }), _jsx(NavLogo, { ui: ui })] }));
    };
    const showUserAvatarAndUserName = () => {
        return (_jsxs("div", { id: "drawer-avatar-and-username", className: `transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100 delay-150' : 'pointer-events-none opacity-0'} text-foreground hover:bg-foreground/5 w-full items-start gap-3 rounded-[15px] px-6 py-3 text-lg font-semibold sm:hidden`, children: [_jsxs("div", { onClick: () => {
                        ui.navigateTo(`/user/${user.userName}`);
                    }, className: "flex w-full items-center gap-3", children: [_jsx("span", { className: "flex h-8 w-8 items-center justify-center", children: _jsxs(NavUserAvatar, { onClick: () => {
                                    ui.toggleAvatarPopover();
                                }, className: "h-8 w-8 overflow-hidden rounded-lg", children: [_jsx(NavUserAvatarImage, { src: user.profileImageUrl || undefined, className: "h-full w-full object-cover object-top" }), _jsx(NavUserAvatarFallback, { className: "rounded-lg", children: userInitials.toUpperCase() })] }) }), _jsx("p", { className: "truncate", children: `Hi, ${user.userName}` })] }), _jsxs("div", { onClick: () => {
                        ui.navigateTo('/settings');
                    }, className: "mt-[20px] flex w-full items-center gap-2 text-base font-medium", children: [_jsx(Settings, { className: "h-5 w-5" }), _jsx("p", { children: "Settings" })] })] }));
    };
    const generateNavLinks = () => {
        return (_jsx("div", { id: "nav-links", className: `transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100 delay-150' : 'pointer-events-none opacity-0'}`, children: _jsx("ul", { children: navItems.map(({ label, icon, path }) => (_jsxs("li", { onClick: () => {
                        ui.navigateTo(path);
                    }, className: `${pathname.startsWith(path) ? 'bg-muted' : ''} text-foreground hover:bg-foreground/5 flex h-[50px] w-full items-center justify-start gap-3 rounded-[15px] px-6 text-lg font-semibold dark:hover:bg-[#171717]`, children: [_jsx("span", { className: "flex h-6 w-6 items-center justify-center", children: icon }), label] }, label))) }) }));
    };
    const createNavDrawerFooter = () => {
        return (_jsxs("div", { id: "drawer-footer", className: `border-foreground/10 mt-6 flex w-full flex-col gap-4 border-t px-4 py-4 transition-opacity duration-300 sm:border-t-0 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'} `, children: [_jsxs("div", { className: "text-foreground flex w-full items-center justify-between text-sm font-semibold sm:hidden", children: [_jsx("p", { children: "Appearance" }), _jsx(UIThemeSwitch, { onClick: ui.toggleUserTheme })] }), _jsx("div", { className: "flex w-full justify-center sm:hidden", children: _jsx(NavUserButton, { ui: ui, auth: auth, user: user }) })] }));
    };
    const navDrawerHeader = createNavDrawerHeader();
    const userAvatarAndUserName = showUserAvatarAndUserName();
    const navLinks = generateNavLinks();
    const navDrawerFooter = createNavDrawerFooter();
    return (_jsxs("div", { id: "drawer-content", "aria-hidden": !isOpen, style: {
            width: isOpen ? drawerWidth : 0,
        }, className: `bg-background absolute top-0 left-0 z-30 mt-[-.5px] -ml-px h-screen min-h-full overflow-x-hidden ${isOpen ? `dark:shadow-[8px_0_24px_-12px_rgba(255,255,255,0.1)]` : ``} transition-all duration-150 ease-out`, children: [navDrawerHeader, auth.isAuth && userAvatarAndUserName, navLinks, navDrawerFooter] }));
};
