import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
const HomePage = () => {
    const { ui } = useOutletContext();
    const articleGroups = ui.currentPage?.content?.articles ?? {};
    const articles = Object.values(articleGroups).flat();
    useEffect(() => {
        document.title = `Home | ${ui.appName}`;
    }, [ui.appName]);
    return (_jsx("div", { id: "home-page", className: "flex h-full w-full justify-center" }));
};
export default HomePage;
