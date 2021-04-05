
//環圈圖開始

function drawit(num1) {
    var i = document.getElementById("circle");
    if (num1 == 114) {
        var num = num1 - 99
    } else {
        var num = num1 - 95
    }
    if (i) {
        i.remove()
    }
    // i.parentNode.removeChild(i);
    // console.log(num)
    d3.csv("https://raw.githubusercontent.com/Dave870907/d3.js-practice/master/news2.csv", function (data) {
        var data = data[num]
        // console.log(data["Sun"])
        var dataSun = data["Sun"]
        console.log(dataSun)
        var width = 150
        height = 150
        margin = 3

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#d3d3d3")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "circle")
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



        // set the color scale
        var color = d3.scale.ordinal()
            .domain(data)
            .range(["#9cb6e2", "#9cd9e8", "#f4d429", "#76bd57"])
        // var color = d3.scale.category10();  // 選擇顏色類型
        var colors = ["#9cb6e2", "#9cd9e8", "#f4d429", "#76bd57"];

        // Compute the position of each group on the pie:
        var pie = d3.layout.pie()
            .value(function (d) {
                return d.value / 100;
            })
        var data_ready = pie(d3.entries(data))



        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.svg.arc()
                .innerRadius(40) // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', function (d) {
                return (color(d.data.key))
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .on("mouseover", function () {
                tooltip.style("display", null);
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            // .on("mousemove", drawit(2))
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.data.key + ":" + d.value + "億度");
            });
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 100)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 50)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");
        var text = svg.append("text")
            .attr("dy", "2em")
            .style('fill', '#604c3f')
            .style("text-anchor", "middle")
            .style("font-family", "Noto Sans TC")
            .style("font-weight", "bold");

        // .style("color", "red")
        // .text("太陽能：" + dataSun / 100 + "億度");
        var strs = [dataSun + "億度", "太陽能："]
        text.selectAll("tspan")
            .data(strs)
            .enter()
            .append("tspan")
            .attr("y", "-8")
            .attr("x", "0")
            .style('font-size', '12px')
            .text(function (d) {
                return d;
            });

    });
}
$(document).ready(function () {
    d3.csv("https://raw.githubusercontent.com/Dave870907/d3.js-practice/master/news.csv", function (data) {
        console.log(data);
        console.log(data[0].Wind)

        function ysum(x1) {
            var x = 0
            if (x1 == 114) {
                x = x1 - 4
            } else {
                x = x1
            }
            var sum = 0
            if (data[x - 95].Wind) {
                sum += Number(data[x - 95].Wind)
            }
            if (data[x - 95].Water) {
                sum += Number(data[x - 95].Water)
            }
            if (data[x - 95].Trash) {
                sum += Number(data[x - 95].Trash)
            }
            if (data[x - 95].Sun) {
                sum += Number(data[x - 95].Sun)
            }

            return Math.round(sum * 100) / 100
        }
        var margin = {
            top: 150,
            right: 50,
            bottom: 85,
            left: 40
        };

        var width = 335 - margin.left - margin.right,
            height = 350 - margin.top - margin.bottom;

        var svg = d3.select("#d3d3d3")
            .append("svg")
            .attr("id", "histogram")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            // .append("text")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // svg.selectAll("text")
        //     .text("單位:億度")
        // var parse = d3.time.format("%Y").parse;
        // Transpose the data into layers
        var dataset = d3.layout.stack()(["Wind", "Water", "Sun", "Trash"].map(function (power) {
            return data.map(function (d) {
                return {
                    x: d.Year,
                    y: +d[power]
                };
            });
        }));
        svg.append('line').attr({
            x1: 225,
            y1: 138,
            x2: 217,
            y2: 149
        }).style({
            stroke: '#9b8a81',
            'stroke-width': 3
        });
        svg.append('line').attr({
            x1: 210,
            y1: 138,
            x2: 218,
            y2: 149
        }).style({
            stroke: '#9b8a81',
            'stroke-width': 3
        });
        svg.append('text')
            .attr('x', -19)
            .attr('y', -25)
            .style('fill', '#604c3f')
            .style('font-size', '8px')
            // .style('font-weight', 'bold')
            .text('發電量');
        svg.append('text')
            .attr('x', -23)
            .attr('y', -10)
            .style('fill', '#604c3f')
            .style('font-size', '8px')
            // .style('font-weight', 'bold')
            .text('（億度）');
        svg.append('text')
            .attr('x', 210)
            .attr('y', 157)
            .style('fill', '#9b8a81')
            .style('font-size', '8px')
            // .style('font-weight', 'bold')
            .text('目標');
        svg.append('text')
            .attr('x', 205)
            .attr('y', 168)
            .style('fill', '#9b8a81')
            .style('font-size', '8px')
            // .style('font-weight', 'bold')
            .text('發電量');
            svg.append('text')
            .attr('x', 227)
            .attr('y', 133)
            .style('fill', '#9b8a81')
            .style('font-size', '6px')
            // .style('font-weight', 'bold')
            .text('（年度）');
        // Set x, y and colors
        var x = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) {
                return d.x;
            }))
            .rangeRoundBands([10, width - 10], 0.02);

        var y = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                return d3.max(d, function (d) {
                    return d.y0 + d.y;
                });
            })])
            .range([height, 0]);
        var colors = ["#9cb6e2", "#9cd9e8", "#f4d429", "#76bd57"];
        var colors2 = ["#76bd57", "#9cb6e2", "#9cd9e8", "#f4d429"];


        var legend = svg.selectAll(".legend")
            .data(colors)
            .enter()
            .append("g")
            .attr("class", "legend")

            .attr("transform", function (d, i) {
                if (i == 1) {
                    return "translate(" + i * 50 + ",-30)"
                }
                return "translate(" + i * 44 + ",-30)";
            });

        legend.append("rect")
            .attr("x", width - 223)
            .attr("width", 9)
            .attr("height", 9)
            .style("fill", function (d, i) {
                return colors2.slice().reverse()[i];
            });

        legend.append("text")
            .attr("x", width - 210)
            .attr("y", 5)
            .attr("dy", ".35em")

            .style("text-anchor", "start")
            .style('font-weight', 'bold')
            .style("font-size",8)
            .style('fill', '#604c3f')
            .text(function (d, i) {
                switch (i) {
                    case 0:
                        return "太陽能";
                    case 1:
                        return "水力";
                    case 2:
                        return "風力";
                    case 3:
                        return "垃圾沼氣";
                    // case 4:
                    //     return "發電量:億度";
                }
            })


        // Define and draw axes
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-width, 0, 0)
            .tickFormat(function (d) {
                return d
            });

        var xAxis = d3.svg.axis()
            .scale(x)
            // .attr("fill", "9b8a81")
            .tickPadding(12)
            .tickSize(3)
            .orient("bottom");
        // .tickFormat(d3.time.format("%Y"));

        svg.append("g")
            .attr("class", "y axis")
            .style("font-size", 8)
            // .attr("transform", "translate(0," + height + ")")
            .call(yAxis);

        svg.append("g")
            .attr("class", "x axis")
            .style("font-size", 6)
            .attr("transform", "translate(-5," + height + ")")
            .call(xAxis);
        // Create groups for each series, rects for each segment 
        var groups = svg.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) {
                return colors[i];
            });
        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 60)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 60)
            .attr("y", 60)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

        var rect = groups.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter()

            .append("rect")
            .style("cursor", "pointer")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y0 + d.y);
            })
            .attr("id", function (d) {
                return d.x
            })
            // .attr("onmouseenter", function (d) { return "drawit(" + d.x + ")" })
            .attr("onclick", function (d) {
                return "drawit(" + d.x + ")"
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y0 + d.y);
            })
            .attr("width", x.rangeBand() - 7)
            .on("mouseover", function () {
                tooltip.style("display", null);
            })
            .on("mouseout", function () {
                tooltip.style("display", "none");
            })
            // .on("mousemove", drawit(2))
            .on("mousemove", function (d) {
                var xPosition = d3.mouse(this)[0] - 15;
                var yPosition = d3.mouse(this)[1] - 25;
                // var ysum = d.y + d.y0
                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(ysum(d.x) + "億度");
                // console.log(ysum(d.x))
            });


        // Draw legend




    });

    drawit(95)
});
// window.onload = drawit(95)
// d3.select("text")
