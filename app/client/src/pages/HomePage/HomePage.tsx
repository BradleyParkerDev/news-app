import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';
import type { SavedArticleType } from '@/shared/types/common/news/NewsArticleTypes.js';

const HomePage = () => {
	const { ui } = useOutletContext<AppOutletContext>();

	const articleGroups = ui.currentPage?.content?.articles ?? {};
	const articles = Object.values(articleGroups).flat() as SavedArticleType[];

	useEffect(() => {
		document.title = `Home | ${ui.appName}`;
	}, [ui.appName]);

	return (
		<div id="home-page" className="flex h-full w-full justify-center"></div>
	);
};

export default HomePage;
