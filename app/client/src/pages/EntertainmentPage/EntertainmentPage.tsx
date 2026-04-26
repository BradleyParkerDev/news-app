import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';
import type { SavedArticleType } from '@/shared/types/common/news/NewsArticleTypes.js';

const EntertainmentPage = () => {
	const { ui } = useOutletContext<AppOutletContext>();

	const articles = (ui.currentPage?.content?.articles ??
		[]) as SavedArticleType[];

	useEffect(() => {
		document.title = `Entertainment | ${ui.appName}`;
	}, [ui.appName]);

	return (
		<div id="entertainment-page" className="flex w-full flex-col gap-6 p-4">
			<div className="w-full">
				<h1 className="font-primary text-2xl font-bold">
					Entertainment
				</h1>
			</div>

			<div className="flex w-full flex-wrap justify-center gap-4">
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

export default EntertainmentPage;
