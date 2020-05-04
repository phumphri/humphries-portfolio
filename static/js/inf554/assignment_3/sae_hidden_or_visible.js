function sae_hidden_or_visible(row_id) {

    // Get references to all of the rows.
    var assignment_row = document.getElementById("assignment_row")

    var infographic_1_row_display = document.getElementById("infographic_1_row_display")
    var infographic_1_row_analysis = document.getElementById("infographic_1_row_analysis")

    var infographic_2_row_display = document.getElementById("infographic_2_row_display")
    var infographic_2_row_analysis = document.getElementById("infographic_2_row_analysis")

    // Hide all rows.
    assignment_row.className = "row hidden"

    infographic_1_row_display.className = "row hidden"
    infographic_1_row_analysis.className = "row hidden"

    infographic_2_row_display.className = "row hidden"
    infographic_2_row_analysis.className = "row hidden"

    // Unhide the selected row.
    switch (row_id) {

        case "assignment_row":
            assignment_row.className = "row visible"
            break

        case "infographic_1_row":
            infographic_1_row_display.className = "row visible"
            infographic_1_row_analysis.className = "row visible"
            break

        case "infographic_2_row":
            infographic_2_row_display.className = "row visible"
            infographic_2_row_analysis.className = "row visible"
            break

        default:
            assignment_row.className = "row visible"

            infographic_1_row_display.className = "row visible"
            infographic_1_row_analysis.className = "row visible"
            
            infographic_2_row_display.className = "row visible"
            infographic_2_row_analysis.className = "row visible"
            break
    }
}