function build_navigation_row() {

    // Append the navigation row.
    var navigation_row = container_fluid
        .append("row")
        .attr("id", "navigation_row")

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
        d3.select("#assignment_row").classed("hidden", false)
        d3.select("#south_america_maps_row").classed("hidden", false)
        d3.select("#los_angeles_map_row").classed("hidden", false)
    })

    // Append the "South America Maps" button to the button group.
    var south_america_maps_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("South America Maps")

    // Clicking on the "South America Charts" button will display the south america charts row.
    south_america_maps_button.on("click", () => {
        hide_all_rows()
        d3.select("#south_america_maps_row").classed("hidden", false)
    })

    // Append the "Los Angeles Map" button to the button group.
    var los_angeles_map_button = button_group
        .append("button")
        .attr("type", "button")
        .attr("class", "btn btn-primary cardinal_background gold_color")
        .text("Los Angeles Map")

    // Clicking on the "Los Angeles Map" button will display the los angeles map row.
    los_angeles_map_button.on("click", () => {
        hide_all_rows()
        d3.select("#los_angeles_map_row").classed("hidden", false)
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
}

function hide_all_rows() {

    // Hide all rows except the heading and navigation.
    d3.select("#assignment_row").classed("hidden", true)
    d3.select("#south_america_maps_row").classed("hidden", true)
    d3.select("#los_angeles_map_row").classed("hidden", true)
}
