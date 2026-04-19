import { useState, useEffect } from 'react';
import { Button } from '@client/components/shadcn/button.js';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

const HomePage = () => {
	const { ui, auth, user } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `Home | ${ui.appName}`;
	}, []);

	return (
		<div id="home-page" className="flex h-full w-full justify-center"></div>
	);
};

export default HomePage;
