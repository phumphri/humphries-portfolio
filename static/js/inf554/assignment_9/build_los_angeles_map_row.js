function build_los_angeles_map_row() {

    // Define container for local variables.
    var v = {}

    // Execute nested functions to build the line chart row.
    build_columns()
    // build_los_angeles_map()

    function build_columns() {

        // Append a row the high-level container.
        v.row = container_fluid
            .append("row")
            .attr("id", "los_angeles_map_row")
            .attr("class", "row")

        // Build columns by executing nested functions.
        build_navigation_column()
        build_los_angeles_map_column()
        build_los_angeles_card_column()

        function build_navigation_column() {

            // Append the selection column to the bar chart row.
            var div = v.row
                .append("div")
                .attr("class", "col-sm-1")

            // Append the selection fieldset to the selection column.
            var fieldset = div
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the selection fieldset with a legend.
            fieldset
                .append("legend")
                .text("Pan")

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-up.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.latitude = g.latitude * 1.01
                    build_los_angeles_map()
                })

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-down.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.latitude = g.latitude * 0.99
                    build_los_angeles_map()
                })

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-left.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.longitude = g.longitude * 1.001
                    build_los_angeles_map()
                })

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-right.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.longitude = g.longitude * 0.999
                    build_los_angeles_map()
                })

            // Append the selection column to the bar chart row.
            var div = v.row
                .append("div")
                .attr("class", "col-sm-1")

            // Append the selection fieldset to the selection column.
            var fieldset = div
                .append("fieldset")
                .attr("class", "padding_5px")

            // Decorate the selection fieldset with a legend.
            fieldset
                .append("legend")
                .text("Zoom")

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-up.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.zoom = g.zoom * 1.2
                    build_los_angeles_map()
                })

                fieldset.append("div")
                .append("img")
                .attr("src","/static/img/inf554/assignment_9/arrow-circle-down.svg")
                .attr("height", "50")
                .on("click", () => {
                    g.zoom = g.zoom * 0.8
                    build_los_angeles_map()
                })
        }

        function build_los_angeles_map_column() {

            // Append the los angeles map column to the los angeles map row.
            g.los_angeles_map_div = v.row
                .append("div")
                .attr("id", "los_angeles_map_div")
                .attr("class", "col-sm-8")

            // Append a fieldset to the line chart column.
            var fieldset = g.los_angeles_map_div.append("fieldset")

            // Decorate the bar chart fieldset with a legend.
            fieldset
                .append("legend")
                .attr("id", "los_angeles_map_legend")
                .text("LA Country Maps (City Boundaries and Bikeways)")
        }

        function build_los_angeles_card_column() {

            // Append the card column to the los angeles map row.
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
                .text("LA County Bikeways Card")

            // Append a division to hold the Boostrap Card.
            var body = fieldset
                .append("div")
                .attr("class", "card")
                .append("div")
                .attr("class", "card-body")

            body.append("h3")
                .attr("id", "los_angeles_card_title")
                .attr("class", "card-title")
                .text("Instructions")

            body.append("p")
                .attr("id", "p1")
                .attr("class", "card-text")
                .text("Hover over a blue bikeway and see additional data here.")

                body.append("p")
                .attr("id", "p2")
                .attr("class", "card-text")
                .text("")

                body.append("p")
                .attr("id", "p3")
                .attr("class", "card-text")
                .text("")
        }

    }
}

