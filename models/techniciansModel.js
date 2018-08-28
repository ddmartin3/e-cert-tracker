'use strict';

var Datastore = require('nedb'),

techniciansDb = new Datastore({
    filename: __dirname + '/../db/technicians.db',
    autoload: true
  });

module.exports = techniciansDb;
