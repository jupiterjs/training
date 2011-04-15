require(['contacts/models/category',
		 'contacts/models/company',
		 'contacts/models/contact',
		 'contacts/models/location',
         'jupiter/list/list'], function(Category, Company, Contact, Location){
	

	
	$("#categories ul").jupiter_list({
		model: Category,
		row : "<li>${name}</li>"
	});
	
	
	$("#locations ul").jupiter_list({
		model: Location,
		row : "<li>${name}</li>"
	});
	
	$("#companies ul").jupiter_list({
		model: Company,
		row : "<li>${name}</li>"
	});
	
	
	$("#contacts ul").jupiter_list({
		model: Contact,
		row : "<li>${name}</li>"
	});
})
