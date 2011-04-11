require([
         'acme/list/list'], function(){
	

	
	$("#artists").acme_list('/services/categories');
	
	$("#albums").acme_list('/services/companies');
	
	$("#genres").acme_list('/services/locations');
	
	
})
