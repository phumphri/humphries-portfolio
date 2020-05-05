function build_pie_chart_row() {

    // The slices are countries and values
    // The selections are year and series

    // Define container for local variables.
    var v = []

    // Execute nested functions to build the pie chart row.
    build_columns()

    // Build the line chart.
    build_pie_chart()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "pie_chart_row")
            .attr("class", "row hidden")

        // Build columns by executing nested functions.
        build_year_selection_column()
        build_series_selection_column()
        build_pie_chart_column()
        build_card_column()

        function build_year_selection_column() {

            // Year selections.
            var year_range = [
                { name: "1990", value: 1990 },
                { name: "1995", value: 1995 },
                { name: "2000", value: 2000 },
                { name: "2005", value: 2005 },
                { name: "2010", value: 2010 },
                { name: "2014", value: 2014 },
                { name: "2015", value: 2015 },
                { name: "2016", value: 2016 }
            ]

            // Append the selection column to the pie chart row.
            var selection_column = v.row
                .append("div")
                .attr("class", "col-sm-1")

            // Append the selection fieldset to the selection column.
            var selection_fieldset = selection_column
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the selection fieldset with a legend.
            selection_fieldset
                .append("legend")
                .text("Year")

            // Append a button group for selection to the selection fieldset.
            selection_button_group = selection_fieldset
                .append("div")
                .attr("id", "selection_button_group")
                .attr("class", "btn_group_vertical btn-group-sm btn-group-toggle")
                .attr("data-toggle", "buttons")

            // Append radio buttons to the button group in vertical order.
            var selection_radio_buttons = selection_button_group.selectAll("div")
                .data(year_range)
                .enter()
                .append("div")

            // Append a radio button to the radio buttons selection.
            selection_radio_buttons
                .append("input")
                .attr("id", (d) => { return "pie_chart_year_radio_button_" + d.name })
                .attr("type", "radio")
                .attr("name", "pie_chart_year_radio_button")
                .attr("value", (d) => { return d.value })
                .on("click", (d) => {
                    g.year = d.name
                    build_pie_chart()        
                })

            // Label the selection radio buttons.
            selection_radio_buttons
                .append("label")
                .text((d) => { return d.name })

            // Make the "1990" button the default button.
            d3.select("#pie_chart_year_radio_button_1990").attr("checked", true)

        }

        function build_series_selection_column() {

            // Year selections.
            var series_range = [
                { name: "Production", value: "production" },
                { name: "Imports", value: "net_imports" },
                { name: "Stocks", value: "change_in_stocks" },
                { name: "Supply", value: "total_supply" },
                { name: "Per Capita", value: "supply_per_capita" }
            ]

            // Append the selection column to the bar chart row.
            var selection_column = v.row
                .append("div")
                .attr("class", "col-sm-1")

            // Append the selection fieldset to the selection column.
            var selection_fieldset = selection_column
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the selection fieldset with a legend.
            selection_fieldset
                .append("legend")
                .text("Series")

            // Append a button group for selection to the selection fieldset.
            selection_button_group = selection_fieldset
                .append("div")
                .attr("id", "selection_button_group")
                .attr("class", "btn_group_vertical btn-group-sm btn-group-toggle")
                .attr("data-toggle", "buttons")

            // Append radio buttons to the button group in vertical order.
            var selection_radio_buttons = selection_button_group.selectAll("div")
                .data(series_range)
                .enter()
                .append("div")

            // Append a radio button to the radio buttons selection.
            selection_radio_buttons
                .append("input")
                .attr("id", (d) => { return "pie_chart_series_radio_button_" + d.value })
                .attr("type", "radio")
                .attr("name", "pie_chart_series_radio_button")
                .attr("value", (d) => { return d.value })
                .on("click", (d) => {
                    g.pie_chart_series = d.name
                    build_pie_chart()
                })

            // Label the selection radio buttons.
            selection_radio_buttons
                .append("label")
                .text((d) => { return d.name })

            // Make the "Production" button the default button.
            d3.select("#pie_chart_series_radio_button_production").attr("checked", true)
        }

        function build_card_column() {

            // Append the card column to the pie chart row.
            var card_column = v.row
                .append("div")
                .attr("class", "col-sm-2")

            // Append the card fieldset to the card column.
            var card_fieldset = card_column
                .append("fieldset")

            // Decorate the card fieldset with a legend.
            // Value will change from "Instructions" to "Country" when hovering.
            card_fieldset
                .append("legend")
                .text("Pie Card")

            // Append a division to hold the Boostrap Card.
            var card_body = card_fieldset
                .append("div")
                .attr("class", "card")
                .attr("id", "card_div")
                .append("div")
                .attr("class", "card-body")
            
            card_body.append("h3")
                .attr("id", "pie_card_title")
                .attr("class", "card-title")
                .text("Instructions")

            s = 'Hover over a slice of pie to see additional information here. '
            s += 'To activate the "hover" feature, select a different year or series.'

            card_body.append("p")
                .attr("id", "pie_card_text")
                .attr("class", "card-text")
                .text(s)
                

            
        }

        function build_pie_chart_column() {

            // Append the pie chart column to the pie chart row.
            g.pie_chart_div = v.row
                .append("div")
                .attr("id", "pie_chart_div")
                .attr("class", "col-sm-7")

            // Append a fieldset to the pie chart column.
            var pie_chart_fieldset = g.pie_chart_div
                .append("fieldset")

            // Decorate the pie chart fieldset with a legend.
            pie_chart_fieldset
                .append("legend")
                .attr("id", "pie_chart_legend")
                .text("Pie Chart")
        }
    }
}

