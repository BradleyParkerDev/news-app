import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../../../../lib/utils.js';
import { useAppSelector } from '../../../../../../shared/redux/hooks.js';
import { Moon, Sun } from 'lucide-react';
export const UIThemeSwitch = React.forwardRef(({ className, ui, checked: checkedProp, defaultChecked, ...props }, ref) => {
    // Use provided ui state if passed, otherwise fall back to global UI slice.
    const globalTheme = useAppSelector((state) => state.ui.theme);
    const theme = ui?.theme ?? globalTheme;
    const derivedChecked = checkedProp ?? (theme ? theme === 'dark' : undefined);
    const derivedDefaultChecked = checkedProp === undefined
        ? (defaultChecked ?? (theme ? theme === 'dark' : undefined))
        : undefined;
    return (_jsx(SwitchPrimitives.Root, { ref: ref, className: cn(
        // Track layout
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent', 'transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none', 'disabled:cursor-not-allowed disabled:opacity-50', 
        // 🔒 Fixed track color
        'bg-[#e5e5e5] hover:border-[#f56565]', className), ...(derivedChecked !== undefined
            ? { checked: derivedChecked }
            : { defaultChecked: derivedDefaultChecked }), ...props, children: _jsxs(SwitchPrimitives.Thumb, { className: cn('pointer-events-none relative flex h-4 w-4 items-center justify-center rounded-full shadow-md transition-transform', 'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0', 'data-[state=unchecked]:bg-[#ffffff]', 'data-[state=checked]:bg-[#0a0a0a]'), children: [theme === 'light' && (_jsx(Sun, { className: "text-foreground h-3 w-3 transition-opacity data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100" })), theme === 'dark' && (_jsx(Moon, { className: "text-foreground absolute h-3 w-3 transition-opacity data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0" }))] }) }));
});
UIThemeSwitch.displayName = SwitchPrimitives.Root.displayName;
