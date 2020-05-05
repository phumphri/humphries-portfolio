function build_line_chart_row() {

    // The y axis is value (size)
    // The x axis is year
    // The lines are countries (name)
    // The selection is series

    // Define container for local variables.
    var v = []

    // Execute nested functions to build the line chart row.
    build_columns()

    // Build the line chart.
    build_line_chart()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "line_chart_row")
            .attr("class", "row hidden")

        // Build columns by executing nested functions.
        build_selection_column()
        build_line_chart_column()

        function build_selection_column() {

            // Selections.
            var selection_range = [
                { name: "Production", value: "production" },
                { name: "Imports", value: "net_imports" },
                { name: "Stocks", value: "change_in_stocks" },
                { name: "Supply", value: "total_supply" },
                { name: "Per Capita", value: "supply_per_capita" }
            ]

            // Append the selection column to the bar chart row.
            var selection_column = v.row
                .append("div")
                .attr("class", "col-sm-2")

            // Append the selection fieldset to the selection column.
            var selection_fieldset = selection_column
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the selection fieldset with a legend.
            selection_fieldset
                .append("legend")
                .text("Selection")

            // Append a button group for selection to the selection fieldset.
            selection_button_group = selection_fieldset
                .append("div")
                .attr("id", "line_chart_series_button_group")
                .attr("class", "btn_group_vertical btn-group-sm btn-group-toggle")
                .attr("data-toggle", "buttons")

            // Append radio buttons to the button group in vertical order.
            var selection_radio_buttons = selection_button_group.selectAll("div")
                .data(selection_range)
                .enter()
                .append("div")

            // Append a radio button to the radio buttons selection.
            selection_radio_buttons
                .append("input")
                .attr("id", (d) => { return "line_chart_series_radio_button_" + d.value })
                .attr("type", "radio")
                .attr("name", "line_chart_series_radio_button")
                .attr("value", (d) => { return d.name })
                .on("click", (d) => {
                    g.line_chart_series = d.name
                    build_line_chart()
                })

            // Label the selection radio buttons.
            selection_radio_buttons
                .append("label")
                .text((d) => { return d.name })

            // Make the "Production" button the default button.
            d3.select("#line_chart_series_radio_button_production").attr("checked", true)
        }

        function build_line_chart_column() {

            // Append the line chart column to the line chart row.
            g.line_chart_div = v.row
                .append("div")
                .attr("id", "line_chart_div")
                .attr("class", "col-sm-8")

            // Append a fieldset to the line chart column.
            var line_chart_fieldset = g.line_chart_div
                .append("fieldset")

            // Decorate the bar chart fieldset with a legend.
            line_chart_fieldset
                .append("legend")
                .attr("id", "line_chart_legend")
                .text("Line Chart")
        }
    }
}

