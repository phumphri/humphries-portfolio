// Define global variables.
g = {}
g.structured_json = { "name": "series", "children": [] }
g.selected_data = []
g.dataset = []
g.duration = 3000
g.line_chart_series = "Production"
g.pie_chart_series = "Production"
g.year = 1990

function main() {

    // Append the top-level bootstrap container.
    container_fluid = d3.select("body")
        .append("div")
        .attr("class", "container-fluid")

    // Load and build everything.
    load_data()
}

// Load data and build everything.
function load_data() {

    // Select the data for the first ten countries.
    d3.json("/static/json/inf554/assignment_8/data.json")
        .then((d) => {

            for (var i = 0; i < d.length; i++) {

                // Convert json objects to javascript objects.
                var e = {}
                e.Year = d[i]["Year"]
                e.Country = d[i]["Country"]
                e.Series = d[i]["Series"]
                e.Value = d[i]["Value"]

                // Reduce the size of the Series string.
                if (e.Series.includes("production")) { e.Series = "Production" }
                else if (e.Series.includes("imports")) { e.Series = "Imports" }
                else if (e.Series.includes("stocks")) { e.Series = "Stocks" }
                else if (e.Series.includes("supply")) { e.Series = "Supply" }
                else if (e.Series.includes("per capita")) { e.Series = "Per Capita" }
                else {
                    console.log("Series Rename Rejected:  " + e.Series)
                    continue
                }

                // Remove South America and countries with questionable data.
                if (e.Country.includes("South")) { continue }
                if (e.Country.includes("Guyana")) { continue }
                if (e.Country.includes("Suriname")) { continue }

                // Shorten the country name.
                if (e.Country.includes("Bolivia")) { e.Country = "Bolivia" }
                if (e.Country.includes("Venezuela")) { e.Country = "Venezuela" }

                // Convert Value to type integer after removing commas.
                e.Value = e.Value.replace(",", "")
                e.Value = parseInt(e.Value)

                // Create key values for structured json and dataset.
                var series = e.Series
                var year = e.Year
                var country = e.Country
                var value = e.Value

                // Add record to dataset.
                var dataset_record = {series:series, year:year, country:country, value:value}
                g.dataset.push(dataset_record)

                //Add series if not found.
                series_children = g.structured_json.children
                if (series_children.length == 0) {
                    series_child = { "name": series, "children": [] }
                    series_children = [series_child]
                    g.structured_json.children = series_children
                } 
                else {
                    series_child = series_children.find(function(element) {
                        return element.name === series
                    })
                    if (typeof series_child === "undefined") {
                        series_child = { "name": series, "children": [] }
                        series_children.push(series_child)
                        g.structured_json.children = series_children
                    } 
                }

                //Add year if not found.
                var series_object = g.structured_json.children.find(function(element) {
                    return element.name == series
                })

                var year_children = series_object.children

                if (year_children.length == 0) {
                    year_child = { "name": year, "children": [] }
                    year_children = [year_child]
                    series_object.children = year_children
                } 
                else {
                    year_child = year_children.find(function(element) {
                        return element.name === year
                    })
                    if (typeof year_child === "undefined") {
                        year_child = { "name": year, "children": [] }
                        year_children.push(year_child)
                        series_object.children = year_children
                    } 
                }

                //Add country if not found.
                var series_object = g.structured_json.children.find(function(element) {
                    return element.name == series
                })

                var year_object = series_object.children.find(function(element) {
                    return element.name == year
                })

                var country_children = year_object.children

                if (country_children.length == 0) {
                    country_child = { "name": country, "value": value }
                    country_children = [country_child]
                    year_object.children = country_children
                } 
                else {
                    country_child = country_children.find(function(element) {
                        return element.name === country
                    })
                    if (typeof country_child === "undefined") {
                        country_child = { "name": country, "value": value }
                        country_children.push(country_child)
                        year_object.children = country_children
                    } 
                }
            }
            console.log(" ")
            console.log("At end of load_data().")
            console.log("g.structured_json")
            console.log(g.structured_json)
            console.log(" ")
            console.log("g.dataset")
            console.log(g.dataset)

            // Data is now loaded and converted:  Build everything.
            build_document()

            // Log any errors.
        }).catch(console.log.bind(console))
}

function build_document() {

    // Build rows.  
    // build_heading_row()
    build_navigation_row()
    build_assignment_row()
    build_circle_packing_chart_row()
    build_line_chart_row()
    build_pie_chart_row()

    // Build the initial charts.  Charts are built when the row is built.
    // select_data()
    // sort_data()
    // build_circle_packing_chart()
    // build_line_chart()
    // build_pie_chart()


    // Make all rows visible.
    d3.select("#navigation_row").classed("hidden", false)
    d3.select("#assignment_row").classed("hidden", false)
    d3.select("#circle_packing_chart_row").classed("hidden", false)
    d3.select("#line_chart_row").classed("hidden", false)
    d3.select("#pie_chart_row").classed("hidden", false)
    // d3.select("#pie_chart_row").classed("hidden", false)

    // Resize everything when the window is resized.
    window.addEventListener('resize', resize_charts)
}

function resize_charts() {
    build_circle_packing_chart()
    build_line_chart()
    build_pie_chart()
}


