require(['jquery'], function($){
	
$.fn.jupiter_create = function(options){
	this.element.click(function(){
		$(options.form).prependTo(options.prependTo)
	})
};


	
})