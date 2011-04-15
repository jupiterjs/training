define(['jupiter/model/model'], function(Model){
	return Model("Company",{
		findAll: function(params){
			return $.ajax({
				url : '/services/companies',
				dataType : 'json company.models',
				type : 'get',
				data : params
			})
		},
		create : function(attrs){
			return $.ajax({
				url : '/services/companies',
				dataType : 'json company.model',
				data : attrs,
				type : 'post'
			})
		}
	},{});
})
