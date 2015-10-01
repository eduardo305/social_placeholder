var app = app || app.module('orkut', []);

app.controller('FriendsController', ['$scope', 'Friendship', 'User', function($scope, Friendship, User) {

	User.me({}, function(data) {
  		$scope.me = data;
  	});

	Friendship.me({}, function(data) {
		$scope.friends = data;
	});

	Friendship.requests({}, function(data) {
		$scope.friendsRequests = data;
	});

	Friendship.requested({}, function(data) {
		$scope.friendsRequested = data;
	});
}]);