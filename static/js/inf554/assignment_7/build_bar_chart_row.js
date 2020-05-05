function build_bar_chart_row() {

    // Define container for local variables.
    var v = []

    // Execute nested functions to build the bar chart row.
    build_columns()

    // Build the bar chart.
    build_bar_chart()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "bar_chart_row")
            .attr("class", "row hidden")

        // Build columns by executing nested functions.
        build_selection_column()
        build_sort_column()
        build_bar_chart_column()

        function build_selection_column() {

            // Selections.
            var selection_range = ["Reset", "Top 5", "Bottom 5", "All 10"]

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
                .attr("id", "selection_button_group")
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
                .attr("id", (d) => { return "selection_radio_button_" + d })
                .attr("type", "radio")
                .attr("name", "year_radio_button")
                .attr("value", (d) => { return d })
                .on("click", (d) => {
                    if (d == "Top 5") {
                        animate_top_five()
                    } else if (d == "Bottom 5") {
                        animate_bottom_five()
                    } else if (d == "All 10") {
                        animate_all_10()
                    } else {
                        animate_reset()
                        // d3.select("#sort_radio_button_key").attr("checked", true)
                        document.getElementById("sort_radio_button_key").checked = true
                    }
                })

            // Label the selection radio buttons.
            selection_radio_buttons
                .append("label")
                .text((d) => { return d })

            // Make the "Reset" button the default button.
            d3.select("#selection_radio_button_Reset").attr("checked", true)

            // Set global variables.
            reset_global_variables()
            g.reset = true
            g.sort_by_ascending_key = true
        }

        function animate_top_five() {

            // Conserve the current sort selection.
            v.sort_by_ascending_key = g.sort_by_ascending_key
            v.sort_by_ascending_value = g.sort_by_ascending_value
            v.sort_by_descending_value = g.sort_by_descending_value

            // Select the top five.
            reset_global_variables()
            g.select_top_five = true
            select_data()
            sort_data()

            // Restore the sort order and display top five.
            g.sort_by_ascending_key = v.sort_by_ascending_key
            g.sort_by_ascending_value = v.sort_by_ascending_value
            g.sort_by_descending_value = v.sort_by_descending_value
            sort_data()
            build_bar_chart()
        }

        function animate_bottom_five() {

            // Conserve the current sort selection.
            v.sort_by_ascending_key = g.sort_by_ascending_key
            v.sort_by_ascending_value = g.sort_by_ascending_value
            v.sort_by_descending_value = g.sort_by_descending_value

            // Select the bottom five.
            reset_global_variables()
            g.select_bottom_five = true
            select_data()

            // Restore the sort order and display the bottom five.
            g.sort_by_ascending_key = v.sort_by_ascending_key
            g.sort_by_ascending_value = v.sort_by_ascending_value
            g.sort_by_descending_value = v.sort_by_descending_value
            sort_data()
            build_bar_chart()
        }

        function animate_all_10() {

            // Conserve the current sort selection.
            v.sort_by_ascending_key = g.sort_by_ascending_key
            v.sort_by_ascending_value = g.sort_by_ascending_value
            v.sort_by_descending_value = g.sort_by_descending_value

            // Select all ten..
            reset_global_variables()
            g.select_all_ten = true
            select_data()

            // Restore the sort order and display all ten.
            g.sort_by_ascending_key = v.sort_by_ascending_key
            g.sort_by_ascending_value = v.sort_by_ascending_value
            g.sort_by_descending_value = v.sort_by_descending_value
            sort_data()
            build_bar_chart()
        }

        function animate_reset() {

            // Reset all global variables to false.
            reset_global_variables()

            // Select all countries.
            g.reset = true
            select_data()

            // Sort by ascending key.
            g.sort_by_ascending_key = true
            sort_data()

            // Display all data in default order.
            build_bar_chart()
        }

        function build_sort_column() {

            // Define the sort orders.
            var sort_range = [
                { key: "key", value: "Country" },
                { key: "ascending", value: "Ascending Value" },
                { key: "descending", value: "Descending Value" }
            ]

            // Append the sort column to the bar chart row.
            var sort_column = v.row
                .append("div")
                .attr("class", "col-sm-2")

            // Append the sort fieldset to the sort column.
            var sort_fieldset = sort_column
                .append("fieldset")

            // Decorate the sort fieldset with a legend.
            sort_fieldset
                .append("legend")
                .text("Sort Order")

            // Append a button group to the sort fieldset.
            // This group will hold radio buttons in a vertical layout.
            sort_button_group = sort_fieldset
                .append("div")
                .attr("id", "sort_button_group")
                .attr("class", "btn-group btn-group-toggle")
                .attr("data-toggle", "buttons")

            // Append divisions to hold the radio buttons.
            var sort_radio_buttons = sort_button_group.selectAll("div")
                .data(sort_range)
                .enter()
                .append("div")

            // Append radio buttons to the divisions.
            sort_radio_buttons
                .append("input")
                .attr("id", (d) => { return "sort_radio_button_" + d.key })
                .attr("type", "radio")
                .attr("name", "sort_radio_button")
                .attr("value", (d) => { return d.key })
                .on("click", (d) => {

                    // Initialize the sort indicators.
                    g.sort_by_ascending_key = false
                    g.sort_by_ascending_value = false
                    g.sort_by_descending_value = false
                    g.sort_only = true

                    // Set the sort order
                    if (d.key == "ascending") {
                        g.sort_by_ascending_key = false
                        g.sort_by_ascending_value = true
                        g.sort_by_descending_value = false
                    } else if (d.key == "descending") {
                        g.sort_by_ascending_key = false
                        g.sort_by_ascending_value = false
                        g.sort_by_descending_value = true
                    } else {
                        g.sort_by_ascending_key = true
                        g.sort_by_ascending_value = false
                        g.sort_by_descending_value = true
                    }

                    // Sort and display the data
                    sort_data()
                    build_bar_chart()
                })

            // Label the radio buttons.
            sort_radio_buttons
                .append("label")
                .text((d) => { return d.value })

            // Select the default sort button.
            d3.select("#sort_radio_button_key").attr("checked", true)

            // Set default sort orders.
            g.sort_by_ascending_key = true
            g.sort_by_ascending_value = false
            g.sort_by_descending_value = false
        }

        function build_bar_chart_column() {

            // Append the bar chart column to the bar chart row.
            g.bar_chart_div = v.row
                .append("div")
                .attr("id", "bar_chart_div")
                .attr("class", "col-sm-8")

            // Append a fieldset to the bar chart column.
            var bar_chart_fieldset = g.bar_chart_div
                .append("fieldset")

            // Decorate the bar chart fieldset with a legend.
            // This legend will be updated to show series and year.
            // This update occurs when the y axis is updated.
            bar_chart_fieldset
                .append("legend")
                .attr("id", "bar_chart_legend")
                .text("Bar Chart")
        }
    }
}
