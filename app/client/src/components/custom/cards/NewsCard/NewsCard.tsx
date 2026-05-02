import { Bookmark, ExternalLink } from 'lucide-react';
import type { SavedArticleType } from '@/shared/types/common/news/NewsArticleTypes.js';
import { Button } from '@client/components/shadcn/button.js';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

type NewsCardProps = {
	article: SavedArticleType;
};

const getPublishedDate = (publishedAt: SavedArticleType['publishedAt']) => {
	if (!publishedAt) {
		return null;
	}

	const date =
		publishedAt instanceof Date ? publishedAt : new Date(publishedAt);

	return Number.isNaN(date.getTime()) ? null : date;
};

const formatPublishedDate = (publishedAt: SavedArticleType['publishedAt']) => {
	const date = getPublishedDate(publishedAt);

	if (!date) {
		return 'Date unavailable';
	}

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);
};

export const NewsCard = ({ article }: NewsCardProps) => {
	const { user } = useOutletContext<AppOutletContext>();

	const description =
		article.description?.trim() ||
		article.content?.trim() ||
		'No preview available for this article.';

	const author = article.author?.trim();
	const publishedDate = getPublishedDate(article.publishedAt);
	const hasImage = Boolean(article.urlToImage);

	return (
		<div className="bg-background border-border flex w-full max-w-[320px] flex-col overflow-hidden rounded-xl border">
			<div className="bg-muted flex aspect-[16/9] w-full items-center justify-center overflow-hidden">
				{hasImage ? (
					<img
						src={article.urlToImage ?? undefined}
						alt={article.title}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="text-muted-foreground text-sm">
						No image available
					</div>
				)}
			</div>

			<div className="flex flex-1 flex-col gap-3 p-3">
				<div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
					<span className="text-foreground font-medium">
						{article.sourceName}
					</span>
					<span>•</span>
					<time dateTime={publishedDate?.toISOString()}>
						{formatPublishedDate(article.publishedAt)}
					</time>
					{author ? (
						<>
							<span>•</span>
							<span>By {author}</span>
						</>
					) : null}
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="text-foreground text-base leading-tight font-semibold">
						{article.title}
					</h2>

					<p className="text-muted-foreground text-sm leading-5">
						{description}
					</p>
				</div>
			</div>

			<div className="border-border mt-auto flex items-center justify-between gap-2 border-t px-3 py-3">
				<Button asChild size="sm">
					<a
						href={article.url}
						target="_blank"
						rel="noreferrer"
						aria-label={`Read article: ${article.title}`}
					>
						Read Article
						<ExternalLink className="ml-1 h-4 w-4" />
					</a>
				</Button>

				<Button
					type="button"
					variant="outline"
					size="sm"
					// disabled
					aria-label="Save article coming soon"
					onClick={() => {
						console.log('Hello, World!');
						user.deleteArticle(article.articleId);
					}}
				>
					<Bookmark className="mr-1 h-4 w-4" />
					Save
				</Button>
			</div>
		</div>
	);
};
