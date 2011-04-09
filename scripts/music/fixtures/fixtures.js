require(['acme/fixture/fixture'], function(){
	$.acme_fixture('/services/artists','fixtures/artists.json');
	$.acme_fixture('/services/albums','fixtures/albums.json');
	$.acme_fixture('/services/genres','fixtures/genres.json');
})
