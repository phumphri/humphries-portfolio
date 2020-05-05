function build_assignment_row() {

    // Append the assignment row to the top-level bootstrap container.
    var assignment_row = container_fluid
        .append("row")
        .attr("id", "assignment_row")
        .attr("class", "row hidden")

    // Append "Assignment" column.
    var assignment_fieldset = assignment_row
        .append("div")
        .attr("class", "col-sm-4")
        .append("fieldset")

    assignment_fieldset
        .append("legend")
        .text("Assignment")

    assignment_fieldset
        .append("p")
        .style("font-weight", "bold")
        .text("Assignment 6")

    assignment_ul = assignment_fieldset
        .append("p")
        .append("ul")

    assignment_ul
        .append("li")
        .text('From "https://data.worldbank.org", download "Rural population (% of total population)" data for 10 countries and a 2 years of your choice.')

    assignment_ul
        .append("li")
        .text("Create an HTML document named a6.html.")

    assignment_ul
        .append("li")
        .text("Describe the data and cite your source in a6.html.")

    assignment_ul
        .append("li")
        .text("Load the data in JSON format.  You can use one or multiple data files for the visualizations.")

    assignment_ul
        .append("li")
        .text("Create a slopegraph in SVG (Inkscape recommended) to show the data and add it to the page as an SVG image.")

    assignment_ul
        .append("li")
        .text("Using D3 data joins, for each year, create a bar graph, a lollipop chart and a bubble chart. The charts should include axes, axes labels, tick marks, and tick mark labels created using D3 axes and scales, use the margin conventions and include titles and legends as needed.")

    assignment_ul
        .append("li")
        .text("Demonstrate good development practices in README.md (explain set-up, deployment, AND use incremental commits).")

    assignment_ul
        .append("li")
        .text("Publish on your work on USC SCF account (see instructions below) and add a link to the published a6.html in README.md. All files, including a6.html should be stored in the repository.")

    // Append "Approach" column.
    var approach_fieldset = assignment_row
        .append("div")
        .attr("class", "col-sm-3")
        .append("fieldset")

    approach_fieldset
        .append("legend")
        .text("Appproach")

    approach_fieldset
        .append("p")
        .text("There are two files: metadata and data.")

    approach_fieldset
        .append("p")
        .text('Both files were merged into a dataset using "Country Code" as the key.')

    approach_fieldset
        .append("p")
        .text('The percentage fact "Value" is taken from attributes "2008" and "2018" of the data table.')

    approach_fieldset
        .append("p")
        .text("The consolidated data in the dataset was used for the visualizations.")

    // Append "Provenance" column.
    var provenance_fieldset = assignment_row
        .append("div")
        .attr("class", "col-sm-4")
        .append("fieldset")

    provenance_fieldset
        .append("legend")
        .text("Provenance")

    provenance_fieldset
        .append("p")
        .text('The "Metadata" file is the "Metadata_Country_API_SP.RUR.TOTL.ZS_DS2_en_csv_v2_50124.csv" was downloaded from https://data.worldbank.org/.')

    provenance_fieldset
        .append("p")
        .text('The "Data" file is the "API_SP.RUR.TOTL.ZS_DS2_en_csv_v2_50124.csv" was downloaded from https://data.worldbank.org/.')

    // Append "GitHub" column.
    var github_fieldset = assignment_row
        .append("div")
        .attr("class", "col-sm-1")
        .append("fieldset")

    github_fieldset
        .append("legend")
        .text("GitHub")

    github_fieldset
        .append("a")
        .attr("href", "https://github.com/INF554/a6-phumphri.git")
        .attr("fill", "black")
        .attr("target", "_blank")
        .append("text")
        .text("Assignment 6")





}
