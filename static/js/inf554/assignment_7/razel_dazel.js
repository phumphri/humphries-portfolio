function razel_dazel(v) {

    // Define local variables.
    r = {}

    // Get a reference to the bars group.
    var bars_group = v.svg.select("#bars_group")

    // If not found, then there are no bars to sort.
    if (bars_group.empty()) {
        console.log("Exit razel_dazel():  bars_group was not found.")
        return
    }

    // Bypass if there was only a change in sort order.
    if (g.sort_only) {
        g.sort_only = false
        return
    }

    // This module is only needed for top or bottom five.
    if (g.select_top_five) {
        ()=>{}
    } else if (g.select_bottom_five) {
        ()=>{}
    } else {
        return
    }

    // Get all data
    var d = g.dataset.slice(0)

    // Sort all data depending on which five needed.
    if (g.select_top_five) {
        d.sort((a, b) => { return d3.descending(a.value, b.value) })
    } else {
        d.sort((a, b) => { return d3.ascending(a.value, b.value) })
    }

    // Execute common functions.
    determine_min_max()
    calculate_domains()
    calculate_scales()
    calculate_axis()

    // Get the selection of bars with data.
    var bars = bars_group
        .selectAll("g")
        .data(d, (d) => { return d.key })

    // Razel Dazel

    // Relocate all bars.
    bars
        .transition()
        .duration(g.duration)
        .delay((d, i) => { return (i * 500) })
        .attr("transform", (d) => {
            var x = r.x_scale(d.key)
            var y = r.y_scale(d.value)
            var s = "translate(" + x + "," + y + ")"
            return s
        })

    function determine_min_max() {

        // Determine the minimum and maximum values for y domain, scale, and axis.
        r.min_y = d3.min(d, (d) => { return d.value })
        r.max_y = d3.max(d, (d) => { return d.value })
    }

    function calculate_domains() {

        // Define the y domain based on filtered dataset values.
        r.min_y = 0
        r.y_domain = [r.max_y, r.min_y]

        // Define the x domain based on unique country names in the selected data.
        r.x_domain = []

        // Read through the selected data looking for country names.
        for (var i = 0; i < d.length; i++) {

            // Get a country name.
            var key = d[i].key

            // Only add unique country names.
            if (r.x_domain.indexOf(key) == -1) {
                r.x_domain.push(key)
            }

            // There are only ten countries, so quit when ten are found.
            if (r.x_domain.length > 9) {
                break
            }
        }
    }

    function calculate_scales() {

        // The x scale consists of country names, so band scale is used.
        r.x_scale = d3.scaleBand()
            .domain(r.x_domain)
            .rangeRound([v.margin.left, v.width + v.margin.left])
            .padding([0.1])

        // The same y axis will use the y domain that will change depending on selected data.
        r.y_scale = d3.scaleLinear()
            .domain(r.y_domain)
            .range([v.margin.top, v.margin.top + v.height])
    }

    function calculate_axis() {

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        r.x_axis = d3.axisBottom()
            .scale(r.x_scale)

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        r.y_axis = d3.axisLeft()
            .scale(r.y_scale)
    }
}