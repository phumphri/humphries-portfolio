function update_lollipop_chart() {

    // Global Variables
    var v = []

    // Append the row and its columns.
    set_margins()
    set_width_and_height()
    set_up_svg()
    determine_min_max()
    calculate_domains()
    calculate_scales()
    calculate_axis()
    switch (mode) {
        case "All":
            update_all_circles()
            break
        case "2008":
            update_2008_circles()
            break
        case "2018":
            update_2018_circles()
            break
        default:
            update_all_circles()
    }
    update_x_axis()
    update_y_axis()
    adjust_font_sizes()

    function set_margins() {

        // window width corresponds to the bootstrap col-8-sm
        v.window = {}
        v.window.width = Math.floor(window.innerWidth * 0.60)
        v.window.height = Math.floor(window.innerHeight * 0.60)

        v.margin = {}
        v.margin.top = v.window.height * 0.05
        v.margin.right = v.window.width * 0.05,
            v.margin.bottom = v.window.height * 0.10
        v.margin.left = v.window.width * 0.10
    }

    function set_width_and_height() {

        var lollipop_chart_div = document.getElementById("lollipop_chart_div")

        lollipop_chart_div.style.width = v.window.width.toString() + "px"
        lollipop_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {
        v.svg = d3.select("#lollipop_chart_svg")
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .attr("transform", "translate(" + v.margin.left + "," + v.margin.top + ")")
    }

    function determine_min_max() {

        // Since the maximum would be 100 percent, no need to go beyond 100.
        // Use the same y axis for comparing years 2008 and 2018 to accurately see transitions.
        v.min = 0
        v.max = 100
    }

    function calculate_domains() {

        // Define y domains.
        v.y_domain = [v.max, v.min]

        // Define x domains consisting of country names.
        v.x_domain = []
        for (var i = 0; i < dataset.length; i++) {
            v.x_domain[i] = dataset[i].code
        }
    }

    function calculate_scales() {

        // The x scale consists of country names.
        v.x_scale = d3.scaleBand()
            .domain(v.x_domain)
            .rangeRound([v.margin.left, v.width + v.margin.left])

        // Use the same y axis for comparing years 2008 and 2018 to accurately see transitions.
        v.y_scale = d3.scaleLinear()
            .domain(v.y_domain)
            .rangeRound([v.margin.top, v.height])
    }

    function calculate_axis() {

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.x_axis = d3.axisBottom()
            .scale(v.x_scale)

        // Add .ticks and .tickFormat(d3.format("")) as needed.
        v.y_axis = d3.axisLeft()
            .scale(v.y_scale)
    }

    function update_all_circles() {

        // Two circles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between circles.
        var p = {}
        p.right = Math.floor(w * 0.7)
        p.left = Math.floor(w * 0.2)

        // Add 2008 circles on the left of a country as gold.
        v.lollipop_groups = v.svg.selectAll("#circle_group")
            .data(dataset)

        v.lollipop_groups
            .selectAll(".rectangle_2008")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w - p.left - 1 })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", (d) => { return Math.floor(w / 10) })

        v.lollipop_groups
            .selectAll(".circle_2008")
            .transition()
            .duration(3000)
            .attr("cx", (d) => { return v.x_scale(d.code) + w - p.left })
            .attr("cy", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })

        v.lollipop_groups
            .selectAll(".rectangle_2018")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w + p.right - 1 })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return Math.floor(w / 10) })

        // Add 2018 circles on the right of a country as cardinal.
        v.lollipop_groups
            .transition()
            .duration(3000)
            .selectAll(".circle_2018")
            .attr("cx", (d) => { return v.x_scale(d.code) + w + p.right })
            .attr("cy", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })

    }

    function update_2008_circles() {

        // Two circles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between circles.
        var p = {}
        p.right = Math.floor(w * 0.6)
        p.left = Math.floor(w * 0.29)

        // Add 2008 circles on the left of a country as gold.
        v.lollipop_groups = v.svg.selectAll("#circle_group")
            .data(dataset)


        // Add 2008 circles on the left of a country as gold.
        v.lollipop_groups = v.svg.selectAll("#circle_group")
            .data(dataset)

        v.lollipop_groups
            .selectAll(".rectangle_2008")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w + p.left - 1 })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", () => { return Math.floor(w / 10) })

        v.lollipop_groups
            .selectAll(".circle_2008")
            .transition()
            .duration(3000)
            .attr("cx", (d) => { return v.x_scale(d.code) + w + p.left })
            .attr("cy", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })

        v.lollipop_groups
            .selectAll(".rectangle_2018")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.margin.left + v.width + (v.margin.right * 2) })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return Math.floor(w / 10) })

        // Add 2018 circles on the right of a country as cardinal.
        v.lollipop_groups
            .transition()
            .duration(3000)
            .selectAll(".circle_2018")
            .attr("cx", (d) => { return v.margin.left + v.width + (v.margin.right * 2) })
            .attr("cy", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })
    }


    function update_2018_circles() {

        // Two circles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between circles.
        var p = {}
        p.right = Math.floor(w * 0.29)
        p.left = Math.floor(w * 0.2)


        // Add 2008 circles on the left of a country as gold.
        v.lollipop_groups = v.svg.selectAll("#circle_group")
            .data(dataset)

        v.lollipop_groups
            .selectAll(".rectangle_2008")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.margin.left * (-2) })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", () => { return Math.floor(w / 10) })

        v.lollipop_groups
            .selectAll(".circle_2008")
            .transition()
            .duration(3000)
            .attr("cx", (d) => { return v.margin.left * (-2) })
            .attr("cy", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })

        v.lollipop_groups
            .selectAll(".rectangle_2018")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w + p.right - 1 })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return Math.floor(w / 10) })

        // Add 2018 circles on the right of a country as cardinal.
        v.lollipop_groups
            .transition()
            .duration(3000)
            .selectAll(".circle_2018")
            .attr("cx", (d) => { return v.x_scale(d.code) + w + p.right })
            .attr("cy", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("r", () => { return Math.floor(w / 3) })

    }

    function update_x_axis() {

        v.x_axis_group = v.svg.select("#x_axis_group")
            .transition()
            .duration(3000)
            .attr("transform", "translate(" + 0 + "," + (v.height + v.margin.top) + ")")
            .call(v.x_axis)

        v.x_axis_group
            .select("#x_axis_label")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.margin.left + v.width / 2)
            .attr("fill", "black")

        v.x_axis_group
            .select("#legend_rect_2008")
            .attr("y", v.margin.bottom * 0.4)
            .attr("x", v.x_scale("ASM"))
            .attr("width", v.x_scale.bandwidth() * 0.8)
            .attr("height", v.margin.bottom * 0.5)

        v.x_axis_group
            .select("#legend_text_2008")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.x_scale("ASM") + v.x_scale.bandwidth() / 4)
            .attr("width", v.x_scale.bandwidth())

        v.x_axis_group
            .select("#legend_rect_2018")
            .attr("y", v.margin.bottom * 0.4)
            .attr("x", v.x_scale("ATG"))
            .attr("width", v.x_scale.bandwidth() * 0.8)
            .attr("height", v.margin.bottom * 0.5)

        v.x_axis_group
            .select("#legend_text_2018")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.x_scale("ATG") + v.x_scale.bandwidth() / 4)
            .attr("width", v.x_scale.bandwidth())
    }

    function update_y_axis() {

        v.y_axis_group = v.svg.select("#y_axis_group")
            .transition()
            .duration(3000)
            .attr("transform", "translate(" + v.margin.left + "," + v.margin.top + ")")
            .call(v.y_axis)
        v.y_axis_group

        v.y_axis_group
            .select("#y_axis_label")
            .attr("y", Math.floor((v.margin.left / 2) * (-1)))
            .attr("x", Math.floor(((v.height / 2) * (-1))))

    }

    function adjust_font_sizes() {

        if (v.margin.left > 55) {
            v.svg.selectAll(".tick").attr("font-size", "14")
            v.svg.selectAll("text").attr("font-size", "14")
        } else {
            v.svg.selectAll(".tick").attr("font-size", "10")
            v.svg.selectAll("text").attr("font-size", "10")
        }
    }
}
