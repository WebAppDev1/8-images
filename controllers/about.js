"use strict";

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import accounts from './accounts.js';

const about = {
  
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
    // app statistics calculations
    const playlists = playlistStore.getUserPlaylists(loggedInUser.id);

    let numPlaylists = playlists.length;
    let numSongs = 0;

    for (let item of playlists) {
        numSongs += item.songs.length;
    }
    
    let average = 0;
    if (numPlaylists > 0) {
      average = (numSongs / numPlaylists).toFixed(1);
    }
    
    // largest 
    let largestTitleList = "";
    let longestLength = Math.max(...playlists.map(playlist => playlist.songs.length)); 
    playlists.forEach((playlist) => {
      if (playlist.songs.length === longestLength){
        largestTitleList = largestTitleList ? largestTitleList + ", " + playlist.title : playlist.title;
      }
    });   
    
    // smallest
    let smallestTitleList = "";
    let shortestLength = Math.min(...playlists.map((playlist) => playlist.songs.length)); 
    
    for (let playlist of playlists) {
      if (playlist.songs.length === shortestLength) {
        smallestTitleList = smallestTitleList ? smallestTitleList + ", " + playlist.title : playlist.title;
      }
    }

    const viewData = {
      title: "About the Playlist App",
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      average: average,
      largest: largestTitleList,
      longest: longestLength,
      smallest: smallestTitleList,
      shortest: shortestLength,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture 
    };
    
    response.render('about', viewData);
        }
    else response.redirect('/'); 
  },

//   createView(request, response) {
//     // app statistics calculations
//     const playlists = playlistStore.getAllPlaylists();

//     // song and playlist totals
//     let numPlaylists = playlists.length;
//     let numSongs = 0;
//     for (let item of playlists) {
//       numSongs += item.songs.length;
//     }

//     // average
//     let average = 0;
//     if (numPlaylists > 0) {
//       average = (numSongs / numPlaylists).toFixed(1);
//     }
    
//     // largest 
//     let largestTitleList = "";
//     let longestLength = Math.max(...playlists.map((playlist) => playlist.songs.length)); 
    
//     for (let playlist of playlists) {
//       if (playlist.songs.length === longestLength) {
//         largestTitleList = largestTitleList ? largestTitleList + ", " + playlist.title : playlist.title;
//       }
//     }
   
    
//     // smallest
//     let smallestTitleList = "";
//     let shortestLength = Math.min(...playlists.map((playlist) => playlist.songs.length)); 
    
//     for (let playlist of playlists) {
//       if (playlist.songs.length === shortestLength) {
//         smallestTitleList = smallestTitleList ? smallestTitleList + ", " + playlist.title : playlist.title;
//       }
//     }

//     logger.info("About page loading!");

//     const viewData = {
//       title: "Playlist App About",
//       displayNumPlaylists: numPlaylists,
//       displayNumSongs: numSongs,
//       average: average,
//       largest: largestTitleList,
//       smallest: smallestTitleList
//     };

//     response.render("about", viewData);
//   },
};

export default about;
