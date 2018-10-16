var algoliasearch = require('algoliasearch');
var chunk = require('lodash.chunk');

//Initiate the client and the index
var algolia_client = algoliasearch('PCWWZM7M4O', 'dbfa7ceb36af6c186cdb7b2aef2e1738');
var bestbuy_index = algolia_client.initIndex('Best Buy API');

//import the JSON file
var records = require('./records.json');

//Considering the size of the file, I have decided to opt for batching the data by batches of 1000 records
var chunks = chunk(records, 1000);


chunks.map(function(batch) {
  return bestbuy_index.addObjects(batch);
});