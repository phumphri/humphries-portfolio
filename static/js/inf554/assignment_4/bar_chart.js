function set_bar_chart_variables() {

    console.log(" ")
    console.log("set_bar_chart_variables was called.")

    // Get the bar chart svg selection.
    var bar_chart_fieldset = d3.select("#bar_chart_fieldset")
    console.log("typeof bar_chart_fieldset:  " + typeof bar_chart_fieldset)
    g.b.svg = bar_chart_fieldset.select("#bar_chart_svg")

    // If the selection is empty, append a bar chart svg.
    if (g.b.svg.empty()) {
        g.b.svg = bar_chart_fieldset
            .append("svg")
            .attr("id", "bar_chart_svg")

        console.log("g.b.svg was created.")
    }

    // Update the bar chart svg.
    g.b.svg
        .attr("width", g.svg_width)
        .attr("height", g.svg_height)

    console.log("g.b.svg was updated.")


    // Create the bar chart x domain, scale, and axis.
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.b.x_domain.indexOf(g.metadata[i].code) == -1) {
            g.b.x_domain.push(g.metadata[i].code)
        }
    }
    g.b.x_scale = d3.scaleBand()
        .domain(g.b.x_domain)
        .rangeRound([0, g.chart_width])
        .paddingInner(0.05)
    g.b.x_axis = d3.axisBottom().scale(g.b.x_scale)



    // Create the bar chart y domain, scale, and axis.
    g.min_percentage = 0
    g.max_percentage = 100
    g.b.y_domain = [g.min_percentage, g.max_percentage]
    g.b.y_scale = d3.scaleLinear()
        .domain(g.b.y_domain)
        .range([0, g.chart_height])
        .nice()
    g.b.y_scale_reverse = d3.scaleLinear()
        .domain([g.max_percentage, g.min_percentage])
        .range([0, g.chart_height])
        .nice()
    g.b.y_axis = d3.axisLeft().scale(g.b.y_scale_reverse)
}

function append_bar_chart_rectangles() {

    console.log(" ")
    console.log("append_bar_chart_rectangles was called.")
    
    // Get the selection of all rectangles.
    var rectangles = g.b.svg.selectAll("rect")

    // Get a reference to the metadata file.
    var d = g.metadata

    // If no rectangles were found, append rectangles using the metadata file.
    if (rectangles.empty()) {

        console.log("d.length:  " + d.length)
        for (var i = 0; i < d.length; i++) {
            console.log(d[i].code + ", " + d[i].name + ", " + d[i].region + ", " + d[i].income)
        }

        // Add rectangles from the metadata file.
        rectangles = g.b.svg.selectAll("rect")
            .data(d, (d) => {
                var country_code = d.code
                console.log("Rectangle was created for:  " + country_code)
                return country_code
            })
            .enter()
            .append("rect")

        console.log("rectangles were added:  " + rectangles.length)
    }

    // Add tooltips to the bar chart rectangles.
    rectangles
        .append("svg:title")
        .text((d) => { return d.name })

    console.log("rectangles tooltips were added.")

    // Position the bar chart rectangles.
    rectangles
        .transition()
        .duration(2000)
        .attr("x", (d) => {
        var x = g.b.x_scale(d.code) + g.left_border
        return x
    })

    console.log("rectangles were positioned.")

    // Get a reference to the data file.
    var d = g.data

    // Set the attributes of the labels using the data file.
    // The "code" attribute is used for joining the rectangles selection and the data file.
    rectangles
        .data(d, (d) => { return d.code })
        .attr("y", (d) => {
            var y = Math.floor(g.bottom_border - g.b.y_scale(d.value))
            return y
        })
        .attr("width", () => {
            var w = g.b.x_scale.bandwidth()
            return w
        })
        .attr("height", (d) => {
            var h = Math.floor(g.b.y_scale(d.value))
            return h
        })
        .attr("fill", () => { return "#900" })

    console.log("rectangle attributes were set.")
}

function append_bar_chart_labels() {

    console.log(" ")
    console.log("append_bar_chart_labels was called.")

    // Get the current labels in the bar chart.
    // They are identified by the class ".text-center" to distinguish from other text.
    var bar_chart_labels = g.b.svg.selectAll(".text-center")

    // If no labels are found, add labels from the metadata file.
    if (bar_chart_labels.empty()) {

        // Get a refernce to the metadata file.
        var d = g.metadata

        // Add labels based on the metadata file.
        bar_chart_labels = g.b.svg.selectAll("text")
            .data(d, (d) => { return d.code })
            .enter()
            .append("text")

        console.log("bar_chart_labels were added.")
    }

    // Position the bart chart labels.
    bar_chart_labels.attr("x", (d) => {
        var x = (g.b.x_scale(d.code) + g.left_border + (g.b.x_scale.bandwidth() / 2))
        return x
    })

    console.log("bar_chart_labels were positioned.")

    // Get a reference to the data file.
    var d = g.data

    // Update the label attributes from the data file.
    // Use the "code" attribute to join to the labels selection and the data file.
    bar_chart_labels
        .data(d, (d) => { return d.code })
        .transition()
        .duration(2000)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("class", "text-center")
        .attr("fill", (d) => {
            var y = Math.floor(g.bottom_border - g.b.y_scale(d.value)) + 20
            if (y > g.bottom_border - 10) {
                return "black"
            } else {
                return "white"
            }
        })
        .attr("y", (d) => {
            var y = Math.floor(g.bottom_border - g.b.y_scale(d.value)) + 20
            if (y > g.bottom_border - 10) { y = g.bottom_border - g.b.y_scale(d.value) - 10 }
            return Math.round(y)
        })
        .text((d) => { return Math.floor(d.value) })

    console.log("bar chart label attributes were set.")
}

function append_bar_chart_y_axis() {

    console.log("append_bar_chart_y_axis was called.")

    // Get the selection of the bar chart y axis group.
    var bar_chart_y_axis_group = g.b.svg.select("#bar_chart_y_axis_group")

    // If the selection is empty, add the bar chart y axis group.
    if (bar_chart_y_axis_group.empty()) {

        // Add the bar chart y axis group.
        bar_chart_y_axis_group = g.b.svg.append("g")
            .attr("id", "bar_chart_y_axis_group")
            .attr("class", "axis")
    }

    // Update the bar chart y axis group with the current bar chart y axis.
    bar_chart_y_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border.toString() + "," + g.top_margin + ")")
        .call(g.b.y_axis)

    // Get the select of the bar chart y axis label.
    var bar_chart_y_axis_label = g.b.svg.select("#bar_chart_y_axis_label")

    // If the selection is empty, add the bar chart y axis label.
    if (bar_chart_y_axis_label.empty()) {

        // Add the bar chart y axis label
        bar_chart_y_axis_label = g.b.svg
            .append("text")
            .attr("id", "bar_chart_y_axis_label")
    }

    // Update the bar chart y axis label selection.
    bar_chart_y_axis_label
        .transition()
        .duration(2000)
        .attr("transform", "rotate(-90)")
        .attr("y", Math.floor(g.left_margin * 0.14))
        .attr("x", Math.floor(g.chart_height / 2) * (-1))
        .style("text-anchor", "middle")
        .text("Rural Population (percent)")
}

function append_bar_chart_x_axis() {

    console.log("append_bar_chart_x_axis was called.")

    // Select the bar chart x axis group.
    var bar_chart_x_axis_group = g.b.svg.select("#bar_chart_x_axis_group")

    // If the bar_chart_x_axis_group is not found, create one.
    if (bar_chart_x_axis_group.empty()) {
        bar_chart_x_axis_group = g.b.svg.append("g")
            .attr("id", "bar_chart_x_axis_group")
            .attr("class", "axis")
    }

    // Update the bar_char_axis_group
    bar_chart_x_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
        .call(g.b.x_axis)

    // Select the bar char x axis label.
    var bar_chart_x_axis_label = g.b.svg.select("#bar_chart_x_axis_label")

    // If the bar_chart_x_axis_label is not found, append it.
    if (bar_chart_x_axis_label.empty()) {
        bar_chart_x_axis_label = g.b.svg.append("text")
            .attr("id", "bar_chart_x_axis_label")
    }

    // Update the bar chart x axis label.
    bar_chart_x_axis_label
        .transition()
        .duration(2000)
        .attr("y", (g.svg_height * 0.99).toString())
        .attr("x", ((g.chart_width / 2) + g.left_margin).toString())
        .style("text-anchor", "middle")
        .text("Country Code")
}

function adjust_bar_chart_fonts() {

    console.log("adjust_bar_chart_fonts was called.")

    if (g.left_margin > 55) {
        g.b.svg.selectAll(".tick").attr("font-size", "14")
        g.b.svg.select("#bar_chart_y_axis_label").attr("font-size", "14")
        g.b.svg.select("#bar_chart_x_axis_label").attr("font-size", "14")
    } else {
        g.b.svg.selectAll(".tick").attr("font-size", "10")
        g.b.svg.select("#bar_chart_y_axis_label").attr("font-size", "10")
        g.b.svg.select("#bar_chart_x_axis_label").attr("font-size", "10")
    }
}

function build_bar_chart() {

    console.log("build_bar_chart was called.")

    // Append components to the bar chart svg.
    set_bar_chart_variables()
    append_bar_chart_rectangles()
    append_bar_chart_labels()
    append_bar_chart_y_axis()
    append_bar_chart_x_axis()
    adjust_bar_chart_fonts()
}


