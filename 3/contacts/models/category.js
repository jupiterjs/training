define(['jupiter/model/model'], function(Model){
	
	return Model("Category",{
		findAll: function(params){
			return $.ajax({
				url : '/services/categories',
				dataType : 'json category.models',
				type : 'get',
				data : params
			})
		},
		create : function(attrs){
			return $.ajax({
				url : '/services/categories/create',
				dataType : 'json',
				data : attrs,
				type : 'post'
			})
		}
	},{});
	
});
