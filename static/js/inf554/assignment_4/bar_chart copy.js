// Declare global variables.
g = {
    d: null,    // All data.
    f: null,    // Filter data.
    svg: null,
    year: "2016",
    series: "Production",
    order: "Country",
    filter: "All",
    y_scale: null,
    x_scale: null,
    x_domain: [],
    svg_width: 500,
    svg_height: 300,
    top_margin: 50,
    bottom_margin: 50,
    left_margin: 50,
    right_margin: 50,
    top_border: 50,
    bottom_border: 250,
    left_border: 50,
    right_border: 450,
    chart_width: 400,
    chart_height: 200
}

function set_global_variables() {

    console.log("Setting global variables.")

    // Define svg size.
    g.svg_width = Math.floor(window.innerWidth * (8 / 12))
    g.svg_height = Math.floor(window.innerHeight * (6 / 12))

    // Define margins.
    g.top_margin = Math.floor(g.svg_height * 0.05)
    g.bottom_margin = Math.floor(g.svg_height * 0.10)
    g.left_margin = Math.floor(g.svg_width * 0.07)
    g.right_margin = Math.floor(g.svg_width * 0.05)

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

    // Find the fieldset that will contain the svg.
    console.log("Selecting bar_chart_fieldset")
    var fieldset = d3.select("#bar_chart_fieldset")

    // Create the svg in the fieldset.
    console.log("Appending svg.")
    var svg = fieldset.append("svg")
        .attr("width", g.svg_width)
        .attr("height", g.svg_height)

    g.svg = svg
}

function calculate_x_scale() {

    console.log("Calculating x_domain and x_scale.")

    var d = g.f
    var x_domain = []

    console.log("d.length at beginning of x_scale:  " + d.length)

    for (var i = 0; i < d.length; i++) {
        x_domain.push(d[i].Country)
    }

    console.log("x_domain.length during x_scale:  " + x_domain.length)

    g.x_domain = x_domain

    var x_scale = d3.scaleBand()
        .domain(g.x_domain)
        .rangeRound([0, g.chart_width])
        .paddingInner(0.05)

    g.x_scale = x_scale
}

function calculate_y_scale() {

    console.log("Calculating y_scale.")

    var d = g.f

    var min_y = d3.min(d, (d) => { return d.Value })
    var max_y = d3.max(d, (d) => { return d.Value })

    console.log("min_y:  " + min_y)
    console.log("max_y:  " + max_y)
    console.log("g.chart_height:  " + g.chart_height)

    var y_scale = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([0, g.chart_height])
        .nice()

    g.y_scale = y_scale

    console.log("y_scale:  " + y_scale)
    for (var i = 0; i < d.length; i++) {
        var x = d[i].Value
        console.log("y_scale(" + x + "):  " + y_scale(x))
        console.log("g.y_scale(" + x + "):  " + g.y_scale(x))
        console.log(" ")
    }
}

function append_rectangles(mode) {


    var d = g.f

    if (mode == "enter") {

        console.log("Appending rectangles.")

        g.svg.selectAll("rect")
            .data(d)
            .enter()
            .append("rect")
            .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.Value)) })
            .attr("width", g.x_scale.bandwidth())
            .attr("height", (d) => { return Math.floor(g.y_scale(d.Value)) })
            .attr("fill", () => { return "#900" })
            .attr("x", (d) => { return g.x_scale(d.Country) + g.left_border })

    } else {

        console.log("Updating rectangles.")

        // Get placeholders for all existing and new bars.

        console.log("Getting bars.")

        var bars = g.svg.selectAll("rect").data(d)

        console.log("d.length:  " + d.length)

        // Update existing bars.

        console.log("Updating existing bars.")

        bars.transition()
            .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.Value)) })
            .attr("width", g.x_scale.bandwidth())
            .attr("height", (d) => { return Math.floor(g.y_scale(d.Value)) })
            .attr("fill", () => { return "#900" })
            .attr("x", (d) => { return g.x_scale(d.Country) + g.left_border })

        // Add new bars.

        console.log("Adding new bars.")

        bars.enter()
            .append("rect")
            .attr("y", (d) => { return Math.floor(g.bottom_border - g.y_scale(d.Value)) })
            .attr("width", g.x_scale.bandwidth())
            .attr("height", (d) => { return Math.floor(g.y_scale(d.Value)) })
            .attr("fill", () => { return "#900" })
            .attr("x", (d) => { return g.x_scale(d.Country) + g.left_border })

            // Remove bars that have no data.

            console.log("Removing bars.")

        bars.exit()
            .transition()
            .attr("x", g.svg_width)
            .remove()
    }
}

function append_labels(mode) {

    var d = g.f

    if (mode == "enter") {

        console.log("Appending labels.")

        g.svg.selectAll("text")
            .data(d)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("class", "text-center")
            .attr("fill", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) {
                    return "black"
                } else {
                    return "white"
                }
            })
            .attr("x", (d) => { return g.x_scale(d.Country) + (g.x_scale.bandwidth() * 1.35) })
            .attr("y", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.Value) - 10 }
                return Math.round(y)
            })
            .text((d) => { return d.Value.toString() })

    } else {

        console.log("Updating labels.")

        // Bar labels have the unique class of text-center.
        var bars = g.svg.selectAll(".text-center").data(d)

        bars.transition()
            .attr("fill", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) {
                    return "black"
                } else {
                    return "white"
                }
            })
            .attr("x", (d) => { return g.x_scale(d.Country) + g.left_border + (g.x_scale.bandwidth() / 2) })
            .attr("y", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.Value) - 10 }
                return Math.round(y)
            })
            .text((d) => { return d.Value.toString() })

        bars.enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("class", "text-center")
            .attr("fill", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) {
                    return "black"
                } else {
                    return "white"
                }
            })
            .attr("x", (d) => { return g.x_scale(d.Country) + (g.x_scale.bandwidth() * 1.35) })
            .attr("y", (d) => {
                var y = Math.floor(g.bottom_border - g.y_scale(d.Value)) + 20
                if (y > g.bottom_border - 10) { y = g.bottom_border - g.y_scale(d.Value) - 10 }
                return Math.round(y)
            })
            .text((d) => { return d.Value.toString() })

        bars.exit()
            .transition()
            .attr("x", g.svg_width)
            .remove()
    }
}

function append_y_axis(mode) {

    var d = g.f

    var min_y = d3.min(d, (d) => { return d.Value })
    var max_y = d3.max(d, (d) => { return d.Value })

    var y_axis_scale = d3.scaleLinear()
        .domain([min_y, max_y])
        .range([g.bottom_border, g.top_border])
        .nice()

    var y_axis = d3.axisLeft().scale(y_axis_scale)

    if (mode == "enter") {

        console.log("Appending y_axis.")

        g.svg.append("g")
            .attr("id", "y_axis")
            .attr("class", "axis")
            .attr("transform", "translate(" + g.left_border.toString() + ",0)")
            // .style("fill", "black")
            .call(y_axis)

        console.log("Appending y_axis_label.")

        g.svg.append("text")
            .attr("id", "y_axis_label")
            .attr("transform", "rotate(-90)")
            .attr("y", Math.floor(g.left_margin * 0.14))
            .attr("x", Math.floor(((g.chart_height / 2) * (-1)).toString()))
            .style("text-anchor", "middle")
            // .style("fill", "black")
            .text(d[0].Title)



    } else {

        console.log("Updating y_axis.")

        g.svg.select("#y_axis")
            .transition()
            .attr("transform", "translate(" + g.left_border.toString() + ",0)")
            // .style("fill", "black")
            .call(y_axis)

        console.log("Updating y_axis_label.")

        g.svg.select("#y_axis_label")
            .attr("transform", "rotate(-90)")
            .attr("y", Math.floor(g.left_margin * 0.14))
            .attr("x", Math.floor(((g.chart_height / 2) * (-1)).toString()))
            .style("text-anchor", "middle")
            // .style("fill", "black")
            .text(d[0].Title)
    }
}

function append_x_axis(mode) {

    var x_axis = d3.axisBottom().scale(g.x_scale)

    if (mode == "enter") {

        console.log("Appending x_axis.")

        g.svg.append("g")
            .attr("id", "x_axis")
            .attr("class", "axis")
            .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
            .call(x_axis)

        console.log("Appending x_axis_label.")

        g.svg.append("text")
            .attr("id", "x_axis_label")
            .attr("y", (g.svg_height * 0.99).toString())
            .attr("x", ((g.chart_width / 2) + g.left_margin).toString())
            .style("text-anchor", "middle")
            .text("Ten Sovereign Nations of South America")

    } else {

        console.log("Updating x_axis.")

        g.svg.select("#x_axis")
            .transition()
            .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
            .call(x_axis)

        console.log("Updating x_axis_label.")

        g.svg.select("#x_axis_label")
            .attr("y", (g.svg_height * 0.99).toString())
            .attr("x", ((g.chart_width / 2) + g.left_margin).toString())
            .style("text-anchor", "middle")
            .text("Ten Sovereign Nations of South America")
    }
}

function sort_data(d, mode) {

    console.log("d.length at beginning of sort(" + mode + "):  " + d.length)

    d.sort((a, b) => {

        if (mode == "Country") {

            console.log("Sorting by Country Name.")

            const a_country = a.Country
            const b_country = b.Country

            comparison = 0

            if (a_country > b_country) {
                comparison = 1
            } else if (a_country < b_country) {
                comparison = -1
            }

            return comparison
        } else if (mode == "Ascending") {

            console.log("Sorting by Ascending Value")

            const a_value = a.Value
            const b_value = b.Value

            comparison = 0

            if (a_value > b_value) {
                comparison = 1
            } else if (a_value < b_value) {
                comparison = -1
            }

            return comparison
        }
        else if (mode == "Descending") {

            console.log("Sorting by Descending Value")

            const a_value = a.Value
            const b_value = b.Value

            comparison = 0

            if (a_value > b_value) {
                comparison = -11
            } else if (a_value < b_value) {
                comparison = 1
            }

            return comparison
        } else {
            console.log("Sort order not recognized:  " + mode)
        }
    })

    console.log("d.length at ending of sort(" + mode + "):  " + d.length)

    // Return the sorted data.
    return d
}

function filter_d() {

    console.log('Filtering data for "' + g.year + '", "' + g.series + '", "' + g.order + '".')

    s = "Filtering data:  "

    var d = g.d

    console.log(s + "d.length at beginning of filter:  " + d.length)

    var f = []

    for (var i = 0; i < d.length; i++) {
        if (d[i].Year == g.year && d[i].Series == g.series) {
            f.push(d[i])
        }
    }

    console.log(s + "f.length after year and series filter:  " + f.length)

    // Keep either the top five or bottom five.
    if (g.filter == "Top") {

        console.log("Selecting the top five.")

        // Sort the global data in asending order.
        f = sort_data(f, "Ascending")

        // Remove all low-value elements from the global data.
        while (f.length > 5) {
            f.shift()
        }

        console.log(s + "f.length after top five filter:  " + f.length)
    }
    else if (g.filter == "Bottom") {

        console.log("Selecting the bottom file.")

        // Sort the global data in asending order.
        f = sort_data(f, "Ascending")

        // Remove all high-value elements from the global data.
        while (f.length > 5) {
            f.pop()
        }

        console.log(s + "f.length after bottom five filter:  " + f.length)
    }

    // Sort the filtered local data based on user input.
    f = sort_data(f, g.order)

    console.log(s + "f.length after client sort:  " + f.length)

    // Update the global data with the local data.
    g.f = f

    console.log(s + "f.length after filter_d:  " + f.length)
}

function adjust_font_sizes() {

    console.log("Adjusting font size.")

    if (g.left_margin > 55) {
        g.svg.selectAll(".tick").attr("font-size", "14")
        g.svg.select("#y_axis_label").attr("font-size", "14")
        g.svg.select("#x_axis_label").attr("font-size", "14")
    } else {
        g.svg.selectAll(".tick").attr("font-size", "10")
        g.svg.select("#y_axis_label").attr("font-size", "10")
        g.svg.select("#x_axis_label").attr("font-size", "10")
    }

}

function update_chart() {

    console.log("Updating chart.")

    // Set default values.
    g.year = "2016"
    g.series = "production"
    g.order = "Country"

    // Get the selected year group.
    var selected_year_group = document.getElementsByName("selected_year")

    // Find the selected component in the group
    for (var i = 0; i < selected_year_group.length; i++) {
        if (selected_year_group[i].checked) {
            g.year = selected_year_group[i].value
            break;
        }
    }

    // Get the selected series group.
    var selected_series_group = document.getElementsByName("selected_series")

    // Find the selected component in the group.
    for (var i = 0; i < selected_series_group.length; i++) {
        if (selected_series_group[i].checked) {
            g.series = selected_series_group[i].value
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

    // Make filtered data for selected values available for all functions.
    filter_d()

    // Configure chart with filtered data.
    calculate_x_scale()
    calculate_y_scale()

    // Update svg components with filtered data.
    var mode = "update"
    append_rectangles(mode)
    append_labels(mode)
    append_y_axis(mode)
    append_x_axis(mode)

    // Set the font size for ALL ticks and y axis label.
    adjust_font_sizes()

}

function convert_d() {

    console.log("Converting data.")

    var f = []

    for (var i = 0; i < g.d.length; i++) {

        // Convert json objects to javascript objects.
        var d = {}
        d.Year = g.d[i]["Year"]
        d.Country = g.d[i]["Country"]
        d.Series = g.d[i]["Series"]
        d.Value = g.d[i]["Value"]
        d.Title = g.d[i]["Series"]

        // Reduce the size of the Series string.
        if (d.Series.includes("production")) { d.Series = "Production" }
        else if (d.Series.includes("imports")) { d.Series = "Imports" }
        else if (d.Series.includes("stocks")) { d.Series = "Stocks" }
        else if (d.Series.includes("supply")) { d.Series = "Supply" }
        else if (d.Series.includes("per capita")) { d.Series = "Per Capita" }
        else {
            console.log("Series Rename Rejected:  " + d.Series)
            continue
        }

        // Filter Country.
        if (d.Country.includes("South")) { continue }
        if (d.Country.includes("Guyana")) { continue }
        if (d.Country.includes("Suriname")) { continue }

        // Shorten Country.
        if (d.Country.includes("Bolivia")) { d.Country = "Bolivia" }
        if (d.Country.includes("Venezuela")) { d.Country = "Venezuela" }

        // Convert Value to type integer.
        d.Value = d.Value.replace(",", "")
        d.Value = parseInt(d.Value)

        // Create a javascript object 
        var x = {
            "Year": d.Year,
            "Country": d.Country,
            "Series": d.Series,
            "Value": d.Value,
            "Title": d.Title
        }

        // Collect the converted javascript objects.
        f.push(x)
    }
    // Replace global data with the collection of converted javascript objects.
    g.d = f
}

function initialize_chart() {

    console.log("Initializing chart.")

    // Create a promise object from the csv file.
    console.log("About to call d3.json().")

    // url_for_data = "/Assignment%2007/static/json/data.json"
    url_for_data = "/static/json/inf554/assignment_4/data.json"


    // d3.json(url_for_data, converter)
    d3.json(url_for_data)
        .then((d) => {

            // console.log("Original d.length:  " + d.length)
            // console.log("stingify:")
            // console.log(JSON.stringify(d))

            // Make all data available to all functions.
            g.d = d;

            // Convert data.
            convert_d()

            console.log("d.length after convert_d:  " + d.length)

            // Set global variable sfor all functions.
            set_global_variables()

            // Make filtered data for default values available for all functions.
            g.year = "2016"
            g.series = "Production"
            g.order = "Country"
            g.order = "All"
            filter_d()

            // Build chart with filtered data.
            append_svg()
            calculate_x_scale()
            calculate_y_scale()

            // Append components to an empty svg.
            var mode = "enter"
            append_rectangles(mode)
            append_labels(mode)
            append_y_axis(mode)
            append_x_axis(mode)

            // Set the font size for ALL ticks and y axis label.
            adjust_font_sizes()

            // Update (redraw) the chart when the window is resized.
            window.addEventListener('resize', update_chart)

        })
        .catch(console.log.bind(console))
}


