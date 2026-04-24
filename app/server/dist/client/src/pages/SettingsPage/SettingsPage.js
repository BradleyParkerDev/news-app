import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { DeleteUserDataForm, UserInfoCard, UpdateUserForm, UpdateUserPasswordForm, StatusCard, } from '../../components/index.js';
import { Button } from '../../components/shadcn/button.js';
import { Dialog, DialogContent, DialogTrigger, } from '../../components/custom/dialog/dialog.js';
import { Lock } from 'lucide-react';
const SettingsPage = () => {
    const { ui, auth } = useOutletContext();
    useEffect(() => {
        document.title = `Settings | ${ui.appName}`;
    }, []);
    return (_jsxs("div", { className: "mx-auto w-full max-w-2xl space-y-10 px-4 py-6", children: [!auth.isAuth && (_jsx(StatusCard, { ui: ui, icon: _jsx(Lock, { className: "h-5 w-5" }), title: "User not authenticated", description: "You must be signed in to view account settings.", buttonText: "Go to Sign In", redirectTo: "/auth" })), auth.isAuth && (_jsxs("div", { className: "space-y-10", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Settings" }), _jsx(UserInfoCard, { update: true }), _jsxs("section", { className: "space-y-3", children: [_jsxs("div", { className: "max-w-xl space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Update Profile" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Change your name, username, or email address." })] }), _jsx(UpdateUserForm, {})] }), _jsxs("section", { className: "space-y-3", children: [_jsxs("div", { className: "max-w-xl space-y-1", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Update Password" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Choose a new password and confirm it below." })] }), _jsx(UpdateUserPasswordForm, {})] }), _jsxs("section", { className: "max-w-xl space-y-3", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h2", { className: "text-destructive text-lg font-semibold", children: "Danger Zone" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "This action permanently deletes your account." })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "border-destructive/30 text-destructive hover:bg-destructive/10 focus-visible:outline-destructive/40 flex min-h-11 w-full max-w-xl items-center justify-center rounded-md border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", "aria-label": "Delete user account", children: "Delete User Account" }) }), _jsx(DialogContent, { className: "max-w-md", children: _jsx(DeleteUserDataForm, { embedded: true }) })] })] })] }))] }));
};
export default SettingsPage;
