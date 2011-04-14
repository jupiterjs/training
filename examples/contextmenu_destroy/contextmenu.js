(function(){

$.fn.contextmenu = function(content, x, y){
  var el = this[0],
  	menu = $(content);
	
  setTimeout(function(){
  	var remove = function(ev){
    		menu.remove()
    	},
		click = function(ev){
			ev.stopPropagation()
		},
		destroyed = function(){
			$(document).unbind("click", remove);
			menu.unbind("click", click)
				.unbind("destroyed", destroyed)
		}
    $(document).click(remove)
	menu.click(click)
	menu.bind("destroyed", destroyed)
  },10)

  menu.css({
  		top: y,
		left:x,
		position: "absolute"
	})
  $(el).html(menu).show();
}

	var oldClean = jQuery.cleanData;

	$.cleanData = function( elems ) {
		for ( var i = 0, elem;
		(elem = elems[i]) !== undefined; i++ ) {
			$(elem).triggerHandler("destroyed");
		}
		oldClean(elems);
	};
	
})()
