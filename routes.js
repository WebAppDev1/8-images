'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';
import search from './controllers/search.js';
import accounts from './controllers/accounts.js';

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/playlist/:id', playlist.createView);
router.get('/search', search.createView);

router.post('/searchCategory', search.findResult);

router.post('/playlist/:id/addsong', playlist.addSong);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);

router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);


router.get('/error', (request, response) => response.status(404).end('Page not found.'));

export default router;
