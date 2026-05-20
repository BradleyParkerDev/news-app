import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { NewsCard } from '@client/components/index.js';

import type { ArticleType } from '@shared/types/common/news/NewsArticleTypes.js';
import type { PageContent } from '@shared/types/common/index.js';

import { UserInfoCard, StatusCard } from '@client/components/index.js';
import { Lock } from 'lucide-react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@client/components/shadcn/pagination.js';

const UserPage = () => {
	// =========================
	// Page context and content
	// =========================
	const { ui, auth, user } = useOutletContext<AppOutletContext>();
	const content = ui.currentPage.content as PageContent;
	const { page = 1, limit = 25, totalPages = 1, articles = [] } = content;
	const newsArticles = articles;

	// =========================
	// Pagination display logic
	// =========================
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

	// =========================
	// Page metadata
	// =========================
	useEffect(() => {
		document.title = `User | ${ui.appName}`;
	}, [ui.appName]);

	return (
		<div
			id="user-page"
			className="flex h-full w-full flex-col space-y-8 px-4 py-6"
		>
			{/* =========================
			    Unauthenticated state
			========================= */}
			{!auth.isAuth && (
				<div className="mx-auto w-full max-w-2xl">
					<StatusCard
						ui={ui}
						icon={<Lock className="h-5 w-5" />}
						title="User not authenticated"
						description="You must be signed in to view account settings."
						buttonText="Go to Sign In"
						redirectTo="/auth"
					/>
				</div>
			)}

			{/* =========================
			    Authenticated user page
			========================= */}
			{auth.isAuth && (
				<div className="space-y-10">
					{/* Profile section */}
					<section className="mx-auto w-full max-w-2xl space-y-3">
						<div className="max-w-xl space-y-1">
							<h1 className="text-2xl font-semibold">Profile</h1>
							<p className="text-muted-foreground text-sm">
								View user account details and/or public profile
								information.
							</p>
						</div>

						<UserInfoCard />
					</section>

					{/* Saved articles section header */}
					<section className="mx-auto w-full max-w-2xl space-y-3">
						<div className="max-w-xl space-y-1">
							<h2 className="text-lg font-semibold">
								Saved Articles
							</h2>
							<p className="text-muted-foreground text-sm">
								Articles you have saved will appear here.
							</p>
						</div>
					</section>

					{/* Full-width saved article cards */}
					<div className="flex w-full flex-wrap justify-center gap-4 px-2">
						{newsArticles.map((article: ArticleType) => (
							<NewsCard
								key={article.articleId ?? article.url}
								article={article}
							/>
						))}
					</div>

					{/* Saved articles pagination */}
					{articles.length !== 0 && (
						<div className="px-4">
							<Pagination>
								<PaginationContent>
									{/* Previous page */}
									<PaginationItem>
										<PaginationPrevious
											href="#"
											onClick={() => {
												ui.navigateTo(
													`/user/${user.userName}?page=${Math.max(1, page - 1)}&limit=${limit}`,
												);
											}}
										/>
									</PaginationItem>

									{/* First page */}
									<PaginationItem>
										<PaginationLink
											href="#"
											isActive={page === firstPage}
											onClick={() => {
												ui.navigateTo(
													`/user/${user.userName}?page=${firstPage}&limit=${limit}`,
												);
											}}
										>
											{firstPage}
										</PaginationLink>
									</PaginationItem>

									{/* Left ellipsis when pages are skipped */}
									{showLeftEllipsis ? (
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
									) : null}

									{/* Middle page */}
									{lastPage > 1 &&
									middlePage !== firstPage &&
									middlePage !== lastPage ? (
										<PaginationItem>
											<PaginationLink
												href="#"
												isActive={page === middlePage}
												onClick={() => {
													ui.navigateTo(
														`/user/${user.userName}?page=${middlePage}&limit=${limit}`,
													);
												}}
											>
												{middlePage}
											</PaginationLink>
										</PaginationItem>
									) : null}

									{/* Last page */}
									{lastPage > 1 ? (
										<PaginationItem>
											<PaginationLink
												href="#"
												isActive={page === lastPage}
												onClick={() => {
													ui.navigateTo(
														`/user/${user.userName}?page=${lastPage}&limit=${limit}`,
													);
												}}
											>
												{lastPage}
											</PaginationLink>
										</PaginationItem>
									) : null}

									{/* Next page */}
									<PaginationItem>
										<PaginationNext
											href="#"
											onClick={() => {
												ui.navigateTo(
													`/user/${user.userName}?page=${Math.min(lastPage, page + 1)}&limit=${limit}`,
												);
											}}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UserPage;
