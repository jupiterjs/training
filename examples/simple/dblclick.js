(function($){
	
  $.event.special.dblclick = {
    setup: function( data ) {
    	$(this).bind( 'click', click_handler );
    },
    teardown: function() {
    	$(this).unbind( 'click', click_handler );
    },
    add: function( handleObj ){
      var old_handler = handleObj.handler,
	      last = 0,
		  count = 0,
	      speed = handleObj.data || 500;
		
      handleObj.handler = function( event ) {
        var elem = $(this),
			timestamp = new Date(),
			diff  = timestamp - last;
		count++;
		last = timestamp;
        if ( diff < speed && count%2 == 0) {
        	old_handler.apply( this, arguments );
        }
      };
    }
  };

  function click_handler( event ) {
    $(this).triggerHandler( 'dblclick' );
  };

})(jQuery);
