'use strict';

angular.module('techtreeBuilderApp')
.directive('depLayout', function ($window) {
    return {
        restrict: 'EC',
        link: function ($scope, $elem, $attrs) {

            var nodes = [
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

            var links = [];
            for (var i in nodes) {
                for (var j in nodes[i].deps) {
                    links.push({
                        target: nodes[i],
                        source: $.grep(nodes, function (node) {
                            return node.slug == nodes[i].deps[j]
                        })[0],
                    });
                }
            }

            /* Create force graph */
            var w = $window.outerWidth;
            var h = 1000;

            var size = nodes.length;
            nodes.forEach(function(d, i) { d.x = d.y = w / size * i});

            var svg = d3.select($elem[0]).append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("overflow", "scroll");

            var force = d3.layout.force()
                .nodes(nodes)
                .links(links)
                .linkDistance(30)
                .charge(-2000)
                .size([w, h]);

            setTimeout(function() {

                var n = 400
                force.start();
                for (var i = n * n; i > 0; --i) force.tick();
                force.stop();

                svg.selectAll("line")
                    .data(links)
                    .enter().append("line")
                    .attr("class", "link")
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                svg.append("svg:g")
                    .selectAll("circle")
                    .data(nodes)
                    .enter().append("svg:circle")
                    .attr("class", function (d) {
                        return d.attrs ? d.attrs.join(' ') : '';
                    })
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; })
                    .attr("r", 25);

                svg.append("svg:g")
                    .selectAll("text")
                    .data(nodes)
                    .enter().append("svg:text")
                    .attr("class", "label")
                    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                    .attr("text-anchor", "middle")
                    .attr("y", ".3em")
                    .text(function(d) { return d.name; });

            }, 10);
        }
    }
});

