define(['jquery','jupiter/tmpl'], function($){
	
	
	var listItems = function(parent, items){
		
	};
	
	$.fn.jupiter_list = function(options){
		this.addClass('list')
		var self = this;
		
		$.when($.get(options.url,{},'json'),
				$.get(options.row,{},'text')).then(function(items, row){
			for(var i =0; i < items.length; i++){
				var item =  items[i]
				$('<li/>').data('item',item)
					.appendTo(self).html($.tmpl(row, item))
			}		
		})
		
		
		
		
		
		
		
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		})
		return this;
	};
	
})
