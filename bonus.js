//we initiate the search engine with the instant search linked to our Algolia index
var search = instantsearch({
  appId: 'PCWWZM7M4O',
  apiKey: '112401b1d9466bafe84cc0fb2b972555', // search only API key for security reason
  indexName: 'Best Buy API',
  urlSync: true,
  searchParameters: {
    hitsPerPage: 15
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input' //we identify the element with the search-input id as the search box of our widget
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits', //we define where the results will be displayed
    templates: {		// and the template for the results
      item: document.getElementById('hit-template').innerHTML,
      empty: "Your search <em>\"{{query}}\"</em> didn't match any result"
    }
  })
);

search.addWidget( //we had the pagination widget at the bottom of the page
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);

search.start();
