function build_circle_packing_chart_row() {
    // The circle packing chart will contain all data.
    // Drill down from series to year and finally country
    // Have a Boostrap Card for instructions.
    // No selection necessary.

    // Define container for local variables.
    var v = []

    // Execute nested functions to build the circle packing chart row.
    build_columns()

    // Build the circle packing chart.
    build_circle_packing_chart()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "circle_packing_chart_row")
            .attr("class", "row hidden")

        // Build columns by executing nested functions.
        build_card_column()
        build_circle_packing_chart_column()

        function build_card_column() {

            // Append the card column to the circle packing chart row.
            var card_column = v.row
                .append("div")
                .attr("class", "col-sm-2")

            // Append the card fieldset to the card column.
            var card_fieldset = card_column
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the card fieldset with a legend.
            card_fieldset
                .append("legend")
                .text("Circle Packing Card")

            // Append a division to hold the Boostrap Card.
            var card_body = card_fieldset
                .append("div")
                .attr("class", "card")
                .append("div")
                .attr("class", "card-body")

            card_body.append("h3")
                .attr("id", "pie_card_heading")
                .attr("class", "card-title")
                .text("Instructions")

            var s = 'Click on an inner circle to "zoom in".  '
            s += 'Click outside of the circle to "zoom out".  '
            s += 'The sizes of the white circles are the relative energy for a country '
            s += 'for the combination of series and year.'

            card_body.append("p")
                .attr("class", "card-text")
                .text(s)
        }

        function build_circle_packing_chart_column() {

            // Append the circle packing chart column to the circle packing chart row.
            g.circle_packing_chart_div = v.row
                .append("div")
                .attr("id", "circle_packing_chart_div")
                .attr("class", "col-sm-10")

            // Append a fieldset to the circle packing chart column.
            var circle_packing_chart_fieldset = g.circle_packing_chart_div
                .append("fieldset")

            // Decorate the circle packing chart fieldset with a legend.
            circle_packing_chart_fieldset
                .append("legend")
                .attr("id", "circle_packing_chart_legend")
                .text("Circle Packing Chart")
        }
    }
}
