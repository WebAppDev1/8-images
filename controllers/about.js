"use strict";

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import accounts from './accounts.js';

const about = {
  
  createView(request, response) {
  
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      
      // initialise all variables
      let numPlaylists = 0;
      let numSongs = 0;
      let average = 0;
      let currentLargest = 0;
      let largestPlaylistTitle = "";
      let currentSmallest = 0;
      let smallestPlaylistTitle = "";

      // get the user's playlists
      const playlists = playlistStore.getUserPlaylists(loggedInUser.id);

      // if there are playlists, do the statistics calculations
      if(playlists.length > 0){
        
        // song and playlist totals
        numPlaylists = playlists.length;

        for (let item of playlists) {
          numSongs += item.songs.length;
        }

        // average
        if (numPlaylists > 0) {
          average = (numSongs / numPlaylists).toFixed(2);
        }

        // largest
        for (let playlist of playlists) {
          if (playlist.songs.length > currentLargest) {
            currentLargest = playlist.songs.length;
          }
        }

        for (let playlist of playlists) {
          if (playlist.songs.length === currentLargest) {
            largestPlaylistTitle = largestPlaylistTitle ? largestPlaylistTitle + ", " + playlist.title : playlist.title;
          }
        }

        // smallest
        currentSmallest = playlists[0].songs.length;
        for (let playlist of playlists) {
          if (playlist.songs.length < currentSmallest) {
            currentSmallest = playlist.songs.length;
          }
        }

        for (let playlist of playlists) {
          if (playlist.songs.length === currentSmallest) {
            smallestPlaylistTitle = smallestPlaylistTitle ? smallestPlaylistTitle + ", " + playlist.title : playlist.title;
          }
        }

      }

      logger.info("About page loading!");

      const viewData = {
        title: "Playlist App About",
        displayNumPlaylists: numPlaylists,
        displayNumSongs: numSongs,
        average: average,
        largest: largestPlaylistTitle,
        smallest: smallestPlaylistTitle,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      response.render("about", viewData);
    }
          
    else response.redirect('/');
  }
  
};

export default about;
