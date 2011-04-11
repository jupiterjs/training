require(['acme/style/style',
         'acme/list/list'], function(){
	

	
	$("#categories ul").acme_list('/services/categories');
	
	
	$("#locations ul").acme_list('/services/locations');
	
	$("#companies ul").acme_list('/services/companies');
	
	
	$("#contacts ul").acme_list('/services/contacts');
})
