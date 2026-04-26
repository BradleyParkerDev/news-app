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
		<div id="home-page" className="flex w-full flex-col gap-6 py-4">
			<div className="w-full px-4 sm:px-5">
				<h1 className="font-primary text-2xl font-bold">
					Top Headlines
				</h1>
			</div>

			<div className="flex w-full flex-wrap justify-center gap-4 px-2">
				{articles.map((article: SavedArticleType) => (
					<NewsCard
						key={article.articleId ?? article.url}
						article={article}
					/>
				))}
			</div>
		</div>
	);
};

export default HomePage;
