// auth controller imports
import loginUser from './auth/loginUser.js';
import logoutUser from './auth/logoutUser.js';

// images controller
import uploadImage from './image/uploadImage.js';
import deleteImage from './image/deleteImage.js';

// user controller
import registerUser from './user/registerUser.js';
import getUser from './user/getUser.js';
import updateUser from './user/updateUser.js';
import deleteUser from './user/deleteUser.js';

// ui controller
import updateUserTheme from './ui/updateUserTheme.js';

// news controller
import getTopHeadlinesArticles from './news/fetchArticles/getTopHeadlinesArticles.js';
import getBusinessArticles from './news/fetchArticles/getBusinessArticles.js';
import getEntertainmentArticles from './news/fetchArticles/getEntertainmentArticles.js';
import getGeneralArticles from './news/fetchArticles/getGeneralArticles.js';
import getHealthArticles from './news/fetchArticles/getHealthArticles.js';
import getSavedArticles from './news/fetchArticles/getSavedArticles.js';
import getScienceArticles from './news/fetchArticles/getScienceArticles.js';
import getSportsArticles from './news/fetchArticles/getSportsArticles.js';
import getTechnologyArticles from './news/fetchArticles/getTechnologyArticles.js';

import deleteSavedArticle from './news/userSavedArticles/deleteSavedArticle.js';
import saveArticle from './news/userSavedArticles/saveArticle.js';

// web controller import
import web from './web/index.js';

// export authController
export const authController = {
	loginUser,
	logoutUser,
};

export const imageController = {
	uploadImage,
	deleteImage,
};

// export userController
export const userController = {
	registerUser,
	getUser,
	updateUser,
	deleteUser,
};

export const uiController = {
	updateUserTheme,
};

export const newsController = {
	getTopHeadlinesArticles,
	getBusinessArticles,
	getEntertainmentArticles,
	getGeneralArticles,
	getHealthArticles,
	getSavedArticles,
	getScienceArticles,
	getSportsArticles,
	getTechnologyArticles,
	deleteSavedArticle,
	saveArticle,
};

// export webController
export const webController = {
	web,
};
