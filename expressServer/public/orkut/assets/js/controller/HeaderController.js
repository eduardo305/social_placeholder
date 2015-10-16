var app = app || app.module('Orkut', []);

app.controller('HeaderController', ['$scope', '$state', function($scope, $state) {
	console.log('HeaderController requested...');

	$scope.search = function() {
		console.log('Search is requested here...');
		$state.go('search', { query: $scope.query});
			
	};
}]);