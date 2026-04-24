import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { User as UserAccountIcon, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { NavUserButton, NavLogo, MenuButton, UIThemeSwitch, NavDrawer, NavDrawerBackDrop, NavUserAvatar, NavUserAvatarFallback, NavUserAvatarImage, } from './index.js';
export const BarFragment = ({ ui, auth, user }) => {
    const userInitials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
        user.userName?.[0]?.toUpperCase() ||
        'U';
    const avatarPopoverItems = [
        {
            label: 'User Account',
            icon: _jsx(UserAccountIcon, {}),
            path: `/user/${user.userName}`,
        },
        { label: 'Settings', icon: _jsx(Settings, {}), path: '/settings' },
        { label: 'logout', icon: _jsx(LogOut, {}), path: '/' },
    ];
    const generateUserAvatarPopover = () => {
        return (_jsx("div", { onClick: (event) => {
                event.stopPropagation();
            }, className: "bg-background border-foreground/40 absolute top-[60px] right-[-8px] z-5 w-[190px] rounded-[10px] border-[.5px] border-solid p-2", children: _jsx("ul", { className: "flex flex-col gap-1", children: avatarPopoverItems.map(({ label, icon, path }) => (_jsxs("li", { onClick: async () => {
                        try {
                            if (label == 'logout') {
                                const result = await user.logout();
                                if (!result?.success) {
                                    toast.error(result?.message ??
                                        'Something went wrong. Please try again.');
                                    return;
                                }
                                toast.success(result.message);
                                ui.navigateTo('/');
                            }
                            else {
                                ui.navigateTo(path);
                            }
                        }
                        catch (error) {
                            console.error('[LOGOUT ERROR]', error);
                            toast.error('Something went wrong. Please try again.');
                        }
                    }, className: `text-foreground hover:bg-foreground/5 flex w-full items-center justify-start gap-3 rounded-[12px] px-4 py-2 text-left text-[14px] dark:hover:bg-[#171717]`, children: [_jsx("span", { className: "flex h-6 w-6 items-center justify-start", children: icon }), label] }, label))) }) }));
    };
    const showUserAvatarAndUserName = () => {
        const avatarPopover = generateUserAvatarPopover();
        return (_jsxs("div", { onClick: (event) => {
                event.stopPropagation();
            }, id: "bar-avatar-and-username", className: "relative flex h-[50px] w-full items-center gap-3 rounded-[15px] text-lg font-semibold transition", children: [ui.showAvatarPopover ? avatarPopover : '', _jsx("span", { className: "flex h-8 w-8 items-center justify-center", children: _jsxs(NavUserAvatar, { onClick: () => {
                            ui.toggleAvatarPopover();
                        }, className: "h-8 w-8 overflow-hidden rounded-lg", children: [_jsx(NavUserAvatarImage, { src: user.profileImageUrl || undefined, className: "h-full w-full object-cover object-top" }), _jsx(NavUserAvatarFallback, { className: "rounded-lg", children: userInitials.toUpperCase() })] }) })] }));
    };
    const generateNavBarContent = () => {
        const userAvatarAndUserName = showUserAvatarAndUserName();
        return (_jsxs("div", { id: "bar-content", className: "flex h-full w-full items-center justify-between px-3 sm:px-5", children: [_jsxs("div", { id: "bar-left", className: "flex h-full items-center gap-3", children: [_jsx(MenuButton, { ui: ui }), _jsx(NavLogo, { ui: ui })] }), _jsxs("div", { id: "bar-right", className: "hidden h-full items-center gap-4 sm:visible sm:flex", children: [_jsx(UIThemeSwitch, { onClick: ui.toggleUserTheme }), auth.isAuth ? (userAvatarAndUserName) : (_jsx(NavUserButton, { ui: ui, auth: auth, user: user }))] })] }));
    };
    const barContent = generateNavBarContent();
    return (_jsxs("div", { id: "bar-root", className: "bg-background relative top-0 z-10 h-16 w-full", onClick: () => {
            ui.closeAvatarPopover();
        }, children: [_jsx(NavDrawer, { ui: ui, auth: auth, user: user }), _jsx(NavDrawerBackDrop, { ui: ui }), barContent] }));
};
