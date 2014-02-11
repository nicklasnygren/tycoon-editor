'use strict';

angular.module('techtreeBuilderApp')
.controller('MainCtrl', function ($scope, DataService) {
  $scope.nodes = [];
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
      if ($scope.nodes[i].id == node.id) {
        $scope.currentNodeId = i;
        break;
      }
    }
  }
  $scope.selectParent = function (node) {
    var tempNode    = $scope.nodes[$scope.currentNodeId],
    depIndex    = tempNode.deps.indexOf(node.id);
    if (depIndex > -1) {
      tempNode.deps.splice(depIndex, 1);
    } else if (tempNode.id != node.id) {
      tempNode.deps.push(node.id);
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
    id:   0,
    type:   'ride',
    deps:   [],
  }

  $scope.download = function () {
    DataService.export($scope.nodes);
  }

  $scope.addNew = function () {
    var newNode = angular.copy(nodeTemplate);

    for (var i in $scope.nodes) {
      if ($scope.nodes[i].id >= newNode.id) {
        newNode.id = $scope.nodes[i].id + 1;
      }
    }
    $scope.nodes.push(newNode);
    $scope.currentNodeId = $scope.nodes.length - 1;
  }

  var saveNodes = function () {
    DataService.saveNodes($scope.nodes);
  }
  $scope.nodes = DataService.loadNodes();
  $scope.$watchCollection('nodes', saveNodes);
  $scope.$watch('currentNodeId', saveNodes);
  $scope.$on('refresh', saveNodes);
  setInterval(saveNodes, 5000);

  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
});

