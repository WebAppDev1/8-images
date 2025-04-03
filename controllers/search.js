'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import accounts from './accounts.js';

const getCategories = (loggedInUser) => {
  const categories = [];
    const playlists = playlistStore.getUserPlaylists(loggedInUser.id);
    playlists.forEach(element => {
    if (!categories.includes(element.category)) {
        categories.push(element.category);
    }
});
  return categories;
}

const search = {
  
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Search page loading!");
    if (loggedInUser) {
     const viewData = {
      title: "Playlist App Search",
      categories: getCategories(loggedInUser),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
     };
    
       logger.debug(viewData.categories);
    
      response.render('search', viewData);
      }
    else response.redirect('/'); 
  },
  
  findResult(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const category = request.body.category;
    logger.debug('Playlist category = ' + category);

    const viewData = {
      title: 'Playlist',
      foundPlaylists: playlistStore.getPlaylistCategory(category, loggedInUser.id),
      categories: getCategories(loggedInUser),
      categoryTitle: category,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    
    logger.debug(viewData.foundPlaylists);
    
    response.render('search', viewData);
  },
};

export default search;
