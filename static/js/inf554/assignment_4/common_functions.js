function set_global_variables() {

    console.log("set_global_variables was called.")

    // Define svg size.
    g.svg_width = Math.floor(window.innerWidth * (8 / 12))
    g.svg_height = Math.floor(window.innerHeight * (6 / 12))

    // Define margins.
    g.top_margin = Math.floor(g.svg_height * 0.05)
    g.bottom_margin = Math.floor(g.svg_height * 0.10)
    g.left_margin = Math.floor(g.svg_width * 0.15)
    g.right_margin = Math.floor(g.svg_width * 0.05)

    // Define borders.
    g.top_border = g.top_margin
    g.bottom_border = g.svg_height - g.bottom_margin
    g.left_border = g.left_margin
    g.right_border = g.svg_width - g.right_margin

    // Define chart area.
    g.chart_width = g.svg_width - g.left_margin - g.right_margin
    g.chart_height = g.svg_height - g.top_margin - g.bottom_margin

    // Debugging
    console.log(" ")
    console.log("Define svg size.")
    console.log("g.svg_width:  " + g.svg_width)
    console.log("g.svg_height:  " + g.svg_height)

    console.log(" ")
    console.log("Define margins")
    console.log("g.top_margin:  " + g.top_margin)
    console.log("g.bottom_margin:  " + g.bottom_margin)
    console.log("g.left_margin:  " + g.left_margin)
    console.log("g.right_margin:  " + g.right_margin)

    console.log(" ")
    console.log("Define borders.")
    console.log("g.top_border:  " + g.top_border)
    console.log("g.bottom_border:  " + g.bottom_border)
    console.log("g.left_border:  " + g.left_border)
    console.log("g.right_border:  " + g.right_border)

    console.log(" ")
    console.log("Define chart area.")
    console.log("g.chart_width:  " + g.chart_width)
    console.log("g.chart_height:  " + g.chart_height)

    console.log(" ")
    console.log(" ")
}

