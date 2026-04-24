import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../../lib/utils.js';
import { Button } from '../../../../components/shadcn/button.js';
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Input } from '../../../../components/shadcn/input.js';
import { Label } from '../../../../components/shadcn/label.js';
import { LoginSchema } from '../../../../../../shared/zod/auth/loginSchema.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
export function LoginForm({ toggleAuthPageForms, className, ...props }) {
    const { user } = useOutletContext();
    const { handleSubmit, register, setValue, watch, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            emailAddress: '',
            userName: '',
            password: '',
        },
    });
    const [passwordVisiblity, setPasswordVisiblity] = useState('password');
    const togglePasswordVisibility = () => {
        if (passwordVisiblity === 'text') {
            setPasswordVisiblity('password');
        }
        else {
            setPasswordVisiblity('text');
        }
    };
    const onSubmit = async (loginCredentials) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const result = await user.login(loginCredentials);
        console.log(loginCredentials);
        if (result.success) {
            toast.success('User successfully logged in!');
            toggleAuthPageForms?.();
            reset();
        }
        else {
            toast.error(result.message);
        }
    };
    const identifierValue = watch('emailAddress') ?? watch('userName') ?? '';
    const emailRegister = register('emailAddress');
    const userNameRegister = register('userName');
    return (_jsx("div", { className: cn(`w-full max-w-xl space-y-6`, className), ...props, children: _jsx(Card, { children: _jsx(CardContent, { className: "space-y-6", children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "identifier", className: "text-base font-semibold", children: "Username or Email Address" }), _jsx("input", { type: "hidden", ...emailRegister }), _jsx("input", { type: "hidden", ...userNameRegister }), _jsx(Input, { id: "identifier", type: "text", placeholder: "myUserName123 or me@example.com", autoComplete: "off", className: "h-11", value: identifierValue, onChange: (event) => {
                                        const value = event.target.value;
                                        const looksLikeEmail = value.includes('@');
                                        setValue('emailAddress', looksLikeEmail ? value : undefined, {
                                            shouldValidate: false,
                                            shouldDirty: true,
                                        });
                                        setValue('userName', looksLikeEmail ? undefined : value, {
                                            shouldValidate: false,
                                            shouldDirty: true,
                                        });
                                    }, "aria-invalid": !!errors.emailAddress || !!errors.userName }), (errors.emailAddress?.message ||
                                    errors.userName?.message) && (_jsx("p", { className: "text-destructive text-sm", children: errors.emailAddress?.message ||
                                        errors.userName?.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Label, { htmlFor: "password", className: "text-base font-semibold", children: "Password" }), _jsx("a", { href: "#", className: "text-primary ml-auto text-sm font-medium underline-offset-4 hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "password", autoComplete: "current-password", type: passwordVisiblity, className: "h-11 pr-12", ...register('password'), "aria-invalid": !!errors.password }), _jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "text-muted-foreground hover:text-foreground absolute inset-y-0 right-3 my-auto flex h-5 w-5 items-center justify-center", "aria-label": passwordVisiblity === 'password'
                                                ? 'Show password'
                                                : 'Hide password', children: passwordVisiblity === 'password' ? (_jsx(Eye, { className: "h-4 w-4" })) : (_jsx(EyeOff, { className: "h-4 w-4" })) })] }), errors.password?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.password.message }))] }), _jsx(Button, { type: "submit", disabled: isSubmitting, className: "w-full rounded-lg py-3 text-base font-semibold", children: "Sign In" }), _jsxs("div", { onClick: toggleAuthPageForms, className: "mt-[-15px] text-center text-sm", children: ["Don't have an account?", ' ', _jsx("a", { href: "#", className: "underline underline-offset-4", children: "Sign Up" })] })] }) }) }) }));
}
