import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { Construction } from 'lucide-react';
import { StatusCard } from '../../components/index.js';
const BusinessPage = () => {
    const { ui } = useOutletContext();
    useEffect(() => {
        document.title = `Chat | ${ui.appName}`;
    }, [ui.appName]);
    return (_jsx(StatusCard, { ui: ui, icon: _jsx(Construction, {}), title: "Page Under Construction", description: "We are still building this experience. Check back soon for updates.", buttonText: "Return Home", redirectTo: "/" }));
};
export default BusinessPage;
