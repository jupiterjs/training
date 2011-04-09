require(['jquery'], function($){
	$.fn.acme_section = function(){
		this.bind('click', function(){
			$(this).next().toggle();
			$(window).trigger('resize')
		});
	};
})
