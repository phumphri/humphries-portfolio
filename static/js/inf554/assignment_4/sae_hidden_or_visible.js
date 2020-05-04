function sae_hidden_or_visible(row_id) {

    // Get references to all of the rows.
    var assignment_row = document.getElementById("assignment_row")
    var html_table_row = document.getElementById("html_table_row")
    var bar_chart_row = document.getElementById("bar_chart_row")
    var scatterplot_chart_row = document.getElementById("scatterplot_chart_row")
    var bubble_chart_row = document.getElementById("bubble_chart_row")

    // Hide all rows.
    assignment_row.className = "row hidden"
    html_table_row.className = "row hidden"
    bar_chart_row.className = "row hidden"
    scatterplot_chart_row.className = "row hidden"
    bubble_chart_row.className = "row hidden"

    // Unhide the selected row.
    switch (row_id) {
        case "assignment_row":
            assignment_row.className = "row visible"
            break
        case "html_table_row":
            html_table_row.className = "row visible"
            break
        case "bar_chart_row":
            bar_chart_row.className = "row visible"
            break
        case "scatterplot_chart_row":
            scatterplot_chart_row.className = "row visible"
            break
        case "bubble_chart_row":
            bubble_chart_row.className = "row visible"
            break
        default:
            assignment_row.className = "row visible"
            html_table_row.className = "row visible"
            bar_chart_row.className = "row visible"
            scatterplot_chart_row.className = "row visible"
            bubble_chart_row.className = "row visible"
            break
    }
}