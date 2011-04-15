define(['jquery','jupiter/model/model'], function($){
	
$.fn.jupiter_create = function(options){
	
	this.click(function(){
		
		$(options.form)
			.prependTo(options.prependTo)
			.submit(function(ev){
				var form = $(this),
					data = {};
				
				form.find('input').each(function(i, input){
					data[input.name] = input.value;
				})
				
				ev.preventDefault();
				new options.model(data).save().then(function(){
					form.remove();
				})
				
				$(this).text("Loading ...");
			})
			
	})
};


	
})