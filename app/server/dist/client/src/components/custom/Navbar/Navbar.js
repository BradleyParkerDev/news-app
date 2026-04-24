import { jsx as _jsx } from "react/jsx-runtime";
import { BarFragment } from './fragments/index.js';
const Navbar = ({ ui, auth, user }) => {
    return (_jsx("div", { id: "navbar", className: `sticky top-0 left-0 z-100`, children: _jsx(BarFragment, { ui: ui, auth: auth, user: user }) }));
};
export default Navbar;
