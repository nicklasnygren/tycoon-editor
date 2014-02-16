'use strict';

angular.module('techtreeBuilderApp')
.directive('depLayout', function ($window) {
    return {
        restrict: 'EC',
        templateUrl: 'views/depLayout.html',
        controller: function ($scope) {

            $scope.textSize = '.3em';
            $scope.scale = 1;

            var color = d3.scale.category20()

            var draw = function () {

                $scope.width = $window.innerWidth-450;
                $scope.height = $window.innerHeight;

                $scope.links = [];
                for (var i in $scope.nodes) {
                    for (var j in $scope.nodes[i].deps) {
                        var source = $.grep($scope.nodes, function (node) {
                            return node.id == $scope.nodes[i].deps[j]
                        })[0];
                        $scope.links.push({
                            target: $scope.nodes[i],
                            source: source,
                            weight: source.id == 'origo' ? 10 : 1,
                        });
                    }
                }

                var force = d3.layout.force()
                    .charge(-1200)
                    .linkDistance(120)
                    .linkStrength(3)
                    .size([$scope.width, $scope.height]);

                    for(var i=0; i < $scope.links.length ; i++){ 
                        $scope.links[i].strokeWidth = Math.round(Math.sqrt($scope.links[i].value))
                    }

                    for(var i=0; i < $scope.nodes.length ; i++){
                        $scope.nodes[i].color = color($scope.nodes[i].group)
                    }

                    force
                        .nodes($scope.nodes)
                        .links($scope.links)
                        .on("tick", function(){$scope.$digest()})
                        .start();
            }
            draw();
            $scope.$on('refresh', draw);
            $scope.$watchCollection('nodes', draw);
        },
        link: function (scope, element) {
            var svg = d3.select('#canvas')
                .call(d3.behavior.zoom().on("zoom", zoom));

            function zoom() {
                svg.selectAll("g").attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
            }
        }
    }
});

