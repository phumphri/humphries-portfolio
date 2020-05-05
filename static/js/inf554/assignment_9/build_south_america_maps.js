function build_south_america_maps() {

    // Define local variables
    v = {}

    // Execute nested functions to build the circle packing chart.
    set_margins()
    set_width_and_height()
    set_up_svg()
    build_chart()

    function set_margins() {

        var s = "proportional_symbol_map_div"

        v.window = {}

        // Get the window width from the width of the div created by Boostrap. 
        v.window.width = document.getElementById(s).offsetWidth

        // Get the window height from the display height.
        v.window.height = Math.floor(window.innerHeight * 0.65)

        // Calculate margins as a fraction of the window.
        v.margin = {}
        v.margin.top = Math.floor(v.window.height * 0.10)
        v.margin.right = Math.floor(v.window.width * 0.10)
        v.margin.bottom = Math.floor(v.window.height * 0.15)
        v.margin.left = Math.floor(v.window.width * 0.15)
    }

    function set_width_and_height() {

        // Set the height of the window.
        g.proportional_symbol_map_div.style.height = v.window.height.toString() + "px"

        // Calculate the visualiztion dimensions.
        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.proportional_symbol_map_svg = d3.select("#proportional_symbol_map_svg")
        v.choropleth_map_svg = d3.select("#choropleth_map_svg")

        // If not found, create one.
        if (v.proportional_symbol_map_svg.empty()) {
            v.proportional_symbol_map_svg = g.proportional_symbol_map_div
                .append('svg')
                .attr('id', 'proportional_symbol_map_svg')
        }
        if (v.choropleth_map_svg.empty()) {
            v.choropleth_map_svg = g.choropleth_map_div
                .append('svg')
                .attr('id', 'choropleth_map_svg')
        }

        // Configure the svg.
        v.proportional_symbol_map_svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)

        v.choropleth_map_svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
    }

    function build_chart() {

        var d = g.south_america_geojson

        //Define map projection
        var projection = d3.geoMercator()
            .center([-40, -15])
            .translate([v.margin.left + v.width / 2, v.height / 2])
            .scale([d3.min([v.height, v.width])]);

        //Define path generators.
        var proportional_symbol_map_path = d3.geoPath()
            .projection(projection);
        var choropleth_map_path = d3.geoPath()
            .projection(projection);

        // Draw paths.
        v.proportional_symbol_map_svg.selectAll("path")
            .data(d.features)
            .enter()
            .append("path")
            .attr("d", proportional_symbol_map_path)
            .attr("fill", "ivory")
            .attr("stroke", "black")
            .on("mouseover", (d, i) => {

                // Change south america card title to the current country.
                document.getElementById("south_america_card_title").innerHTML = d.properties.name
                var format = d3.format(",")
                // Details
                var s = "Production (petajoules):  " + format(d.properties.production)
                document.getElementById("south_america_card_production").innerHTML = s

                s = "Population:  " + format(d.properties.pop_est)
                document.getElementById("south_america_card_population").innerHTML = s

                s = "GDP:  " + format(d.properties.gdp_md_est)
                document.getElementById("south_america_card_gdp").innerHTML = s

            })
            .on("mouseleave", (d, i) => {

                // Reset the south america card.
                document.getElementById("south_america_card_title").innerHTML = "Instructions"
                s = 'Hover over a country additional information here. '
                document.getElementById("south_america_card_production").innerHTML = s
                document.getElementById("south_america_card_population").innerHTML = " "
                document.getElementById("south_america_card_gdp").innerHTML = "Boffo!"
            })

        var colorScale = d3.scaleQuantize()
            .domain([1, 15000])
            .range(colorbrewer.Greens[9])

        v.choropleth_map_svg.selectAll("path")
            .data(d.features)
            .enter()
            .append("path")
            .attr("d", choropleth_map_path)
            .attr("fill", (d) => { return colorScale(d.properties.production) })
            .attr("stroke", "black")
            .on("mouseover", (d, i) => {

                // Change south america card title to the current country.
                document.getElementById("south_america_card_title").innerHTML = d.properties.name
                var format = d3.format(",")
                // Details
                var s = "Production (petajoules):  " + format(d.properties.production)
                document.getElementById("south_america_card_production").innerHTML = s

                s = "Population:  " + format(d.properties.pop_est)
                document.getElementById("south_america_card_population").innerHTML = s

                s = "GDP:  " + format(d.properties.gdp_md_est)
                document.getElementById("south_america_card_gdp").innerHTML = s

            })
            .on("mouseleave", (d, i) => {

                // Reset the south america card.
                document.getElementById("south_america_card_title").innerHTML = "Instructions"
                s = 'Hover over a country additional information here. '
                document.getElementById("south_america_card_production").innerHTML = s
                document.getElementById("south_america_card_population").innerHTML = " "
                document.getElementById("south_america_card_gdp").innerHTML = "Boffo!"
            })

        // Create a linear scale for circles.
        v.circle_scale = d3.scaleLinear()
            .domain([1, 15000])
            .range([1, (        d3.min([v.width, v.height])      /6)])

        // Draw circles.
        v.proportional_symbol_map_svg.selectAll("circle")
            .data(d.features.filter((d) => {

                if (d.properties.name === "Guyana") { return false }
                if (d.properties.name === "Suriname") { return false }
                if (d.properties.name === "Falkland Is.") { return false }
                return true

            }))
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                if (d.geometry.coordinates.length == 1) {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[0])
                } else {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[1][0])
                }
                return projection(centroid)[0]
            })
            .attr("cy", (d) => {
                if (d.geometry.coordinates.length == 1) {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[0])
                } else {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[1][0])
                }
                return projection(centroid)[1]
            })
            .attr("r", (d) => {
                // var r = Math.sqrt(parseInt(d.properties.production)) * 0.4
                var r = v.circle_scale(d.properties.production)
                return r
            })
            .attr("fill", "lightgreen")
            .attr("stroke", "red")
            .attr("opacity", 0.5)

        // Draw text.
        v.proportional_symbol_map_svg.selectAll("text")
            .data(d.features.filter((d) => {

                if (d.properties.name === "Guyana") { return false }
                if (d.properties.name === "Suriname") { return false }
                if (d.properties.name === "Falkland Is.") { return false }
                return true

            }))
            .enter()
            .append("text")
            .attr("x", (d) => {
                if (d.geometry.coordinates.length == 1) {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[0])
                } else {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[1][0])
                }
                return projection(centroid)[0]
            })
            .attr("y", (d) => {
                if (d.geometry.coordinates.length == 1) {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[0])
                } else {
                    var centroid = d3.polygonCentroid(d.geometry.coordinates[1][0])
                }
                return projection(centroid)[1]
            })
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "mathematical")
            .text((d) => {
                return d.properties.sov_a3
            })

        build_proportional_symbol_legend()

        v.choropleth_map_svg.selectAll("path")
            .data(d.features)
            .enter()
            .append("path")
            .attr("d", proportional_symbol_map_path)


        build_choropleth_legend()

        // Load data and build maps for los angeles.
        load_los_angeles_data()
    }

    function build_proportional_symbol_legend() {
        v.proportional_symbol_map_svg.append("circle")
            .attr("cx", (d) => { return v.margin.left + v.width })
            .attr("cy", (d) => { return v.margin.top})
            .attr("r", (d) => { return v.circle_scale(15000) })
            .attr("fill", "lightgreen")
            .attr("stroke", "red")
            .attr("opacity", 0.5)

        v.proportional_symbol_map_svg.append("text")
            .attr("x", (d) => { return v.margin.left + v.width })
            .attr("y", (d) => { return v.margin.top })
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "mathematical")
            .text((d) => { return "15,000" })

        v.proportional_symbol_map_svg.append("circle")
            .attr("cx", (d) => { return v.margin.left + v.width })
            .attr("cy", (d) => { return v.margin.top + 100 })
            .attr("r", (d) => { return v.circle_scale(10000) })
            .attr("fill", "lightgreen")
            .attr("stroke", "red")
            .attr("opacity", 0.5)

        v.proportional_symbol_map_svg.append("text")
            .attr("x", (d) => { return v.margin.left + v.width })
            .attr("y", (d) => { return v.margin.top + 100 })
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "mathematical")
            .text((d) => { return "10,000" })

        v.proportional_symbol_map_svg.append("circle")
            .attr("cx", (d) => { return v.margin.left + v.width })
            .attr("cy", (d) => { return v.margin.top + 180 })
            .attr("r", (d) => { return v.circle_scale(5000) })
            .attr("fill", "lightgreen")
            .attr("stroke", "red")
            .attr("opacity", 0.5)

        v.proportional_symbol_map_svg.append("text")
            .attr("x", (d) => { return v.margin.left + v.width })
            .attr("y", (d) => { return v.margin.top + 180 })
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "mathematical")
            .text((d) => { return "5,000" })
    }

    function build_choropleth_legend() {

        var svg_node = legend({
            color: d3.scaleQuantize([1, 10], d3.schemeGreens[9]),
            title: "Production (exajoules)"
        })

        d3.select("#choropleth_legend_div").node().append(svg_node)
    }
}
