require(['contacts/models/contact',
	     'contacts/fixtures/fixtures',
		 'jupiter/style/style',
		 'jupiter/create_list/create_list'
		 ], function(Contact){
	
	
	
	$("#categories").jupiter_create_list({
		findAll : '/services/categories',
		row : 'templates/category.tmpl',
		create: '/services/categories',
		form: "<form><input type='name'/></form>"
	});

	$("#locations").jupiter_create_list({
		findAll : '/services/locations',
		row : 'templates/location.tmpl',
		create: '/services/locations',
		form: "<form><input type='name'/></form>"
	});
	
	$("#companies").jupiter_create_list({
		findAll : '/services/companies',
		row : 'templates/company.tmpl',
		create: '/services/companies',
		form: "<form><input type='name'/></form>"
	});
	
	$("#contacts").jupiter_create_list({
		model : Contact,
		row : 'templates/contact.tmpl',
		create: '/services/contacts',
		form: "<form><input type='name'/></form>"
	});
	
	
	
})
