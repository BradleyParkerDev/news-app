import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from 'sonner';
export const NavUserButton = ({ ui, auth, user }) => {
    return (_jsx("div", { onClick: async () => {
            if (!auth.isAuth) {
                ui.toggleAuthPageFormsWithNavUserButton();
                ui.navigateTo('/auth');
                return;
            }
            try {
                const result = await user.logout();
                if (!result?.success) {
                    toast.error(result?.message ??
                        'Something went wrong. Please try again.');
                    return;
                }
                toast.success(result.message);
                ui.navigateTo('/');
            }
            catch (error) {
                console.error('[LOGOUT ERROR]', error);
                toast.error('Something went wrong. Please try again.');
            }
        }, className: "border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition", children: auth.isAuth ? 'Sign Out' : 'Sign In' }));
};
