import { jsx as _jsx } from "react/jsx-runtime";
export const NavLogo = ({ ui }) => {
    return (_jsx("div", { id: "nav-logo", onClick: () => ui.navigateTo('/'), className: "text-foreground cursor-pointer text-lg font-semibold tracking-tight transition hover:opacity-80", children: ui.appName === '' ? 'Logo' : ui.appName }));
};
