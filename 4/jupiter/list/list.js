define(['jquery','jupiter/view.tmpl','jupiter/controller'], function($){

	
	$.Controller('Jupiter.List',{
		init : function(){
			this.element.html("../jupiter/list/rows.tmpl",{
				items: this.options.model.findAll({}),
				row: this.options.row
			});
		},
		"{model} created" : function(model, ev, item){
			this.element.prepend("../jupiter/list/rows.tmpl",{
				items: [item],
				row: this.options.row
			});
		},
		"li click" : function(el){
			el.trigger('selected', el.data('item') )
		}
	});
	
	return $;
})
