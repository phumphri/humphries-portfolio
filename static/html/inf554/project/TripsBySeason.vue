<template>
    <div v-bind:id="div_id_2"></div>
</template>

<script>
    // Import d3 for responsive bar chart.
    import * as d3 from "d3";

    export default {
        name: "TripsBySeason",
        props: ["row_id_2", "div_id_2", "parent_id_2", "csv_file_2"],

        mounted() {

            // Define global variables.
            var g = {};
            g.b = d3.select("body");
            g.debug = false;

            // Check the prop values.
            if (g.debug) {
                g.b.append("div").append("text").text(".")
                g.b.append("div").append("text").text("Entered TripsbySeason.vue.")
                g.b.append("div").append("text").text("row_id_2:  " + this.row_id_2);
                g.b.append("div").append("text").text("div_id_2:  " + this.div_id_2);
                g.b.append("div").append("text").text("parent_id_2:  " + this.parent_id_2);
                g.b.append("div").append("text").text("csv_file_2:  " + this.csv_file_2);
            }

            // Get a reference for the csv file.
            var var_csv_file = this.csv_file_2;

            // Row for locating the row title.
            var sans_row_id = this.row_id_2;
            var var_row_id = "#" + sans_row_id;

            // The parent container is used to determine height and width.
            var sans_div_id = this.parent_id_2;
            var var_div_id = "#" + sans_div_id;

            // Create an unique identifier for the svg.
            var sans_svg_id = sans_div_id + "_svg";
            var var_svg_id = "#" + sans_svg_id;

            // Create unique identifiers for the x axis and its label.
            var sans_x_axis_group = this.div_id + "_x_axis_group";
            var var_x_axis_group = "#" + sans_x_axis_group;
            var sans_x_axis_label = this.div_id + "_x_axis_label";
            var var_x_axis_label = "#" + sans_x_axis_label;

            // Create unique identifiers for the y axis and its label.
            var sans_y_axis_group = this.div_id + "_y_axis_group";
            var var_y_axis_group = "#" + sans_y_axis_group;
            var sans_y_axis_label = this.div_id + "_y_axis_label";
            var var_y_axis_label = "#" + sans_y_axis_label;

            d3.csv(var_csv_file, function (d) {

                // Convert csv strings to integers.
                return {
                    hour: parseInt(d.hour),
                    summer: parseInt(d.summer),
                    winter: parseInt(d.winter)
                };
            }).then(d => {

                // Make data available to all functions.
                g.d = d;

                // Let's dump g.d to see what we have.
                if (g.debug) {

                    g.b
                        .append("div")
                        .append("text")
                        .text("g.d.length:  " + g.d.length);

                    for (var i = 0; i < 5; i++) {
                        var x = g.d[i];
                        var debug_div = g.b.append("div");
                        debug_div.append("text").text("hour:  " + x.hour + "    ");
                        debug_div.append("text").text("summer:  " + x.summer + "    ");
                        debug_div.append("text").text("winter:  " + x.winter + "    ");
                    }
                }

                // Set some local variables.
                g.duration = 500;

                // Build or adjust the document.
                build_document();

                // Execute nested functions to build the bar chart.
                function build_document() {
                    set_margins();
                    set_width_and_height();
                    set_up_svg();
                    determine_min_max();
                    calculate_domains();
                    calculate_scales();
                    calculate_axis();
                    append_all_bars();
                    append_x_axis();
                    append_y_axis();
                    append_legend()
                    adjust_font_sizes();
                }

                function set_margins() {

                    // The parent Bootstrap column is used to determine the graphic height and width.
                    g.window = {};
                    var window = document.getElementById(sans_div_id);
                    g.window.width = Math.floor(window.offsetWidth * 0.9);
                    g.window.height = Math.floor(window.offsetWidth * 0.4);

                    // Generally accepted method for defining margins.
                    g.margin = {};
                    g.margin.top = Math.floor(g.window.height * 0.05);
                    g.margin.right = Math.floor(g.window.width * 0.05);
                    g.margin.bottom = Math.floor(g.window.height * 0.15);
                    g.margin.left = Math.floor(g.window.width * 0.1);
                }

                function set_width_and_height() {

                    // Get a reference to the div.
                    g.bar_chart_div = d3.select(var_div_id);

                    // If not found, log error message and exit.
                    if (g.bar_chart_div.empty()) {
                        g.b.append("text").text("bar chart div was not found:  var_div_id:  " + var_div_id);
                        return;
                    }

                    // Define the dimensions of the bar chart div.
                    g.bar_chart_div.style.width = g.window.width.toString() + "px";
                    g.bar_chart_div.style.height = g.window.height.toString() + "px";

                    // Define the dimensions of the svg.
                    g.width = g.window.width - g.margin.left - g.margin.right;
                    g.height = g.window.height - g.margin.top - g.margin.bottom;

                    // Set the row title.
                    d3.select(var_row_id).select("h1").text("Total Trips by Season and Hour")
                }

                function set_up_svg() {

                    // Get a referenct to the svg.
                    g.svg = g.bar_chart_div.select(var_svg_id);

                    // If not found, create one.
                    if (g.svg.empty()) {
                        g.svg = g.bar_chart_div.append("svg").attr("id", sans_svg_id);
                    }

                    // Configure the svg.
                    g.svg
                        .attr("width", g.width + g.margin.left + g.margin.right)
                        .attr("height", g.height + g.margin.top + g.margin.bottom)
                        .style("background-color", "mistyrose");
                }

                function determine_min_max() {

                    // Get a reference to the currently filtered data.
                    var d = g.d;

                    // Determine the minimum and maximum values for y domain, scale, and axis.
                    g.min_y = d3.min(d, d => {
                        return d.summer;
                    });
                    g.max_y = d3.max(d, d => {
                        return d.summer;
                    });
                }

                function calculate_domains() {

                    // Define the y domain based on filtered dataset values.
                    g.min_y = 0;
                    g.y_domain = [g.max_y, g.min_y];

                    // Define the x domain based on unique period labels in the selected data.
                    g.x_domain = [];

                    // Get a reference to the selected data.
                    var e = g.d;

                    // Read through the selected data looking for period_labels.
                    for (var i = 0; i < e.length; i++) {
                        // Get a year.
                        var hour = e[i].hour;

                        // Only add unique period labels.
                        if (g.x_domain.indexOf(hour) == -1) {
                            g.x_domain.push(hour);
                        }
                    }
                }

                function calculate_scales() {

                    // The x scale consists of period labels, so band scale is used.
                    g.x_scale = d3
                        .scaleBand()
                        .domain(g.x_domain)
                        .rangeRound([g.margin.left, g.width + g.margin.left])
                        .padding([0.1]);

                    // The same y axis will use the y domain that will change depending on selected data.
                    g.y_scale = d3
                        .scaleLinear()
                        .domain(g.y_domain)
                        .range([g.margin.top, g.margin.top + g.height]);
                }

                function calculate_axis() {
                    // Add .ticks and .tickFormat(d3.format("")) as needed.
                    g.x_axis = d3.axisBottom().scale(g.x_scale);

                    // Add .ticks and .tickFormat(d3.format("")) as needed.
                    g.y_axis = d3.axisLeft().scale(g.y_scale);
                }

                function append_all_bars() {

                     // Adjustment for slower transitions.
                    g.additional_time = 0;

                    // Get a reference to the bars group.
                    var bars_group = g.svg.select("#bars_group");

                    // If not found, create one.
                    if (bars_group.empty()) {
                        bars_group = g.svg.append("g").attr("id", "bars_group");
                    }

                    // Get the selection of bars with data.
                    var bars = bars_group.selectAll("g").data(g.d);

                    // Append new bars.
                    var entered_bars = bars.enter()
                        .append("g")
                        .attr("id", d => {
                            return "group_" + d.hour;
                        })
                        .attr("height", d => {
                            return g.height + g.margin.top - g.y_scale(d.summer);
                        })
                        .attr("width", () => {
                            return g.x_scale.bandwidth() / 2;
                        })
                        .attr("transform", d => {
                            var x = g.x_scale(d.hour);
                            var y = g.y_scale(d.summer);
                            var s = "translate(" + x + "," + y + ")";
                            return s;
                        });

                    // Append summer rectangles.
                    entered_bars
                        .append("rect")
                        .attr("class", "cardinal_color rect")
                        .attr("height", d => {
                            return g.height + g.margin.top - g.y_scale(d.summer);
                        })
                        .attr("width", () => {
                            return g.x_scale.bandwidth() / 2;
                        })
                        .attr("fill", "#990000")
                        .append("svg:title")
                        .text((d) => { return d.summer})

                    // Append winter rectangles.
                    entered_bars
                        .append("rect")
                        .attr("class", "rect")
                        .attr("height", d => {
                            return g.height + g.margin.top - g.y_scale(d.winter);
                        })
                        .attr("width", () => {
                            return g.x_scale.bandwidth() / 2;
                        })
                        .attr("x", () => {
                            return g.x_scale.bandwidth() / 2;
                        })
                        .attr("y", (d) => {
                            return (g.height + g.margin.top - g.y_scale(d.summer)) - (g.height + g.margin.top - g.y_scale(d.winter))
                        })
                        .attr("fill", "SteelBlue")
                        .append("svg:title")
                        .text((d) => { return d.winter})

                }

                function append_x_axis() {

                    // Get a references to the x axis.
                    g.x_axis_group = d3.select(var_x_axis_group);

                    // If not found, create one.
                    if (g.x_axis_group.empty()) {
                        g.x_axis_group = g.svg.append("g").attr("id", sans_x_axis_group);
                    }

                    // Relocate the x axis to a new location if window is resized.
                    g.x_axis_group
                        .transition()
                        .duration(g.duration)
                        .delay((d, i) => {
                            return i * 100;
                        })
                        .attr("transform", "translate(0," + (g.margin.top + g.height) + ")")
                        .call(g.x_axis);

                    // Get the label for the x axis.
                    g.x_axis_label = d3.select(var_x_axis_label);

                    // If not found, create one.
                    if (g.x_axis_label.empty()) {
                        g.x_axis_label = g.x_axis_group
                            .append("text")
                            .attr("id", "x_axis_label");
                    }

                    // Relocate and populate the x axis label.
                    g.x_axis_label
                        .attr("y", g.margin.bottom * 0.7)
                        .attr("x", g.margin.left + g.width / 2)
                        .attr("fill", "black")
                        .attr("font-size", "14")
                        .style("text-anchor", "middle")
                        .text("Periods");
                }

                function append_y_axis() {

                    // Get the y axis.
                    g.y_axis_group = d3.select(var_y_axis_group);

                    // If not found, create one.
                    if (g.y_axis_group.empty()) {
                        g.y_axis_group = g.svg.append("g").attr("id", sans_y_axis_group);
                    }

                    // Relocate the y axis if the window is resized.
                    g.y_axis_group
                        .transition()
                        .duration(g.duration)
                        .attr("transform", "translate(" + g.margin.left + ",0)")
                        .call(g.y_axis);

                    // Get the label for the y axis.
                    g.y_axis_label = d3.select(var_y_axis_label);

                    // If not found, create one.
                    if (g.y_axis_label.empty()) {
                        g.y_axis_label = g.y_axis_group
                            .append("text")
                            .attr("id", "y_axis_label");
                    }

                    // Relocate and populate the y axis label.
                    g.y_axis_label
                        .attr("transform", "rotate(-90)")
                        .attr("y", g.margin.left * 0.7 * -1)
                        .attr("x", Math.floor((g.height / 2) * -1))
                        .attr("fill", "black")
                        .attr("font-size", "14")
                        .style("text-anchor", "middle")
                        .text("Number of Trips");
                }

                function adjust_font_sizes() {

                    // Resize font size when the window is resized.
                    if (g.margin.left > 100) {
                        g.svg.selectAll(".tick").style("font-size", "medium");
                        g.svg.selectAll("text").style("font-size", "medium");
                        d3.selectAll("label").style("font-size", "medium");
                        return;
                    }

                    if (g.margin.left > 50) {
                        g.svg.selectAll(".tick").style("font-size", "small");
                        g.svg.selectAll("text").style("font-size", "small");
                        d3.selectAll("label").style("font-size", "small");
                        return;
                    }

                    g.svg.selectAll(".tick").style("font-size", "x-small");
                    g.svg.selectAll("text").style("font-size", "x-small");
                    d3.selectAll("label").style("font-size", "x-small");
                }
            });

            function append_legend() {

                // Determine if there is a legend.
                g.legend = g.svg.select("#legend")

                // If not found, add one.
                if (g.legend.empty()) {
                    g.legend = g.svg.append("g").attr("id", "legend")
                }

                // Position the legend.
                g.legend.attr("transform", "translate(" + (g.margin.left * 1.1) + "," + g.margin.top + ")")

                // Add text and symbols to the legend.
                g.legend.append("rect").attr("x", 10).attr("y", -10).attr("width", 10).attr("height", 20).attr("fill", "#990000")
                g.legend.append("text").attr("x", 22).attr("y", 10).text("Summer")
                g.legend.append("rect").attr("x", 10).attr("y", 20).attr("width", 10).attr("height", 20).attr("fill", "SteelBlue")
                g.legend.append("text").attr("x", 22).attr("y", 40).text("Winter")
            }
        }
    };
</script>