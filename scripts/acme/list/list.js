require(['jquery'], function($){
	
	
	var listItems = function(parent, items){
		for(var i =0; i < items.length; i++){
			var item =  items[i]
			$('<li/>').data('item',item)
				.text(item.name)
				.appendTo(parent)
		}
	};
	
	$.fn.acme_list = function(url){
		this.addClass('list')
		var self = this;
		if(typeof url == 'string'){
			$.get(url, {}, function(items){
				listItems(self, items)
			}, 'json');
		}else{
			listItems(this, url);
		}
		
		
		
		this.delegate('li','click', function(){
			var el = $(this)
			el.trigger('selected', el.data('item') )
		})
		return this;
	};
	
})
