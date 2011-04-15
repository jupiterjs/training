define(['jquery'], function($){
	
	
	var listItems = function(parent, items){
		
	};
	
	$.fn.jupiter_list = function(url){
		this.addClass('list')
		var self = this;
		
		$.get(url, {}, function(items){
			for(var i =0; i < items.length; i++){
				var item =  items[i]
				$('<li/>').data('item',item)
					.appendTo(self).html(item.name)
			}
		}, 'json');
		
		
		
		
		
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		})
		return this;
	};
	
})
