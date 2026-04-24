import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { UserInfoCard, StatusCard } from '../../components/index.js';
import { Lock } from 'lucide-react';
const UserPage = () => {
    const { ui, auth } = useOutletContext();
    useEffect(() => {
        document.title = `User | ${ui.appName}`;
    }, []);
    return (_jsxs("div", { id: "user-page", className: "mx-auto flex h-full w-full max-w-2xl flex-col space-y-8 px-4 py-6", children: [!auth.isAuth && (_jsx(StatusCard, { ui: ui, icon: _jsx(Lock, { className: "h-5 w-5" }), title: "User not authenticated", description: "You must be signed in to view account settings.", buttonText: "Go to Sign In", redirectTo: "/auth" })), auth.isAuth && (_jsxs("div", { className: "space-y-10", children: [_jsxs("section", { className: "space-y-3", children: [_jsxs("div", { className: "max-w-xl space-y-1", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Profile" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "View user account details and/or public profile information." })] }), _jsx(UserInfoCard, {})] }), _jsx("section", { className: "space-y-3", children: _jsxs("div", { className: "max-w-xl space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Content" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Cards for saved articles or the user's order history could live here." })] }) })] }))] }));
};
export default UserPage;
