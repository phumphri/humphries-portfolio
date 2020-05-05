function build_assignment_row() {

    // Append the assignment row to the top-level bootstrap container.
    var assignment_row = container_fluid
        .append("row")
        .attr("id", "assignment_row")
        .attr("class", "row hidden")

    // Call nested functions to build the columns.
    build_assignment_column()
    build_approach_column()
    build_provenance_column()

    function build_assignment_column() {

        // Append the assignment column and fieldset.
        var assignment_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        // Decorate the fieldset.
        assignment_fieldset
            .append("legend")
            .text("Assignment")

        // Append paragraphs that correspond to bullet items in the assignment.
        assignment_fieldset
            .append("p")
            .style("font-weight", "bold")
            .text("Assignment 7")

        assignment_fieldset
            .append("p")
            .text("Use data from A1 limited to 10 countries and 1 year.")

        assignment_fieldset
            .append("p")
            .text("Describe the data and cite your source in page.")

        assignment_fieldset
            .append("p")
            .text("Load the data in JSON format and implement a D3 bar chart complete with axes, axes labels, tick marks, tick mark labels and title.")

        assignment_fieldset
            .append("p")
            .text("Use margin conventions and D3 data join, scales and axes to create the bar chart.")

        assignment_fieldset
            .append("p")
            .text("Use separate HTML, CSS and JS files.")

        var implementation_paragraph = assignment_fieldset
            .append("p")
            .text("Implement buttons in HTML and style to let the user know what is selected:")

        var implementation_paragraph_ul = implementation_paragraph
            .append("ul")

        implementation_paragraph_ul
            .append("li")
            .text("Reset")

        implementation_paragraph_ul
            .append("li")
            .text('Order: "Alphabetic by name", "Ascending by value" and "Descending by value"')

        implementation_paragraph_ul
            .append("li")
            .text('Filter: "All 10", "Top 5" and "Bottom 5"')

        assignment_fieldset
            .append("p")
            .text("Note that filter and order are independent and reset is the starting state for all 10 countries sorted alphabetically.")

        assignment_fieldset
            .append("p")
            .text("With D3 implement transitions based on the buttons the user selects; use smooth transitions when object constancy is needed to help the user follow the data.")

        assignment_fieldset
            .append("p")
            .text("Use incremental commits that are consistent and tested.")

        assignment_fieldset
            .append("p")
            .text("Publish in a7 folder on server")

        assignment_fieldset
            .append("p")
            .text("Add a link to the published file in README.md. All files should be stored in the repository.")
    }

    function build_approach_column() {

        var approach_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        approach_fieldset
            .append("legend")
            .text("Appproach")

        approach_fieldset
            .append("p")
            .text("Since the author used armed forces of South America to critique a newpaper infographic, the approach taken was do something similar for energy.")

        approach_fieldset
            .append("p")
            .text("A JSON file was populated with energy data for ten of the twelve sovereign nations of South America.")

        approach_fieldset
            .append("p")
            .text("Function d3.json loaded the data into a data structure.")

        approach_fieldset
            .append("p")
            .text("This data structure was filtered and sorted per user input.")

        approach_fieldset
            .append("p")
            .text('The bars of the bar chart were organized as group ("g") elements and moved by the "transform" attribute.')

            approach_fieldset
            .append("p")
            .text('Each bar contains a rectangle element ("rect") and a text element ("text").')

            approach_fieldset
            .append("p")
            .text('Bars allow for easy addition of decorations and additional elements.')

        approach_fieldset
            .append("p")
            .append("span")
            .style("font-weight", "bold")
            .text('All elements in the "body" where generated with D3.js and Bootstrap 3.')
    }

    function build_provenance_column() {
        var provenance_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        provenance_fieldset
            .append("legend")
            .text("Provenance")

        provenance_fieldset
            .append("p")
            .text('File "SYB62_T23_201904_Production, Trade and Supply of Energy" was downloaded from http://data.un.org.')

        provenance_fieldset
            .append("p")
            .text('Using the QUERY function of Google Sheets, data was selected and organized into tables.')

        provenance_fieldset
            .append("p")
            .text('The values of these tables were copied to Google Sheet "SA_Energy_Data".')

        provenance_fieldset
            .append("p")
            .text('This Google Sheet was downloaded as CSV, converted to JSON, an saved to "data.json".')
    }
}
