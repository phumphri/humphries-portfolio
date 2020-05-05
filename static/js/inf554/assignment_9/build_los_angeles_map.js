function build_los_angeles_map() {

    // Define local variables
    v = {}

    // Execute nested functions to build the los angeles maps.
    set_margins()
    set_width_and_height()
    set_up_svg()
    build_cities_map()
    build_bikepath_map()

    function set_margins() {

        var s = "los_angeles_map_div"

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
        g.los_angeles_map_div.style.height = v.window.height.toString() + "px"

        // Calculate the visualiztion dimensions.
        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.los_angeles_map_svg = d3.select("#los_angeles_map_svg")

        // If not found, create one.
        if (v.los_angeles_map_svg.empty()) {
            v.los_angeles_map_svg = g.los_angeles_map_div
                .append('svg')
                .attr('id', 'los_angeles_map_svg')
        }

        // Configure the svg.
        v.los_angeles_map_svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
    }

    function build_cities_map() {

        var d = g.los_angeles_data

        //Define map projection
        var projection = d3.geoMercator()
            .center([g.longitude, g.latitude])
            .translate([v.width / 2, v.height / 2])
            .scale([g.zoom]);

        //Define path generator.
        var los_angeles_map_path = d3.geoPath()
            .projection(projection);

        // Draw paths.
        v.los_angeles_map_svg.selectAll(".black_path")
            .data(d.features)
            .enter()
            .append("path")
            .attr("class", "black_path")
            .attr("d", los_angeles_map_path)
            .attr("fill", "ivory")
            .attr("stroke", "black")

        v.los_angeles_map_svg.selectAll(".black_path")
            .data(d.features)
            .attr("d", los_angeles_map_path)
    }

    function build_bikepath_map() {

        var d = g.los_angeles_geojson

        //Define map projection
        var projection = d3.geoMercator()
            .center([g.longitude, g.latitude])
            .translate([v.width / 2, v.height / 2])
            .scale([g.zoom])

        //Define path generator.
        var los_angeles_map_path = d3.geoPath()
            .projection(projection)

        // Draw paths.
        v.los_angeles_map_svg.selectAll(".blue_path")
            .data(d.features)
            .enter()
            .append("path")
            .attr("class", "blue_path")
            .attr("d", los_angeles_map_path)
            .attr("style", "stroke:blue; stroke-width:2; fill-opacity:0")
            .on("mouseover", (d, i) => {

                // Change south america card title to the current country.
                document.getElementById("los_angeles_card_title").innerHTML = d.properties.facility
                var format = d3.format(",")
                // Details
                var s = "From:  " + d.properties.from_
                document.getElementById("p1").innerHTML = s

                s = "To:  " + d.properties.to_
                document.getElementById("p2").innerHTML = s

                s = ""
                document.getElementById("p3").innerHTML = s

            })
            .on("mouseleave", (d, i) => {

                // Reset the los angeles card.
                document.getElementById("los_angeles_card_title").innerHTML = "Instructions"
                s = 'Hover over a blue bikeway for additional information here. '
                document.getElementById("p1").innerHTML = s
                document.getElementById("p2").innerHTML = ""
                document.getElementById("p3").innerHTML = ""
            })

        v.los_angeles_map_svg.selectAll(".blue_path")
            .attr("d", los_angeles_map_path)
            .attr("style", "stroke:blue; stroke-width:2; fill-opacity:0")
    }
}
