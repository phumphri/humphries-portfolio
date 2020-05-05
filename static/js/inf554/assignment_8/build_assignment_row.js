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
            .text("Assignment 8")

        // Add section for "Devleopment and Published Site".
        assignment_fieldset
            .append("p")
            .style("font-weight", "bold")
            .text("Development and Published Site")

        var s = "Create index.html.  "
        s += "Present your the data and cite your source in the page.  "
        s += "You are encouraged to break-down the charts code in separate files(.css and .js).  "
        s += "Use GIT and node.  "
        s += "Use a consistent color scheme for the graphs and the page.  "
        s += "Publish the page under a8 at:"

        assignment_fieldset
            .append("p")
            .text(s)

        assignment_fieldset
            .append("p")
            .text("     http://pdms.usc.edu/~<username>/a8/")

        assignment_fieldset
            .append("p")
            .text('Add a link to the published URL in "README.md".')

        // Add section for "Bubble Chart Using Circle Packing".
        assignment_fieldset
            .append("p")
            .style("font-weight", "bold")
            .text("Bubble Chart Using Circle Packing")

        s = "Based on the data and design from assignment 2, "
        s += "create a bubble chart with D3 using the circle packing layout."

        assignment_fieldset
            .append("p")
            .text(s)

        // Add section for "Line Chart".
        assignment_fieldset
            .append("p")
            .style("font-weight", "bold")
            .text("Line Chart")

        s = "Use 10 countries and the data from assignment 1 "
        s += "to create a line chart similar to what Google charts can generate, "
        s += "complete with a legend."

        assignment_fieldset
            .append("p")
            .text(s)

        // Add section for "Pie Chart".
        assignment_fieldset
            .append("p")
            .style("font-weight", "bold")
            .text("Pie Chart")

        s = "Using 5 countries and the data of your choice, create a pie chart.  "
        s += "Using Bootstrap, implement a card to show generic data information "
        s += "and information on how to interact with the chart when the mouse is "
        s += "not hovering on the pie chart.  "
        s += "When the mouse is hovering a sector of the pie chart, "
        s += "show information that corresponds to the data for that sector.  "
        s += "Add visual feedback on mouse hover. "

        assignment_fieldset
            .append("p")
            .text(s)
    }

    function build_approach_column() {

        var approach_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        approach_fieldset
            .append("legend")
            .text("Appproach")

        s = "Since the author used armed forces of South America to critique a newpaper infographic, "
        s += "the approach taken was do something similar for energy."

        approach_fieldset
            .append("p")
            .text(s)

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

        provenance_fieldset
            .append("legend")
            .text("GitHub")

        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/blob/master/templates/inf554/assignment_8.html")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("html")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/js/inf554/assignment_8")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("javascript")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/img/inf554/assignment_6")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("images")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/json/inf554/assignment_8")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("json")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/md/inf554/assignment_8")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("md")            
    }
}
