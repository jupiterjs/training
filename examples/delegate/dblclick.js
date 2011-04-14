(function($){

  var handleObjs = [];
	
  $.event.special.dblclick = {
    setup: function( data ) {
    	$(this).bind( 'click', click_handler );
    },
    teardown: function() {
    	$(this).unbind( 'click', click_handler );
    },
    add: function( handleObj ){
		handleObjs.push({ context: this, handleObj: handleObj });
		
      var old_handler = handleObj.handler,
	      last = 0,
		  count = 0,
	      speed = handleObj.data || 500;
		
	  handleObj.handler = function( event, elem ) {
        var elem = $(this),
			timestamp = new Date(),
			diff  = timestamp - last;
		count++;
		last = timestamp;
		console.log(diff)
        if ( diff < speed && count%2 == 0) {
        	handleObj.origHandler.apply( this, arguments );
        }
      };
    },
	remove: function( handleObj ) {
      var context = this;
      handleObjs = $.grep( handleObjs, function(v) {
        return v.context !== context || v.handleObj !== handleObj;
      });
    }
  };

  function click_handler( event ) {
  	var elems = $([]);
    // go through handleObjs, any selector+context that are in the parentChain for ev.target get added
	elems.each(function(){
		$(this).trigger( 'dblclick' );
	})
  };

})(jQuery);
