(function($){
	
  $.event.special.hover = {
    setup: function( data ) {
    	$(this).bind( 'mouseenter', hover_handler );
    	$(this).bind( 'mouseleave', unhover_handler );
    },
    teardown: function() {
    	$(this).unbind( 'mouseenter', hover_handler );
    	$(this).unbind( 'mouseleave', unhover_handler );
    },
    add: function( handleObj ){
      var old_handler = handleObj.handler,
	      speed = handleObj.data || 500;
		
      handleObj.handler = function( event ) {
	  	var self = this;
	    var timeoutid = setTimeout(function(){
			old_handler.apply( self, arguments );
		}, speed);
		$(this).data('hovertimeout', timeoutid)
      };
    }
  };

  function hover_handler( event ) {
	$(this).triggerHandler( 'hover' );
  };
  function unhover_handler( event ) {
    clearTimeout($(this).data('hovertimeout'))
  };

})(jQuery);