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
        d3.select("#bar_chart_row").classed("hidden", false)
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

    // Append the "Bar Chart" button to the button group.
    var bar_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Bar Chart")

    // Clicking on the "Bar Chart" button will display the bar chart row.
    bar_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#bar_chart_row").classed("hidden", false)
    })
}

function hide_all_rows() {

    // Hide the assignment and bar chart rows.
    d3.select("#assignment_row").classed("hidden", true)
    d3.select("#bar_chart_row").classed("hidden", true)
}
