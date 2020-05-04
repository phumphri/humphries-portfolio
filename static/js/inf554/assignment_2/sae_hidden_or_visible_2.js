function sae_hidden_or_visible_2(row_id) {

    // Get references to all of the rows.
    var assignment = document.getElementById("assignment")
    var inkscape = document.getElementById("inkscape")
    var svg = document.getElementById("svg")

    // Hide all rows.
    assignment.className = "row hidden"
    inkscape.className = "row hidden"
    svg.className = "row hidden"

    // Unhide the selected row.
    switch (row_id) {
        case "assignment":
            assignment.className = "row visible"
            break
        case "inkscape":
            inkscape.className = "row visible"
            break
        case "svg":
            svg.className = "row visible"
            break
        default:
            assignment.className = "row visible"
            inkscape.className = "row visible"
            svg.className = "row visible"
            break
    }
}