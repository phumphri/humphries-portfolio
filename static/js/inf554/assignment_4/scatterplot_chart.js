function set_scatterplot_chart_variables() {

    console.log("set_scatterplot_chart_variables was called.")

    // Get the selection for the scatterplot chart svg.
    var scatterplot_chart_fieldset = d3.select("#scatterplot_chart_fieldset")
    g.s.svg = scatterplot_chart_fieldset.select("#scatterplot_chart_svg")

    // If the selection is empty, append the scatterplot_chart.
    if (g.s.svg.empty()) {
        g.s.svg = scatterplot_chart_fieldset
            .append("svg")
            .attr("id", "scatterplot_chart_svg")
    }

    // Update the scaatterplot_chart.
    g.s.svg
        .attr("width", g.svg_width)
        .attr("height", g.svg_height)

    // Create the x domain, scale, and axis for the scatterplot chart.
    // It is now region.  Change to income.
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.s.x_domain.indexOf(g.metadata[i].region) == -1) {
            g.s.x_domain.push(g.metadata[i].region)
        }
    }
    g.s.x_scale = d3.scaleBand()
        .domain(g.s.x_domain)
        .rangeRound([0, g.chart_width])
        .paddingInner(0.05)
    g.s.x_axis = d3.axisBottom().scale(g.s.x_scale)

    // Create the y domain, scale, and axis for the scatterplot chart.
    // It is now region.  Change to value.
    g.s.y_domain = ["High income", "Upper middle income", "Lower middle income", "Low income"]
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.s.y_domain.indexOf(g.metadata[i].income) == -1) {
            g.s.y_domain.push(g.metadata[i].income)
        }
    }
    g.s.y_scale = d3.scaleBand()
        .domain(g.s.y_domain)
        .rangeRound([0, g.chart_height])
        .paddingInner(0.05)
    g.s.y_axis = d3.axisLeft().scale(g.s.y_scale)

    // Create the c domain and scale for color for the scatterplot chart.
    for (var i = 0; i < g.metadata.length; i++) {
        if (g.s.c_domain.indexOf(g.metadata[i].region) == -1) {
            g.s.c_domain.push(g.metadata[i].region)
        }
    }
    g.s.c_range = ["Blue", "Brown", "Coral", "Gold", "Red", "Green"]
    g.s.c_scale = d3.scaleBand()
        .domain(g.s.c_domain)
        .range(g.s.c_range)
}

function append_scatterplot_chart_circles() {

    console.log("append_scatterplot_chart_circles was called.")

    // Get the selection of all circles.
    var circles = g.s.svg.selectAll("circle")

    // Get a reference to the metadata file.
    var d = g.metadata

    // If no circles were found, append circles using the metadata file.
    if (circles.empty()) {

        // Add circles from the metadata file.
        circles = g.s.svg.selectAll("circle")
            .data(d, (d) => { return d.code })
            .enter()
            .append("circle")
    }

    // Color the circles.
    // Update to the g.s.c_scale.
    circles.attr("fill", () => { return "#900" })

    // Position the circles.
    circles
        .transition()
        .duration(2000)
        .attr("cx", (d) => {
            var cx = g.s.x_scale(d.region) + g.left_border + (g.s.x_scale.bandwidth() / 2)
            return cx
        })
        .attr("cy", (d) => {
            var cy = g.s.y_scale(d.income) + g.top_margin + (g.s.y_scale.bandwidth() / 2)
            return cy
        })
        .attr("r", (d) => {
            r = 10
            return r
        })

    // Add tooltips to the circlses.
    circles
        .data(d, (d) => { return d.code })
        .append("svg:title")
        .text((d) => { return d.region + ", " + d.income })
}


function append_scatterplot_chart_y_axis() {

    console.log("append_scatterplot_chart_y_axis was called.")

    // Get the selection of the scatterplot chart y axis group.
    var scatterplot_chart_y_axis_group = g.s.svg.select("#scatterplot_chart_y_axis_group")

    // If the selection is empty, add the scatterplot chart y axis group.
    if (scatterplot_chart_y_axis_group.empty()) {

        // Add the scatterplot chart y axis group.
        scatterplot_chart_y_axis_group = g.s.svg.append("g")
            .attr("id", "scatterplot_chart_y_axis_group")
            .attr("class", "axis")
    }

    // Update the scatterplot chart y axis group with the current scatterplot chart y axis.
    scatterplot_chart_y_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border + "," + g.top_margin + ")")
        .call(g.s.y_axis)

    // Get the select of the bar chart y axis label.
    var scatterplot_chart_y_axis_label = g.s.svg.select("#scatterplot_chart_y_axis_label")

    // If the selection is empty, add the scatterplot chart y axis label.
    if (scatterplot_chart_y_axis_label.empty()) {

        // Add the scatterplot chart y axis label
        scatterplot_chart_y_axis_label = g.s.svg
            .append("text")
            .attr("id", "scatterplot_chart_y_axis_label")
    }

    // Update the scatterplot chart y axis label selection.
    scatterplot_chart_y_axis_label
        .attr("transform", "rotate(-90)")
        .attr("y", Math.floor(g.left_margin * 0.14))
        .attr("x", Math.floor(g.chart_height / 2) * (-1))
        .style("text-anchor", "middle")
        .text("Income Group")
}

function append_scatterplot_chart_x_axis() {

    console.log("append_scatterplot_chart_x_axis was called.")

    set_scatterplot_chart_variables()

    // Select the scatterplot chart x axis group.
    var scatterplot_chart_x_axis_group = g.s.svg.select("#scatterplot_chart_x_axis_group")

    // If the scatterplot_chart_x_axis_group is not found, create one.
    if (scatterplot_chart_x_axis_group.empty()) {
        scatterplot_chart_x_axis_group = g.s.svg.append("g")
            .attr("id", "scatterplot_chart_x_axis_group")
            .attr("class", "axis")
    }

    // Update the scatterplot_chart_axis_group
    scatterplot_chart_x_axis_group
        .transition()
        .duration(2000)
        .attr("transform", "translate(" + g.left_border + ", " + g.bottom_border + ")")
        .call(g.s.x_axis)

    // Select the scatterplot char x axis label.
    var scatterplot_chart_x_axis_label = g.s.svg.select("#scatterplot_chart_x_axis_label")

    // If the scatterplot_chart_x_axis_label is not found, append it.
    if (scatterplot_chart_x_axis_label.empty()) {
        scatterplot_chart_x_axis_label = g.s.svg.append("text")
            .attr("id", "scatterplot_chart_x_axis_label")
    }

    // Update the scatterplot chart x axis label.
    scatterplot_chart_x_axis_label
        .transition()
        .duration(2000)
        .attr("y", (g.svg_height * 0.99))
        .attr("x", ((g.chart_width / 2) + g.left_margin))
        .style("text-anchor", "middle")
        .text("Regions")
}

function adjust_scatterplot_chart_fonts () {

    console.log("adjust_scatterplot_fonts was called.")

    if (g.left_margin > 55) {
        g.s.svg.selectAll(".tick").attr("font-size", "14")
        g.s.svg.select("#scatterplot_y_axis_label").attr("font-size", "14")
        g.s.svg.select("#scatterplot_x_axis_label").attr("font-size", "14")
    } else {
        g.s.svg.selectAll(".tick").attr("font-size", "10")
        g.s.svg.select("#scatterplot_chart_y_axis_label").attr("font-size", "10")
        g.s.svg.select("#scatterplot_chart_x_axis_label").attr("font-size", "10")
    }

}

function build_scatterplot_chart() {

    console.log("build_scatterplot_chart was called.")

    // Append components to the scatterplot chart svg.
    set_scatterplot_chart_variables()
    append_scatterplot_chart_circles()
    append_scatterplot_chart_y_axis()
    append_scatterplot_chart_x_axis()
    adjust_scatterplot_chart_fonts()
}


