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
import getCurrentPageState from './ui/getCurrentPageState.js';
import updateUserTheme from './ui/updateUserTheme.js';

// news controller
import getTopHeadlinesArticles from './news/topHeadlines/topHeadlines.js';
import getBusinessArticles from './news/business/business.js';
import getEntertainmentArticles from './news/entertainment/entertainment.js';
import getGeneralArticles from './news/general/general.js';
import getHealthArticles from './news/health/health.js';
import getSavedArticles from './news/savedArticles/savedArticles.js';
import getScienceArticles from './news/science/science.js';
import getSportsArticles from './news/sports/sports.js';
import getTechnologyArticles from './news/technology/technology.js';

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
	getCurrentPageState,
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
};

// export webController
export const webController = {
	web,
};
