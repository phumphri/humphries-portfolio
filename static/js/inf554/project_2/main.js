function main() {

    // Define global variables.
    g = {}
    g.debug = false;
    g.b = d3.select("body");
    
    file_name = '/static/csv/inf554/project_2/trips_rollup_year_month_day_hour.csv'

    d3.csv(file_name, function (d) {

        // Convert month number to string.
        var m = "";
        if (d.month === "1") {
            m = "Jan";
        } else if (d.month === "2") {
            m = "Feb";
        } else if (d.month === "3") {
            m = "Mar";
        } else if (d.month === "4") {
            m = "Apr";
        } else if (d.month === "5") {
            m = "May";
        } else if (d.month === "6") {
            m = "Jun";
        } else if (d.month === "7") {
            m = "Jul";
        } else if (d.month === "8") {
            m = "Aug";
        } else if (d.month === "9") {
            m = "Sep";
        } else if (d.month === "10") {
            m = "Oct";
        } else if (d.month === "11") {
            m = "Nov";
        } else if (d.month === "12") {
            m = "Dec";
        }

        // Convert day of week to a color.
        var dow_color = ""
        if (d.day_of_week === "1") {
            dow_color = "SteelBlue"
        } else if (d.day_of_week === "7") {
            dow_color = "SteelBlue"
        } else {
            dow_color = "#990000"
        }

        // Convert csv strings to integers.
        return {
            year: parseInt(d.year),
            month: m,
            day: parseInt(d.day),
            hour: parseInt(d.hour),
            trips: parseInt(d.trips),
            dow: dow_color,
            eod: d.event_of_day
        }

    })
    .then(d => {

        // Make data available to all functions.
        g.d = d;

        // Let's dump g.d to see what we have.
        if (g.debug) {
            g.b
                .append("div")
                .append("text")
                .text("csv_file:  " + file_name);

            g.b
                .append("div")
                .append("text")
                .text("g.d.length:  " + g.d.length);

            for (var i = 0; i < g.d.length; i++) {
                var x = g.d[i];
                var debug_div = g.b.append("div");
                if (x.year == 2017) {
                    if (x.month == "Jun") {
                        if (x.day == 15) {
                            debug_div.append("text").text("year:  " + x.year + "    ");
                            debug_div.append("text").text("month:  " + x.month + "    ");
                            debug_div.append("text").text("day:  " + x.day + "    ");
                            debug_div.append("text").text("hour:  " + x.hour + "    ");
                            debug_div.append("text").text("trips:  " + x.trips + "    ");
                            debug_div.append("text").text("dow:  " + x.dow + "    ");
                            debug_div.append("text").text("eod:  " + x.eod + "    ");

                        }
                    }

                }
            }
        }

        // Set some local variables.
        g.duration = 500;

        // Select total trips if g.total_trips is true.
        // Select all years at year level when g.total_trips is false and g.year == 0.
        // Select all months of a year when g.total_trips is false, g.year > 0, and g.month == 0.
        // Select all days of a month when g.total_trips is false, g.year > 0, and g.month.length == 0.
        // Select all hours of a day when g.total_trips is false, g.year > 0, g.month.length > 0, and g.day > 0.
        g.total_trips = true;
        g.year = 0;
        g.month = "";
        g.day = 0;

        // Build or adjust the document.
        build_document();
    })
}


// Execute nested functions to build the bar chart.
function build_document() {

    //  Checking global variable values.
    if (g.debug) {
        g.b.append("div").append("text").text(".");
        g.b.append("div").append("text").text("Enter build-document");
        g.b.append("div").append("text").text("Global:  " + g.total_trips + " " + g.year + " " + g.month.length + " " + g.day);
    }

    select_data();
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

    // Update (redraw) the chart when the window is resized.
    window.addEventListener('resize', build_document)

}



// Select all years at year level when all are zero.
// Select all months of a year when year > 0 and month == 0.
// Select all days of a month when year > 0, month > 0, and day == 0.
// Select all hours of a day when year > 0, month > 0, and day > 0.
function select_data() {

    // Declare a container to hold selected trips.
    g.selected_data = [];

    // Select data from the csv file.
    for (var i = 0; i < g.d.length; i++) {

        // Reference to the current row in the csv file.
        var x = g.d[i];

        // Select data at the total trips level.
        if (g.total_trips) {
            if (x.year === 0) {
                if (x.month.length === 0) {
                    if (x.day === 0) {
                        if (x.hour === 0) {
                            var total_datum = {
                                year: x.year,
                                month: x.month,
                                day: x.day,
                                hour: x.hour,
                                trips: x.trips,
                                dow: x.dow,
                                label: x.year
                            };
                            g.selected_data.push(total_datum);
                            d3.select('#trips')
                                .select("h1")
                                .text("All Trips");
                            continue;
                        }
                    }
                }
            }
        }

        // Select data at the year level.
        if (g.total_trips) {
            continue;
        } else {
            if (g.year === 0) {
                if (x.year > 0) {
                    if (x.month.length === 0) {
                        if (x.day === 0) {
                            if (x.hour === 0) {
                                var year_datum = {
                                    year: x.year,
                                    month: x.month,
                                    day: x.day,
                                    hour: x.hour,
                                    trips: x.trips,
                                    dow: x.dow,
                                    label: x.year
                                };
                                g.selected_data.push(year_datum);
                                d3.select('#trips')
                                    .select("h1")
                                    .text("All Years");
                                continue;
                            }
                        }
                    }
                }
            }
        }

        // Select data at the month level.
        if (g.total_trips) {
            continue;
        } else {
            if (x.year === g.year) {
                if (g.month.length === 0) {
                    if (x.month.length > 0) {
                        if (x.day === 0) {
                            if (x.hour === 0) {
                                var month_datum = {
                                    year: x.year,
                                    month: x.month,
                                    day: x.day,
                                    hour: x.hour,
                                    trips: x.trips,
                                    dow: x.dow,
                                    label: x.month
                                };
                                g.selected_data.push(month_datum);
                                d3.select('#trips')
                                    .select("h1")
                                    .text("Year " + g.year);
                                continue;
                            }
                        }
                    }
                }
            }
        }

        // Select data at the day level.
        if (g.total_trips) {
            continue;
        } else {
            if (x.year === g.year) {
                if (x.month === g.month) {
                    if (g.day === 0) {
                        if (x.day > 0) {
                            if (x.hour === 0) {
                                var day_datum = {
                                    year: x.year,
                                    month: x.month,
                                    day: x.day,
                                    hour: x.hour,
                                    trips: x.trips,
                                    dow: x.dow,
                                    label: x.day
                                };
                                g.selected_data.push(day_datum);
                                d3.select('#trips')
                                    .select("h1")
                                    .text("Year " + g.year + ", Month " + g.month);
                                continue;
                            }
                        }
                    }
                }
            }
        }

        // Select data at the hour level.
        if (g.total_trips) {
            continue;
        } else {
            if (x.year === g.year) {
                if (x.month === g.month) {
                    if (x.day === g.day) {
                        if (x.hour > 0) {
                            var hour_datum = {
                                year: x.year,
                                month: x.month,
                                day: x.day,
                                hour: x.hour,
                                trips: x.trips,
                                dow: x.dow,
                                label: x.hour
                            };
                            g.selected_data.push(hour_datum);
                            d3.select('#trips')
                                .select("h1")
                                .text(
                                    "Year " +
                                    g.year +
                                    ", Month " +
                                    g.month +
                                    ", Day " +
                                    g.day
                                );
                            continue;
                        } else {
                            document.getElementById("event_of_day").innerHTML = x.eod
                        }
                    }
                }
            }
        }
    }

    // Inspect the selected data
    if (g.debug) {
        g.b.append("div").append("text").text("g.selected_data");
        g.b.append("div").append("text").text("g.selected_data.length:  " + g.selected_data.length);
        for (var j = 0; j < g.selected_data.length; j++) {
            var y = g.selected_data[j];
            var debug_div = g.b.append("div");
            debug_div.append("text").text("year:  " + y.year + "    ");
            debug_div.append("text").text("month:  " + y.month + "    ");
            debug_div.append("text").text("day:  " + y.day + "    ");
            debug_div.append("text").text("hour:  " + y.hour + "    ");
            debug_div.append("text").text("trips:  " + y.trips + "    ");
            debug_div.append("text").text("dow:  " + y.dow + "    ");
            debug_div.append("text").text("eod:  " + y.eod + "    ");
            debug_div.append("text").text("label:  " + y.label);
        }
    }
}



function set_margins() {

    // The parent Bootstrap column is used to determine the graphic height and width.
    g.window = {};
    g.window.width = Math.floor(window.innerWidth * 0.6);
    g.window.height = Math.floor(window.innerHeight * 0.5);
    if (g.debug) {
        d3.select("body")
            .append("p")
            .text("g.window.width: " + g.window.width + "    g.window.height: " + g.window.height)
    }


    // Generally accepted method for defining margins.
    g.margin = {};
    g.margin.top = Math.floor(g.window.height * 0.10);
    g.margin.right = Math.floor(g.window.width * 0.05);
    g.margin.bottom = Math.floor(g.window.height * 0.15);
    g.margin.left = Math.floor(g.window.width * 0.1);
}



function set_width_and_height() {

    // Get a reference to the div.
    g.bar_chart_div = d3.select('#visualization');

    // If not found, log error message and exit.
    if (g.bar_chart_div.empty()) {
        d3.select("body")
            .append("p")
            .text("#visualization was not found");
        return;
    }

    // Define the dimensions of the bar chart div.
    g.bar_chart_div.style.width = g.window.width.toString() + "px";
    g.bar_chart_div.style.height = g.window.height.toString() + "px";

    // Define the dimensions of the svg.
    g.width = g.window.width - g.margin.left - g.margin.right;
    g.height = g.window.height - g.margin.top - g.margin.bottom;
}



function set_up_svg() {

    // Get a referenct to the svg.
    g.svg = g.bar_chart_div.select('#svg_id');

    // If not found, create one.
    if (g.svg.empty()) {
        g.svg = g.bar_chart_div.append("svg").attr("id", "svg_id");
    }

    // Configure the svg.
    g.svg
        .attr("width", g.width + g.margin.left + g.margin.right)
        .attr("height", g.height + g.margin.top + g.margin.bottom)
        .on("click", () => {
            if (g.debug) {
                g.b
                    .append("div")
                    .append("text")
                    .text("Roll Up!");
            }

            // Rollup from day to month.
            if (g.day > 0) {
                g.day = 0;
            } else {
                // Rollup from month to year.
                if (g.month.length > 0) {
                    g.month = "";
                } else {
                    // Rollup from year to all years.
                    if (g.year > 0) {
                        g.year = 0;
                    } else {
                        // Rollup from all years to total trips.
                        g.total_trips = true;
                    }
                }
            }
            build_document();
        })
        .style("background-color", "mistyrose");
}



function determine_min_max() {

    // Get a reference to the currently selected data.
    var d = g.selected_data;

    // Determine the minimum and maximum values for y domain, scale, and axis.
    g.min_y = d3.min(d, d => {
        return d.trips;
    });
    g.max_y = d3.max(d, d => {
        return d.trips;
    });
}



function calculate_domains() {

    // Define the y domain based on filtered dataset values.
    g.min_y = 0;
    g.y_domain = [g.max_y, g.min_y];

    // Define the x domain based on unique period labels in the selected data.
    g.x_domain = [];

    // Get a reference to the selected data.
    var e = g.selected_data;

    // Read through the selected data looking for period_labels.
    for (var i = 0; i < e.length; i++) {
        // Get a year.
        var label = e[i].label;

        // Only add unique period labels.
        if (g.x_domain.indexOf(label) == -1) {
            g.x_domain.push(label);
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

    // Adjust the time for transitions.
    g.additional_time = 0;

    // Get a reference to the bars group.
    var bars_group = g.svg.select("#bars_group");

    // If not found, create one.
    if (bars_group.empty()) {
        bars_group = g.svg.append("g").attr("id", "bars_group");
    }

    // Get the selection of bars with data.
    var bars = bars_group.selectAll("g").data(g.selected_data);

    // Relocate current bars.
    bars
        .transition()
        .duration(g.duration)
        .delay((d, i) => {
            return i * 100 + g.additional_time;
        })
        .attr("transform", d => {
            var x = g.x_scale(d.label);
            var y = g.y_scale(d.trips);
            var s = "translate(" + x + "," + y + ")";
            return s;
        });

    // Move exiting bars off to the right, out of sight.
    var stage_right = g.margin.left + g.width + g.margin.right;
    var stage_bottom = g.margin.top;
    bars
        .exit()
        .transition()
        .duration(g.duration)
        .delay((d, i) => {
            return i * 100;
        })
        .attr("transform", () => {
            var x = stage_right;
            var y = stage_bottom;
            var s = "translate(" + x + "," + y + ")";
            return s;
        });

    // Append a rectangle to the entering bars.
    // Position is determined by the bar.
    var entered_bars = bars
        .enter()
        .append("g")
        .attr("id", d => {
            return "group_" + d.label;
        })
        .attr("height", d => {
            return g.height + g.margin.top - g.y_scale(d.trips);
        })
        .attr("width", () => {
            return g.x_scale.bandwidth();
        })
        .attr("transform", d => {
            var x = g.x_scale(d.label);
            var y = g.y_scale(d.trips);
            var s = "translate(" + x + "," + y + ")";
            return s;
        });

    // Update width and hieght of existing rectangles.
    // Position is determined by the containing bar ("g element").
    bars
        .select("rect")
        .transition()
        .duration(g.duration)
        .delay(() => {
            return g.additional_time * 2;
        })
        .attr("height", d => {
            return g.height + g.margin.top - g.y_scale(d.trips);
        })
        .attr("width", () => {
            return g.x_scale.bandwidth();
        })
        .attr("fill", (d) => { return d.dow })

    // Add rectangles with tooltips to the entering bars.
    // Rectangle position is determined by the containing bar ("g" element).
    // .attr("class", "cardinal_color rect")
    // .attr("fill", "#990000")
    entered_bars
        .append("rect")
        .attr("class", "rect")
        .attr("height", d => {
            return g.height + g.margin.top - g.y_scale(d.trips);
        })
        .attr("width", () => {
            return g.x_scale.bandwidth();
        })
        .attr("fill", (d) => { return d.dow })
        .on("click", d => {
            if (g.debug) {
                g.b
                    .append("div")
                    .append("text")
                    .text("Drill Down!");
                g.b
                    .append("div")
                    .append("text")
                    .text(
                        "Global:  " +
                        g.total_trips +
                        " " +
                        g.year +
                        " " +
                        g.month.length +
                        " " +
                        g.day
                    );
                g.b
                    .append("div")
                    .append("text")
                    .text("Bar:  " + d.year + " " + d.month.length + " " + d.day);
            }

            // Drill down from total trips to all years.
            if (g.total_trips) {
                g.total_trips = false;
                g.year = 0;
                g.month = "";
                g.day = 0;

            } else {
                // Drill down from a selected year to months of a selected year.
                if (g.year === 0) {
                    g.year = d.year;
                    g.month = "";
                    g.day = 0;
                } else {
                    // Drill down from a selected month to days of selected month.
                    if (g.month.length === 0) {
                        g.month = d.month;
                        g.day = 0;
                    } else {
                        // Drill down from  a selected day to hours of selected day.
                        if (g.day === 0) {
                            g.day = d.day;
                        }
                    }
                }
            }
            build_document();
            d3.event.stopPropagation();
        })
        .on("mouseover", d => {
            var xPosition = g.x_scale(d.label) + g.x_scale.bandwidth() / 2;
            var yPosition = g.y_scale(d.trips) + 14;
            var label = d.label;
            var trips = d.trips;

            g.svg
                .append("rect")
                .attr("id", "tooltip_rect")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("height", 28)
                .attr("width", g.x_scale.bandwidth() * 5)
                .attr("fill", "mistyrose");

            g.svg
                .append("text")
                .attr("id", "tooltip_text")
                .attr("x", xPosition + 2)
                .attr("y", yPosition + 21)
                .attr("text-anchor", "start")
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(() => {
                    return label + ": " + trips;
                });
        })
        .on("mouseout", () => {
            d3.select("#tooltip_rect").remove();
            d3.select("#tooltip_text").remove();
        });
}



function append_x_axis() {

    // Get a references to the x axis.
    g.x_axis_group = d3.select('#x_axis_group');

    // If not found, create one.
    if (g.x_axis_group.empty()) {
        g.x_axis_group = g.svg.append("g").attr("id", 'x_axis_group');
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
    g.x_axis_label = d3.select('#x_axis_label');

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
    g.y_axis_group = d3.select('#y_axis_group');

    // If not found, create one.
    if (g.y_axis_group.empty()) {
        g.y_axis_group = g.svg.append("g").attr("id", 'y_axis_group');
    }

    // Relocate the y axis if the window is resized.
    g.y_axis_group
        .transition()
        .duration(g.duration)
        .attr("transform", "translate(" + g.margin.left + ",0)")
        .call(g.y_axis);

    // Get the label for the y axis.
    g.y_axis_label = d3.select('#y_axis_label');

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



function append_legend() {

    // Determine if there is a legend.
    g.legend = g.svg.select("#legend")

    // If not found, add one.
    if (g.legend.empty()) {
        g.legend = g.svg.append("g").attr("id", "legend")
    }

    // Position the legend.
    g.legend.attr("transform", "translate(" + ((g.margin.left + g.width) * 0.92) + "," + (g.margin.top * .9) + ")")

    // Add text and symbols to the legend.
    g.legend.append("rect").attr("x", 10).attr("y", -20).attr("width", 10).attr("height", 20).attr("fill", "#990000")
    g.legend.append("text").attr("x", 22).attr("y", 0).text("Week Days")
    g.legend.append("rect").attr("x", -220).attr("y", -20).attr("width", 10).attr("height", 20).attr("fill", "SteelBlue")
    g.legend.append("text").attr("x", -208).attr("y", 0).text("Weekends/Holidays")
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