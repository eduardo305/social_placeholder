var app = app || angular.module('Orkut', []);

app.service('Friendship', function($resource) {

    return $resource('/friendship/:id', {
        id: '@id'
    }, {
        'me': {
            method: 'GET',
            url: '/friendships/me',
            withCredentials: true,
            cache: false,
            isArray: true
        },
        'requests': {
            method: 'GET',
            url: '/friendships/requests',
            withCredentials: true,
            isArray: true
        },
        'requested': {
            method: 'GET',
            url: '/friendships/requested',
            withCredentials: true,
            isArray: true
        },
        'invite': {
            method: 'POST',
            url: '/friendships/:id',
            params: {
                id: '@id'
            },
            withCredentials: true
        },
        'delete': {
            method: 'DELETE',
            withCredentials: true
        }
    });

});
