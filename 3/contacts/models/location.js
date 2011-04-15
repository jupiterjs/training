define(['jupiter/model/model'], function(Model){
	return Model("Location",{
		findAll: function(params){
			return $.ajax({
				url : '/services/locations',
				dataType : 'json location.models',
				type : 'get',
				data : params
			})
		},
		create : function(attrs){
			return $.ajax({
				url : '/services/locations',
				dataType : 'json location.model',
				data : attrs,
				type : 'post'
			})
		}
	},{});
})
