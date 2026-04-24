import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../../components/shadcn/button.js';
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Field, FieldGroup, FieldLabel, } from '../../../../components/shadcn/field.js';
import { Input } from '../../../../components/shadcn/input.js';
import { UpdateUserDataSchema } from '../../../../../../shared/zod/user/updateUserDataSchema.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
export function UpdateUserForm({ toggleUserForms, ...props }) {
    const { user } = useOutletContext();
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(UpdateUserDataSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            userName: '',
        },
    });
    const onSubmit = async (userUpdateData) => {
        try {
            const response = await user.update(userUpdateData);
            if (response.success) {
                toast.message(response.message);
                reset();
            }
            else {
                toast.error(response.message);
            }
            console.log(userUpdateData);
        }
        catch (error) {
            console.error('[UPDATE USER ERROR]', error);
            toast.error('Something went wrong. Please try again.');
        }
    };
    return (_jsx(Card, { className: "w-full max-w-xl", ...props, children: _jsx(CardContent, { className: "space-y-6", children: _jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(FieldGroup, { className: "", children: [_jsxs("div", { id: "name-fields", className: "w-full space-y-6 sm:flex sm:gap-[10px] sm:space-y-0", children: [_jsx("div", { id: "first-name-field", className: "sm:w-[50%]", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "first-name", className: "text-base font-semibold", children: "First Name" }), _jsx(Input, { id: "first-name", type: "text", placeholder: "John", autoComplete: "off", ...register('firstName'), "aria-invalid": !!errors.firstName }), errors.firstName?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.firstName.message }))] }) }), _jsx("div", { id: "last-name-field", className: "sm:w-[50%]", children: _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "last-name", className: "text-base font-semibold", children: "Last Name" }), _jsx(Input, { id: "last-name", type: "text", placeholder: "Doe", autoComplete: "off", ...register('lastName'), "aria-invalid": !!errors.lastName }), errors.lastName?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.lastName.message }))] }) })] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "username", className: "text-base font-semibold", children: "Username" }), _jsx(Input, { id: "username", type: "text", placeholder: "myUserName123", autoComplete: "off", ...register('userName'), "aria-invalid": !!errors.userName }), errors.userName?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.userName.message }))] }), _jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "email-address", className: "text-base font-semibold", children: "Email Address" }), _jsx(Input, { id: "email-address", type: "email", placeholder: "me@example.com", autoComplete: "off", ...register('emailAddress'), "aria-invalid": !!errors.emailAddress }), errors.emailAddress?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.emailAddress.message }))] }), _jsx(FieldGroup, { children: _jsx(Field, { children: _jsx(Button, { type: "submit", className: "text-base font-semibold sm:-mt-2", disabled: isSubmitting, children: "Update User" }) }) })] }) }) }) }));
}
