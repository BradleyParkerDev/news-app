import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';
import type { SavedArticleType } from '@shared/types/common/news/NewsArticleTypes.js';
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

const BusinessPage = () => {
	const { ui } = useOutletContext<AppOutletContext>();
	const content = ui.currentPage.content as PageContent;
	const { page = 1, limit = 25, totalPages = 1, articles = [] } = content;
	const newsArticles = articles;

	const firstPage = 1;
	const lastPage = totalPages;
	let middlePage;

	// If the current page is the first page,
	// show the page right after it as the middle page.
	if (page === firstPage) {
		middlePage = firstPage + 1;

		// If the current page is the last page,
		// show the page right before the last page as the middle page.
		// Math.max makes sure the middle page never goes below page 2.
	} else if (page === lastPage) {
		middlePage = Math.max(firstPage + 1, lastPage - 1);

		// Otherwise, if the current page is somewhere in the middle,
		// just use the current page itself.
	} else {
		middlePage = page;
	}

	const showLeftEllipsis = middlePage > firstPage + 1;

	useEffect(() => {
		document.title = `Business | ${ui.appName}`;
	}, [ui.appName]);

	return (
		<div id="business-page" className="flex w-full flex-col gap-6 p-4">
			<div className="w-full">
				<h1 className="font-primary text-2xl font-bold">Business</h1>
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
										`/business?page=${firstPage}&limit=25`,
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
											`/business?page=${middlePage}&limit=25`,
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
											`/business?page=${lastPage}&limit=25`,
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
										`/business?page=${Math.min(lastPage, page + 1)}&limit=25`,
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

export default BusinessPage;
