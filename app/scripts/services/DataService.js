/**
 * DataService
 */
'use strict';
angular.module('techtreeBuilderApp')
.factory('DataService', function () {

  var DataService = {};
  
  // Template for nodes
  DataService.nodeTemplate = {
    name:     'Unnamed tech',
    id:       0,
    type:     'ride',
    deps:     [],
    duration: 20,
    default:  false,
    year:     1954,
  };

  // Clean nodes from various diseases
  DataService.cleanNodes = function (nodes) {
    // Clean out d3 data
    var newNodes = angular.copy(nodes);
    for (var i in newNodes) {
      delete newNodes[i].px;
      delete newNodes[i].py;
      delete newNodes[i].color;
      delete newNodes[i].weight;
      delete newNodes[i].x;
      delete newNodes[i].y;
      delete newNodes[i].index;

      // Clean dead deps
      for (var j in newNodes[i].deps) {
        if (!$.grep(newNodes, function (node) {
          return node.id == newNodes[i].deps[j];
        }).length) {
          newNodes[i].deps.splice(j, 1);
        }
      }
    }

    return newNodes;
  };

  // This will save tech nodes to localstorage
  DataService.saveNodes = function (nodes) {
    var newNodes = this.cleanNodes(nodes);
    console.log('Saving nodes');
    try {
      localStorage.techNodes = JSON.stringify(newNodes);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // This will load tech nodes from localstorage
  DataService.loadNodes = function (callback) {
    console.log('Loading nodes');
    var nodes = localStorage.techNodes ? JSON.parse(localStorage.techNodes) : [];
    var newNodes = [];
    for (var i in nodes) {
      var newNode = angular.copy(this.nodeTemplate);
      console.log(newNode);
      newNodes.push(angular.extend(newNode, nodes[i]));
    }
    return newNodes;
  };

  // Exports all the JSON
  DataService.export = function (nodes) {
    var data = {
      techNodes: this.cleanNodes(nodes),
    };
    var text = 'data:text/plain;charset=utf-8,' + JSON.stringify(data);
    var link = document.createElement('a');
    var e = document.createEvent('MouseEvents');
    link.href = text;
    link.download = 'GameData.json';
    e.initEvent('click', true, true);
    link.dispatchEvent(e);
    return true;
  };

  return DataService;
});

