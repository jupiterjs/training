require(['contacts/models/category',
		 'contacts/models/company',
		 'contacts/models/contact',
		 'contacts/models/location',
         'jupiter/list/list'], function(Category, Company, Contact, Location){
	

	
	$("#categories ul").jupiter_list({
		model: Category,
		row : "templates/category.tmpl"
	});
	
	
	$("#locations ul").jupiter_list({
		model: Location,
		row : "templates/location.tmpl"
	});
	
	$("#companies ul").jupiter_list({
		model: Company,
		row : "templates/company.tmpl"
	});
	
	
	$("#contacts ul").jupiter_list({
		model: Contact,
		row : "templates/contact.tmpl"
	});
})
