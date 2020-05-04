function sae_hidden_or_visible(row_id) {

    // Get references to all of the rows.
    var assignment = document.getElementById("assignment")

    var series = document.getElementById("series")
    var footprint = document.getElementById("footprint")
    var country = document.getElementById("country")
    var percapita = document.getElementById("percapita")

    // Hide all rows.
    assignment.className = "row hidden"
    series.className = "row hidden"
    country.className = "row hidden"
    footprint.className = "row hidden"
    percapita.className = "row hidden"

    // Unhide the selected row.
    switch (row_id) {
        case "assignment":
            console.log('assignment')
            console.log(assignment)
            assignment.className = "row visible"
            break
        case "series":
            console.log("series")
            console.log(series)
            series.className = "row visible"
            break
        case "footprint":
            console.log("footprint")
            console.log(footprint)
            footprint.className = "row visible"
            break
        case "country":
            console.log("country")
            console.log(country)
            country.className = "row visible"
            break
        case "percapita":
            console.log("percapita")
            console.log(percapita)
            percapita.className = "row visible"
            break
        default:
            console.log("default")
            assignment.className = "row visible"
            series.className = "row visible"
            footprint.className = "row visible"
            country.className = "row visible"
            percapita.className = "row visible"
            break
    }
}