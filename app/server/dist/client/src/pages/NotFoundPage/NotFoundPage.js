import { jsx as _jsx } from "react/jsx-runtime";
import { useOutletContext } from 'react-router';
import { SearchX } from 'lucide-react';
import { StatusCard } from '../../components/index.js';
const NotFoundPage = () => {
    const { ui } = useOutletContext();
    return (_jsx(StatusCard, { ui: ui, icon: _jsx(SearchX, {}), title: "Page Not Found", description: "The page you are looking for does not exist.", buttonText: "Go Home", redirectTo: "/" }));
};
export default NotFoundPage;
