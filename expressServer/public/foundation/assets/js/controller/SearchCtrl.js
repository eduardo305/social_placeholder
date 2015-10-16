'use strict';

var app = app || angular.module('Orkut');
var MAX_SEARCH_ITEMS = 10;

app.controller('SearchCtrl', function($scope, $stateParams, User, Friendship, $cookies, $filter, md5) {
    $scope.term = $stateParams.query;
    $scope.currentPage = parseInt($stateParams.page) || 0;

    User.query({
        q: $scope.term
    }, function(data) {
        $scope.people = data.slice($scope.currentPage * MAX_SEARCH_ITEMS, $scope.currentPage * MAX_SEARCH_ITEMS + MAX_SEARCH_ITEMS);
        $scope.totalPeople = data.length;
        var size = data.length;
        var pages = Math.ceil(size / MAX_SEARCH_ITEMS);
        $scope.pages = pages;
    });


    var me = angular.fromJson($cookies.get('me'));
    var friends, sent, received;

    Friendship.me({}, function(data) {
        friends = data;
    });

    Friendship.requests({}, function(data) {
        received = data;
    });

    Friendship.requested({}, function(data) {
        sent = data;
    })

    $scope.isMe = function(person) {
        return me.email === person.email;
    };

    $scope.isFriend = function(person) {
        var friendsFiltered = $filter('filter')(friends, {
            user: {
                email: person.email
            }
        });
        var sentFiltered = $filter('filter')(sent, {
            userRequested: {
                email: person.email
            }
        });
        var receivedFiltered = $filter('filter')(received, {
            userRequester: {
                email: person.email
            }
        });

        return (friendsFiltered && friendsFiltered.length > 0) ||
            (sentFiltered && sentFiltered.length > 0) ||
            (receivedFiltered && receivedFiltered.length > 0);
    };

    $scope.gravatarify = function(email) {
        return 'http://www.gravatar.com/avatar/' + md5.createHash(email) + '.jpg';
    };

}).filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i = 0; i < total; i++) {
            input.push(i);
        }

        return input;
    };
});
