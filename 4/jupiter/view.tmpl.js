define(['jquery'], function(){

(function( $ ) {

	// converts to an ok dom id
	var toId = function( src ) {
		return src.replace(/^\/\//, "").replace(/[\/\.]/g, "_");
	},
		// used for hookup ids
		id = 1;

	/**
	 * @class jQuery.View
	 * @tag core
	 * @plugin jquery/view
	 * @test jquery/view/qunit.html
	 * @download dist/jquery.view.js
	 * 
	 * View provides a uniform interface for using templates with 
	 * jQuery. When template engines [jQuery.View.register register] 
	 * themselves, you are able to:
	 * 
	 *  - Use views with jQuery extensions [jQuery.fn.after after], [jQuery.fn.append append],
	 *   [jQuery.fn.before before], [jQuery.fn.html html], [jQuery.fn.prepend prepend],
	 *   [jQuery.fn.replaceWith replaceWith], [jQuery.fn.text text].
	 *  - Template loading from html elements and external files.
	 *  - Synchronous and asynchronous template loading.
	 *  - Template caching.
	 *  - Bundling of processed templates in production builds.
	 *  - Hookup jquery plugins directly in the template.
	 *  
	 * ## Use
	 * 
	 * 
	 * When using views, you're almost always wanting to insert the results 
	 * of a rendered template into the page. jQuery.View overwrites the 
	 * jQuery modifiers so using a view is as easy as: 
	 * 
	 *     $("#foo").html('mytemplate.ejs',{message: 'hello world'})
	 *
	 * This code:
	 * 
	 *  - Loads the template a 'mytemplate.ejs'. It might look like:
	 *    <pre><code>&lt;h2>&lt;%= message %>&lt;/h2></pre></code>
	 *  
	 *  - Renders it with {message: 'hello world'}, resulting in:
	 *    <pre><code>&lt;div id='foo'>"&lt;h2>hello world&lt;/h2>&lt;/div></pre></code>
	 *  
	 *  - Inserts the result into the foo element. Foo might look like:
	 *    <pre><code>&lt;div id='foo'>&lt;h2>hello world&lt;/h2>&lt;/div></pre></code>
	 * 
	 * ## jQuery Modifiers
	 * 
	 * You can use a template with the following jQuery modifiers:
	 * 
	 * <table>
	 * <tr><td>[jQuery.fn.after after]</td><td> <code>$('#bar').after('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after append] </td><td>  <code>$('#bar').append('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after before] </td><td> <code>$('#bar').before('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after html] </td><td> <code>$('#bar').html('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after prepend] </td><td> <code>$('#bar').prepend('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after replaceWith] </td><td> <code>$('#bar').replaceWidth('temp.jaml',{});</code></td></tr>
	 * <tr><td>[jQuery.fn.after text] </td><td> <code>$('#bar').text('temp.jaml',{});</code></td></tr>
	 * </table>
	 * 
	 * You always have to pass a string and an object (or function) for the jQuery modifier 
	 * to user a template.
	 * 
	 * ## Template Locations
	 * 
	 * View can load from script tags or from files. 
	 * 
	 * ## From Script Tags
	 * 
	 * To load from a script tag, create a script tag with your template and an id like: 
	 * 
	 * <pre><code>&lt;script type='text/ejs' id='recipes'>
	 * &lt;% for(var i=0; i &lt; recipes.length; i++){ %>
	 *   &lt;li>&lt;%=recipes[i].name %>&lt;/li>
	 * &lt;%} %>
	 * &lt;/script></code></pre>
	 * 
	 * Render with this template like: 
	 * 
	 * @codestart
	 * $("#foo").html('recipes',recipeData)
	 * @codeend
	 * 
	 * Notice we passed the id of the element we want to render.
	 * 
	 * ## From File
	 * 
	 * You can pass the path of a template file location like:
	 * 
	 *     $("#foo").html('templates/recipes.ejs',recipeData)
	 * 
	 * However, you typically want to make the template work from whatever page they 
	 * are called from.  To do this, use // to look up templates from JMVC root:
	 * 
	 *     $("#foo").html('//app/views/recipes.ejs',recipeData)
	 *     
	 * Finally, the [jQuery.Controller.prototype.view controller/view] plugin can make looking
	 * up a thread (and adding helpers) even easier:
	 * 
	 *     $("#foo").html( this.view('recipes', recipeData) )
	 * 
	 * ## Packaging Templates
	 * 
	 * If you're making heavy use of templates, you want to organize 
	 * them in files so they can be reused between pages and applications.
	 * 
	 * But, this organization would come at a high price 
	 * if the browser has to 
	 * retrieve each template individually. The additional 
	 * HTTP requests would slow down your app. 
	 * 
	 * Fortunately, [steal.static.views steal.views] can build templates 
	 * into your production files. You just have to point to the view file like: 
	 * 
	 *     steal.views('path/to/the/view.ejs');
     *
	 * ## Asynchronous
	 * 
	 * By default, retrieving requests is done synchronously. This is 
	 * fine because StealJS packages view templates with your JS download. 
	 * 
	 * However, some people might not be using StealJS or want to delay loading 
	 * templates until necessary. If you have the need, you can 
	 * provide a callback paramter like: 
	 * 
	 *     $("#foo").html('recipes',recipeData, function(result){
	 *       this.fadeIn()
	 *     });
	 * 
	 * The callback function will be called with the result of the 
	 * rendered template and 'this' will be set to the original jQuery object.
	 * 
	 * ## Just Render Templates
	 * 
	 * Sometimes, you just want to get the result of a rendered 
	 * template without inserting it, you can do this with $.View: 
	 * 
	 *     var out = $.View('path/to/template.jaml',{});
	 *     
     * ## Preloading Templates
	 * 
	 * You can preload templates asynchronously like:
	 * 
	 *     $.View('path/to/template.jaml',{}, function(){});
	 * 
	 * ## Supported Template Engines
	 * 
	 * JavaScriptMVC comes with the following template languages:
	 * 
	 *   - EmbeddedJS
	 *     <pre><code>&lt;h2>&lt;%= message %>&lt;/h2></code></pre>
	 *     
	 *   - JAML
	 *     <pre><code>h2(data.message);</code></pre>
	 *     
	 *   - Micro
	 *     <pre><code>&lt;h2>{%= message %}&lt;/h2></code></pre>
	 *     
	 *   - jQuery.Tmpl
	 *     <pre><code>&lt;h2>${message}&lt;/h2></code></pre>

	 * 
	 * The popular <a href='http://awardwinningfjords.com/2010/08/09/mustache-for-javascriptmvc-3.html'>Mustache</a> 
	 * template engine is supported in a 2nd party plugin.
	 * 
	 * ## Using other Template Engines
	 * 
	 * It's easy to integrate your favorite template into $.View and Steal.  Read 
	 * how in [jQuery.View.register].
	 * 
	 * @constructor
	 * 
	 * Looks up a template, processes it, caches it, then renders the template
	 * with data and optional helpers.
	 * 
	 * With [stealjs StealJS], views are typically bundled in the production build.
	 * This makes it ok to use views synchronously like:
	 * 
	 * @codestart
	 * $.View("//myplugin/views/init.ejs",{message: "Hello World"})
	 * @codeend
	 * 
	 * If you aren't using StealJS, it's best to use views asynchronously like:
	 * 
	 * @codestart
	 * $.View("//myplugin/views/init.ejs",
	 *        {message: "Hello World"}, function(result){
	 *   // do something with result
	 * })
	 * @codeend
	 * 
	 * @param {String} view The url or id of an element to use as the template's source.
	 * @param {Object} data The data to be passed to the view.
	 * @param {Object} [helpers] Optional helper functions the view might use. Not all
	 * templates support helpers.
	 * @param {Object} [callback] Optional callback function.  If present, the template is 
	 * retrieved asynchronously.  This is a good idea if you aren't compressing the templates
	 * into your view.
	 * @return {String} The rendered result of the view or if deferreds are passed, a deferred that will contain
	 * the rendered result of the view.
	 */

	var $view, render, checkText, get, 
		isDeferred = function(obj){
			return obj && $.isFunction(obj.promise) // check if obj is a $.Deferred
		};

	$view = $.View = function( view, data, helpers, callback ) {
		var deferreds = [];
		// handles a deferred or an object with deferreds in it.
		if(isDeferred(data)){
			deferreds = [data]
		}else{
			for(var prop in data) {
				if(isDeferred(data[prop])) {
					deferreds.push(data[prop]);
				}
			}
		}
		
		
		if(deferreds.length) { // does data contain any deferreds?
			var deferred = $.Deferred();
			
			
			$.when.apply($, deferreds).then(function(resolved) {
				var objs = $.makeArray(arguments)
				if (isDeferred(data)) {
					data = resolved;
				}
				else {
					for (var prop in data) {
						if (isDeferred(data[prop])) {
							data[prop] = objs.shift();
						}
					}
				}
				deferred.resolve( $view(view, data, helpers, callback) ); // this does not work as is...
			});
			return deferred.promise();
		}
		else {
			var suffix = view.match(/\.[\w\d]+$/),
				type, el, id, renderer, url = view;
	                // if we have an inline template, derive the suffix from the 'text/???' part
	                // this only supports '<script></script>' tags
	                if ( el = document.getElementById(view)) {
	                  suffix = el.type.match(/\/[\d\w]+$/)[0].replace(/^\//, '.');
	                }
			if ( typeof helpers === 'function' ) {
				callback = helpers;
				helpers = undefined;
			}
			//if there is no suffix, add one
			if (!suffix ) {
				suffix = $view.ext;
				url = url + $view.ext;
			}
	
			//convert to a unique and valid id
			id = toId(url);
	
			//if a absolute path, use steal to get it
			if ( url.match(/^\/\//) ) {
				if (typeof steal === "undefined") {
					url = "/"+url.substr(2);
				}
				else {
					url = steal.root.join(url.substr(2));
				}
			}
	
			//get the template engine
			type = $view.types[suffix];
	
			//get the renderer function
			renderer =
			$view.cached[id] ? // is it cached?
			$view.cached[id] : // use the cached version
			((el = document.getElementById(view)) ? //is it in the document?
			type.renderer(id, el.innerHTML) : //use the innerHTML of the elemnt
			get(type, id, url, data, helpers, callback) //do an ajax request for it
			);
			// we won't always get a renderer (if async ajax)
			return renderer && render(renderer, type, id, data, helpers, callback);
		}
	};
	// caches the template, renders the content, and calls back if it should
	render = function( renderer, type, id, data, helpers, callback ) {
		var res, stub;
		if ( $view.cache ) {
			$view.cached[id] = renderer;
		}
		res = renderer.call(type, data, helpers);
		stub = callback && callback(res);
		return res;
	};
	// makes sure there's a template
	checkText = function( text, url ) {
		if (!text.match(/[^\s]/) ) {
			throw "$.View ERROR: There is no template or an empty template at " + url;
		}
	};
	// gets a template, if there's a callback, renders and calls back its;ef
	get = function( type, id, url, data, helpers, callback ) {
		if ( callback ) {
			$.ajax({
				url: url,
				dataType: "text",
				error: function() {
					checkText("", url);
				},
				success: function( text ) {
					checkText(text, url);
					render(type.renderer(id, text), type, id, data, helpers, callback);
				}
			});
		} else {
			var text = $.ajax({
				async: false,
				url: url,
				dataType: "text",
				error: function() {
					checkText("", url);
				}
			}).responseText;
			checkText(text, url);
			return type.renderer(id, text);
		}

	};


	$.extend($view, {
		/**
		 * @attribute hookups
		 * @hide
		 * A list of pending 'hookups'
		 */
		hookups: {},
		/**
		 * @function hookup
		 * Registers a hookup function that can be called back after the html is 
		 * put on the page.  Typically this is handled by the template engine.  Currently
		 * only EJS supports this functionality.
		 * 
		 *     var id = $.View.hookup(function(el){
		 *            //do something with el
		 *         }),
		 *         html = "<div data-view-id='"+id+"'>"
		 *     $('.foo').html(html);
		 * 
		 * 
		 * @param {Function} cb a callback function to be called with the element
		 * @param {Number} the hookup number
		 */
		hookup: function( cb ) {
			var myid = ++id;
			$view.hookups[myid] = cb;
			return myid;
		},
		data : function(name, data ){
			return "data-view-id='"+$.View.hookup(function(el){
				$.data(el, name, data);
			})+"'"
		},
		/**
		 * @attribute cached
		 * @hide
		 * Cached are put in this object
		 */
		cached: {},
		/**
		 * @attribute cache
		 * Should the views be cached or reloaded from the server. Defaults to true.
		 */
		cache: true,
		/**
		 * @function register
		 * Registers a template engine to be used with 
		 * view helpers and compression.  
		 * 
		 * ## Example
		 * 
		 * @codestart
		 * $.View.register({
		 * 	suffix : "tmpl",
		 * 	renderer: function( id, text ) {
		 * 		return function(data){
		 * 			return jQuery.render( text, data );
		 * 		}
		 * 	},
		 * 	script: function( id, text ) {
		 * 		var tmpl = $.tmpl(text).toString();
		 * 		return "function(data){return ("+
		 * 		  	tmpl+
		 * 			").call(jQuery, jQuery, data); }";
		 * 	}
		 * })
		 * @codeend
		 * Here's what each property does:
		 * 
 		 *    * suffix - files that use this suffix will be processed by this template engine
 		 *    * renderer - returns a function that will render the template provided by text
 		 *    * script - returns a string form of the processed template function.
		 * 
		 * @param {Object} info a object of method and properties 
		 * 
		 * that enable template integration:
		 * <ul>
		 *   <li>suffix - the view extension.  EX: 'ejs'</li>
		 *   <li>script(id, src) - a function that returns a string that when evaluated returns a function that can be 
		 *    used as the render (i.e. have func.call(data, data, helpers) called on it).</li>
		 *   <li>renderer(id, text) - a function that takes the id of the template and the text of the template and
		 *    returns a render function.</li>
		 * </ul>
		 */
		register: function( info ) {
			this.types["." + info.suffix] = info;
		},
		types: {},
		/**
		 * @attribute ext
		 * The default suffix to use if none is provided in the view's url.  
		 * This is set to .ejs by default.
		 */
		ext: ".ejs",
		/**
		 * Returns the text that 
		 * @hide 
		 * @param {Object} type
		 * @param {Object} id
		 * @param {Object} src
		 */
		registerScript: function( type, id, src ) {
			return "$.View.preload('" + id + "'," + $view.types["." + type].script(id, src) + ");";
		},
		/**
		 * @hide
		 * Called by a production script to pre-load a renderer function
		 * into the view cache.
		 * @param {String} id
		 * @param {Function} renderer
		 */
		preload: function( id, renderer ) {
			$view.cached[id] = function( data, helpers ) {
				return renderer.call(data, data, helpers);
			};
		}

	});


	//---- ADD jQUERY HELPERS -----
	//converts jquery functions to use views	
	var convert, modify, isTemplate, getCallback, hookupView, funcs;

	convert = function( func_name ) {
		var old = $.fn[func_name];

		$.fn[func_name] = function() {
			var args = $.makeArray(arguments),
				callbackNum, 
				callback, 
				self = this,
				result;

			//check if a template
			if ( isTemplate(args) ) {

				// if we should operate async
				if ((callbackNum = getCallback(args))) {
					callback = args[callbackNum];
					args[callbackNum] = function( result ) {
						modify.call(self, [result], old);
						callback.call(self, result);
					};
					$view.apply($view, args);
					return this;
				}
				result = $view.apply($view, args);
				if(!isDeferred( result ) ){
					args = [result];
				}else{
					result.done(function(res){
						modify.call(self, [res], old);
					})
					return this;
				}
				//otherwise do the template now
				
			}

			return modify.call(this, args, old);
		};
	};
	// modifies the html of the element
	modify = function( args, old ) {
		var res, stub, hooks;

		//check if there are new hookups
		for ( var hasHookups in $view.hookups ) {
			break;
		}

		//if there are hookups, get jQuery object
		if ( hasHookups ) {
			hooks = $view.hookups;
			$view.hookups = {};
			args[0] = $(args[0]);
		}
		res = old.apply(this, args);

		//now hookup hookups
		if ( hasHookups ) {
			hookupView(args[0], hooks);
		}
		return res;
	};

	// returns true or false if the args indicate a template is being used
	isTemplate = function( args ) {
		var secArgType = typeof args[1];

		return typeof args[0] == "string" && (secArgType == 'object' || secArgType == 'function') && !args[1].nodeType && !args[1].jquery;
	};

	//returns the callback if there is one (for async view use)
	getCallback = function( args ) {
		return typeof args[3] === 'function' ? 3 : typeof args[2] === 'function' && 2;
	};

	hookupView = function( els , hooks) {
		//remove all hookups
		var hookupEls, 
			len, i = 0,
			id, func;
		els = els.filter(function(){
			return this.nodeType != 3; //filter out text nodes
		})
		hookupEls = els.add("[data-view-id]", els);
		len = hookupEls.length;
		for (; i < len; i++ ) {
			if ( hookupEls[i].getAttribute && (id = hookupEls[i].getAttribute('data-view-id')) && (func = hooks[id]) ) {
				func(hookupEls[i], id);
				delete hooks[id];
				hookupEls[i].removeAttribute('data-view-id');
			}
		}
		//copy remaining hooks back
		$.extend($view.hookups, hooks);
	};

	/**
	 *  @add jQuery.fn
	 */
	funcs = [
	/**
	 *  @function prepend
	 *  @parent jQuery.View
	 *  abc
	 */
	"prepend",
	/**
	 *  @function append
	 *  @parent jQuery.View
	 *  abc
	 */
	"append",
	/**
	 *  @function after
	 *  @parent jQuery.View
	 *  abc
	 */
	"after",
	/**
	 *  @function before
	 *  @parent jQuery.View
	 *  abc
	 */
	"before",
	/**
	 *  @function text
	 *  @parent jQuery.View
	 *  abc
	 */
	"text",
	/**
	 *  @function html
	 *  @parent jQuery.View
	 *  abc
	 */
	"html",
	/**
	 *  @function replaceWith
	 *  @parent jQuery.View
	 *  abc
	 */
	"replaceWith", 
	"val"];

	//go through helper funcs and convert
	for ( var i = 0; i < funcs.length; i++ ) {
		convert(funcs[i]);
	}

})(jQuery);
(function(){
		// Override the DOM manipulation function
	var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

	function newTmplItem( options, parentItem, fn, data ) {
		// Returns a template item data structure for a new rendered instance of a template (a 'template item').
		// The content field is a hierarchical array of strings and nested items (to be
		// removed and replaced by nodes field of dom elements, once inserted in DOM).
		var newItem = {
			data: data || (parentItem ? parentItem.data : {}),
			_wrap: parentItem ? parentItem._wrap : null,
			tmpl: null,
			parent: parentItem || null,
			nodes: [],
			calls: tiCalls,
			nest: tiNest,
			wrap: tiWrap,
			html: tiHtml,
			update: tiUpdate
		};
		if ( options ) {
			jQuery.extend( newItem, options, { nodes: [], parent: parentItem } );
		}
		if ( fn ) {
			// Build the hierarchical content to be used during insertion into DOM
			newItem.tmpl = fn;
			newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
			newItem.key = ++itemKey;
			// Keep track of new template item, until it is stored as jQuery Data on DOM element
			(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
		}
		return newItem;
	}

	// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

			appendToTmplItems = newTmplItems || {};
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				ret = this;
			} else {
				for ( i = 0, l = insert.length; i < l; i++ ) {
					cloneIndex = i;
					elems = (i > 0 ? this.clone(true) : this).get();
					jQuery.fn[ original ].apply( jQuery(insert[i]), elems );
					ret = ret.concat( elems );
				}
				cloneIndex = 0;
				ret = this.pushStack( ret, name, insert.selector );
			}
			tmplItems = appendToTmplItems;
			appendToTmplItems = null;
			jQuery.tmpl.complete( tmplItems );
			return ret;
		};
	});

	jQuery.fn.extend({
		// Use first wrapped element as template markup.
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( data, options, parentItem ) {
			return jQuery.tmpl( this[0], data, options, parentItem );
		},

		// Find which rendered template item the first wrapped DOM element belongs to
		tmplItem: function() {
			return jQuery.tmplItem( this[0] );
		},

		// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
		template: function( name ) {
			return jQuery.template( name, this[0] );
		},

		domManip: function( args, table, callback, options ) {
			// This appears to be a bug in the appendTo, etc. implementation
			// it should be doing .call() instead of .apply(). See #6227
			if ( args[0] && args[0].nodeType ) {
				var dmArgs = jQuery.makeArray( arguments ), argsLength = args.length, i = 0, tmplItem;
				while ( i < argsLength && !(tmplItem = jQuery.data( args[i++], "tmplItem" ))) {}
				if ( argsLength > 1 ) {
					dmArgs[0] = [jQuery.makeArray( args )];
				}
				if ( tmplItem && cloneIndex ) {
					dmArgs[2] = function( fragClone ) {
						// Handler called by oldManip when rendered template has been inserted into DOM.
						jQuery.tmpl.afterManip( this, fragClone, callback );
					};
				}
				oldManip.apply( this, dmArgs );
			} else {
				oldManip.apply( this, arguments );
			}
			cloneIndex = 0;
			if ( !appendToTmplItems ) {
				jQuery.tmpl.complete( newTmplItems );
			}
			return this;
		}
	});

	jQuery.extend({
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( tmpl, data, options, parentItem ) {
			var ret, topLevel = !parentItem;
			if ( topLevel ) {
				// This is a top-level tmpl call (not from a nested template using {{tmpl}})
				parentItem = topTmplItem;
				tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
				wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
			} else if ( !tmpl ) {
				// The template item is already associated with DOM - this is a refresh.
				// Re-evaluate rendered template for the parentItem
				tmpl = parentItem.tmpl;
				newTmplItems[parentItem.key] = parentItem;
				parentItem.nodes = [];
				if ( parentItem.wrapped ) {
					updateWrapped( parentItem, parentItem.wrapped );
				}
				// Rebuild, without creating a new template item
				return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
			}
			if ( !tmpl ) {
				return []; // Could throw...
			}
			if ( typeof data === "function" ) {
				data = data.call( parentItem || {} );
			}
			if ( options && options.wrapped ) {
				updateWrapped( options, options.wrapped );
			}
			ret = jQuery.isArray( data ) ? 
				jQuery.map( data, function( dataItem ) {
					return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
				}) :
				[ newTmplItem( options, parentItem, tmpl, data ) ];
			return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
		},

		// Return rendered template item for an element.
		tmplItem: function( elem ) {
			var tmplItem;
			if ( elem instanceof jQuery ) {
				elem = elem[0];
			}
			while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
			return tmplItem || topTmplItem;
		},

		// Set:
		// Use $.template( name, tmpl ) to cache a named template,
		// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
		// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

		// Get:
		// Use $.template( name ) to access a cached template.
		// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
		// will return the compiled template, without adding a name reference.
		// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
		// to $.template( null, templateString )
		template: function( name, tmpl ) {
			if (tmpl) {
				// Compile template and associate with name
				if ( typeof tmpl === "string" ) {
					// This is an HTML string being passed directly in.
					tmpl = buildTmplFn( tmpl )
				} else if ( tmpl instanceof jQuery ) {
					tmpl = tmpl[0] || {};
				}
				if ( tmpl.nodeType ) {
					// If this is a template block, use cached copy, or generate tmpl function and cache.
					tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
				}
				return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
			}
			// Return named compiled template
			return name ? (typeof name !== "string" ? jQuery.template( null, name ): 
				(jQuery.template[name] || 
					// If not in map, treat as a selector. (If integrated with core, use quickExpr.exec) 
					jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null; 
		},

		encode: function( text ) {
			// Do HTML encoding replacing < > & and ' and " by corresponding entities.
			return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		}
	});

	jQuery.extend( jQuery.tmpl, {
		tag: {
			"tmpl": {
				_default: { $2: "null" },
				open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
				// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
				// This means that {{tmpl foo}} treats foo as a template (which IS a function). 
				// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
			},
			"wrap": {
				_default: { $2: "null" },
				open: "$item.calls(_,$1,$2);_=[];",
				close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
			},
			"each": {
				_default: { $2: "$index, $value" },
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: { $1: "true" },
				open: "}else if(($notnull_1) && $1a){"
			},
			"html": {
				// Unecoded expression evaluation. 
				open: "if($notnull_1){_.push($1a);}"
			},
			"=": {
				// Encoded expression evaluation. Abbreviated form is ${}.
				_default: { $1: "$data" },
				open: "if($notnull_1){_.push($.encode($1a));}"
			},
			"!": {
				// Comment tag. Skipped by parser
				open: ""
			}
		},

		// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
		complete: function( items ) {
			newTmplItems = {};
		},

		// Call this from code which overrides domManip, or equivalent
		// Manage cloning/storing template items etc.
		afterManip: function afterManip( elem, fragClone, callback ) {
			// Provides cloned fragment ready for fixup prior to and after insertion into DOM
			var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

			// Return fragment to original caller (e.g. append) for DOM insertion
			callback.call( elem, fragClone );

			// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
			storeTmplItems( content );
			cloneIndex++;
		}
	});

	//========================== Private helper functions, used by code above ==========================

	function build( tmplItem, nested, content ) {
		// Convert hierarchical content into flat string array 
		// and finally return array of fragments ready for DOM insertion
		var frag, ret = content ? jQuery.map( content, function( item ) {
			return (typeof item === "string") ? 
				// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
				// This is a child template item. Build nested template.
				build( item, tmplItem, item._ctnt );
		}) : 
		// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}. 
		tmplItem;
		if ( nested ) {
			return ret;
		}

		// top-level template
		ret = ret.join("");

		// Support templates which have initial or final text nodes, or consist only of text
		// Also support HTML entities within the HTML markup.
		ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
			frag = jQuery( middle ).get();

			storeTmplItems( frag );
			if ( before ) {
				frag = unencode( before ).concat(frag);
			}
			if ( after ) {
				frag = frag.concat(unencode( after ));
			}
		});
		return frag ? frag : unencode( ret );
	}

	function unencode( text ) {
		// Use createElement, since createTextNode will not render HTML entities correctly
		var el = document.createElement( "div" );
		el.innerHTML = text;
		return jQuery.makeArray(el.childNodes);
	}

	// Generate a reusable function that will serve to render a template against data
	function buildTmplFn( markup ) {
		var bdy = jQuery.trim(markup)
				.replace( /([\\'])/g, "\\$1" )
				.replace( /[\r\t\n]/g, " " )
				.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
				.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function( all, slash, type, fnargs, target, parens, args ) {
					var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
					if ( !tag ) {
						throw "Template command not found: " + type;
					}
					def = tag._default || [];
					if ( parens && !/\w$/.test(target)) {
						target += parens;
						parens = "";
					}
					if ( target ) {
						target = unescape( target ); 
						args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
						// Support for target being things like a.toLowerCase();
						// In that case don't call with template item as 'this' pointer. Just evaluate...
						expr = parens ? (target.indexOf(".") > -1 ? target + parens : ("(" + target + ").call($item" + args)) : target;
						exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
					} else {
						exprAutoFnDetect = expr = def.$1 || "null";
					}
					fnargs = unescape( fnargs );
					return "');" + 
						tag[ slash ? "close" : "open" ]
							.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
							.split( "$1a" ).join( exprAutoFnDetect )
							.split( "$1" ).join( expr )
							.split( "$2" ).join( fnargs ?
								fnargs.replace( /\s*([^\(]+)\s*(\((.*?)\))?/g, function( all, name, parens, params ) {
									params = params ? ("," + params + ")") : (parens ? ")" : "");
									return params ? ("(" + name + ").call($item" + params) : all;
								})
								: (def.$2||"")
							) +
						"_.push('";
				});
		return new Function("jQuery","$item",
			"var $=jQuery,call,_=[],$data=$item.data;" +

			// Introduce the data as local variables using with(){}
			"with($data){_.push('" +

			// Convert the template into pure JavaScript
			bdy +
			"');}return _;"
		);
	}
	function updateWrapped( options, wrapped ) {
		// Build the wrapped content. 
		options._wrap = build( options, true, 
			// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
		).join("");
	}

	function unescape( args ) {
		return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
	}
	function outerHtml( elem ) {
		var div = document.createElement("div");
		div.appendChild( elem.cloneNode(true) );
		return div.innerHTML;
	}

	// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
	function storeTmplItems( content ) {
		var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
		for ( i = 0, l = content.length; i < l; i++ ) {
			if ( (elem = content[i]).nodeType !== 1 ) {
				continue;
			}
			elems = elem.getElementsByTagName("*");
			for ( m = elems.length - 1; m >= 0; m-- ) {
				processItemKey( elems[m] );
			}
			processItemKey( elem );
		}
		function processItemKey( el ) {
			var pntKey, pntNode = el, pntItem, tmplItem, key;
			// Ensure that each rendered template inserted into the DOM has its own template item,
			if ( (key = el.getAttribute( tmplItmAtt ))) {
				while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
				if ( pntKey !== key ) {
					// The next ancestor with a _tmplitem expando is on a different key than this one.
					// So this is a top-level element within this template item
					// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
					pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
					if ( !(tmplItem = newTmplItems[key]) ) {
						// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
						tmplItem = wrappedItems[key];
						tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode], null, true );
						tmplItem.key = ++itemKey;
						newTmplItems[itemKey] = tmplItem;
					}
					if ( cloneIndex ) {
						cloneTmplItem( key );
					}
				}
				el.removeAttribute( tmplItmAtt );
			} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
				// This was a rendered element, cloned during append or appendTo etc.
				// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
				cloneTmplItem( tmplItem.key );
				newTmplItems[tmplItem.key] = tmplItem;
				pntNode = jQuery.data( el.parentNode, "tmplItem" );
				pntNode = pntNode ? pntNode.key : 0;
			}
			if ( tmplItem ) {
				pntItem = tmplItem;
				// Find the template item of the parent element. 
				// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
				while ( pntItem && pntItem.key != pntNode ) { 
					// Add this element as a top-level node for this rendered template item, as well as for any
					// ancestor items between this item and the item of its parent element
					pntItem.nodes.push( el );
					pntItem = pntItem.parent;
				}
				// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
				delete tmplItem._ctnt;
				delete tmplItem._wrap;
				// Store template item as jQuery data on the element
				jQuery.data( el, "tmplItem", tmplItem );
			}
			function cloneTmplItem( key ) {
				key = key + keySuffix;
				tmplItem = newClonedItems[key] = 
					(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent, null, true ));
			}
		}
	}

	//---- Helper functions for template item ----

	function tiCalls( content, tmpl, data, options ) {
		if ( !content ) {
			return stack.pop();
		}
		stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
	}

	function tiNest( tmpl, data, options ) {
		// nested template, using {{tmpl}} tag
		return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
	}

	function tiWrap( call, wrapped ) {
		// nested template, using {{wrap}} tag
		var options = call.options || {};
		options.wrapped = wrapped;
		// Apply the template, which may incorporate wrapped content, 
		return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
	}

	function tiHtml( filter, textOnly ) {
		var wrapped = this._wrap;
		return jQuery.map(
			jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
			function(e) {
				return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
	}

	function tiUpdate() {
		var coll = this.nodes;
		jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
		jQuery( coll ).remove();
	}
	
	$.View.register({
		suffix : "tmpl",
		renderer: function( id, text ) {
			var tmpl = $.template( null, text );
			return function(data){
				return tmpl.call($, $, {data: data}).join('');
				//$(text).tmpl(data);//jQuery.render( text, data );
			}
		},
		script: function( id, str ) {
			var tmpl = $.template( null, str );
			return "function(data){return ("+tmpl+").call(jQuery, jQuery, {data: data}).join(''); }";
		}
	})
	jQuery.View.ext = ".tmpl"
})(jQuery)

return jQuery;
});