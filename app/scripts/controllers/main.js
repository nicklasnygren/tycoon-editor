'use strict';

angular.module('techtreeBuilderApp')
  .controller('MainCtrl', function ($scope) {
    $scope.selectionMode = false;
    $scope.nodeTypes = ['ride', 'utility', 'marketing']

    $scope.toggleSelectionMode = function () {
        $scope.selectionMode = !$scope.selectionMode;
    }
    $scope.onClick = function (node) {
        if (!$scope.selectionMode) {
            $scope.edit(node);
        } else {
            $scope.selectParent(node);
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
    $scope.selectParent = function (node) {
        var tempNode    = $scope.nodes[$scope.currentNodeId],
            depIndex    = tempNode.deps.indexOf(node.slug);
        if (depIndex > -1) {
            tempNode.deps.splice(depIndex, 1);
        } else if (tempNode.slug != node.slug) {
            tempNode.deps.push(node.slug);
        }
        $scope.$emit('refresh');
    }
    $scope.deleteCurrentNode = function () {
        if (confirm('Are you sure?')) {
            $scope.nodes.splice($scope.currentNodeId, 1);
            $scope.currentNodeId = undefined;
        }
    }

    var nodeTemplate = {
        name:   'Unnamed tech',
        slug:   'unnamed-tech',
        type:   'ride',
        deps:   [],
    }
    $scope.addNew = function () {
        $scope.nodes.push(angular.copy(nodeTemplate));
        $scope.currentNodeId = $scope.nodes.length - 1;
        $scope.selectionMode = true;
    }

    var saveNodes = function () {
        // Clean out d3 data
        var newNodes = angular.copy($scope.nodes);
        console.log('Saving nodes');
        for (var i in newNodes) {
            newNodes[i].px = undefined;
            newNodes[i].py = undefined;
            newNodes[i].color = undefined;
            newNodes[i].weight = undefined;
            newNodes[i].x = undefined;
            newNodes[i].y = undefined;
        };
        try {
            localStorage.techNodes = JSON.stringify(newNodes);
        } catch (err) {
            console.log(err);
        }
    }
    var loadNodes = function () {
        console.log('Loading nodes');
        $scope.nodes = localStorage.techNodes ? JSON.parse(localStorage.techNodes) : [];
    }
    loadNodes();
    $scope.$watchCollection('nodes', saveNodes);
    $scope.$on('refresh', saveNodes);
    setInterval(saveNodes, 60000);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
