

function set_bubble_chart_variables() {

    console.log("set_bubble_chart_variables was called.")

    // Get the selection for the bubble chart svg.
    var bubble_chart_fieldset = d3.select("#bubble_chart_fieldset")
    g.u.svg = d3.select("#bubble_chart_svg")

    // If the selection is empty, append the bubble chart svg.
    if (g.u.svg.empty()) {
        g.u.svg = bubble_chart_fieldset
            .append("svg")
            .attr("id", "bubble_chart_svg")
    }

    // Update the bubble chart.
    g.u.svg
        .attr("width", g.svg_width)
        .attr("height", g.svg_height)

    // Create the x domain, scale, and axis for the bubble chart.
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.u.x_domain.indexOf(g.metadata[i].region) == -1) {
            g.u.x_domain.push(g.metadata[i].region)
        }
    }
    g.u.x_scale = d3.scaleBand()
        .domain(g.s.x_domain)
        .rangeRound([0, g.chart_width])
        .paddingInner(0.05)
    g.u.x_axis = d3.axisBottom().scale(g.u.x_scale)


    // Create the y domain, scale, and axis for the bubble chart.
    g.u.y_domain = ["High income", "Upper middle income", "Lower middle income", "Low income"]
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.u.y_domain.indexOf(g.metadata[i].income) == -1) {
            g.u.y_domain.push(g.metadata[i].income)
        }
    }
    g.u.y_scale = d3.scaleBand()
        .domain(g.u.y_domain)
        .rangeRound([0, g.chart_height])
        .paddingInner(0.05)
    g.u.y_axis = d3.axisLeft().scale(g.u.y_scale)

    // Create the r domain, scale, and axis for the bubble chart.
    g.min_percentage = 0
    g.max_percentage = 100
    g.u.r_domain = [g.min_percentage, g.max_percentage]
    g.u.r_scale = d3.scaleLinear()
        .domain(g.u.r_domain)
        .range([0, (g.chart_height * 0.10)])
        .nice()
}

function append_bubble_chart_circles() {

    console.log("append_bubble_chart_circles was called.")

    // Declare a data structure for joined attribute_data and fact_data.
    var combined_data = []

    // Get a reference to the metadata file.
    var d = g.metadata

    // Create a update selection with attribute data.
    var dummy = d3.selectAll("dummy")
        .data(d, (d) => { return d.code })
        .enter()

    // Add the metadata to the combined data
    var rows = dummy.data()
    for (var i = 0; i < rows.length; i++) {
        row = {
            code: rows[i].code,
            name: rows[i].name,
            region: rows[i].region,
            income: rows[i].income,
            value: 0
        }
        combined_data.push(row)
    }

    // Get a reference to the data file.
    var d = g.data

    // Create an update selection with fact data that is joined by attribute data.
    dummy.data(d, (d) => { return d.code })

    // Update the combined data with the fact data
    var rows = dummy.data()
    for (var i = 0; i < rows.length; i++) {
        combined_data[i].value = parseFloat(rows[i].value)
    }

    // Sort by descending value so smaller bubbles will not be obscured by larger ones.
    combined_data = sort_data(combined_data)

    // Dump the results for debugging.
    for (var i = 0; i < combined_data.length; i++) {
        var v = combined_data[i]
        console.log("combined_data[" + i + "]:  " + v.code + ", " + v.name + ", " + v.region + ", " + v.income + ", " + v.value)
    }

    // The input is the result of a join of attribute and fact files.
    var d = combined_data

    // Get the selection of all circles.
    var circles = g.u.svg.selectAll("circle")

    // If no circles were found, append circles using the metadata file.
    if (circles.empty()) {

        // Add circles from the metadata file.
        circles = g.u.svg.selectAll("circle")
            .data(d, (d) => { return d.code })
            .enter()
            .append("circle")
    }

    // Position the circles and make them translucent.
    // The larger values can be seen under the smaller values.
    circles
        .transition()
        .duration(3000)
        .attr("cx", (d) => {
            var cx = g.u.x_scale(d.region) + g.left_border + (g.u.x_scale.bandwidth() / 2)
            return cx
        })
        .attr("cy", (d) => {
            var cy = g.u.y_scale(d.income) + g.top_margin + (g.u.y_scale.bandwidth() / 2)
            return cy
        })
        .attr("r", (d) => { return d.value })

    circles
        .style("fill", "green")
        .style("stroke", "red")
        .style("fill-opacity", .2)
        .append("svg:title")
        .text((d) => { return d.name + "," + d.region + ", " + d.income + ", " + d.value })

}

function append_bubble_chart_y_axis() {

    console.log("append_bubble_chart_y_axis was called.")

    // Get the selection of the bubble chart y axis group.
    var bubble_chart_y_axis_group = g.u.svg.select("#bubble_chart_y_axis_group")

    // If the selection is empty, add the bubble chart y axis group.
    if (bubble_chart_y_axis_group.empty()) {

        // Add the bubble chart y axis group.
        bubble_chart_y_axis_group = g.u.svg.append("g")
            .attr("id", "bubble_chart_y_axis_group")
            .attr("class", "axis")
    }

    // Update the bubble chart y axis group with the current bubble chart y axis.
    bubble_chart_y_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border + "," + g.top_margin + ")")
        .call(g.u.y_axis)

    // Get the select of the bubble chart y axis label.
    var bubble_chart_y_axis_label = g.u.svg.select("#bubble_chart_y_axis_label")

    // If the selection is empty, add the bubble chart y axis label.
    if (bubble_chart_y_axis_label.empty()) {

        // Add the bubble chart y axis label
        bubble_chart_y_axis_label = g.u.svg
            .append("text")
            .attr("id", "bubble_chart_y_axis_label")
    }

    // Update the bubble chart y axis label selection.
    bubble_chart_y_axis_label
        .attr("transform", "rotate(-90)")
        .attr("y", Math.floor(g.left_margin * 0.14))
        .attr("x", Math.floor(g.chart_height / 2) * (-1))
        .style("text-anchor", "middle")
        .text("Income Group")
}

function append_bubble_chart_x_axis() {

    console.log("append_sbubble_chart_x_axis was called.")

    // Select the bubble chart x axis group.
    var bubble_chart_x_axis_group = g.u.svg.select("#bubble_chart_x_axis_group")

    // If the bubble_chart_x_axis_group is not found, create one.
    if (bubble_chart_x_axis_group.empty()) {
        bubble_chart_x_axis_group = g.u.svg.append("g")
            .attr("id", "bubble_chart_x_axis_group")
            .attr("class", "axis")
    }

    // Update the bubble_chart_axis_group
    bubble_chart_x_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
        .call(g.u.x_axis)

    // Select the bubble chart x axis label.
    var bubble_chart_x_axis_label = g.u.svg.select("#bubble_chart_x_axis_label")

    // If the bubble_chart_x_axis_label is not found, append it.
    if (bubble_chart_x_axis_label.empty()) {
        bubble_chart_x_axis_label = g.u.svg.append("text")
            .attr("id", "bubble_chart_x_axis_label")
    }

    // Update the bubble chart x axis label.
    bubble_chart_x_axis_label
        .transition()
        .duration(2000)
        .attr("y", (g.svg_height * 0.99))
        .attr("x", ((g.chart_width / 2) + g.left_margin))
        .style("text-anchor", "middle")
        .text("Regions")
}


function adjust_bubble_chart_fonts() {

    console.log("adjust_bubble_fonts was called.")

    if (g.left_margin > 55) {
        g.u.svg.selectAll(".tick").attr("font-size", "14")
        g.u.svg.select("#bubble_y_axis_label").attr("font-size", "14")
        g.u.svg.select("#bubble_x_axis_label").attr("font-size", "14")
    } else {
        g.u.svg.selectAll(".tick").attr("font-size", "10")
        g.u.svg.select("#bubble_chart_y_axis_label").attr("font-size", "10")
        g.u.svg.select("#bubble_chart_x_axis_label").attr("font-size", "10")
    }

}


function sort_data(d) {

    console.log("sort_data was called")

    d.sort((a, b) => {

        const a_value = a.value
        const b_value = b.value

        comparison = 0

        if (a_value > b_value) {
            comparison = -1
        } else if (a_value < b_value) {
            comparison = 1
        }
        return comparison
    })

    return d
}


function build_bubble_chart() {

    console.log(" ")
    console.log("build_bubble_chart was called.")

    set_bubble_chart_variables()
    append_bubble_chart_circles()
    append_bubble_chart_y_axis()
    append_bubble_chart_x_axis()
    adjust_bubble_chart_fonts()
}