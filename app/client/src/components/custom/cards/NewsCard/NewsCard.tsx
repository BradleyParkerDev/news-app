import React from 'react';
import type { SavedArticleType } from '@/shared/types/common/news/NewsArticleTypes.js';

type NewsCardProps = Partial<{
	article: SavedArticleType;
}>;

export const NewsCard = ({ article }: NewsCardProps) => {
	return <div>NewsCard</div>;
};
