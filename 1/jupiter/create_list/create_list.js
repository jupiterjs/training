define(['jupiter/create/create','jupiter/list/list'], function(){

$.fn.jupiter_create_list = function(options){
	var list = this.find('ul');
		
	list.jupiter_list(options.findAll);
	this.find('h3 a')
		.jupiter_create({
			prependTo : list,
			form : options.form,
			url : options.create
		})
}

})
