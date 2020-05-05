// Declare global variables.

// TODO:  replace g. with growth.data
// TODO:  replace f. with growth.filtered_data
// TODO:  replace svg with growth.svg
var g = {
    d: null,    // All data.
    f: null,    // Filter data.
    svg: null,
    year: "2016",
    order: "Year Month",
    filter: "All",
    y_scale: null,
    x_scale: null,
    x_domain: [],
    svg_width: 600,
    svg_height: 500,
    top_margin: 50,
    bottom_margin: 100,
    left_margin: 50,
    right_margin: 50,
    top_border: 50,
    bottom_border: 200,
    left_border: 50,
    right_border: 450,
    chart_width: 500,
    chart_height: 300,
    small_font_and_rotate_labels: false
}

function set_global_variables() {

    console.log("Setting global variables.")

    // Define svg size.
    g.svg_width = Math.floor(window.innerWidth * (8 / 12))
    g.svg_height = Math.floor(window.innerHeight * (8 / 12))

    // Define margins.
    g.top_margin = Math.floor(g.svg_height * 0.05)
    g.bottom_margin = Math.floor(g.svg_height * 0.20)
    g.left_margin = Math.floor(g.svg_width * 0.07)
    g.right_margin = Math.floor(g.svg_width * 0.05)

    if (g.left_margin < 60) {
        g.small_font_and_rotate_labels = true
    } else {
        g.small_font_and_rotate_labels = false
    }

    // Define borders.
    g.top_border = g.top_margin
    g.bottom_border = g.svg_height - g.bottom_margin
    g.left_border = g.left_margin
    g.right_border = g.svg_width - g.right_margin

    // Define chart area.
    g.chart_width = g.svg_width - g.left_margin - g.right_margin
    g.chart_height = g.svg_height - g.top_margin - g.bottom_margin

    console.log("g.svg_width:  " + g.svg_width)
    console.log("g.svg_height:  " + g.svg_height)
    console.log("g.top_margin:  " + g.top_margin)
    console.log("g.bottom_margin:  " + g.bottom_margin)
    console.log("g.left_margin:  " + g.left_margin)
    console.log("g.right_margin:  " + g.right_margin)
    console.log("g.top_border:  " + g.top_border)
    console.log("g.bottom_border:  " + g.bottom_border)
    console.log("g.chart_width:  " + g.chart_width)
    console.log("g.chart_height:  " + g.chart_height)
}

function append_svg() {

    console.log(" ")
    console.log("Selecting bar_chart_fieldset")

    // Find the fieldset that will contain the svg.
    var fieldset = d3.select("#bar_chart_fieldset")

    console.log("Appending svg.")

    // Create the svg in the fieldset.
    var svg = fieldset.append("svg")
        .attr("width", g.svg_width)
        .attr("height", g.svg_height)

    // Update the global svg reference.
    g.svg = svg
    console.log(" ")
}

function calculate_x_scale() {

    console.log("Calculating x_domain and x_scale.")

    // Get a local reference to the global target dataset.
    var d = g.f

    // Create a new x domain.
    var x_domain = []

    // Add months for the filtered year of the target dataset.
    for (var i = 0; i < d.length; i++) {

        if (d[i].month < 10) {
            var year_month = " " + d[i].year + "-0" + d[i].month
        } else {
            var year_month = " " + d[i].year + "-" + d[i].month
        }
        year_month = year_month.trim()
        x_domain.push(year_month)
    }

    // Update the global reference for the x domain.
    g.x_domain = x_domain

    // Calculate the x scale based on chart width.
    var x_scale = d3.scaleBand()
        .domain(g.x_domain)
        .rangeRound([0, g.chart_width])
        .paddingInner(0.05)

    // Update the global x scale.
    g.x_scale = x_scale
}

function calculate_y_scale() {

    console.log("Calculating y_scale.")

    // Get a local reference to the global target dataset
    var d = g.f

    // Get the minimum and maximum number of trips.
    var min_y = d3.min(d, (d) => { return d.trips })
    var max_y = d3.max(d, (d) => { return d.trips })

    // Calculate the y scale.
    var y_scale = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([0, g.chart_height])
        .nice()

    // Set the global variable to the local variable.
    g.y_scale = y_scale
}

function append_rectangles() {

    // Get a local reference to the global target dataset.
    var d = g.f

    console.log("Getting bars.")

    // Get placeholders for all existing and new bars.
    var bars = g.svg.selectAll("rect").data(d)

    // Check if there are any existing bars.
    if (bars.empty()) {

        console.log("Appending rectangles.")

        // Create an update selection of new bars.
        bars = g.svg.selectAll("rect")
            .data(d)
            .enter()
            .append("rect")
            .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.trips)) })
            .attr("width", g.x_scale.bandwidth())
            .attr("height", (d) => { return Math.floor(g.y_scale(d.trips)) })
            .attr("fill", () => { return "#900" })
            .attr("x", (d) => {
                if (d.month < 10) {
                    var year_month = " " + d.year + "-0" + d.month
                } else {
                    var year_month = " " + d.year + "-" + d.month
                }
                year_month = year_month.trim()
                return g.x_scale(year_month) + g.left_border
            })

    }

    console.log("Updating existing and new existing bars.")

    // Update and position existing bars.
    bars.transition()
        .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.trips)) })
        .attr("width", g.x_scale.bandwidth())
        .attr("height", (d) => { return Math.floor(g.y_scale(d.trips)) })
        .attr("fill", () => { return "#900" })
        .attr("x", (d) => {
            if (d.month < 10) {
                var year_month = " " + d.year + "-0" + d.month
            } else {
                var year_month = " " + d.year + "-" + d.month
            }
            year_month = year_month.trim()
            return g.x_scale(year_month) + g.left_border
        })


    console.log("Adding any new bars.")

    // Add any new bars.
    bars.enter()
        .append("rect")
        .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.trips)) })
        .attr("width", g.x_scale.bandwidth())
        .attr("height", (d) => { return Math.floor(g.y_scale(d.trips)) })
        .attr("fill", () => { return "#900" })
        .attr("x", (d) => {
            if (d.month < 10) {
                var year_month = " " + d.year + "-0" + d.month
            } else {
                var year_month = " " + d.year + "-" + d.month
            }
            year_month = year_month.trim()
            return g.x_scale(year_month) + g.left_border
        })


    console.log("Removing bars.")

    // Remove existing bars that are not in the update selection.
    bars.exit()
        .transition()
        .attr("x", g.svg_width)
        .remove()
}

function append_labels() {

    // Get a local reference to the global target dataset.
    var d = g.f

    // Recalculate x_scale to get an updated bandwith when the number of bars 
    // has changed.
    calculate_x_scale()

    // Bar labels have the unique class of text-center.
    var labels = g.svg.selectAll(".text-center").data(d)

    // Check if new labels need to be appended.
    if (labels.empty()) {

        console.log("Appending labels.")

        labels = g.svg.selectAll("text")
            .data(d)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("class", "text-center")
            .attr("fill", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
                if (y > g.bottom_border - 10) {
                    return "black"
                } else {
                    return "white"
                }
            })
            .attr("x", (d) => { 
                if (d.month < 10) {
                    var year_month = " " + d.year + "-0" + d.month
                } else {
                    year_month = " " + d.year + "-" + d.month
                }
                year_month = year_month.trim()
                // var calculated_x = g.x_scale(year_month) + (g.x_scale.bandwidth() * 1.35) 
                var calculated_x = g.x_scale(year_month) + g.left_border + (g.x_scale.bandwidth() / 2)
                return calculated_x
            })
            .attr("y", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
                if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.trips) - 10 }
                return Math.round(y)
            })
            .text((d) => { return d.trips.toString() })

    }

    console.log("Updating labels.")

    // Update and position existing labels.
    labels.transition()
        .attr("fill", (d) => {
            var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
            if (y > g.bottom_border - 10) {
                return "black"
            } else {
                return "white"
            }
        })
        .attr("x", (d) => { 
            if (d.month < 10) {
                var year_month = " " + d.year + "-0" + d.month
            } else {
                year_month = " " + d.year + "-" + d.month
            }
            year_month = year_month.trim()
            // var calculated_x = g.x_scale(year_month) + (g.x_scale.bandwidth() * 1.35) 
            var calculated_x = g.x_scale(year_month) + g.left_border + (g.x_scale.bandwidth() / 2)
            return calculated_x
        })
    .attr("y", (d) => {
            var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
            if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.trips) - 10 }
            return Math.round(y)
        })
        .text((d) => { return d.trips.toString() })

    // Update and position new labels.
    labels.enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("class", "text-center")
        .attr("fill", (d) => {
            var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
            if (y > g.bottom_border - 10) {
                return "black"
            } else {
                return "white"
            }
        })
        .attr("x", (d) => { 
            if (d.month < 10) {
                var year_month = " " + d.year + "-0" + d.month
            } else {
                year_month = " " + d.year + "-" + d.month
            }
            year_month = year_month.trim()
            // var calculated_x = g.x_scale(year_month) + (g.x_scale.bandwidth() * 1.35) 
            var calculated_x = g.x_scale(year_month) + g.left_border + (g.x_scale.bandwidth() / 2)
            return calculated_x
        })
    .attr("y", (d) => {
            var y = Math.floor(g.bottom_border - g.y_scale(d.trips)) + 20
            if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.trips) - 10 }
            return Math.round(y)
        })
        .text((d) => { return d.trips.toString() })

    // Remove labels that were not in the update set.
    labels.exit()
        .transition()
        .attr("x", g.svg_width)
        .remove()
}

function append_y_axis() {

    // Get a local reference to the global target dataset.
    var d = g.f

    // Get the minimum and maximum number of trips.
    var min_y = d3.min(d, (d) => { return d.trips })
    var max_y = d3.max(d, (d) => { return d.trips })

    // Calculate the y scale based on borders.
    var y_axis_scale = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([g.bottom_border, g.top_border])
        .nice()

    // Calculate the y axis.
    var y_axis = d3.axisLeft().scale(y_axis_scale)

    var y_axis_group = g.svg.select("#y_axis")


    if (y_axis_group.empty()) {

        console.log("Appending y_axis.")

        // Adding the y axis groupd.
        g.svg.append("g")
            .attr("id", "y_axis")
            .attr("class", "axis")
            .attr("transform", "translate(" + g.left_border.toString() + ",0)")
            .call(y_axis)

        console.log("Appending y_axis_label.")

        // Adding the y axis label.
        g.svg.append("text")
            .attr("id", "y_axis_label")
            .attr("transform", "rotate(-90)")
            .attr("y", Math.floor(g.left_margin * 0.14))
            .attr("x", Math.floor(((g.chart_height / 2) * (-1))))
            .style("text-anchor", "middle")
            .text("Number of Trips")
    }

    console.log("Updating y_axis.")

    // Position the y axis group and update with y axis.
    g.svg.select("#y_axis")
        .transition()
        .attr("transform", "translate(" + g.left_border.toString() + ",0)")
        // .style("fill", "black")
        .call(y_axis)

    console.log("Updating y_axis_label.")

    // Position the y axis labels and add a tooltip.
    g.svg.select("#y_axis_label")
        .attr("transform", "rotate(-90)")
        .attr("y", Math.floor(g.left_margin * 0.14))
        .attr("x", Math.floor(((g.chart_height / 2) * (-1))))
        .style("text-anchor", "middle")
        .text("Number of Trips")

}

function append_x_axis() {

    // Create the x axis.
    var x_axis = d3.axisBottom().scale(g.x_scale)

    // Get the x axis group.
    var x_axis_group = g.svg.select("#x_axis")

    // Check fir the x axis group was found.
    if (x_axis_group.empty()) {

        console.log("Appending x_axis.")

        // Appending the x axis group.
        g.svg.append("g")
            .attr("id", "x_axis")
            .attr("class", "axis")
            .attr("transform", "translate(" + g.left_border + ", " + g.svg_height + ")")
            .call(x_axis)
            .selectAll("text")
            .attr("x", -30)
            .attr("y", 100)
            .attr("transform", "rotate(-90)")

        console.log("Appending x_axis_label.")

        // Append x axis label
        g.svg.append("text")
            .attr("id", "x_axis_label")
            .attr("y", (g.svg_height * 0.99))
            .attr("x", ((g.chart_width / 2) + g.left_margin).toString())
            .style("text-anchor", "middle")
            .text("Months")
    }

    console.log("Updating x_axis.")

    // Position the x axis group and adding the x axis.
    if (g.small_font_and_rotate_labels === true) {
        g.svg.select("#x_axis")
            .transition()
            .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
            .call(x_axis)
            .selectAll("text")
            .attr("x", -35)
            .attr("y", -4)
            .attr("transform", "rotate(-90)")
    } else {
        g.svg.select("#x_axis")
            .transition()
            .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
            .call(x_axis)
            .selectAll("text")
            .attr("x", 0)
            .attr("y", 10)
            .attr("transform", "rotate(0)")

    }


    console.log("Updating x_axis_label.")

    // Position the x axis label and add text.
    if (g.small_font_and_rotate_labels) {
        var x_axis_label_position = 0.90
    } else {
        var x_axis_label_position = 0.85
    }
    g.svg.select("#x_axis_label")
        .attr("y", (g.svg_height * x_axis_label_position))
        .attr("x", ((g.chart_width / 2) + g.left_margin))
        .style("text-anchor", "middle")
        .text("Year Month")

}

function sort_data(d, mode) {

    d.sort((a, b) => {

        if (mode === "Ascending") {

            console.log("Sorting by Ascending Trips")

            const a_trips = a.trips
            const b_trips = b.trips

            comparison = 0

            if (a_trips > b_trips) {
                comparison = 1
            } else if (a_trips < b_trips) {
                comparison = -1
            }

            return comparison
        }
        else if (mode === "Descending") {

            console.log("Sorting by Descending Trips")

            const a_trips = a.trips
            const b_trips = b.trips

            comparison = 0

            if (a_trips > b_trips) {
                comparison = -1
            } else if (a_trips < b_trips) {
                comparison = 1
            }

            return comparison
        } else if (mode === "Year Month") {

            console.log("Sorting by Year-Month")

            if (a.month < 10) {
                var a_year_month = " " + a.year + "-0" + a.month
            } else {
                a_year_month = " " + a.year + "-" + a.month
            }
            a_year_month = a_year_month.trim()

            if (b.month < 10) {
                var b_year_month = " " + b.year + "-0" + b.month
            } else {
                b_year_month = " " + b.year + "-" + b.month
            }
            b_year_month = b_year_month.trim()

            comparison = 0

            if (a_year_month > b_year_month) {
                comparison = 1
            } else if (a_year_month < b_year_month) {
                comparison = -1
            }

            return comparison
        } else {
            console.log("Sort order not recognized:  " + mode)
        }
    })

    console.log("d.length at ending of sort(" + mode + "):  " + d.length)

    // Return the data sorted by trips.
    return d
}

function filter_d() {

    console.log('Filtering data for "' + g.year + '".')

    // Get a reference to the global dataset.
    var d = g.d

    // Create a target dataset.
    var f = []

    // Build the target dataset based on year selection.
    if (g.year == "all") {
        for (var i = 0; i < d.length; i++) {
            f.push(d[i])
        }
    } else {
        for (var i = 0; i < d.length; i++) {
            if (d[i].year == g.year) {
                f.push(d[i])
            }
        }
    }

    // Keep either the top five or bottom five.
    if (g.filter == "Top") {

        console.log("Selecting the top five.")

        // Sort the global data in asending order.
        f = sort_data(f, "Ascending")

        // Remove all low-value elements from the global data.
        while (f.length > 5) {
            f.shift()
        }
    }
    else if (g.filter == "Bottom") {

        console.log("Selecting the bottom file.")

        // Sort the global data in asending order.
        f = sort_data(f, "Ascending")

        // Remove all high-value elements from the global data.
        while (f.length > 5) {
            f.pop()
        }
    }

    // Sort the filtered local data based on user input.
    f = sort_data(f, g.order)

    // Update the global target database with local target database.
    g.f = f
}

function adjust_font_sizes() {

    console.log("Adjusting font size.")

    if (g.small_font_and_rotate_labels === true) {
        g.svg.selectAll(".tick").attr("font-size", "10")
        g.svg.select("#y_axis_label").attr("font-size", "10")
        g.svg.select("#x_axis_label").attr("font-size", "10")
        g.svg.selectAll(".text-center").attr("font-size", "8")
    } else {
        g.svg.selectAll(".tick").attr("font-size", "14")
        g.svg.select("#y_axis_label").attr("font-size", "14")
        g.svg.select("#x_axis_label").attr("font-size", "14")
        g.svg.selectAll(".text-center").attr("font-size", "14")
    }
}

function update() {

    console.log("Updating chart.")

    // Set default values.
    g.year = "2016"
    g.order = "Ascending"

    // Get the selected year group.
    var selected_year_group = document.getElementsByName("selected_year")

    // Find the selected component in the group
    for (var i = 0; i < selected_year_group.length; i++) {
        if (selected_year_group[i].checked) {
            g.year = selected_year_group[i].value
            console.log(" ")
            console.log("Year was found:  " + g.year)
            console.log(" ")
            break;
        }
    }

    // Get the selected order group.
    var selected_order_group = document.getElementsByName("selected_order")

    // Find the selected component in the group
    for (var i = 0; i < selected_order_group.length; i++) {
        if (selected_order_group[i].checked) {
            g.order = selected_order_group[i].value
            break;
        }
    }

    // Get the selected order group.
    var selected_filter_group = document.getElementsByName("selected_filter")

    // Find the selected component in the group
    for (var i = 0; i < selected_filter_group.length; i++) {
        if (selected_filter_group[i].checked) {
            g.filter = selected_filter_group[i].value
            break;
        }
    }

    // Set global variable sfor all functions.
    set_global_variables()

    // If all years are selected, reduce font size and rotate x ticks.
    if (g.small_font_and_rotate_labels == false) {
        if (g.year === 'all') {
            g.small_font_and_rotate_labels = true
        } else {
            g.small_font_and_rotate_labels = false
        }
    }

    // Make filtered data for selected values available for all functions.
    filter_d()

    // Configure chart with filtered data.
    calculate_x_scale()
    calculate_y_scale()

    // Update svg components with filtered data.
    append_rectangles()
    append_labels()
    append_y_axis()
    append_x_axis()

    // Set the font size for ALL ticks and y axis label.
    adjust_font_sizes()

}

function initialize() {

    console.log("Initializing chart.")

    //Create a promise object from the json file.
    console.log("About to call d3.json().")

    url_for_data = "/static/json/inf554/project/trips_by_year_month.json"

    // d3.json(url_for_data, converter)
    d3.json(url_for_data)
        .then((d) => {

            // Make all data available to all functions.
            g.d = d;

            console.log(" d.length:  " + d.length)

            // Set global variable sfor all functions.
            set_global_variables()

            // Make filtered data for selected values available for all functions.
            filter_d()

            // Build chart with filtered data.
            append_svg()
            calculate_x_scale()
            calculate_y_scale()

            // Append components to an empty svg.
            append_rectangles()
            append_labels()
            append_y_axis()
            append_x_axis()

            // Set the font size for ALL ticks and y axis label.
            adjust_font_sizes()

            // Update (redraw) the chart when the window is resized.
            window.addEventListener('resize', update)

        })
        .catch(console.log.bind(console))
}
