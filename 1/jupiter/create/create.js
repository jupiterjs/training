define(['jquery'], function($){
	
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
				
				$.post(options.url, 
					data,
					function(attrs){
						form.remove();
					}, 
					'json');
				
				$(this).text("Loading ...");
			})
			
	})
};


	
})