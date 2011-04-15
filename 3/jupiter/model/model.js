define(['jquery','jupiter/model/class'], function($, Class){
	
	var Model = Class.extend({
		init : function(data){
			$.extend(this,data);
		},
		save : function(){
			var attrs = {}, self = this;
			$.extend(attrs, this);
			
			var deferred = this.constructor.create(attrs),
				myDeffered = $.Deferred();
			
			deferred.done(function(json){
				$.extend(self, json);
				
				myDeffered.resolveWith(self);
				$(Model).trigger('created', self)
			});
			return myDeffered.promise();
		}
	});
	
	Model.models = function( json ) {
		var self = this;
		return $.map(json, function(attrs){
			return new self(attrs)
		})
	}
	
	Model.model = function( json ) {
		return new this(attrs)
	}
	
	return function(name, staticProps, proto) {
		var model = Model.extend(proto);
		$.extend(model, staticProps);
		if(!model.models){
			model.models = Model.models;
		}
		if(!model.model){
			model.model = Model.model;
		}
		var converters = {};
		
		converters["json "+name.toLowerCase()+".models"] = function( json ) {
			return model.models(json)
		};
		converters["json "+name.toLowerCase()+".model"] = function( json ) {
	      	return model.model(json)
	    }
		
		
		$.ajaxSetup({
		  	converters: converters
		});
		

		return model;
	}
	
})
