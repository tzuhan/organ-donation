function DonutChart(chartId) {

    var chart = d3.select('#' + chartId);

    var allDonut;

    var chart_m,
        chart_r,
        color = d3.scale.category20();

    var getCatNames = function(dataset) {
        var catNames = new Array();

        for (var i = 0; i < dataset[0].data.length; i++) {
            catNames.push(dataset[0].sub[i].cat);
        }

        return catNames;
    }

    var createLegend = function(catNames) {
        var legends = chart.select('.legend')
                        .selectAll('g')
                            .data(catNames)
                        .enter().append('g')
                            .attr('transform', function(d, i) {
                                return 'translate(' + (i * 150 + 50) + ', 10)';
                            });

        legends.append('circle')
            .attr('class', 'legend-icon')
            .attr('r', 6)
            .style('fill', function(d, i) {
                return color(i);
            });

        legends.append('text')
            .attr('dx', '1em')
            .attr('dy', '.3em')
            .text(function(d) {
                return d;
            });
    }

    var createCenter = function(pie) {

        var eventObj = {
            'mouseover': function(d, i, j) {
                d3.select(this)
                    .transition()
                    .attr("r", chart_r * 0.65);
            },

            'mouseout': function(d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .ease('bounce')
                    .attr("r", chart_r * 0.6);
            },

            /*'click': function(d, i) {
                var paths = chart.selectAll('.clicked');
                pathAnim(paths, 0);
                paths.classed('clicked', false);
                resetAllCenterText();
            }*/
        }

        var donuts = d3.selectAll('.donut');

        // The circle displaying total data.
        donuts.append("svg:circle")
            .attr("r", chart_r * 0.6)
            .style("fill", "#E7E7E7")
            .on(eventObj);

        donuts.append('text')
                .attr('class', 'center-txt type')
                .attr('y', chart_r * -0.16)
                .attr('text-anchor', 'middle')
                .style('font-weight', 'bold')
                .text(function(d, i) {
                    return d.title;
                });
        donuts.append('text')
                .attr('class', 'center-txt value')
                .attr('text-anchor', 'middle');
        donuts.append('text')
                .attr('class', 'center-txt percentage')
                .attr('y', chart_r * 0.16)
                .attr('text-anchor', 'middle')
                .style('fill', '#A2A2A2');
    }

    var setCenterText = function(thisDonut) {
        var sum = d3.sum(thisDonut.selectAll('.clicked').data(), function(d) {
            return d.value;
        });

        thisDonut.select('.value')
            .text(function(d) {
                return (sum)? sum + d.unit
                            : d.total + d.unit;
            });
        thisDonut.select('.percentage')
            .text(function(d) {
                return (sum)? (sum/d.total*100).toFixed(2) + '%'
                            : '';
            });
    }

    var resetAllCenterText = function() {
        chart.selectAll('.type').text(function(d) {
            return d.title;
        })
        chart.selectAll('.value').text(function(d) {
            return d.total + d.unit;
        });
        chart.selectAll('.percentage').text('');
    }

    var pathAnim = function(path, dir) {
        switch(dir) {
            case 0:
                path.transition()
                    .duration(500)
                    .ease('bounce')
                    .attr('d', d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(chart_r)
                    );
                break;

            case 1:
                path.transition()
                    .attr('d', d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(chart_r * 1.08)
                    );
                break;
        }
    }

    var updateDonut = function() {

        var eventObj = {

            'mouseover': function(d, i, j) {
                pathAnim(d3.select(this), 1);

                var thisDonut = chart.select('.type' + j);

                thisDonut.select('.type').text(function(donut_d) {
                    return d.data.organ;
                });
                thisDonut.select('.value').text(function(donut_d) {
                    return d.value + donut_d.unit;
                });
                thisDonut.select('.percentage').text(function(donut_d) {
                    return (d.value/donut_d.total*100).toFixed(2) + '%';
                });
            },

            'mouseout': function(d, i, j) {
                var thisPath = d3.select(this);
                if (!thisPath.classed('clicked')) {
                    pathAnim(thisPath, 0);
                }
                var thisDonut = chart.select('.type' + j);
                //setCenterText(thisDonut);
                resetAllCenterText();
            },
            /*
            'click': function(d, i, j) {
                var thisDonut = chart.select('.type' + j);

                if (0 === thisDonut.selectAll('.clicked')[0].length) {
                    thisDonut.select('circle').on('click')();
                }

                var thisPath = d3.select(this);
                var clicked = thisPath.classed('clicked');
                pathAnim(thisPath, ~~(!clicked));
                thisPath.classed('clicked', !clicked);

                setCenterText(thisDonut);
            }*/
        };

        var pie = d3.layout.pie()
                        //.sort(null)
                        .value(function(d) {
                            return d.number;
                        });

        var arc = d3.svg.arc()
                        .innerRadius(chart_r * 0.7)
                        .outerRadius(function() {
                            return (d3.select(this).classed('clicked'))
                                    ? chart_r * 1.08
                                    : chart_r;
                        });

        // Start joining data with paths
        var paths = chart.selectAll('.donut')
                        .selectAll('path')
                        .data(function(d) {
                            console.log(d);
                            return pie(d.sub);
                        });

        paths
            .transition()
            .duration(1000)
            .attr('d', arc);

        paths.enter()
            .append('svg:path')
                .attr('d', arc)
                .style('fill', function(d, i) {
                    return color(i);
                })
                .style('stroke', '#FFFFFF')
                .on(eventObj)

        paths.exit().remove();

        resetAllCenterText();
    }

    this.create = function(dataset) {
        // var $chart = $('#donut-chart');
        // chart_m = $chart.innerWidth() / dataset.length / 2 * 0.14;
        // chart_r = $chart.innerWidth() / dataset.length / 2 * 0.85;

        // chart.append('svg')
        //     .attr('class', 'legend')
        //     .attr('width', '100%')
        //     .attr('height', 50)
        //     .attr('transform', 'translate(0, -100)');

        chart_r = 150;
        chart_m = 20;

        var donuts = chart.selectAll('.donut')
                        .data(dataset)
                    .enter().append('svg:svg')
                        .attr('width', (chart_r+chart_m) * 2)
                        .attr('height', (chart_r+chart_m) * 2)
                    .append('svg:g')
                        .attr('class', function(d, i) {
                            return 'donut type' + i;
                        })
                        .attr('transform', 'translate(' + (chart_r+chart_m) + ',' + (chart_r+chart_m) + ')');

        //createLegend(getCatNames(dataset));
        createCenter();

        updateDonut();
    }

    this.update = function(dataset) {
        // Assume no new categ of data enter
        var donut = chart.selectAll(".donut")
                    .data(dataset);

        updateDonut();
    }
}


function Bowls(chartId) {
    var charts = d3.select('#' + chartId);
    var radius, margin, leftPadding;
    var color = function(i) {
        var c = ['steelblue', 'darkorange', 'purple', 'darkred', 'darkgreen'];
        return c[i%5];
    };

    this.create = function(dataset) {
        var chartSize = dataset.length;

        radius = 100;
        margin = 20;
        leftPadding = ($(charts[0]).innerWidth()-(margin+radius)*2*chartSize)/2;
        var svg = charts.append('svg:svg').style('width', '100%').style('height', 300);
        svg.append('svg:g').attr('class', 'stroke');
        svg.append('svg:g').attr('class', 'color');
        svg.append('svg:g').attr('class', 'title');
        svg.append('svg:g').attr('class', 'value');
        svg.append('svg:g').attr('class', 'setting')
            .html('<filter id="dropshadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/> <!-- stdDeviation is how much to blur --><feOffset dx="0" dy="3" result="offsetblur"/> <!-- how much to offset --><feMerge><feMergeNode/> <!-- this contains the offset blurred image --><feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to --></feMerge></filter>');

                // .attr('width', (radius+margin) * 2 * chartSize)
                // .attr('height', (radius+margin) * 2)

        svg.select('.stroke').selectAll('circle')
                .data(dataset)
            .enter().append('circle')
                //.attr('width', (radius+margin) * 2)
                //.attr('height', (radius+margin) * 2)
                /*.attr('transform', function(d, i) {
                    return 'translate(' + (radius+margin) * (i*2+1) + ',' + (radius+margin) + ')';
                })*/
                .attr('cx', function(d, i) {
                    return leftPadding + (radius+margin) * (i*2+1);
                })
                .attr('cy', function(d, i) {
                    return radius + margin;
                })
                .attr('r', radius)
                .style({
                    'stroke': function(d, i) {
                        return color(i);
                    },
                    'stroke-width': 2,
                    'fill': '#ffffff',
                })
                .on({
                    'mouseover': function() {
                        d3.select(this).style('filter', 'url(#dropshadow)');
                    },
                    'mouseout': function() {
                        d3.select(this).style('filter', 'none');
                    },
                });

        svg.select('.color').selectAll('circle')
                .data(dataset)
            .enter().append('circle')
                //.attr('width', (radius+margin) * 2)
                //.attr('height', (radius+margin) * 2)
                /*.attr('transform', function(d, i) {
                    return 'translate(' + (radius+margin) * (i*2+1) + ',' + (radius+margin) + ')';
                })*/
                .attr('r', radius)
                .attr('cx', function(d, i) {
                    return leftPadding + (radius+margin) * (i*2+1);
                })
                .attr('cy', function(d, i) {
                    return radius + margin;
                })
                .attr('fill', function(d, i) {
                        return color(i);
                })
                .style({
                    'stroke': '#000000',
                    'stroke-width': 0,
                    'z-index': 1000,
                })
                .attr('clip-path', function(d, i) {
                    return 'url(#dataseg-' + i + ')';
                });

        svg.select('.title').selectAll('text')
                .data(dataset)
            .enter().append('text')
                .attr('x', function(d, i) {
                    return leftPadding + (margin+radius) * (i*2+1);
                })
                .attr('y', function(d) {
                    return margin + ((d.waiting-d.donation)/d.waiting)*radius*2 - 50;
                })
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d.nation;
                });

        svg.select('.value').selectAll('text')
                .data(dataset)
            .enter().append('text')
                .attr('x', function(d, i) {
                    return leftPadding + (margin+radius) * (i*2+1);
                })
                .attr('y', function(d) {
                    return margin + ((d.waiting-d.donation)/d.waiting)*radius*2 - 20;
                })
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d.donation+' / '+d.waiting+' ('+(d.donation/d.waiting*100).toFixed(0)+'%)';
                });

        svg.selectAll('clipPath')
                .data(dataset)
            .enter().append('clipPath')
                .attr('id', function(d, i) {
                    return 'dataseg-' + i;
                })
                .append('rect')
                    .attr('width', radius * 2)
                    .attr('height', radius * 2)
                    .attr('x', function(d, i) {
                        return leftPadding + margin + (radius+margin) * 2 * i;
                    })
                    .attr('y', function(d) {
                        return margin + ((d.waiting-d.donation)/d.waiting)*radius*2;
                    });
    };
}

function LineChart(chartId) {
    /*******************
     * private members *
     *******************/

    var chart = d3.select('#' + chartId);
    // svg object presenting line chart
    var chart_svg;

    // margin, width and height of the chart
    // axes spaces are not included in width and height
    var chart_m = {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30
    };
    var chart_w = parseInt($(chart).innerWidth()) * 0.95 - chart_m.left - chart_m.right,
        chart_h = parseInt($(chart).innerHeight()) * 0.9 - chart_m.top - chart_m.bottom;

    var colors;

    var totalHidden = false;

    /* Preperation functions for drawing line */
    // default scale value, will be overwritten later on
    var scale = {
        'x': d3.time.scale()
                .domain([new Date('2012/1/1'), new Date('2012/12/31')])
                .range([0, chart_w]),
        'y': d3.scale.linear()
                .domain([0, 1000])
                .range([chart_h, 0])
    }
    var axis = {
        'x': d3.svg.axis()
                .scale(scale['x'])
                .tickFormat(d3.time.format('%m/%d'))
                .orient('bottom'),
        'y': d3.svg.axis()
                .scale(scale['y'])
                .tickSize(-chart_w)
                .orient('left')
    }
    var line = d3.svg.line()
                .interpolate('linear')
                .x(function(d) {
                    return scale['x'](d[0]);
                })
                .y(function(d) {
                    return scale['y'](d[1].val);
                });
    /* End of preperation functions for drawing line */

    /*
     * Configure the axis functions. (rescaling)
     */
    var configAxes = function(x_domain, y_domain) {
        scale['x'].domain(x_domain);
        scale['y'].domain(y_domain);
        axis['x'].scale(scale['x']);
        axis['y'].scale(scale['y']);
    }


    /*
     * Add tooltip to dots of the chart
     * refer to static/js/report_js/report_picture.js by Cathy
     */
    var handleTooltip = function(el, context, i, j, show) {

        var offset = $(el[0]).offset();
        var data = el.data()[0];
        var color = colors[context.cat[j]];

        if (show && !$('.tooltip').length) {

            var content = formatDateObj(data[0], context.unit) + ' ' +
                                  TYPE[data[1].type] + ': ' +
                                  valToText(data[1].val);

            createTooltip(offset.top, offset.left, 'tooltip' + i, content, color);

            chart_svg.append('circle')
                .attr('cx', el.attr('cx'))
                .attr('cy', el.attr('cy'))
                .attr('class', 'ring')
                .attr('id', 'r' + i)
                .style('stroke', color)
                .style('opacity', 0.5)
                .transition()
                .duration(200)
                    .attr('r', 5);
        } else {
            $('#tooltip' + i).fadeOut(200, function() {
                this.remove();
            });
            $('#r' + i).fadeOut(200, function() {
                this.remove();
            });
        }
    }


    var updateDomain = function(datum, type, domain) {
        var newDomain = {
            "start": (datum.time < domain.start)? datum.time
                                                : domain.start,
            "end": (datum.time > domain.end)? datum.time
                                            : domain.end,
            "min": (datum.data[type].val < domain.min)?
                                            datum.data[type].val
                                          : domain.min,
            "max": (datum.data[type].val > domain.max)?
                                            datum.data[type].val
                                          : domain.max,
        };
        return newDomain;
    }

    /*
     * Return a set of lines for the line chart, where the number of lines equals
     * to the number of cat in the context.
     * Each line contains a set of coordinates.
     * (Note: if line of total is far from lines of other categories,
     *        line of total will be hidden.)
     */
    var getLineData = function(dataset, context) {
        var totalMin = NaN,
            catMax = NaN;
        var dataLen = dataset.length,
            catLen = context.cat.length;

        var domain = {
            'start': dataset[0].time,
            'end': dataset[0].time,
            'min': 0,
            'max': 0
        };

        var lines = new Array();
        for (var i = 0; i < catLen; i++) {
            lines.push(new Array());
        }

        for (var i = 0; i < catLen; i++) {
            for (var j = 0; j < dataLen; j++) {
                var curData = dataset[j];
                if (curData.cat !== context.cat[i]) {
                    continue;
                }
                var coord = [curData.time, curData.data[context.type]];
                lines[i].push(coord);

                if (0 === context.cat[i]) {
                    totalMin = (totalMin < coord[1].val)? totalMin : coord[1].val;
                } else {
                    catMax = (catMax > coord[1].val)? catMax : coord[1].val;
                }
                domain = updateDomain(curData, context.type, domain);
            }
        }

        if (totalMin - catMax > totalMin * 0.2 && lines.length > 2) {
            lines.shift();
            context.cat.shift();
            domain.max = catMax;
        }
        configAxes([domain.start, domain.end], [domain.min, domain.max]);

        return lines;
    }

    var updateLines = function(lines, context) {

        // Join new data to lines
        var lines = chart_svg.selectAll('.line')
                            .data(lines);

        // Translate existing lines translate
        lines.select('path')
                .transition()
                .attr('d', line)
                .style('stroke', function(d, i) {
                    return colors[context.cat[i]];
                });

        // Add New line(data pairs)
        lines.enter()
                .append('g')
                    .attr('class', 'line')
                .append('svg:path')
                    .attr('class', function(d, i) {
                        //var base_value = this_obj.chart_context['base_value'];
                    })
                    .transition()
                    .attr('d', line)
                    .style('stroke', function(d, i) {
                        return colors[context.cat[i]];
                    });

        // Remove redundant lines
        lines.exit().remove();


        // Join new data to dots
        var dots = lines.selectAll('circle')
                .data(function(d) {
                    return d;
                });

        dots.transition()
            .attr('cx', line.x())
            .attr('cy', line.y())
            .style('fill', function(d, i, j) {
                return colors[context.cat[j]];
            });

        var new_dots = dots.enter()
            .append('svg:circle')
            .attr('class', 'dot')
            .style('fill', function(d, i, j) {
                return colors[context.cat[j]];
            })
            .attr('cx', line.x())
            .attr('cy', line.y())
            .attr('r', 3)
            .on({
                'mouseover': function(d, i, j) {
                    handleTooltip(d3.select(this), context, i, j, true);
                },
                'mouseout': function(d, i, j) {
                    handleTooltip(d3.select(this), context, i, j, false);
                }
            });

        dots.exit().remove();
    }


    /******************
     * public members *
     ******************/
    this.dataset = [];
    this.context = {};

    this.create = function(dataset, context) {
        this.dataset = dataset;
        this.context = context;
        // colors = BASE[context.base].color;
        colors = d3.scale.category20();

        var lines = getLineData(dataset, context);
        console.log('getLineData: ', lines);

        /* Creating real svg elements & binding data */
        chart_svg = chart.append('svg')
                        .attr('width', chart_w + chart_m.left + chart_m.right)
                        .attr('height', chart_w + chart_m.top + chart_m.bottom)
                        .append('svg:g')
                        .attr('transform', 'translate(' + chart_m.left + ',' + chart_m.top + ')');

        chart_svg.append('svg:g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + chart_h + ')')
                .call(axis['x'])
                .selectAll('text')
                    .style('text-anchor','end')
                    .attr('transform','rotate(-45)');
        chart_svg.append('g')
                .attr('class', 'y axis')
                .call(axis['y']);

        updateLines(lines, context);
    }

    this.update = function(dataset, context) {
        if (dataset !== null) {
            this.dataset = dataset;
        }
        if (1 === context.cat.length && 0 !== context.cat[0]) {
            context.cat.unshift(0);
            this.context = context;
        }

        colors = BASE[context.base].color;
        var lines = getLineData(this.dataset, context);

        chart_svg.select('.x')
                .call(axis['x'])
                .selectAll('text')
                    .style('text-anchor','end')
                    .attr('transform','rotate(-45)');
        chart_svg.select('.y')
                .call(axis['y']);

        updateLines(lines, context);
    }
};

function Lines(chartId) {
    var chart = d3.select('#' + chartId);
    var margin, width, height;
    var color = d3.scale.category10();
    var scale, axis;

    var line = d3.svg.line()
                .interpolate('linear')
                .x(function(d) {
                    // console.log(d.time);
                    // console.log(scale.x(d.time))
                    return scale.x(d.time);
                })
                .y(function(d) {
                    // console.log(scale.y(d.val))
                    return scale.y(d.val);
                });
    var initScaleAxis = function() {
        scale = {
            'x': d3.time.scale()
                    .domain([new Date('2004'), new Date('2009')])
                    .range([20, width]),
            'y': d3.scale.linear()
                    .domain([0, 1000])
                    .range([height+margin, 0])
        };
        axis = {
            'x': d3.svg.axis()
                    .scale(scale['x'])
                    .tickFormat(d3.time.format('%Y'))
                    .tickSize(5)
                    .orient('bottom'),
            'y': d3.svg.axis()
                    .scale(scale['y'])
                    .tickSize(-width-margin)
                    .orient('left')
        };
    }
    var reformatDataset = function(dataset) {
        var lineData = [];
        for (var i = dataset.length - 1; i >= 0; i--) {
            var newLine = new Array();
            var curSet = dataset[i].data;
            for (var j = 0; j < curSet.length; j++) {
                var curDatum = new Array();
                curDatum[0] = curSet[j]['time'];
                curDatum[1] = curSet[j]['val'];
                newLine.push(curDatum);
            };
            lineData.push(curSet);
        };
        return lineData;
    }
    var updateLines = function(dataset) {
        var lineData = reformatDataset(dataset);
        var lines = chart.select('.line-chart')
                        .selectAll('.line')
                        .data(lineData);

        lines.select('path')
            //.transition()
            .attr('d', line)
            .style('stroke', function(d, i) {
                return color(i);
            });

        lines.enter()
            .append('svg:g')
                .attr('class', 'line')
            .append('svg:path')
                .attr('class', function(d, i) {
                    return 'type-' + i;
                })
                // .transition()
                .attr('d', line)
                .attr('fill', 'none')
                .style({
                    'stroke': function(d, i) {
                        console.log(i);
                        return color(i);
                    },
                    'stroke-width': 3,
                    'opacity': 0.5
                })
                .on({
                    'mouseover': function(d) {
                        d3.select(this).style('opacity', 1);
                    },
                    'mouseout': function(d) {
                        d3.select(this).style('opacity', 0.5);
                    }
                });
        lines.exit().remove();
    };

    this.create = function(dataset) {
        var chartW = $(chart[0]).innerWidth();
        margin = 50;
        width = chartW * 0.8 - margin * 2;
        height = 150;
        initScaleAxis();

        var lineChart = chart.append('svg:svg')
                    .attr('width', width + margin * 2)
                    .attr('height', height + margin * 2)
                    .append('svg:g')
                        .attr('class', 'line-chart')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('transform', 'translate(' + margin + ',' + margin/2 + ')');

        lineChart.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height + margin) + ')')
            .call(axis['x']);
            //.selectAll('text');

        lineChart.append('svg:g')
            .attr('class', 'y axis')
            .call(axis['y']);

        updateLines(dataset);

    }
}