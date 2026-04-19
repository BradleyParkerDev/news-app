// import { RouteObject } from 'react-router-dom';
// import { pages } from '@client/pages/index.js';

// const {
// 	Layout,
// 	HomePage,
// 	AuthPage,
// 	UserPage,
// 	UserImagesPage,
// 	FriendPage,
// 	NewsPage,
// 	ChatPage,
// 	StorePage,
// 	SettingsPage,
// 	NotFoundPage, // 👈 add this
// } = pages;

// export const routes: RouteObject[] = [
// 	{
// 		path: '/',
// 		element: <Layout />,
// 		children: [
// 			{ index: true, element: <HomePage /> },
// 			{ path: '/auth', element: <AuthPage /> },
// 			{ path: '/settings', element: <SettingsPage /> },
// 			{ path: '/user/:userName', element: <UserPage /> },
// 			{ path: '/chat', element: <ChatPage /> },
// 			{ path: '/images', element: <UserImagesPage /> },
// 			{ path: '/friends', element: <FriendPage /> },
// 			{ path: '/news', element: <NewsPage /> },
// 			{ path: '/store', element: <StorePage /> },

// 			// 👇 THIS fixes your 404 UI
// 			{ path: '*', element: <NotFoundPage /> },
// 		],
// 	},
// ];
import { RouteObject } from 'react-router-dom';
import { pages } from '@client/pages/index.js';

const {
	Layout,
	HomePage,
	AuthPage,
	UserPage,
	BusinessPage,
	EntertainmentPage,
	GeneralPage,
	HealthPage,
	SciencePage,
	SportsPage,
	TechnologyPage,
	SettingsPage,
	NotFoundPage,
} = pages;

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/auth', element: <AuthPage /> },
			{ path: '/settings', element: <SettingsPage /> },
			{ path: '/user/:userName', element: <UserPage /> },

			{ path: '/business', element: <BusinessPage /> },
			{ path: '/entertainment', element: <EntertainmentPage /> },
			{ path: '/general', element: <GeneralPage /> },
			{ path: '/health', element: <HealthPage /> },
			{ path: '/science', element: <SciencePage /> },
			{ path: '/sports', element: <SportsPage /> },
			{ path: '/technology', element: <TechnologyPage /> },

			{ path: '*', element: <NotFoundPage /> },
		],
	},
];
