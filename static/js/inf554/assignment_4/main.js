// Global variable available for all functions.
g_b_svg = null

g = {

    // Metadata and data for all components
    metadata: [],
    data: [],
    svg_width: 500,
    svg_height: 300,
    top_margin: 50,
    bottom_margin: 50,
    left_margin: 50,
    right_margin: 50,
    top_border: 50,
    bottom_border: 250,
    left_border: 50,
    right_border: 450,
    chart_width: 400,
    chart_height: 200,
    min_percentage: 0,
    max_ercentage: 100,

    // Variables specific to Bar Chart.
    b: {
        svg: null,
        x_domain: [],
        x_scale:  null,
        x_axis:  null,
        y_domain: [],
        y_scale: null,
        y_scale_reverse: null,
        y_axis:  null
    },

    // Variables specific to Scatterplot Chart.
    s: {
        svg: null,
        x_domain: [],
        x_scale:  null,
        x_axis:  null,
        y_domain: [],
        y_scale: null,
        y_scale_reverse: null,
        y_axis:  null,
        c_domain: [],
        c_range: [],
        c_scale: []
    },

    // Variables specific to Bubble Chart.
    u: {
        svg: null,
        x_domain: [],
        x_scale:  null,
        x_axis:  null,
        y_domain: [],
        y_scale: null,
        y_scale_reverse: null,
        y_axis:  null,
        r_domain: [],
        r_scale: []
    }

}

function main() {

    console.log(" ")
    console.log("===== debug =====")
    console.log("Updated main was called.")
    console.log(" ")

    // Initialize metadata structure.
    g.metadata = []

    // Format the URL that is handled by app.js.
    // url_for_metadata = "/Assignment%2004/static/csv/metadata.csv"
    url_for_metadata = "/static/csv/inf554/assignment_4/metadata.csv"
    console.log("url_for_metata:  " + url_for_metadata)

    // Select the metadata for the first twenty countries.
    d3.csv(url_for_metadata)
        .then((d) => {

            for (var i = 0; i < d.length; i++) {
                var row = {
                    code: d[i]["Country Code"],
                    name: d[i]["Country Name"],
                    region: d[i]["Region"],
                    income: d[i]["Income Group"]
                }
                console.log("row:  " + row.code + ", " + row.name + ", " + row.region + ", " + row.income)
                g.metadata.push(row)
                if (g.metadata.length > 19) {
                    break
                }
            }

            // Load data for all countries to be joined with metadata later.
            load_data()

        }).catch(console.log.bind(console))
}

function load_data() {

    console.log("load_data was called.")

    // Initialize data structure.
    g.data = []

    // Format URL that will be handled by app.js.
    // url_for_metadata = "/Assignment%2004/static/csv/data.csv"
    url_for_metadata = "/static/csv/inf554/assignment_4/data.csv"
    console.log("url_for_metata:  " + url_for_metadata)

    // Load data and build charts.
    d3.csv(url_for_metadata)
        .then((d) => {

            for (var i = 0; i < d.length; i++) {
                var row = {
                    code: d[i]["Country Code"],
                    value: d[i]["2018"]
                }
                g.data.push(row)
            }

            // Build everything after successful load of metadata and data.
            build_everything()

            // Rebuild everything when the window is resized.
            window.addEventListener('resize', resize_window)

        }).catch(console.log.bind(console))
}

function resize_window() {
    
    console.log("resize_window was called.")

    build_everything()
}
function build_everything() {

    console.log("build_everything was called.")

    // Set global variables based on screen size.
    set_global_variables()

    // Build the components.
    build_html_table()
    build_bar_chart()
    build_scatterplot_chart()
    build_bubble_chart()
}

