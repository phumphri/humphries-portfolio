

// Define global variables.
g = {}
g.south_america_dataset = []
g.south_america_geojson = {}
g.zoom = 20000
g.longitude = -118
g.latitude = 34.5


function main() {

    // Append the top-level bootstrap container.
    container_fluid = d3.select("body")
        .append("div")
        .attr("class", "container-fluid")

    // Build rows.
    // build_heading_row()
    build_navigation_row()
    build_south_america_maps_row()
    build_los_angeles_map_row()
    build_assignment_row()

    // Load data and build maps.
    load_south_america_data()

    // Resize everything when the window is resized.
    window.onresize = () => { location.reload(); }
}

function load_south_america_data() {

    // Select the data for the first ten countries.
    d3.json("/static/json/inf554/assignment_9/data.json")
        .then((d) => {

            for (var i = 0; i < d.length; i++) {

                // Convert json objects to javascript objects.
                var e = {}
                e.year = d[i]["Year"]
                e.country = d[i]["Country"]
                e.series = d[i]["Series"]
                e.value = d[i]["Value"]

                // Select data only for year 2016.
                if (e.year != "2016") {
                    continue
                }

                // Reduce the size of the Series string.
                if (e.series.includes("production")) { e.series = "Production" }
                else if (e.series.includes("imports")) { e.series = "Imports" }
                else if (e.series.includes("stocks")) { e.series = "Stocks" }
                else if (e.series.includes("supply")) { e.series = "Supply" }
                else if (e.series.includes("per capita")) { e.series = "Per Capita" }
                else {
                    continue
                }
                // Remove South America and countries with questionable data.
                if (e.country.includes("South")) { continue }
                if (e.country.includes("Guyana")) { continue }
                if (e.country.includes("Suriname")) { continue }

                // Shorten the country name.
                if (e.country.includes("Bolivia")) { e.country = "Bolivia" }
                if (e.country.includes("Venezuela")) { e.country = "Venezuela" }

                // Convert Value to type integer after removing commas.
                e.value = e.value.replace(",", "")
                e.value = parseInt(e.value)

                // Add record to dataset.
                var south_america_data_record = { series: e.series, year: e.year, country: e.country, value: e.value }
                g.south_america_dataset.push(south_america_data_record)
            }

            // Make a map of the dataset so it can be randomly joined with south america geojson.
            g.energy_map = d3.map(g.south_america_dataset, function (d) {
                var key = [d.country, d.series]
                return key
            })

            load_south_america_geojson()

            // Log any errors.
        }).catch(console.log.bind(console))
}

function load_south_america_geojson() {

    // Load south america geojson data.
    d3.json("/static/json/inf554/assignment_9/south_america.json").then((d) => {

        // Update geojson data with production data.
        var features = d.features

        for (var i = 0; i < features.length; i++) {

            var feature = features[i]
            var properties = feature.properties
            var country = properties.name
            var o = g.energy_map.get([country, "Production"])
            if (typeof o == "undefined") {
                d.features[i].properties.production = 0
            } else {
                d.features[i].properties.production = o.value
            }
        }

        // Make data available for all scripts.
        g.south_america_geojson = d

        // Build south america maps.
        build_south_america_maps()

    }).catch(console.log.bind(console))
}

function load_los_angeles_data() {

    d3.json("/static/json/inf554/assignment_9/City Boundaries.geojson").then((d) => {

        g.los_angeles_data = d

        load_los_angeles_geojson()

    }).catch(console.log.bind(console))
}

function load_los_angeles_geojson() {

    // Load los angeles geojson data.
    d3.json("/static/json/inf554/assignment_9/LA County Bikeways.geojson").then((d) => {

        // Update geojson data with los angeles data.
        var features = d.features

        for (var i = 0; i < features.length; i++) {

            var feature = features[i]
            var properties = feature.properties
            // var country = properties.name
            // var o = g.energy_map.get([country, "Production"])
            // if (typeof o == "undefined") {
            //     d.features[i].properties.production = 0
            // } else {
            //     d.features[i].properties.production = o.value
            // }
        }

        // Make data available for all scripts.
        g.los_angeles_geojson = d

        // Build los angeles maps.
        build_los_angeles_map()

    }).catch(console.log.bind(console))

}

function resize_maps() {
    build_south_america_maps()
}

function ramp(color, n = 256) {
    const canvas = DOM.canvas(n, 1);
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 1, 1);
    }
    return canvas;
}

function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
} = {}) {

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

    let x;

    // Continuous
    if (color.interpolator) {
        x = Object.assign(color.copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
            { range() { return [marginLeft, width - marginRight]; } });

        svg.append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(color.interpolator()).toDataURL());

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
            if (tickValues === undefined) {
                const n = Math.round(ticks + 1);
                tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
            }
            if (typeof tickFormat !== "function") {
                tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
            }
        }
    }

    // Discrete
    else if (color.invertExtent) {
        const thresholds
            = color.thresholds ? color.thresholds() // scaleQuantize
                : color.quantiles ? color.quantiles() // scaleQuantile
                    : color.domain(); // scaleThreshold

        const thresholdFormat
            = tickFormat === undefined ? d => d
                : typeof tickFormat === "string" ? d3.format(tickFormat)
                    : tickFormat;

        x = d3.scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
    }

    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));

    return svg.node();
}

