require(['acme/section/section',
         'acme/list/list'], function(){
	
	$(".section").acme_section();
	
	$("#artists").acme_list('/services/artists');
	
	$("#albums").acme_list('/services/albums');
	
	$("#genres").acme_list('/services/genres');
	
	
})
