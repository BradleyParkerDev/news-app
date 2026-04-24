import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from 'lucide-react';
export const MenuButton = ({ ui }) => {
    return (_jsx("button", { type: "button", onClick: () => ui.toggleNavbarDrawer(), className: "text-foreground hover:bg-foreground/10 focus-visible:outline-foreground/40 flex h-10 w-10 items-center justify-center rounded-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", "aria-label": "Toggle navigation", children: _jsx(Menu, { className: "h-5 w-5" }) }));
};
