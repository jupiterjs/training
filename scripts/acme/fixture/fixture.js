require(['jquery'], function($){

var maps = {};

$.acme_fixture = function(url, newUrl){
	maps[url] = newUrl;
};

$.ajaxPrefilter( function( settings ){
	if(maps[settings.url]){
		console.log('using fixture in '+maps[settings.url]);
		settings.url = maps[settings.url]
	}
	
})


});