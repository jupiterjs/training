define(['jquery'], function($){

var maps = {};

$.jupiter_fixture = function(url, newUrl){
	maps[url] = newUrl;
};

$.ajaxPrefilter( function( settings ){
	if(maps[settings.url]){
		if(typeof maps[settings.url] === 'string'){
			console.log('using fixture in '+maps[settings.url]);
			settings.url = maps[settings.url]
		}else{
			console.log('using function fixture for '+settings.url);
			settings.dataTypes.splice(0,0,"fixture")
			settings.fixture = maps[settings.url];
		}
	}
	
});

$.ajaxTransport( "fixture", function( s, original ) {

		// remove the fixture from the datatype
		s.dataTypes.shift();
		
		//we'll return the result of the next data type
		var next = s.dataTypes[0],
			timeout;
		
		return {
		
			send: function( headers , callback ) {
				
				// callback after a timeout
				timeout = setTimeout(function() {
					
					// get the callback data from the fixture function
					var data = s.fixture(original, s, headers),
						response = [200, 'success',{},{}];
					response[2][next] = data;
					
					// pass the fixture data back to $.ajax
					callback.apply(null, response);
				}, 200);
			},
			
			abort: function() {
				clearTimeout(timeout)
			}
		};
		
	});


});