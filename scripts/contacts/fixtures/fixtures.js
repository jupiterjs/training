require(['acme/fixture/fixture'], function(){
	$.acme_fixture('/services/categories','fixtures/categories.json');
	$.acme_fixture('/services/locations','fixtures/locations.json');
	$.acme_fixture('/services/companies','fixtures/companies.json');
})
