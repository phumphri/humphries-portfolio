function build_south_america_maps_row() {

    // Define container for local variables.
    var v = {}

    // Execute nested functions to build the circle packing chart row.
    build_columns()

    // Build the maps.
    // build_south_america_maps()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "south_america_maps_row")
            .attr("class", "row")

        // Build columns by executing nested functions.
        build_portional_symbol_map_column()
        build_choropleth_map_column()
        build_south_america_card_column()

        function build_portional_symbol_map_column() {

            // Append the proportional symbol map column to the proportional symbol map row.
            g.proportional_symbol_map_div = v.row
                .append("div")
                .attr("id", "proportional_symbol_map_div")
                .attr("class", "col-sm-5")


            // Append a fieldset to the column.
            var fieldset = g.proportional_symbol_map_div.append("fieldset")

            // Decorate the circle packing chart fieldset with a legend.
            fieldset
                .append("legend")
                .attr("id", "proportional_symbol_map_legend")
                .text("Proportional Symbol Map (Production in Petajoules)")
        }

        function build_choropleth_map_column() {

            // Append the choropleth map column to the south america maps row.
            g.choropleth_map_div = v.row
                .append("div")
                .attr("id", "choropleth_map_div")
                .attr("class", "col-sm-5")

            // Append a fieldset to the choropleth map column.
            var fieldset = g.choropleth_map_div.append("fieldset")

            // Decorate the choropleth map fieldset with a legend.
            fieldset
                .append("legend")
                .attr("id", "choropleth_map_legend")
                .text("Choropleth Map (Production in Exajoules)")

            // Decorate the choropleth map fieldset with a data legend.
            fieldset
                .append("div")
                .attr("id", "choropleth_legend_div")
        }

        function build_south_america_card_column() {

            // Append the card column to the south america maps row.
            var div = v.row
                .append("div")
                .attr("class", "col-sm-2")

            // Append the card fieldset to the card column.
            var fieldset = div
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the card fieldset with a legend.
            fieldset
                .append("legend")
                .text("South America Card")

            // Append a division to hold the Boostrap Card.
            var body = fieldset
                .append("div")
                .attr("class", "card")
                .append("div")
                .attr("class", "card-body")

            body.append("h3")
                .attr("id", "south_america_card_title")
                .attr("class", "card-title")
                .text("Instructions")

            body.append("p")
                .attr("id", "south_america_card_production")
                .attr("class", "card-text")
                .text("Hover over a country and see additional data here.")

            body.append("p")
                .attr("id", "south_america_card_population")
                .attr("class", "card-text")
                .text("")

            body.append("p")
                .attr("id", "south_america_card_gdp")
                .attr("class", "card-text")
                .text("")
        }
    }
}
