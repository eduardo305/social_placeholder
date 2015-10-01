var app = app || angular.module('Orkut', []);

app.controller('HomeController', ['$scope', 'User', function($scope, User) {
	User.available({}, function(data) {
		$scope.peopleYouMayKnow = data;
	})
}]);