require(['contacts/fixtures/fixtures',
		 'contacts/models/category',
		 'contacts/models/company',
		 'contacts/models/contact',
		 'contacts/models/location',
         'jupiter/create_list/create_list'], function(_,Category, Company, Contact, Location){
	

	window.Category = Category
	
	$("#categories").jupiter_create_list({
		model : Category,
		row : 'templates/category.tmpl',
		form: "<form><input name='name'/></form>"
	});

	$("#locations").jupiter_create_list({
		model : Location,
		row : 'templates/location.tmpl',
		form: "<form><input name='name'/></form>"
	});
	
	$("#companies").jupiter_create_list({
		model : Company,
		row : 'templates/company.tmpl',
		form: "<form><input name='name'/></form>"
	});
	
	$("#contacts").jupiter_create_list({
		model : Contact,
		row : 'templates/contact.tmpl',
		form: "<form><input name='name'/></form>"
	});
	
})
