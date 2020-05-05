// Dataset used by all visualizations.
dataset = []

// Display year 2008, year 2018, or all years.
mode = "All"

// Bootstrap used for responsive page layout.
container_fluid = null

function main() {

    // Append the top-level bootstrap container.
    container_fluid = d3.select("body").append("div").attr("class", "container-fluid")


    // Load metadata, data, and build everything.
    load_metadata()
}
function load_metadata() {

    // Select the metadata for the first ten countries.
    d3.json("/static/json/inf554/assignment_6/metadata.json")
        .then((d) => {

            for (var i = 0; i < d.length; i++) {
                var row = {
                    key: i,
                    code: d[i]["CountryCode"],
                    name: d[i]["CountryName"],
                    region: d[i]["Region"],
                    income: d[i]["IncomeGroup"]
                }

                // Add metadata to the dataset.
                dataset.push(row)

                // Limit metadata to the first ten countries.
                if (dataset.length > 9) {
                    break
                }
            }

            // Load data into the dataset.
            load_data()

        }).catch(console.log.bind(console))
}

function load_data() {

    // Load data and build charts.
    d3.json("/static/json/inf554/assignment_6/data.json")
        .then((d) => {

            // Quit for loop when the number of updates is ten.
            var number_of_updates = 0

            // Update the dataset from data file, matching on Country Code.
            for (var i = 0; i < d.length; i++) {
                var dataset_index = dataset.findIndex((e) => { return e.code == d[i]["CountryCode"] })
                if (dataset_index > -1) {
                    dataset[dataset_index].value_2008 = Math.floor(d[i]["2008"])
                    dataset[dataset_index].value_2018 = Math.floor(d[i]["2018"])
                    if (++number_of_updates > 9) {
                        break
                    }
                }
            }

            // Build everything after successful load of metadata and data.
            build_everything()

        }).catch(console.log.bind(console))
}

function resize_window() {

    // Adjust everything.
}
function build_everything() {

    // Build rows.  
    // build_heading_row()
    build_navigation_row()
    build_assignment_row()
    build_slopegraph_row()
    build_bar_graph_row()
    build_lollipop_chart_row()
    build_bubble_chart_row()

    // Make all rows visible.
    d3.select("#navigation_row").classed("hidden", false)
    d3.select("#assignment_row").classed("hidden", false)
    d3.select("#slopegraph_row").classed("hidden", false)
    d3.select("#bar_graph_row").classed("hidden", false)
    d3.select("#lollipop_chart_row").classed("hidden", false)
    d3.select("#bubble_chart_row").classed("hidden", false)

    // Resize everything when the window is resized.
    window.addEventListener('resize', resize_window)
}


function resize_window() {
    update_bar_graph()
    update_lollipop_chart()
    update_bubble_chart()
}

