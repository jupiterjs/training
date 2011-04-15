define(['jquery','jupiter/model/class'], function($){
	
	Contact = function(data){
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
		name: function(){
			return this.first+" "+this.name
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