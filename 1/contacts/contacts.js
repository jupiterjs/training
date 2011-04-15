require(['jupiter/style/style',
		 'jupiter/create_list/create_list'], function(){
	
	
	
	$("#categories").jupiter_create_list({
		findAll : '/services/categories',
		create: '/services/categories',
		form: "<form><input type='name'/></form>"
	});

	$("#locations").jupiter_create_list({
		findAll : '/services/locations',
		create: '/services/locations',
		form: "<form><input type='name'/></form>"
	});
	
	$("#companies").jupiter_create_list({
		findAll : '/services/companies',
		create: '/services/companies',
		form: "<form><input type='name'/></form>"
	});
	
	$("#contacts").jupiter_create_list({
		findAll : '/services/contacts',
		create: '/services/contacts',
		form: "<form><input type='name'/></form>"
	});
	
	
	
})
