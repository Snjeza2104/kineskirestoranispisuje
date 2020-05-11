(function(){
	'use strict';
	
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems',foundItems);


	function foundItems(){
		var ddo={
			scope:{
				items: '<',
      			onRemove: '&'
			},
			controller: NarrowItDownController,
			controllerAs:'kontroler',
			bindToController:true,
			templateUrl: 'foundItems.html'
		};
		return ddo;
	}


	NarrowItDownController.$inject=['MenuSearchService', '$scope'];
	function NarrowItDownController(MenuSearchService, $scope){
		var kontroler=this;
		var searchTerm="";
		//var items=[];

		kontroler.pokusao=function(){
			
			var trazi=MenuSearchService;
			var found2=trazi.getMatchedMenuItems();
			console.log(found2);
			found2.then(function(response){
				var found=response.data;
				var foundItems2=[];

				for(var i=0; i<found.menu_items.length;i++){
					if(found.menu_items[i].name.toLowerCase().indexOf(kontroler.searchTerm) !== -1){
						foundItems2.push(found.menu_items[i]);
					}
			
				}
				
				
				kontroler.items=foundItems2;
				console.log(kontroler.items);
				return kontroler.items;
				
				
				
		});	

		

		};

	}

	MenuSearchService.$inject=['$http'];
	function MenuSearchService($http){
		var service=this;
		var items=[];
		service.getMatchedMenuItems=function(){
			var response= $http({
				method: "GET",
				url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
			});
			return response;
			};
		}	
			


})();
