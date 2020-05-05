function build_slopegraph_row() {

    // Append a row to contain the slopegraph.
    var slopegraph_row = container_fluid
        .append("row")
        .attr("id", "slopegraph_row")
        .attr("class", "row hidden")

    // Append a column for the slopegraph.
    var slopegraph_fieldset = slopegraph_row
        .append("div")
        .attr("class", "col-sm-6")
        .append("fieldset")

    slopegraph_fieldset
        .append("legend")
        .text("Slopegraph")

    slopegraph_fieldset
        .append("img")
        .attr("class", "img-responsive")
        .attr("src", "/static/img/inf554/assignment_6/slopegraph.svg")
        .attr("alt", "Slopegraph of Rural Population")

    // Append a column for the analysis.
    var slopegraph_analysis_fieldset = slopegraph_row
        .append("div")
        .attr("class", "col-sm-6")
        .append("fieldset")

    slopegraph_analysis_fieldset
        .append("legend")
        .text("Analysis")

    var s = "Albania had the most dramatic shift from rural to urban population.  "
    s += "The shift was from 50 percent to 39 percent."
    slopegraph_analysis_fieldset.append("p").text(s)

    s = "A similar dramatic change was made by Angola, moving from 41 percent to 34 percent."
    slopegraph_analysis_fieldset.append("p").text(s)

    s = "The only countries, in this selection of ten countries, that are bucking the trend "
    s += "are Antigua and Barbuda."
    slopegraph_analysis_fieldset.append("p").text(s)


}

