'use strict';

angular.module('techtreeBuilderApp')
  .controller('MainCtrl', function ($scope) {

    $scope.onClick = function (node) {
        if (!$scope.selectionMode) {
            $scope.edit(node);
        }
    }
    $scope.edit = function (node) {
        for (var i in $scope.nodes) {
            if ($scope.nodes[i].slug == node.slug) {
                $scope.currentNodeId = i;
                break;
            }
        }
    }

    $scope.nodes = [
    {
        name:   'Origin',
        slug:   'origo',
        attrs:  ['original'],
        deps:   []
    },
    {
        name:   'Spex',
        slug:   'spex',
        attrs:  ['original', 'ride'],
        deps:   ['origo'],
    },
    {
        name:   'Circus',
        slug:   'circus',
        attrs:  ['original', 'ride'],
        deps:   ['origo'],
    },
    {
        name:   'Parade',
        slug:   'parade',
        attrs:  ['original', 'ride'],
        deps:   ['origo'],
    },
    {
        name:   'Movie',
        slug:   'movie',
        attrs:  ['original', 'ride'],
        deps:   ['origo'],
    },
    {
        name:   'Poster',
        slug:   'poster',
        attrs:  ['original', 'marketing'],
        deps:   ['origo'],
    },
    {
        name:   'Radio',
        slug:   'radio',
        attrs:  ['marketing'],
        deps:   ['movie', 'poster'],
    },
    {
        name:   'Children\'s carnival',
        slug:   'childival',
        attrs:  ['ride'],
        deps:   ['circus', 'spex'],
    },
    {
        name:   'Revue',
        slug:   'revue',
        attrs:  ['ride'],
        deps:   ['circus', 'spex'],
    },
    {
        name:   'Cabaret',
        slug:   'cabaret',
        attrs:  ['ride'],
        deps:   ['revue'],
    },
    {
        name:   'Show',
        slug:   'show',
        attrs:  ['ride'],
        deps:   ['revue'],
    },
    {
        name:   'Food stand',
        slug:   'food-stand',
        attrs:  ['utility'],
        deps:   ['origo'],
    },
    {
        name:   'Toilets I',
        slug:   'toilets-1',
        attrs:  ['utility'],
        deps:   ['origo'],
    },
    {
        name:   'Toilets II',
        slug:   'toilets-2',
        attrs:  ['utility'],
        deps:   ['toilets-1'],
    },
    ];

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
