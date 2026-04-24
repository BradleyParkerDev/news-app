import { jsx as _jsx } from "react/jsx-runtime";
export const NavDrawerBackDrop = ({ ui }) => {
    const isOpen = ui.navDrawerIsOpen;
    return (_jsx("div", { onClick: () => {
            ui.toggleNavbarDrawer();
        }, "aria-hidden": !isOpen, id: "nav-backdrop", className: `absolute inset-0 top-0 left-0 z-20 h-screen min-h-full w-full bg-black/10 backdrop-blur-md transition-opacity duration-350 ease-out ${isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'}` }));
};
