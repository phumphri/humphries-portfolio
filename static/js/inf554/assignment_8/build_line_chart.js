function build_line_chart() {

    // Define local variables
    v = {}

    // Execute nested functions to build the line chart.
    select_series()
    set_margins()
    set_width_and_height()
    set_up_svg()
    determine_min_max()
    calculate_domains()
    calculate_scales()
    calculate_axis()
    append_all_countries()
    append_legend()
    append_x_axis()
    append_y_axis()
    adjust_font_sizes()

    function select_series() {

        // Get a reference to the dataset.
        d = g.dataset

        // Select the series.
        g.selected_data = []
        for (var i = 0; i < g.dataset.length; i++) {
            var dataset_record = g.dataset[i]
            if (dataset_record.series == g.line_chart_series) {
                g.selected_data.push(dataset_record)
            }
        }
    }

    function set_margins() {

        v.window = {}
        v.window.width = Math.floor(window.innerWidth * 0.60)
        v.window.height = Math.floor(window.innerHeight * 0.60)

        v.margin = {}
        v.margin.top = Math.floor(v.window.height * 0.10)
        v.margin.right = Math.floor(v.window.width * 0.10)
        v.margin.bottom = Math.floor(v.window.height * 0.15)
        v.margin.left = Math.floor(v.window.width * 0.15)
    }

    function set_width_and_height() {

        g.line_chart_div.style.width = v.window.width.toString() + "px"
        g.line_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.svg = d3.select("#line_chart_svg")

        // If not found, create one.
        if (v.svg.empty()) {
            v.svg = g.line_chart_div
                .append('svg')
                .attr('id', 'line_chart_svg')
        }

        // Configure the svg.
        v.svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .style("background-color", "mistyrose")
    }

    function determine_min_max() {

        // Get a reference to the selected data.
        var d = g.selected_data

        // Determine the minimum and maximum values for y domain, scale, and axis.
        v.min_y = d3.min(d, (d) => { return d.value })
        v.max_y = d3.max(d, (d) => { return d.value })
    }

    function calculate_domains() {

        // Define the y domain based on minimum and maximum values in the dataset.
        if (g.line_chart_series == "Imports") {
            v.min_y -= 1000
            v.max_y += 1000
        } else if (g.line_chart_series == "Stocks") {
            v.min_y -= 100
            v.max_y += 100
        } else if (g.line_chart_series == "Per Capita") {
            () => { }
        } else {
            v.min_y = 0
            v.max_y += 1000
        }
        v.y_domain = [v.max_y, v.min_y]

        // Define the x domain based on unique years in the dataset.
        v.x_domain = []

        // Define the countries list based on unique countries in the dataset.
        v.countries = []

        // Get a reference to the selected data.
        var d = g.selected_data

        // Build the x domain from the unique years in the dataset.
        for (var i = 0; i < d.length; i++) {

            // Get the year from the record.
            var year = d[i].year

            // Only add unique years.
            if (v.x_domain.indexOf(year) == -1) {
                v.x_domain.push(year)
            }

            // There are only eight years of data, so quit after eight are found.
            if (v.x_domain.length > 7) {
                break
            }
        }

        // Build the list of countries from the unique countries in the dataset.
        for (var i = 0; i < d.length; i++) {

            // Get a country name.
            var country = d[i].country

            // Only add unique country names.
            if (v.countries.indexOf(country) == -1) {
                v.countries.push(country)
            }

            // There are only ten countries, so quit after ten are found.
            if (v.countries.length > 9) {
                break
            }
        }
    }

    function calculate_scales() {

        // The x scale consists of country names, so band scale is used.
        v.x_scale = d3.scaleBand()
            .domain(v.x_domain)
            .rangeRound([v.margin.left, v.width + v.margin.left])
            .padding([0.1])

        // The same y axis will use the y domain that will change depending on selected data.
        v.y_scale = d3.scaleLinear()
            .domain(v.y_domain)
            .range([v.margin.top, v.margin.top + v.height])
    }

    function calculate_axis() {

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.x_axis = d3.axisBottom()
            .scale(v.x_scale)

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.y_axis = d3.axisLeft()
            .scale(v.y_scale)
    }

    function append_all_countries() {

        // Use basic colors.
        var color = d3.scaleOrdinal(d3.schemeCategory10)

        // Remove existing lines.

        var line_group = v.svg.selectAll("#line_group")

        if (line_group.empty()) {

            // Add line group to svg.
            line_group = v.svg.append("g")
                .attr("id", "line_group")

            // Create a line for each country.
            for (var i = 0; i < v.countries.length; i++) {

                // Get a local reference to the country.
                var country = v.countries[i]

                // Create an identifier for the line (path).
                var path_id = "path" + i

                // Select line data for a country from selected data.
                var line_data = []
                for (var j = 0; j < g.selected_data.length; j++) {
                    var selected_record = g.selected_data[j]
                    if (selected_record.country == country) {
                        var line_record = { year: selected_record.year, value: selected_record.value }
                        line_data.push(line_record)
                    }
                }

                //Define line generator
                var line = d3.line()
                    .x((d) => { return v.x_scale(d.year) })
                    .y((d) => { return v.y_scale(d.value) })
                    .curve(d3.curveCatmullRom.alpha(0.5));

                // Murray, Scott. 
                // Interactive Data Visualization for the Web: An Introduction to Designing with D3 (p. 222). 
                // O'Reilly Media. 
                // Kindle Edition. 

                //Create line
                v.svg.append("path")
                    .datum(line_data)
                    .attr("style", "stroke:" + color(i) + ";stroke-width:5;fill-opacity:0")
                    .attr("id", path_id)
                    .attr("d", line);
            }
        } else {

            d3.select("#line_chart_svg")
                .selectAll("path")
                .transition()
                .delay((d, i) => { return i * 200 })
                .remove()

            // Create a line for each country.
            for (var i = 0; i < v.countries.length; i++) {

                // Get a local reference to the country.
                var country = v.countries[i]

                // Create an identifier for the line (path).
                var path_id = "path" + i

                // Select line data for a country from selected data.
                var line_data = []
                for (var j = 0; j < g.selected_data.length; j++) {
                    var selected_record = g.selected_data[j]
                    if (selected_record.country == country) {
                        var line_record = { year: selected_record.year, value: selected_record.value }
                        line_data.push(line_record)
                    }
                }

                //Define line generator
                var line = d3.line()
                    .x(function (d) { return v.x_scale(d.year) })
                    .y(function (d) { return v.y_scale(d.value) })
                    .curve(d3.curveCatmullRom.alpha(0.5))

                // Murray, Scott. 
                // Interactive Data Visualization for the Web: An Introduction to Designing with D3 (p. 222). 
                // O'Reilly Media. 
                // Kindle Edition. 

                //Add line
                v.svg.append("path")
                    .datum(line_data)
                    .transition()
                    .delay(3000)
                    .attr("style", "stroke:" + color(i) + ";stroke-width:5;fill-opacity:0")
                    .attr("id", path_id)
                    .attr("d", line)
            }
        }
    }

    function append_x_axis() {

        // Get a references to the x axis.
        v.x_axis_group = d3.select("#x_axis_group")

        // If not found, create one.
        if (v.x_axis_group.empty()) {
            v.x_axis_group = v.svg.append("g")
                .attr("id", "x_axis_group")
        }

        // Relocate the x axis to a new location if window is resized.
        v.x_axis_group
            .transition()
            .duration(g.duration)
            .delay((d, i) => { return (i * 500) })
            .attr("transform", "translate(0," + (v.margin.top + v.height) + ")")
            .call(v.x_axis)

        // Get the label for the x axis.
        v.x_axis_label = d3.select("#x_axis_label")

        // If not found, create one.
        if (v.x_axis_label.empty()) {
            v.x_axis_label = v.x_axis_group
                .append("text")
                .attr("id", "x_axis_label")
        }

        // Relocate and populate the x axis label.
        v.x_axis_label
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.margin.left + v.width / 2)
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text("Year")
    }

    function append_y_axis() {

        // Get the y axis.
        v.y_axis_group = d3.select("#y_axis_group")

        // If not found, create one.
        if (v.y_axis_group.empty()) {
            v.y_axis_group = v.svg.append("g")
                .attr("id", "y_axis_group")
        }

        // Relocate the y axis if the window is resized.
        v.y_axis_group
            .transition()
            .duration(g.duration)
            .attr("transform", "translate(" + v.margin.left + ",0)")
            .call(v.y_axis)

        // Get the label for the y axis.
        v.y_axis_label = d3.select("#y_axis_label")

        // If not found, create one.
        if (v.y_axis_label.empty()) {
            v.y_axis_label = v.y_axis_group
                .append('text')
                .attr("id", "y_axis_label")
        }

        // Relocate and populate the y axis label.
        v.y_axis_label
            .attr("transform", "rotate(-90)")
            .attr("y", (v.margin.left * 0.7) * (-1))
            .attr("x", Math.floor(((v.height / 2) * (-1))))
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text(g.line_chart_series + " (petajoules)")

        // Set the legend for the bar chart legend.
        // This is visage of original code that had multiple dimensions.
        d3.select("#line_chart_legend")
            .text("Line Chart:  South America Energy Production:  " + g.line_chart_series)
    }

    function adjust_font_sizes() {

        // Resize font size when the window is resized.
        if (v.margin.left > 100) {
            v.svg.selectAll(".tick").style("font-size", "small")
            v.svg.selectAll("text").style("font-size", "small")
            d3.selectAll("label").style("font-size", "small")
            return
        }

        if (v.margin.left > 50) {
            v.svg.selectAll(".tick").style("font-size", "x-small")
            v.svg.selectAll("text").style("font-size", "x-small")
            d3.selectAll("label").style("font-size", "x-small")
            return
        }

        v.svg.selectAll(".tick").style("font-size", "xx-small")
        v.svg.selectAll("text").style("font-size", "xx-small")
        d3.selectAll("label").style("font-size", "xx-small")
    }

    function append_legend() {

        var color = d3.scaleOrdinal(d3.schemeCategory10)

        var legend = v.svg.select("#line_chart_legend_2")

        if (legend.empty()) {

            var x = v.margin.left + v.width
            var y = v.margin.top + 10

            var legend = v.svg
                .append("g")
                .attr("x", x)
                .attr("y", y)
                .attr("height", () => { return v.height - y })
                .attr("id", "line_chart_legend_2")


            legend.selectAll("rect")
                .data(v.countries)
                .enter()
                .append("rect")
                .attr("x", () => { return v.margin.left + v.width })
                .attr("y", (d, i) => { return v.margin.top - 10 + i * 20 })
                .attr("width", 20)
                .attr("height", 10)
                .attr("fill", (d, i) => { return color(i) })

            legend.selectAll("text")
                .data(v.countries)
                .enter()
                .append("text")
                .attr("x", () => { return v.margin.left + v.width + 20 })
                .attr("y", (d, i) => { return v.margin.top + i * 20 })
                .attr("height", 20)
                .attr("font-weight", "bold")
                .attr("fill", (d, i) => { return color(i) })
                .text(function (d) { return d })


        } else {

            var x = v.margin.left + v.width
            var y = v.margin.top + 10
            legend.attr("x", x)
                .attr("y", y)
                .attr("height", () => { return v.height - y })
                .attr("id", "line_chart_legend_2")

            legend.selectAll("rect")
                .data(v.countries)
                .transition()
                .duration(3000)
                .attr("x", () => { return v.margin.left + v.width })
                .attr("y", (d, i) => { return v.margin.top - 10 + i * 20 })
                .attr("width", 20)
                .attr("height", 10)
                .attr("fill", (d, i) => { return color(i) })

            legend.selectAll("text")
                .data(v.countries)
                .transition()
                .duration(3000)
                .attr("x", () => { return v.margin.left + v.width + 20 })
                .attr("y", (d, i) => { return v.margin.top + i * 20 })
                .attr("height", 20)
                .attr("font-weight", "bold")
                .attr("fill", (d, i) => { return color(i) })
                .text(function (d) { return d })

        }
    }
}

