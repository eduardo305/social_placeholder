var app = app || app.module('Orkut', []);

app.controller('SearchControler', ['$scope', '$stateParams', '$filter', 'User', 'Friendship', function($scope, $stateParams, $filter, User, Friendship) {
	console.log('Searching...');

	$scope.term = $stateParams.query;

	User.query({q : $scope.term}, function(data) {
    	$scope.people = data;
  	});

  	User.me({}, function(data) {
  		$scope.me = data;
  	});

  	Friendship.me({}, function(data) {
		$scope.friends = data;
	});

	Friendship.requests({}, function(data) {
		$scope.received = data;
	});

	Friendship.requested({}, function(data) {
		$scope.sent = data;
	})

	$scope.addFriend = function(person) {
		Friendship.invite({id: person._id}, function(data) {
			console.log('Friend ' + person.name + ' invited')
		});
	};

	$scope.isMe = function(person) {
		if ($scope.me) {
			return person.email === $scope.me.email;	
		}
	};

  	$scope.isFriend = function(person) {

  		if ($scope.me) {
  			var alreadyFriend = $filter('filter')($scope.friends, {user: { email: person.email } });
  			var requestsSent = $filter('filter')($scope.sent, {userRequested: {email: person.email}});
  			var requestsReceived = $filter('filter')($scope.received, {userRequester: {email: person.email}});

  			return (alreadyFriend && alreadyFriend.length > 0) ||
  				   (requestsSent && requestsSent.length > 0) ||
  				   (requestsReceived && requestsReceived.length > 0);
  		}

  	};

  	$scope.gravatarify = function(email) {
    	return 'http://www.gravatar.com/avatar/gravatarify/' + md5.createHas(emal);
  	};

}]);