function build_assignment_row() {

    // Append the assignment row to the top-level bootstrap container.
    var assignment_row = container_fluid
        .append("row")
        .attr("id", "assignment_row")
        .attr("class", "row")

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
        assignment_fieldset.append("legend").text("Assignment 9")

        assignment_fieldset.append("h3").text("Description")

        var s = "IMPORTANT:  USE STABLE JAVASCRIPT LIBRARIES FROM NODE, AS WELL AS STABLE D3 VERSION"
        assignment_fieldset.append("p").style("font-weight", "bold").text(s)

        var ul = assignment_fieldset.append("ul")

        s = "Using D3 and the countries of assignment 1 (one year & 10 countries), "
        s += "build a proportional symbol map and a choropleth map"
        ul.append("li").text(s)

        s = 'Using D3 and data of your choice from the "Country of Los Angeles Open Data" website, '
        s += 'show the data on a map of the "Los Angeles County".  '
        s += 'You can choose the map type.  Example datasets are ...ADD 5-6 for points and areas as links.'
        ul.append("li").text(s)

        s = "All maps should be imported as GeoJSON or TopoJSON.  "
        s += "Data can be imported in GeoJSON, TopoJSON, JSON or a delimiter-separated format (e.g. csv, tsv).  "
        s += "The page should be properly formatted and the maps should be doumented, including labels, legend, and title as appropriate.  "
        s += "Use a single page for all the maps.  "
        s += "It is recommended to split the JS code for each chart in separate .js files.  "
        s += "All JS libs should be used through node and D3 must be the must recent stable version."
        assignment_fieldset.append("p").text(s)

        assignment_fieldset.append("h3").text("Rubic")

        s = "15% of the greade is for artifacts generated and committed in class as requested by the instructor."
        assignment_fieldset.append("p").style("font-weight", "bold").text(s)

        assignment_fieldset.append("h4").text("Development and Published Site")

        s = "Demonstrate good developement proactices:"
        assignment_fieldset.append("p").text(s)

        ul = assignment_fieldset.append("ul")

        s = "Document set-up & deployment in README.md"
        ul.append("li").text(s)

        s = "Use incremental commits that are meaningful e.g. each commit adds one feature/component/bugfix."
        ul.append("li").text(s)

        s = "Test that your code works before you commit."
        ul.append("li").text(s)

        s = "Do not commit files that are not related to/needed for the assignment."
        ul.append("li").text(s)

        s = "Using npm is a good development practice and is strongly encouraged, but not required."
        ul.append("li").text(s)

        s = "Using Bootstrap and Angular is also a good development practice and is strongly encouraged, but not required."
        ul.append("li").text(s)

        s = "All files needed to deploy the site should be stored in the repository.  "
        s += "However, installable node packages should not be store in the repository."
        ul.append("li").text(s)

        s = "Publish your work on the USC SCF account at:"
        assignment_fieldset.append("p").text(s)

        assignment_fieldset.append("p").attr("class", "cardinal_color").text("http://pdms.usc.edu/~<username>/a9/")

        s = 'Add a link to the published URL in README.md".  '
        s += 'Describe the data and cite your sources in the webpage.'
        assignment_fieldset.append("p").text(s)

    }

    function build_approach_column() {

        var approach_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        approach_fieldset.append("legend").text("Appproach")

        approach_fieldset.append("h3").text("South America Energy Maps")

        s = "Since the author used armed forces of South America to critique a newpaper infographic, "
        s += "the approach taken was do something similar for energy."
        approach_fieldset.append("p").text(s)

        s = "A JSON file was populated with energy data for ten of the twelve sovereign nations of South America.  "
        s += "This data was stored as a map for random access.  "
        approach_fieldset.append("p").text(s)

        s = 'A GeoJSON file for South America was download from "Build Custom GeoJson" at "geojson-maps.ash.ms".  '
        s += "The data in the GeoJSON file was augmented with data from the JSON map."
        approach_fieldset.append("p").text(s)

        s = "A single function was used to create the proportional symbol and choropleth maps.  "
        s += "This was done because they shared identically sized Bootstrap divisions, projections, and data."
        approach_fieldset.append("p").text(s)

        s = "A hovering feature was added to all countries.  "
        s += "When hovering, data is display a card element for that country.  "
        s += "This was done to show the augmented data that would have been too much for a simple tooltip."
        approach_fieldset.append("p").text(s)

        approach_fieldset.append("h3").text("Los Angeles County Maps")

        s = 'Two GeoJSON files were downloaded from the "County of Los Angeles Open Data" website.  '
        s += "The first file drew city boundaries.  "
        s += "The second file drew bikeways."
        approach_fieldset.append("p").text(s)

        s = "A hover-and-card elements were also employed.  "
        s += "Hovering over a bikeway would display information regarding the bikeway."
        approach_fieldset.append("p").text(s)

        s = "Many of the lines for the bikeways were close together.  "
        s += "In addition, it is difficult to hover on just a line.  "
        s += "For these reasons, pan and zoom functions were added."
        approach_fieldset.append("p").text(s)
    }

    function build_provenance_column() {
        var provenance_fieldset = assignment_row
            .append("div")
            .attr("class", "col-sm-4")
            .append("fieldset")

        provenance_fieldset.append("legend").text("Provenance")

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
            .attr("href", "https://github.com/phumphri/humphries-portfolio/blob/master/templates/inf554/assignment_9.html")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("html")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/js/inf554/assignment_9")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("javascript")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/img/inf554/assignment_9")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("images")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/json/inf554/assignment_9")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("json")
    
        provenance_fieldset
            .append("p")
            .append("a")
            .attr("href", "https://github.com/phumphri/humphries-portfolio/tree/master/static/md/inf554/assignment_9")
            .attr("fill", "black")
            .attr("target", "_blank")
            .append("text")
            .text("md")
    
    }
}
