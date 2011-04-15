$.fn.contextmenu = function(content, x, y){
  var el = this[0],
  	menu = $(content);
	
  setTimeout(function(){
    $(document).click(function(ev){
      menu.remove()
    })
	menu.click(function(ev){
		ev.stopPropagation()
	})
  },10)

  menu.css({
  		top: y,
		left:x,
		position: "absolute"
	})
  $(el).html(menu).show();
}
