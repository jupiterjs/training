define(['jquery'], function($){
	
	var Contact = function(data){
		$.extend(this,data);
	};
	
	$.extend(Contact,{
		findAll: function(params){
			return $.ajax({
				url : '/services/contacts',
				dataType : 'json contacts',
				type : 'get',
				data : params
			})
		},
		create : function(attrs){
			return $.ajax({
				url : '/services/contacts',
				dataType : 'json contact',
				data : attrs,
				type : 'post'
			})
		}
	})

	
	$.extend(Contact.prototype,{
		fullName: function(){
			return this.first+" "+this.last
		},
		year : function(){
			return new Date(this.createdAt).getFullYear();
		}
	});
	
	
	$.ajaxSetup({
		converters: {
			"json contacts": function( json ) {
				return $.map(json, function(attrs){
					return new Contact(attrs)
				})
			}
		}
	});
	
	$.ajaxSetup({
	  converters: {
	    "json contact": function( json ) {
	      return new Contact(json)
	    }
	  }
	});
	
	return Contact;
})