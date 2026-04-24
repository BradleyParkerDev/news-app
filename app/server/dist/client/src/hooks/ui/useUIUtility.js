import { useAppSelector } from '../../../../shared/redux/hooks.js';
import { useUIThemeHelper, useUINavHelper, useUIFormHelper, useUIEffectHelper, useUIPageHelper, } from './helpers/index.js';
export const useUIUtility = () => {
    const { appName, currentPage } = useAppSelector((state) => state.ui);
    const themeHelper = useUIThemeHelper();
    const navHelper = useUINavHelper();
    const formHelper = useUIFormHelper();
    useUIPageHelper();
    const effectHelper = useUIEffectHelper({
        closeAvatarPopover: navHelper.closeAvatarPopover,
    });
    return {
        appName,
        currentPage,
        ...themeHelper,
        ...navHelper,
        ...formHelper,
        ...effectHelper,
    };
};
