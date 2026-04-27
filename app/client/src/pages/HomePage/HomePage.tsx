import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';
import type { SavedArticleType } from '@/shared/types/common/news/NewsArticleTypes.js';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@client/components/shadcn/pagination.js';

type HomePageContentType = {
	category?: string;
	page?: number;
	limit?: number;
	articlesOnPage?: number;
	totalArticles?: number;
	totalPages?: number;
	articles?: SavedArticleType[];
};

const HomePage = () => {
	const { ui } = useOutletContext<AppOutletContext>();

	const content = (ui.currentPage?.content ?? {}) as HomePageContentType;

	const { page = 1, limit = 25, totalPages = 1, articles = [] } = content;

	const newsArticles = articles;

	useEffect(() => {
		document.title = `Home | ${ui.appName}`;
	}, [ui.appName]);
	const firstPage = 1;
	const lastPage = totalPages;
	const middlePage =
		page === firstPage
			? firstPage + 1
			: page === lastPage
				? Math.max(firstPage + 1, lastPage - 1)
				: page;

	const showLeftEllipsis = middlePage > firstPage + 1;
	return (
		<div id="home-page" className="flex w-full flex-col gap-6 py-4">
			<div className="w-full px-4 sm:px-5">
				<h1 className="font-primary text-2xl font-bold">
					Top Headlines
				</h1>
			</div>

			<div className="flex w-full flex-wrap justify-center gap-4 px-2">
				{newsArticles.map((article: SavedArticleType) => (
					<NewsCard
						key={article.articleId ?? article.url}
						article={article}
					/>
				))}
			</div>

			<div className="px-4">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() => {
									ui.navigateTo(
										`/?page=${Math.max(1, page - 1)}&limit=25`,
									);
								}}
							/>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								isActive={page === firstPage}
								onClick={() => {
									ui.navigateTo(
										`/?page=${firstPage}&limit=25`,
									);
								}}
							>
								{firstPage}
							</PaginationLink>
						</PaginationItem>
						{showLeftEllipsis ? (
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
						) : null}
						{lastPage > 1 &&
						middlePage !== firstPage &&
						middlePage !== lastPage ? (
							<PaginationItem>
								<PaginationLink
									href="#"
									isActive={page === middlePage}
									onClick={() => {
										ui.navigateTo(
											`/?page=${middlePage}&limit=25`,
										);
									}}
								>
									{middlePage}
								</PaginationLink>
							</PaginationItem>
						) : null}
						{lastPage > 1 ? (
							<PaginationItem>
								<PaginationLink
									href="#"
									isActive={page === lastPage}
									onClick={() => {
										ui.navigateTo(
											`/?page=${lastPage}&limit=25`,
										);
									}}
								>
									{lastPage}
								</PaginationLink>
							</PaginationItem>
						) : null}
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() => {
									ui.navigateTo(
										`/?page=${Math.min(lastPage, page + 1)}&limit=25`,
									);
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default HomePage;
