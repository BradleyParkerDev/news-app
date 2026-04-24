import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// export default UserInfoCard;
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Button } from '../../../../components/shadcn/button.js';
import { Avatar, AvatarFallback, AvatarImage } from './fragments/avatar.js';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
const UserInfoCard = ({ update = false, ...props }) => {
    const { ui, auth, user } = useOutletContext();
    const { firstName, lastName, userName, emailAddress } = user ?? {};
    const userInitials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
        user.userName?.[0]?.toUpperCase() ||
        'U';
    const handleProfileImageChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const result = await user.uploadProfileImage(file);
        if (result.success) {
            toast.success(result.message || 'Profile image uploaded');
        }
        else {
            toast.error(result.message || 'Failed to upload image');
        }
        console.log(result);
        event.target.value = '';
    };
    const handleProfileImageDelete = async () => {
        try {
            const result = await user.deleteUserProfileImage();
            if (result.success) {
                toast.success(result.message || 'Profile image deleted');
            }
            else {
                toast.error(result.message || 'Failed to delete image');
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong while deleting');
        }
    };
    return (_jsx(Card, { className: "w-full max-w-xl", ...props, children: _jsxs(CardContent, { className: "flex flex-col items-center space-y-4 px-6 py-4", children: [_jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsxs(Avatar, { className: "h-36 w-36 rounded-full", children: [_jsx(AvatarImage, { src: user.profileImageUrl || undefined, className: "h-full w-full object-cover object-top" }), _jsx(AvatarFallback, { className: "text-2xl font-semibold", children: userInitials.toUpperCase() })] }), _jsxs("p", { className: "text-muted-foreground text-base font-medium", children: ["@", userName] }), update && (_jsxs("div", { className: "pt-1", children: [_jsx("input", { id: "profile-image-upload", type: "file", accept: "image/*", className: "hidden", onChange: handleProfileImageChange }), _jsxs("div", { className: "flex flex-col", children: [_jsx(Button, { type: "button", variant: "outline", className: "text-sm font-semibold", onClick: () => {
                                                document
                                                    .getElementById('profile-image-upload')
                                                    ?.click();
                                            }, children: "Upload Profile Image" }), _jsx(Button, { type: "button", variant: "outline", className: "border-destructive/35 bg-destructive/[0.04] text-destructive hover:border-destructive/45 hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/30 mt-[10px] text-sm font-semibold", onClick: handleProfileImageDelete, children: "Delete Profile Image" })] })] }))] }), _jsxs("div", { className: "w-full space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground text-xs font-semibold", children: "First Name" }), _jsx("p", { className: "text-base", children: firstName || '-' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground text-xs font-semibold", children: "Last Name" }), _jsx("p", { className: "text-base", children: lastName || '-' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-muted-foreground text-xs font-semibold", children: "Email Address" }), _jsx("p", { className: "text-base", children: emailAddress || '-' })] })] })] }) }));
};
export default UserInfoCard;
