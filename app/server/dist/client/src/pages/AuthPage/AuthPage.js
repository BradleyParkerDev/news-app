import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoginForm, RegistrationForm } from '../../components/index.js';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
const AuthPage = () => {
    const { ui, auth, user } = useOutletContext();
    useEffect(() => {
        document.title = `Auth | ${ui.appName}`;
    }, []);
    const [formDisplayed, setFormDisplayed] = useState('Welcome back!');
    // Toggle login and registration forms
    const toggleAuthPageForms = () => {
        if (formDisplayed === 'Welcome back!') {
            setFormDisplayed('Create an account.');
        }
        else {
            setFormDisplayed('Welcome back!');
        }
    };
    // Show login form with navbar sign in button
    useEffect(() => {
        if (ui.authPageForm === 'login') {
            setFormDisplayed('Welcome back!');
            ui.toggleAuthPageFormsWithNavUserButton();
        }
    }, [ui.authPageForm]);
    return (_jsxs("div", { id: "auth-page", className: `flex h-full w-full flex-col items-center gap-6 p-6 text-center`, children: [_jsx("p", { className: "dark:text-foreground text-xl font-semibold", children: formDisplayed }), formDisplayed === 'Welcome back!' && (_jsx(LoginForm, { toggleAuthPageForms: toggleAuthPageForms })), formDisplayed === 'Create an account.' && (_jsx(RegistrationForm, { toggleAuthPageForms: toggleAuthPageForms }))] }));
};
export default AuthPage;
