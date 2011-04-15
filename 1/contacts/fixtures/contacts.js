define(['jupiter/fixture/fixture'], function(){
	var catCount = 7,
		compCount = 5,
		locCount = 10,
		contactsCount = 2000,
		contacts = [],
		randId = function(count){
			return Math.floor( Math.random()* count) ;
		},
		now = new Date();
		
		
	for(var i =0; i < contactsCount; i++){
		contacts.push({
			id: 0,
			first : "Justin",
			last : "M"+i,
			categoryId : randId(catCount),
			locationId : randId(locCount),
			companyId : randId(compCount),
			createdAt : new Date( Math.round( now.getTime()*Math.random() )  ).getTime()
		})
	}
	
	
	
	$.jupiter_fixture("/services/contacts", function(original){
		
		var total = contacts.slice(0),
			offset = parseInt(original.data.offset, 10) || 0,
			limit = parseInt(original.data.limit, 10) || (contacts.length - offset);
		
		// splice out relationships
		for(var prop in original.data){
			if(prop.indexOf('Id') > 0){
				removeFrom(total, function(item){
					return item[prop] !== original.data[prop]
				})
			}
		}
		
		// do limit / offset
		return total.slice(offset, offset + limit);
	})
	
	
	var removeFrom = function(arr, test){
		var i = 0 ;
		while( i < arr.length) {
			if(test(arr[i])){
				arr.splice(i, 1)
			}else{
				i++;
			}
		}
	};
})
