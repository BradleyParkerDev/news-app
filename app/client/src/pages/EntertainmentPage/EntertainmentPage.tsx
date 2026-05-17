import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';
import type { ArticleType } from '@shared/types/common/news/NewsArticleTypes.js';
import type { PageContent } from '@shared/types/common/index.js';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@client/components/shadcn/pagination.js';

const EntertainmentPage = () => {
	const { ui } = useOutletContext<AppOutletContext>();
	const content = ui.currentPage.content as PageContent;
	const { page = 1, limit = 25, totalPages = 1, articles = [] } = content;
	const newsArticles = articles;

	const firstPage = 1;
	const lastPage = totalPages;
	let middlePage;

	if (page === firstPage) {
		middlePage = firstPage + 1;
	} else if (page === lastPage) {
		middlePage = Math.max(firstPage + 1, lastPage - 1);
	} else {
		middlePage = page;
	}

	const showLeftEllipsis = middlePage > firstPage + 1;

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

			<div className="flex w-full flex-wrap justify-center gap-4 px-2">
				{newsArticles.map((article: ArticleType) => (
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
										`/entertainment?page=${Math.max(1, page - 1)}&limit=25`,
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
										`/entertainment?page=${firstPage}&limit=25`,
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
											`/entertainment?page=${middlePage}&limit=25`,
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
											`/entertainment?page=${lastPage}&limit=25`,
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
										`/entertainment?page=${Math.min(lastPage, page + 1)}&limit=25`,
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

export default EntertainmentPage;
