'use strict';

var app = app || angular.module('Orkut');

app.service('User', function($resource) {

    /*function getCookie() {
      console.log('cookieee', $cookies.get('socialAPI'));
      return $cookies.get('socialAPI');
    }*/

    return $resource('/users/:id', {
        id: '@id'
    }, {
        'get': {
            withCredentials: true,
            cache: false,
            isArray: true
        },

        'me': {
            method: 'GET',
            url: '/users/me',
            withCredentials: true

        },
        'available': {
            isArray: true,
            method: 'GET',
            url: '/users/available',
            withCredentials: true
        }

    });
});
