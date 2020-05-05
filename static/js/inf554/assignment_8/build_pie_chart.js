function build_pie_chart() {

    // Define local variables
    v = {}
    v.pie_chart_values = []
    v.pie_chart_countries = []

    // Execute nested functions to build the line chart.
    select_data()
    set_margins()
    set_width_and_height()
    set_up_svg()
    append_all_countries()
    append_legend()
    adjust_font_sizes()

    function select_data() {

        // Get a reference to the dataset.
        d = g.dataset

        // Select data for the selected series and year.
        v.pie_chart_countries = []
        v.pie_chart_values = []
        for (var i = 0; i < g.dataset.length; i++) {
            var dataset_record = g.dataset[i]
            if ((dataset_record.series == g.pie_chart_series) && (dataset_record.year == g.year)) {
                v.pie_chart_countries.push(dataset_record.country)
                if (dataset_record.value > 0) {
                    v.pie_chart_values.push(dataset_record.value)
                } else {
                    v.pie_chart_values.push(0)
                }
            }
            // Only need five records for five differnt countries.
            if (v.pie_chart_countries.length > 4) {
                break
            }
        }
    }

    function set_margins() {

        v.window = {}
        v.window.height = Math.floor(window.innerHeight * 0.60)
        v.window.width = Math.floor(window.innerWidth * 0.50)

        v.margin = {}
        v.margin.top = Math.floor(v.window.height * 0.10)
        v.margin.right = Math.floor(v.window.width * 0.10)
        v.margin.bottom = Math.floor(v.window.height * 0.10)
        v.margin.left = Math.floor(v.window.width * 0.10)
    }

    function set_width_and_height() {

        g.pie_chart_div.style.width = v.window.width.toString() + "px"
        g.pie_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.svg = d3.select("#pie_chart_svg")

        // If not found, create one.
        if (v.svg.empty()) {
            v.svg = g.pie_chart_div
                .append('svg')
                .attr('id', 'pie_chart_svg')
        }

        // Configure the svg.
        v.svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .style("background-color", "mistyrose")
    }

    function append_all_countries() {

        var color = d3.scaleOrdinal(d3.schemeCategory10)

        var pie = d3.pie()

        v.outer_radius = (v.height / 2)

        var inner_radius = 0

        var arcs = v.svg.selectAll("g.arc")

        if (arcs.empty()) {

            var arc = d3.arc()
                .innerRadius(inner_radius)
                .outerRadius(v.outer_radius)

            arcs = v.svg.selectAll("g.arc")
                .data(pie(v.pie_chart_values))
                .enter()
                .append("g")
                .attr("class", "arc")
                .attr("transform", "translate(" + (v.width / 2 + v.margin.left) + "," + (v.height / 2 + v.margin.top) + ")")

            arcs.append("path")
                .attr("fill", (d, i) => { return color(i) })
                .attr("d", arc)
                .on("mouseover", (d, i) => {

                    // Change pie card title to the current country.
                    document.getElementById("pie_card_title").innerHTML = v.pie_chart_countries[i]

                    // Che the pie card text to blah, blah, blah.
                    var s = v.pie_chart_countries[i] + ' for series "' + g.pie_chart_series + '" had '
                    s += d.value + ' petajoules of energy.  '

                    if (g.pie_chart_series == "Imports") {
                        s += '"Imports" is really net imports:  imports minus exports.  '
                        s += 'If a country exports more than import, the value will be negative. '
                        s += 'Since pie charts do not show negative values, all negative "Imports" are set to zero.  '
                        s += 'What is being displayed is only positive net imports.'
                    }

                    if (g.pie_chart_series == "Stocks") {
                        s += '"Stocks" is really the change in stocks.  '
                        s += 'If a country draws from its stocks, the value will be negative. '
                        s += 'Since pie charts do not show negative values, all negative "Stocks" are set to zero.  '
                        s += 'What is being displayed is only increases in stocks.'
                    }


                    document.getElementById("pie_card_text").innerHTML = s
                })
                .on("mouseleave", (d, i) => {

                    // Reset the pie card title.
                    document.getElementById("pie_card_title").innerHTML = "Instructions"

                    // Reset the pie card text.
                    s = 'Hover over a slice of pie to see additional information here. '
                    s += 'To activate the "hover" feature, select a different year or series.'
                            document.getElementById("pie_card_text").innerHTML = s
                })

            arcs.append("text")
                .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")" })
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "white")
                .text(function (d) { return d.value })

        } else {

            var arc = d3.arc()
                .innerRadius(inner_radius)
                .outerRadius(v.outer_radius)

            arcs = v.svg.selectAll("g.arc")
                .data(pie(v.pie_chart_values))
                .attr("transform", "translate(" + (v.width / 2 + v.margin.left) + "," + (v.height / 2 + v.margin.top) + ")")

            arcs.select("text")
                .transition()
                .duration(3000)
                .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")" })
                .attr("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("fill", "white")
                .text(function (d) { return d.value })

            arcs.select("path")
                .transition()
                .duration(3000)
                .attr("d", arc)
                .on("mouseover", (d, i) => {

                    // Change pie card title to the current country.
                    document.getElementById("pie_card_title").innerHTML = v.pie_chart_countries[i]

                    // Che the pie card text to blah, blah, blah.
                    var s = v.pie_chart_countries[i] + ' for series "' + g.pie_chart_series + '" had '
                    s += d.value + ' petajoules of energy.  '

                    if (g.pie_chart_series == "Imports") {
                        s += '"Imports" is really net imports:  imports minus exports.  '
                        s += 'If a country exports more than import, the value will be negative. '
                        s += 'Since pie charts do not show negative values, all negative "Imports" are set to zero.  '
                        s += 'What is being displayed is only positive net imports.'
                    }

                    if (g.pie_chart_series == "Stocks") {
                        s += '"Stocks" is really the change in stocks.  '
                        s += 'If a country draws from its stocks, the value will be negative. '
                        s += 'Since pie charts do not show negative values, all negative "Stocks" are set to zero.  '
                        s += 'What is being displayed is only increases in stocks.'
                    }


                    document.getElementById("pie_card_text").innerHTML = s
                })
                .on("mouseleave", (d, i) => {

                    // Reset the pie card title.
                    document.getElementById("pie_card_title").innerHTML = "Instructions"

                    // Reset the pie card text.
                    s = 'Hover over a slice of pie to see additional information here. '
                    s += 'To activate the "hover" feature, select a different year or series.'
                            document.getElementById("pie_card_text").innerHTML = s
                })


        }
    }

    function append_legend() {

        var color = d3.scaleOrdinal(d3.schemeCategory10)

        var legend = v.svg.select("#pie_chart_legend_2")

        if (legend.empty()) {

            var x = v.margin.left + v.width / 2 + v.outer_radius
            var y = v.margin.top + 10
            var legend = v.svg
                .append("g")
                .attr("x", x)
                .attr("y", y)
                .attr("height", () => { return v.height - y })
                .attr("id", "pie_chart_legend_2")


            legend.selectAll("rect")
                .data(v.pie_chart_countries)
                .enter()
                .append("rect")
                .attr("x", () => { return v.margin.left + v.width / 2 + v.outer_radius })
                .attr("y", (d, i) => { return v.margin.top - 10 + i * 20 })
                .attr("width", 20)
                .attr("height", 10)
                .attr("fill", (d, i) => { return color(i) })

            legend.selectAll("text")
                .data(v.pie_chart_countries)
                .enter()
                .append("text")
                .attr("x", () => { return v.margin.left + v.width / 2 + 20 + v.outer_radius })
                .attr("y", (d, i) => { return v.margin.top + i * 20 })
                .attr("height", 20)
                .attr("font-weight", "bold")
                .attr("fill", (d, i) => { return color(i) })
                .text(function (d) { return d })


        } else {

            var x = v.margin.left + v.width / 2 + v.outer_radius
            var y = v.margin.top + 10
            legend.attr("x", x)
                .attr("y", y)
                .attr("height", () => { return v.height - y })
                .attr("id", "pie_chart_legend_2")

            legend.selectAll("rect")
                .data(v.pie_chart_countries)
                .transition()
                .duration(3000)
                .attr("x", () => { return v.margin.left + v.width / 2 + v.outer_radius })
                .attr("y", (d, i) => { return v.margin.top - 10 + i * 20 })
                .attr("width", 20)
                .attr("height", 10)
                .attr("fill", (d, i) => { return color(i) })

            legend.selectAll("text")
                .data(v.pie_chart_countries)
                .transition()
                .duration(3000)
                .attr("x", () => { return v.margin.left + v.width / 2 + 20 + v.outer_radius })
                .attr("y", (d, i) => { return v.margin.top + i * 20 })
                .attr("height", 20)
                .attr("font-weight", "bold")
                .attr("fill", (d, i) => { return color(i) })
                .text(function (d) { return d })

        }
    }

    function adjust_font_sizes() {

        // Resize font size when the window is resized.
        if (v.margin.left > 50) {
            v.svg.selectAll(".tick").style("font-size", "small")
            v.svg.selectAll("text").style("font-size", "small")
            d3.selectAll("label").style("font-size", "small")
            return
        }

        if (v.margin.left > 25) {
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

