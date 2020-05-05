function build_bar_chart() {

    // Define local variables
    v = {}

    // Execute nested functions to build the bar chart.
    set_margins()
    set_width_and_height()
    set_up_svg()
    determine_min_max()
    calculate_domains()
    calculate_scales()
    calculate_axis()
    append_all_bars()
    append_x_axis()
    append_y_axis()
    adjust_font_sizes()

    function set_margins() {

        v.window = {}
        v.window.width = Math.floor(window.innerWidth * 0.60)
        v.window.height = Math.floor(window.innerHeight * 0.60)

        v.margin = {}
        v.margin.top = Math.floor(v.window.height * 0.10)
        v.margin.right = Math.floor(v.window.width * 0.10)
        v.margin.bottom = Math.floor(v.window.height * 0.15)
        v.margin.left = Math.floor(v.window.width * 0.15)
    }

    function set_width_and_height() {

        g.bar_chart_div.style.width = v.window.width.toString() + "px"
        g.bar_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.svg = d3.select("#svg")

        // If not found, create one.
        if (v.svg.empty()) {
            v.svg = g.bar_chart_div
                .append('svg')
                .attr('id', 'svg')
        }

        // Configure the svg.
        v.svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .style("background-color", "mistyrose")
    }
    // Back here

    function determine_min_max() {

        // Get a reference to the currently filtered data.
        var d = g.selected_data

        // Determine the minimum and maximum values for y domain, scale, and axis.
        v.min_y = d3.min(d, (d) => { return d.value })
        v.max_y = d3.max(d, (d) => { return d.value })
    }

    function calculate_domains() {

        // Define the y domain based on filtered dataset values.
        v.min_y = 0
        v.y_domain = [v.max_y, v.min_y]

        // Define the x domain based on unique country names in the selected data.
        v.x_domain = []

        // Get a reference to the selected data.
        var d = g.selected_data

        // Read through the selected data looking for country names.
        for (var i = 0; i < d.length; i++) {

            // Get a country name.
            var key = d[i].key

            // Only add unique country names.
            if (v.x_domain.indexOf(key) == -1) {
                v.x_domain.push(key)
            }

            // There are only ten countries, so quit when ten are found.
            if (v.x_domain.length > 9) {
                break
            }
        }
    }

    function calculate_scales() {

        // The x scale consists of country names, so band scale is used.
        v.x_scale = d3.scaleBand()
            .domain(v.x_domain)
            .rangeRound([v.margin.left, v.width + v.margin.left])
            .padding([0.1])

        // The same y axis will use the y domain that will change depending on selected data.
        v.y_scale = d3.scaleLinear()
            .domain(v.y_domain)
            .range([v.margin.top, v.margin.top + v.height])
    }

    function calculate_axis() {

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.x_axis = d3.axisBottom()
            .scale(v.x_scale)

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.y_axis = d3.axisLeft()
            .scale(v.y_scale)
    }

    function append_all_bars() {

        v.additional_time = 0
        if (g.sort_only) {
            () => { }
        } else {
            if (g.select_top_five) { v.additional_time = g.duration }
            if (g.select_bottom_five) { v.additional_time = g.duration }
        }

        // Get a reference to the bars group.
        var bars_group = v.svg.select("#bars_group")

        // If not found, create one.
        if (bars_group.empty()) {
            v.svg.append("g")
                .attr("id", "bars_group")
        }

        // Get the selection of bars with data.
        var bars = bars_group
            .selectAll("g")
            .data(g.selected_data, (d) => { return d.key })

        // Relocate current bars.
        bars
            .on('start', razel_dazel(v))
            .transition()
            .duration(g.duration)
            .delay((d, i) => { return (i * 500) + v.additional_time })
            .attr("transform", (d) => {
                var x = v.x_scale(d.key)
                var y = v.y_scale(d.value)
                var s = "translate(" + x + "," + y + ")"
                return s
            })

        // Move exiting bars off to the right, out of sight.
        var stage_right = (v.margin.left + v.width + v.margin.right)
        bars.exit()
            .transition()
            .duration(g.duration)
            .delay((d, i) => { return i * 500 })
            .attr("transform", (d) => {
                var x = stage_right
                var y = v.y_scale(d.value)
                var s = "translate(" + x + "," + y + ")"
                return s
            })

        // Append a rectangle to the entering bars.
        // Position is determined by the bar.
        var entered_bars = bars.enter()
            .append("g")
            .attr("id", (d) => { return "group_" + d.key })
            .attr("height", (d) => { return v.height + v.margin.top - v.y_scale(d.value) })
            .attr("width", () => { return v.x_scale.bandwidth() })
            .attr("transform", (d) => {
                var x = v.x_scale(d.key)
                var y = v.y_scale(d.value)
                var s = "translate(" + x + "," + y + ")"
                return s
            })

        // Update width and hieght of existing rectangles.
        // Position is determined by the containing bar ("g element").
        bars.select("rect")
            .transition()
            .duration(g.duration)
            .delay((d, i) => { return (v.additional_time * 2) })
            .attr("height", (d) => { return v.height + v.margin.top - v.y_scale(d.value) })
            .attr("width", () => { return v.x_scale.bandwidth() })

        // Add rectangles with tooltips to the entering bars.
        // Rectangle position is determined by the containing bar ("g" element).
        entered_bars
            .append("rect")
            .attr("class", "cardinal_color rect")
            .attr("height", (d) => { return v.height + v.margin.top - v.y_scale(d.value) })
            .attr("width", () => { return v.x_scale.bandwidth() })
            .attr("fill", "#990000")
            .on("mouseover", (d) => {
                var xPosition = v.x_scale(d.key) + v.x_scale.bandwidth() / 2
                var yPosition = v.y_scale(d.value) + 14
                var country = d.key
                var value = d.value

                v.svg.append("rect")
                    .attr("id", "tooltip_rect")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("height", 28)
                    .attr("width", v.x_scale.bandwidth() * 2)
                    .attr("fill", "mistyrose")

                v.svg.append("text")
                    .attr("id", "tooltip_text")
                    .attr("x", xPosition + 2)
                    .attr("y", yPosition + 21)
                    .attr("text-anchor", "start")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "14px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(() => { return country + ": " + value })
            })
            .on("mouseout", () => {
                d3.select("#tooltip_rect").remove()
                d3.select("#tooltip_text").remove()
            })

        // Add country names to the bars ("text" element).
        // Put the country name above the bar if the bar is short.
        // The position of the text is determined by the containing bar ("g" element).
        entered_bars
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("class", "text-center rect_text")
            .attr("fill", (d) => {
                var bottom_border = v.margin.top + v.height
                var y = v.y_scale(d.value) + 20
                if (y > bottom_border - 10) {
                    return "black"
                } else {
                    return "white"
                }
            })
            .attr("x", () => { return v.x_scale.bandwidth() / 2 })
            .attr("y", (d) => {
                bottom_border = v.margin.top + v.height
                y = v.y_scale(d.value) + 20
                if (y > bottom_border - 10) {
                    y = -10
                } else {
                    y = 20
                }
                return Math.round(y)
            })
            .text((d) => { return d.key })
    }

    function append_x_axis() {

        // Get a references to the x axis.
        v.x_axis_group = d3.select("#x_axis_group")

        // If not found, create one.
        if (v.x_axis_group.empty()) {
            v.x_axis_group = v.svg.append("g")
                .attr("id", "x_axis_group")
        }

        // Relocate the x axis to a new location if window is resized.
        v.x_axis_group
            .transition()
            .duration(g.duration)
            .delay((d, i) => { return (i * 500) })
            .attr("transform", "translate(0," + (v.margin.top + v.height) + ")")
            .call(v.x_axis)

        // Get the label for the x axis.
        v.x_axis_label = d3.select("#x_axis_label")

        // If not found, create one.
        if (v.x_axis_label.empty()) {
            v.x_axis_label = v.x_axis_group
                .append("text")
                .attr("id", "x_axis_label")
        }

        // Relocate and populate the x axis label.
        v.x_axis_label
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.margin.left + v.width / 2)
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text("Ten Soverign Countries of South America")
    }

    function append_y_axis() {

        // Get the y axis.
        v.y_axis_group = d3.select("#y_axis_group")

        // If not found, create one.
        if (v.y_axis_group.empty()) {
            v.y_axis_group = v.svg.append("g")
                .attr("id", "y_axis_group")
        }

        // Relocate the y axis if the window is resized.
        v.y_axis_group
            .transition()
            .duration(g.duration)
            .attr("transform", "translate(" + v.margin.left + ",0)")
            .call(v.y_axis)

        // Get the label for the y axis.
        v.y_axis_label = d3.select("#y_axis_label")

        // If not found, create one.
        if (v.y_axis_label.empty()) {
            v.y_axis_label = v.y_axis_group
                .append('text')
                .attr("id", "y_axis_label")
        }

        // Relocate and populate the y axis label.
        v.y_axis_label
            .attr("transform", "rotate(-90)")
            .attr("y", (v.margin.left * 0.7) * (-1))
            .attr("x", Math.floor(((v.height / 2) * (-1))))
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text("Energy Production (petajoules)")

        // Set the legend for the bar chart legend.
        // This is visage of original code that had multiple dimensions.
        d3.select("#bar_chart_legend")
            .text("Bar Chart:  South America Energy Production for Year 2016")
    }

    function adjust_font_sizes() {

        // Resize font size when the window is resized.
        if (v.margin.left > 100) {
            v.svg.selectAll(".tick").style("font-size", "small")
            v.svg.selectAll("text").style("font-size", "small")
            d3.selectAll("label").style("font-size", "small")
            return
        }

        if (v.margin.left > 50) {
            v.svg.selectAll(".tick").style("font-size", "x-small")
            v.svg.selectAll("text").style("font-size", "x-small")
            d3.selectAll("label").style("font-size", "x-small")
            return
        }

        v.svg.selectAll(".tick").style("font-size", "xx-small")
        v.svg.selectAll("text").style("font-size", "xx-small")
        d3.selectAll("label").style("font-size", "xx-small")
    }
}

