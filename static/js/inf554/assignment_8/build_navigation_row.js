function build_navigation_row() {

    // Append the navigation row.
    var navigation_row = container_fluid
        .append("row")
        .attr("id", "navigation_row")
        .attr("class", "row hidden")

    // Append the button group.
    var button_group = navigation_row
        .append("div")
        .attr("class", "btn-group btn-group-sm")

    // Append the "All" button to the button group.
    var all_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("All")

    // Clicking on the "All" button will display all rows.
    all_button.on("click", () => {
        d3.select("#navigation_row").classed("hidden", false)
        d3.select("#assignment_row").classed("hidden", false)
        d3.select("#circle_packing_chart_row").classed("hidden", false)
        d3.select("#line_chart_row").classed("hidden", false)
        d3.select("#pie_chart_row").classed("hidden", false)
    })

    // Append the "Assignment" button to the button group.
    var assignment_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Assignment")

    // Clicking on "Assignment" button will display the assignment row.
    assignment_button.on("click", () => {
        hide_all_rows()
        d3.select("#assignment_row").classed("hidden", false)
    })

    // Append the "Circle Packing Chart" button to the button group.
    var circle_packing_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Circle Packing Chart")

    // Clicking on the "Circle Packing Chart" button will display the circle packing chart row.
    circle_packing_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#circle_packing_chart_row").classed("hidden", false)
    })

    // Append the "Line Chart" button to the button group.
    var line_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Line Chart")

    // Clicking on the "Line Chart" button will display the line chart row.
    line_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#line_chart_row").classed("hidden", false)
    })

    // Append the "Pie Chart" button to the button group.
    var pie_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Pie Chart")

    // Clicking on the "Line Chart" button will display the line chart row.
    pie_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#pie_chart_row").classed("hidden", false)
    })
}

function hide_all_rows() {

    // Hide all rows except the heading and navigation.
    d3.select("#assignment_row").classed("hidden", true)
    d3.select("#circle_packing_chart_row").classed("hidden", true)
    d3.select("#line_chart_row").classed("hidden", true)
    d3.select("#pie_chart_row").classed("hidden", true)
}
