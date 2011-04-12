require(['jupiter/style/style',
         'jupiter/list/list'], function(){
	

	
	$("#categories ul").jupiter_list('/services/categories');
	
	
	$("#locations ul").jupiter_list('/services/locations');
	
	$("#companies ul").jupiter_list('/services/companies');
	
	
	$("#contacts ul").jupiter_list('/services/contacts');
})
