define(['jquery','jupiter/tmpl'], function($){
	console.log('here ...')
	
	var listItems = function(parent, items, template){
		
		for(var i =0; i < items.length; i++){
			var item =  items[i]
			$( $.tmpl( template, item) ).data('item',item)
				.appendTo(parent)
		}
	};
	
	$.fn.jupiter_list = function(options){
		this.addClass('list')
		var self = this;
		
		console.log('finding ...')
		options.model.findAll({}).done(function(items){
			listItems(self, items, options.row);
		});
		
		$(options.model).bind('created', function(ev, item){
			listItems(self, [item], options.row)
		})
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		});
		
		
		return this;
	};
	
	return $;
})
