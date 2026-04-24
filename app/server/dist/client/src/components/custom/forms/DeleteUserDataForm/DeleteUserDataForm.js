import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../../components/shadcn/button.js';
import { Card, CardContent } from '../../../../components/shadcn/card.js';
import { Field, FieldGroup, FieldLabel, } from '../../../../components/shadcn/field.js';
import { Input } from '../../../../components/shadcn/input.js';
import { DeleteUserDataSchema } from '../../../../../../shared/zod/user/deleteUserDataSchema.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
export function DeleteUserDataForm({ embedded = false, }) {
    const { user } = useOutletContext();
    const { handleSubmit, register, reset, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(DeleteUserDataSchema),
        defaultValues: {
            confirmation: '',
        },
    });
    const onSubmit = async (userDeletionConfirmation) => {
        const result = await user.deleteUserAccount(userDeletionConfirmation);
        if (result.success) {
            toast.success('User account deleted.');
            reset();
        }
        else {
            toast.error(result.message);
        }
    };
    const formContent = (_jsx("form", { onSubmit: handleSubmit(onSubmit), children: _jsxs(FieldGroup, { className: "space-y-2", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: "confirmation", className: "text-base font-semibold", children: "Type Confirmation" }), _jsx(Input, { id: "confirmation", type: "text", placeholder: '"permanently delete"', autoComplete: "off", ...register('confirmation'), "aria-invalid": !!errors.confirmation }), errors.confirmation?.message && (_jsx("p", { className: "text-destructive text-sm", children: errors.confirmation.message }))] }), _jsx(Button, { type: "submit", className: "-mt-[15px] w-full text-base font-semibold", disabled: isSubmitting, children: "Delete User Account" })] }) }));
    if (embedded) {
        return formContent;
    }
    return (_jsx(Card, { className: "w-full max-w-xl", children: _jsx(CardContent, { className: "space-y-6", children: formContent }) }));
}
