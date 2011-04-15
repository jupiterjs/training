define(['jquery','jupiter/tmpl'], function($){
	
	
	var listItems = function(parent, items){
		
	};
	
	$.fn.jupiter_list = function(options){
		this.addClass('list')
		var self = this,
			deferred;
		if(options.model){
			deferred = options.model.findAll({});
		} else {
			deferred =  $.ajax({
				url: options.url,
				type: 'get',
				dataType: 'json'
			})
		}
		$.when(deferred,
				$.get(options.row,{},'text')).then(function(itemsResponse, rowResponse){
			var items = itemsResponse[0];
			console.log(items);
			for(var i =0; i < items.length; i++){
				var item =  items[i]
				$('<li/>').data('item',item)
					.appendTo(self).html($.tmpl(rowResponse[0], item))
			}		
		})
		
		
		
		
		
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		})
		return this;
	};
	
})
