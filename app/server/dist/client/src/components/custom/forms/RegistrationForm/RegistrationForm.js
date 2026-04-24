import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../../components/shadcn/button.js';
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Field, FieldDescription, FieldGroup, FieldLabel, } from '../../../../components/shadcn/field.js';
import { Input } from '../../../../components/shadcn/input.js';
import { RegistrationSchema } from '../../../../../../shared/zod/user/registrationSchema.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
export function RegistrationForm({ toggleAuthPageForms, ...props }) {
    const { user } = useOutletContext();
    const { handleSubmit, register, setValue, watch, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            emailAddress: '',
            userName: '',
            password: '',
            confirmPassword: '',
        },
    });
    const [passwordVisiblity, setPasswordVisiblity] = useState('password');
    const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] = useState('password');
    const togglePasswordVisibility = (passwordType) => {
        if (passwordType === 'confirm') {
            if (confirmPasswordVisiblity === 'text') {
                setConfirmPasswordVisiblity('password');
            }
            else {
                setConfirmPasswordVisiblity('text');
            }
        }
        else {
            if (passwordVisiblity === 'text') {
                setPasswordVisiblity('password');
            }
            else {
                setPasswordVisiblity('text');
            }
        }
    };
    const onSubmit = async (userRegistrationData) => {
        try {
            const result = await user.signUp(userRegistrationData);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            toggleAuthPageForms?.();
            reset();
        }
        catch (error) {
            console.error('[SIGN UP ERROR]', error);
            toast.error('Something went wrong. Please try again.');
        }
    };
    return (_jsx(Card, { className: "w-full max-w-xl", ...props, children: _jsx(CardContent, { className: "space-y-6", children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(FieldGroup, { className: "", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "username", className: "text-base font-semibold", children: "Username" }), _jsx(Input, { id: "username", type: "text", placeholder: "myUserName123", autoComplete: "off", ...register('userName'), "aria-invalid": !!errors.userName }), errors.userName?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.userName.message }))] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "email-address", className: "text-base font-semibold", children: "Email Address" }), _jsx(Input, { id: "email-address", type: "email", placeholder: "me@example.com", autoComplete: "off", ...register('emailAddress'), "aria-invalid": !!errors.emailAddress }), errors.emailAddress?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.emailAddress.message }))] }), _jsxs("div", { id: "password-fields", className: "w-[full] space-y-6 sm:flex", children: [_jsx("div", { id: "password-field-one", className: "sm:mr-[5px] sm:w-[50%]", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "password", className: "text-base font-semibold", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "password", autoComplete: "new-password", type: passwordVisiblity, className: "pr-12", ...register('password'), "aria-invalid": !!errors.password }), _jsx("button", { type: "button", onClick: () => {
                                                            togglePasswordVisibility();
                                                        }, className: "text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center", "aria-label": passwordVisiblity === 'password'
                                                            ? 'Show password'
                                                            : 'Hide password', children: passwordVisiblity ===
                                                            'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.password?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.password.message }))] }) }), _jsx("div", { id: "password-field-two", className: "sm:ml-[5px] sm:w-[50%]", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "confirm-password", className: "text-base font-semibold", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "confirm-password", autoComplete: "new-password", type: confirmPasswordVisiblity, className: "pr-12", ...register('confirmPassword'), "aria-invalid": !!errors.confirmPassword }), _jsx("button", { type: "button", onClick: () => {
                                                            togglePasswordVisibility('confirm');
                                                        }, className: "text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center", "aria-label": confirmPasswordVisiblity ===
                                                            'password'
                                                            ? 'Show password'
                                                            : 'Hide password', children: confirmPasswordVisiblity ===
                                                            'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.confirmPassword?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.confirmPassword.message }))] }) })] }), _jsx(FieldGroup, { children: _jsxs(Field, { children: [_jsx(Button, { type: "submit", className: "text-base font-semibold sm:-mt-5", children: "Sign Up" }), _jsxs(FieldDescription, { onClick: toggleAuthPageForms, className: "text-foreground mt-[5px] text-center text-sm", children: ["Already have an account?", ' ', _jsx("a", { href: "#", children: "Sign In" })] })] }) })] }) }) }) }));
}
