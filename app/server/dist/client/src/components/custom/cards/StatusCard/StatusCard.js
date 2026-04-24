import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../../components/shadcn/button.js';
export const StatusCard = ({ ui, icon, title, description, buttonText = 'Return Home', redirectTo = '/', }) => {
    return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center p-[20px]", children: _jsxs("div", { className: "bg-foreground/5 border-foreground/10 text-foreground flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border px-6 py-8 text-center shadow-lg", children: [icon && (_jsx("div", { className: "border-foreground/30 flex h-12 w-12 items-center justify-center rounded-full border border-dashed text-lg font-bold", children: icon })), _jsx("h2", { className: "text-xl font-semibold", children: title }), _jsx("p", { className: "text-muted-foreground text-sm", children: description }), _jsx(Button, { onClick: () => {
                        ui.navigateTo(redirectTo);
                    }, children: buttonText })] }) }));
};
