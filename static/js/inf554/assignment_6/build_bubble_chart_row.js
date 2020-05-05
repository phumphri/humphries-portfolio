function build_bubble_chart_row() {

    // Global Variables
    var v = []

    // Append the row and its columns.
    build_columns()
    set_margins()
    set_width_and_height()
    set_up_svg()
    determine_min_max()
    calculate_domains()
    calculate_scales()
    calculate_axis()
    append_2008_circles()
    append_x_axis()
    append_y_axis()
    adjust_font_sizes()

    function build_columns() {

        // Append a row to contain the bubble chart.
        var row = container_fluid
            .append("row")
            .attr("id", "bubble_chart_row")
            .attr("class", "row hidden")

        // Append a column for year selection.
        var selection_fieldset = row
            .append("div")
            .attr("class", "col-sm-2")
            .append("fieldset")

        selection_fieldset
            .append("legend")
            .text("Bubble Chart")

        // Append the button group.
        var button_group = selection_fieldset
            .append("div")
            .attr("class", "btn-group btn-group-sm")

        // Append the "2008" button that includes only year 2008 data.
        var year_2008_button = button_group
            .append("button")
            .attr("type", "button")
            .attr("class", "btn btn-primary cardinal_background gold_color")
            .text("2008")

        year_2008_button.on("click", () => {
            mode = "2008"
            update_bubble_chart()
        })

        // Append the "2018" button that includes only year 2018 data.
        var year_2018_button = button_group
            .append("button")
            .attr("type", "button")
            .attr("class", "btn btn-primary cardinal_background gold_color")
            .text("2018")

        year_2018_button.on("click", () => {
            mode = "2018"
            update_bubble_chart()
        })

        v.bubble_chart_div = row
            .append("div")
            .attr("id", "bubble_chart_div")
            .attr("class", "col-sm-10")

    }

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

        v.bubble_chart_div.style.width = v.window.width.toString() + "px"
        v.bubble_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom
    }

    function set_up_svg() {
        v.svg = d3.select("#bubble_chart_div")
            .append('svg')
            .attr('id', 'bubble_chart_svg')
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .attr("transform", "translate(" + v.margin.left + "," + v.margin.top + ")")
            .style("background-color", "mistyrose")
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

    function append_2008_circles() {

        // Add 2008 circles on the left of a country as gold.
        v.circle_groups = v.svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("id", "circle_group")

        v.circles = v.circle_groups
            .append("circle")
            .attr("cx", (d) => { return v.x_scale(d.code) + v.x_scale.bandwidth() / 2 })
            .attr("cy", (d) => { return v.y_scale(d.value_2008) + v.margin.top })
            .attr("r", (d) => { return (d.value_2008 / 150) * v.x_scale.bandwidth() })
            .attr("fill", "#FFCC00")

        // Add 2008 tooltips.
        v.circles
            .append("svg:title")
            .text((d) => { return d.name + " (2008):  " + d.value_2008 })
    }

    function append_x_axis() {

        v.x_axis_group = v.svg.append("g")
            .attr("id", "x_axis_group")
            .attr("transform", "translate(" + 0 + "," + (v.height + v.margin.top) + ")")
            .call(v.x_axis)

        v.x_axis_group
            .append("text")
            .attr("id", "x_axis_label")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.margin.left + v.width / 2)
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text("Country Codes")

        v.x_axis_group
            .append("rect")
            .attr("id", "legend_rect_2008")
            .attr("y", v.margin.bottom * 0.4)
            .attr("x", v.x_scale("ASM"))
            .attr("width", v.x_scale.bandwidth() * 0.8)
            .attr("height", v.margin.bottom * 0.5)
            .attr("fill", "#FFCC00")

        v.x_axis_group
            .append("text")
            .attr("id", "legend_text_2008")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.x_scale("ASM") + v.x_scale.bandwidth() / 4)
            .attr("width", v.x_scale.bandwidth())
            .attr("height", "3em")
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", "14")
            .text("2008")

        v.x_axis_group
            .append("rect")
            .attr("id", "legend_rect_2018")
            .attr("y", v.margin.bottom * 0.4)
            .attr("x", v.x_scale("ATG"))
            .attr("width", v.x_scale.bandwidth() * 0.8)
            .attr("height", v.margin.bottom * 0.5)
            .attr("fill", "#990000")

        v.x_axis_group
            .append("text")
            .attr("id", "legend_text_2018")
            .attr("y", v.margin.bottom * 0.7)
            .attr("x", v.x_scale("ATG") + v.x_scale.bandwidth() / 4)
            .attr("width", v.x_scale.bandwidth())
            .attr("height", "3em")
            .attr("fill", "gold")
            .attr("text-anchor", "start")
            .attr("font-size", "14")
            .text("2018")
    }

    function append_y_axis() {

        v.y_axis_group = v.svg.append("g")
            .attr("id", "y_axis_group")
            .attr("transform", "translate(" + v.margin.left + "," + v.margin.top + ")")
            .call(v.y_axis)

        v.y_axis_group
            .append('text')
            .attr("id", "y_axis_label")
            .attr("transform", "rotate(-90)")
            .attr("y", Math.floor((v.margin.left / 2) * (-1)))
            .attr("x", Math.floor(((v.height / 2) * (-1))))
            .attr("fill", "black")
            .attr("font-size", "14")
            .style("text-anchor", "middle")
            .text("Rural Population")

    }

    function adjust_font_sizes() {

        if (v.margin.left > 55) {
            v.svg.selectAll(".tick").attr("font-size", "14")
            v.svg.select("text").attr("font-size", "14")
        } else {
            v.svg.selectAll(".tick").attr("font-size", "10")
            v.svg.select("text").attr("font-size", "10")
        }
    }

}
