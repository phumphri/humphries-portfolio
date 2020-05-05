function build_heading_row() {

    // Append heading row.
    var heading_row = container_fluid
        .append("row")
        .attr("id", "heading_row")
        .attr("class", "row cardinal_background")
        .style("height", 80)

    // Append USC logo column.
    heading_row.append("div")
        .attr("class", "col-sm-3 cardinal_background project_name")
        .append("p")
        .append("img")
        .attr("src", "https://vsoeapp1.vsoe.usc.edu/images/USC-Bar-cardinal.gif")

    // Append the title column.
    heading_row.append("div")
        .attr("class", "col-sm-6 cardinal_background project_name")
        .append("p")
        .text("South America Energy")

    // Append the credits column.
    var credits_div = heading_row.append("div")
        .attr("class", "col-sm-3 cardinal_background")

    // Append student's name to the credits column.
    credits_div
        .append("p")
        .attr("class", "gold_color")
        .text("Patrick Humphries, M.B.A.")

    // Append the class name to the credits column.
    credits_div
        .append("p")
        .attr("class", "gold_color")
        .text("INF 554 Information Visualization")

    // Append the semester to the credits column.
    credits_div
        .append("p")
        .attr("class", "gold_color")
        .text("Fall 2019")
}

