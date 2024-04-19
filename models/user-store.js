'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
  async addUser(user, response) {
    function uploader(){
      return new Promise(function(resolve, reject) {  
        cloudinary.uploader.upload(user.picture.tempFilePath,function(result,err){
          if(err){console.log(err);}
          resolve(result);
        });
      });
    }
    let result = await uploader();
    logger.info('cloudinary result', result);
    user.picture = result.url;

    this.store.addCollection(this.collection, user);
    response();
  },

};

export default userStore;