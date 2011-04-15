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
		var self = this,
			template = $.get(options.row);
		
		$.when( options.model.findAll({}),template).then(  function(items, rowData){
			listItems(self, items[0], rowData[0]);
		});
		
		$([options.model]).bind('created', function(ev, item){
			console.log('created ...')
			
			template.done(function(row){
				listItems(self, [item], row);
			})
		})
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		});
		
		
		return this;
	};
	
	return $;
})
