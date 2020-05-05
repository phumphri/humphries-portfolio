// Define global variables.
g = {}
g.dataset = []
g.selected_data = []
reset_global_variables()
g.reset = true
g.sort_by_ascending_key = true
g.duration = 3000


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

    // Select the metadata for the first ten countries.
    d3.json("/static/json/inf554/assignment_7/data.json")
        .then((d) => {

            // Temporary holder of converted data.
            g.dataset = []

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

                // Select only production for year 2016.
                if (e.Year != 2016) {
                    continue
                }
                if (e.Series != "Production") {
                    continue
                }
                f = {}
                f.key = e.Country
                f.value = e.Value 

                // Collect the converted javascript objects.
                g.dataset.push(f)
            }

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
    build_bar_chart_row()

    // Build the initial bar chart.
    select_data()
    sort_data()
    build_bar_chart()

    // console.log("build_doucument() called build_bar_chart()")
    // build_bar_chart()

    // Make all rows visible.
    d3.select("#navigation_row").classed("hidden", false)
    d3.select("#assignment_row").classed("hidden", false)
    d3.select("#bar_chart_row").classed("hidden", false)

    // Resize everything when the window is resized.
    window.addEventListener('resize', resize_bar_chart)
}

function resize_bar_chart() {
    console.log("resize_bar_chart() called build_bar_chart()")
    build_bar_chart()
}

function reset_global_variables() {
    g.reset = false
    g.select_top_five = false
    g.select_bottom_five = false
    g.select_all_ten = false
    g.sort_by_ascending_key = false
    g.sort_by_ascending_value = false
    g.sort_by_descending_value = false
}

