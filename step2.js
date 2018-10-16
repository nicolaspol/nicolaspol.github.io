var algoliasearch = require('algoliasearch');

var algolia_client = algoliasearch('PCWWZM7M4O', 'dbfa7ceb36af6c186cdb7b2aef2e1738');
var bestbuy_index = algolia_client.initIndex('Best Buy');

// First I have used the following code to perform a first search on Algolia and store the results containing 3DR
// As mentionned in the Word document, I'm only looking for the attribute name, brand and decription to replace 3DR to Best Drones Company. I also need the objectID to be able to push the data back in the right object
//Steps: create an array of data using the search function, edit the data using foreach, update the data using partial update objects

var rename_objects=[];

bestbuy_index.search({
  query: '3DR',
  attributesToRetrieve: ['name', 'brand', 'description'],
  },
  function searchDone(err, content) {
    if (err) throw err;

   	content.hits.forEach(function(content_hit){
   		console.log(content_hit);
   		var old_name = content_hit.name;
   		var old_brand= content_hit.brand;
   		var old_description= content_hit.description;
   		var objectID = content_hit.objectID;

   		//console.log(old_name+" "+old_brand+" "+old_description+" "+objectID);

   		// var new_name= old_name.replace("3DR", "Best Drones Company"); //old function which was not replacing every instance of the word 3DR
   		var new_name= old_name.replace(/3DR/gi, "Best Drones Company");
   		var new_brand = "Best Drones Company";
   		// var new_description = old_description.replace("3D Robotics", "Best Drones Company"); //old function - We apply the same as the name for the description
   		var new_description = old_description.replace(/3D Robotics/gi, "Best Drones Company").replace(/3DR/gi, "Best Drones Company"); //new function to also replace 3D Robotics in the description

   		//console.log("Data updated");
		var json_object = {"name": new_name, "brand": new_brand, "description": new_description,"objectID": objectID}
   		rename_objects.push(json_object);

   		console.log(rename_objects);

// Using the documentation, I have identified that the method to use is : Partial Update Objects in order to only the attributes I have changed in my dataset

		bestbuy_index.partialUpdateObjects(rename_objects, function(err, edited_content) {
		  if (err) throw err;

		  console.log(edited_content);
		});	
   	});
    }
);



