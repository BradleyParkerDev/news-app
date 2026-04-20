import express from 'express';
import { newsController } from '@server/controllers/index.js';

const router = express.Router();

// News API
router.get('/top-headlines', newsController.getTopHeadlinesArticles);
router.get('/business', newsController.getBusinessArticles);
router.get('/entertainment', newsController.getEntertainmentArticles);
router.get('/general', newsController.getGeneralArticles);
router.get('/health', newsController.getHealthArticles);
router.get('/saved-articles', newsController.getSavedArticles);
router.get('/science', newsController.getScienceArticles);
router.get('/sports', newsController.getSportsArticles);
router.get('/technology', newsController.getTechnologyArticles);

export default router;
