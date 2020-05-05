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

    // Append the "All" button that makes all rows visible.
    var all_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("All")

    all_button.on("click", () => {
        d3.select("#navigation_row").classed("hidden", false)
        d3.select("#assignment_row").classed("hidden", false)
        d3.select("#slopegraph_row").classed("hidden", false)
        d3.select("#bar_graph_row").classed("hidden", false)
        d3.select("#lollipop_chart_row").classed("hidden", false)
        d3.select("#bubble_chart_row").classed("hidden", false)
    })

    // Append the "Assignment" button that makes only the assignment row visible.
    var assignment_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Assignment")

    assignment_button.on("click", () => {
        hide_all_rows()
        d3.select("#assignment_row").classed("hidden", false)
    })

    // Append the "Slopegraph" button that makes only the slopegraph row visible.
    var slopegraph_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Slopegraph")

    slopegraph_button.on("click", () => {
        hide_all_rows()
        d3.select("#slopegraph_row").classed("hidden", false)
    })

    // Append the "Bar Graph" button that makes only the bar graph row visible.
    var bar_graph_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Bar Graph")

    bar_graph_button.on("click", () => {
        hide_all_rows()
        d3.select("#bar_graph_row").classed("hidden", false)
    })

    // Append the "Lollipop Chart" button that makes only the lollipop chart row visible.
    var lollipop_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Lollipop Chart")

    lollipop_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#lollipop_chart_row").classed("hidden", false)
    })

    // Append the "Bubble Chart" button that makes only the bubble chart row visible.
    var bubble_chart_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Bubble Chart")

    bubble_chart_button.on("click", () => {
        hide_all_rows()
        d3.select("#bubble_chart_row").classed("hidden", false)
    })
}

function hide_all_rows() {
    d3.select("#assignment_row").classed("hidden", true)
    d3.select("#slopegraph_row").classed("hidden", true)
    d3.select("#bar_graph_row").classed("hidden", true)
    d3.select("#lollipop_chart_row").classed("hidden", true)
    d3.select("#bubble_chart_row").classed("hidden", true)
}
