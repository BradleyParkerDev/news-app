import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../../components/shadcn/button.js';
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Field, FieldGroup, FieldLabel, } from '../../../../components/shadcn/field.js';
import { Input } from '../../../../components/shadcn/input.js';
import { UpdateUserPasswordSchema } from '../../../../../../shared/zod/user/updateUserPasswordSchema.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
export function UpdateUserPasswordForm({ ...props }) {
    const { user } = useOutletContext();
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(UpdateUserPasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmedNewPassword: '',
        },
    });
    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState('password');
    const [newPasswordVisibility, setNewPasswordVisibility] = useState('password');
    const [confirmedNewPasswordVisibility, setConfirmedNewPasswordVisibility] = useState('password');
    const togglePasswordVisibility = (type) => {
        if (type === 'current') {
            setCurrentPasswordVisibility((prev) => prev === 'password' ? 'text' : 'password');
        }
        else if (type === 'new') {
            setNewPasswordVisibility((prev) => prev === 'password' ? 'text' : 'password');
        }
        else {
            setConfirmedNewPasswordVisibility((prev) => prev === 'password' ? 'text' : 'password');
        }
    };
    const onSubmit = async (userUpdateData) => {
        try {
            const result = await user.update(userUpdateData);
            if (result.success) {
                toast.message(result.message);
                reset();
                setCurrentPasswordVisibility('password');
                setNewPasswordVisibility('password');
                setConfirmedNewPasswordVisibility('password');
            }
            else {
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        }
    };
    return (_jsx(Card, { className: "w-full max-w-xl", ...props, children: _jsx(CardContent, { className: "space-y-2", children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(FieldGroup, { className: "gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { className: "text-base font-semibold", children: "Current Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: currentPasswordVisibility, autoComplete: "current-password", ...register('currentPassword') }), _jsx("button", { type: "button", onClick: () => togglePasswordVisibility('current'), className: "absolute inset-y-0 right-3 flex items-center", "aria-label": currentPasswordVisibility === 'password'
                                                ? 'Show current password'
                                                : 'Hide current password', children: currentPasswordVisibility ===
                                                'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.currentPassword && (_jsx("p", { className: "text-destructive text-sm", children: errors.currentPassword.message }))] }), _jsxs(Field, { children: [_jsx(FieldLabel, { className: "text-base font-semibold", children: "New Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: newPasswordVisibility, autoComplete: "new-password", ...register('newPassword') }), _jsx("button", { type: "button", onClick: () => togglePasswordVisibility('new'), className: "absolute inset-y-0 right-3 flex items-center", "aria-label": newPasswordVisibility === 'password'
                                                ? 'Show new password'
                                                : 'Hide new password', children: newPasswordVisibility === 'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.newPassword && (_jsx("p", { className: "text-destructive text-sm", children: errors.newPassword.message }))] }), _jsxs(Field, { children: [_jsx(FieldLabel, { className: "text-base font-semibold", children: "Confirm New Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { type: confirmedNewPasswordVisibility, autoComplete: "new-password", ...register('confirmedNewPassword') }), _jsx("button", { type: "button", onClick: () => togglePasswordVisibility('confirm'), className: "absolute inset-y-0 right-3 flex items-center", "aria-label": confirmedNewPasswordVisibility ===
                                                'password'
                                                ? 'Show confirm new password'
                                                : 'Hide confirm new password', children: confirmedNewPasswordVisibility ===
                                                'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.confirmedNewPassword && (_jsx("p", { className: "text-destructive text-sm", children: errors.confirmedNewPassword.message }))] }), _jsx(Button, { type: "submit", className: "mt-3 text-base font-semibold sm:mt-4", disabled: isSubmitting, children: "Update Password" })] }) }) }) }));
}
