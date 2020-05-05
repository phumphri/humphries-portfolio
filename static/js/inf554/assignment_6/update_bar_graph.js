function update_bar_graph() {

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
        case "2008":
            update_2008_rectangles()
            break
        case "2018":
            update_2018_rectangles()
            break
        default:
            update_all_rectangles()
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
        v.margin.top = Math.floor(v.window.height * 0.05)
        v.margin.right = Math.floor(v.window.width * 0.05)
        v.margin.bottom = Math.floor(v.window.height * 0.10)
        v.margin.left = Math.floor(v.window.width * 0.10)
    }

    function set_width_and_height() {


        var bar_graph_div = document.getElementById("bar_graph_div")

        bar_graph_div.style.width = v.window.width.toString() + "px"
        bar_graph_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;

        console.log(" ")
        console.log("update_bar_graph.set_width_and_height")
        console.log("window_width:  " + v.window.width)
        console.log("window_width:  " + v.window.height)
    }

    function set_up_svg() {
        v.svg = d3.select("#bar_graph_svg")
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

        v.left_padding = Math.floor(v.x_scale.bandwidth() * 0.10)
        v.right_padding = Math.floor(v.x_scale.bandwidth() * 0.10)

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

    function update_all_rectangles() {

        // Two rectangles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between rectangles.
        var p = {}
        p.left = Math.floor(w * 0.20)
        p.right = Math.floor(w * 0.40)

        // Add 2008 rectangles on the left of a country as blue.
        v.rectangle_groups = v.svg.selectAll("#rectangle_group")
            .data(dataset)

        v.year_2008_rectangles = v.rectangle_groups
            .selectAll(".gold_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + p.left })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", () => { return w })


        // Add 2018 rectangles on the right of a country as red.
        v.year_2018_rectangles = v.rectangle_groups
            .selectAll(".cardinal_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w + p.right })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return w })
    }

    function update_2008_rectangles() {

        // Two rectangles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between rectangles.
        var p = {}
        p.left = Math.floor(w * 0.30)
        p.right = Math.floor(w * 0.40)

        // Add 2008 rectangles on the left of a country as gold.
        v.rectangle_groups = v.svg.selectAll("#rectangle_group")
            .data(dataset)

        v.year_2008_rectangles = v.rectangle_groups
            .selectAll(".gold_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w - p.left })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", () => { return w })

        // Add 2018 rectangles on the right of a country as cardinal.
        v.year_2018_rectangles = v.rectangle_groups
            .selectAll(".cardinal_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.margin.left + v.width + v.margin.right })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return w })

    }

    function update_2018_rectangles() {

        // Two rectangles per bandwidth
        var w = Math.floor((v.x_scale.bandwidth() / 2) * 0.80)

        // Padding for space between rectangles.
        var p = {}
        p.left = Math.floor(w * 0.30)
        p.right = Math.floor(w * 0.30)

        // Add 2008 rectangles on the left of a country as blue.
        v.rectangle_groups = v.svg.selectAll("#rectangle_group")
            .data(dataset)

        v.year_2008_rectangles = v.rectangle_groups
            .selectAll(".gold_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return (v.margin.left) * (-2) })
            .attr("y", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2008) })
            .attr("width", () => { return w })

        // Add 2018 rectangles on the right of a country as red.
        v.year_2018_rectangles = v.rectangle_groups
            .selectAll(".cardinal_color")
            .transition()
            .duration(3000)
            .attr("x", (d) => { return v.x_scale(d.code) + w - p.right })
            .attr("y", (d) => { return v.y_scale(d.value_2018) + v.margin.top })
            .attr("height", (d) => { return v.height - v.y_scale(d.value_2018) })
            .attr("width", () => { return w })
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
            .attr("x", Math.floor((v.height / 2) * (-1)))

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
