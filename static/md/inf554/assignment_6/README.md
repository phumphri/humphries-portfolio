
<h1>Assignment 6</h1>
<h5>Rural Popuulation</h5>
<ul>
    <li>Student:  Patrick Humphries</li>
    <li>Email:  pvhumphr@usc.edu</li>
    <li>Class:  INF 554 Information Visualization</li>
    <li>Semester:  Fall 2019</li>
</ul>

<h3>Assignment</h3>
<ul>
    <li>From "https://data.worldbank.org", download "Rural population (% of total population)" data
        for 10 countries and a 2 years of your choice.</li>
    <li>Create an HTML document named a6.html.  Describe the data and cite your source in a6.html
        </li>
    <li>Load the data in JSON format. You can use one or multiple data files for the
        visualizations.</li>
    <li>Create a slopegraph in SVG (Inkscape recommended) to show the data and add it to the page
        as an SVG image.</li>
    <li>Using D3 data joins, for each year, create a bar graph, a lollipop chart and a bubble
        chart. The charts should include axes, axes labels, tick marks, and tick mark labels
        created using D3 axes and scales, use the margin conventions and include titles and legends
        as needed.</li>
    <li>Demonstrate good development practices in README.md (explain set-up, deployment, AND use
        incremental commits).</li>
    <li>Publish on your work on USC SCF account (see instructions below) and add a link to the
        published a6.html in README.md. All files, including a6.html should be stored in the
        repository.</li>
</ul>

<h3>Approach</h3>
<b>Data</b>

There are two files: metadata and data.

Both files were merged into a dataset using "Country Code" as the key.

The percentage fact "Value" is taken from attributes "2008" and "2018" of the data table.

The consolidated data in the dataset was used for the visualizations.

<b>Slopegraph</b>

The slopegraph was created with Inkscape as recommended in the assignment.

<b>SVG</b>

All elements of the body of the HTML page were created with Javascript and the D3.js library.

A single SVG was considered, using Javascript to remove and add elements as needed.  However, this would be a complex solution with three types of graphs and two years.

The implementation used three SVG elements, one for each type of graph.  The components were for each graph were appended using a "build" module and transformed using a corresponding "update" module.  A button for year 2008 would transform the graph to show data for that year and move data for 2018 out of the SVG.  Corresponding process was done with year 2018 data.

<b>Bootstrap</b>

Bootstrap 3 library was used to provided a responsive layout, reacting to the "resize" event for the window.  There was a Bootstrap row for each major element of the visualizeion:  heading, assignment, slopegraph, bar graph, lollipop chart, and bubble chart.

<h3>Provenance</h3>
The "Metadata" file is the "Metadata_Country_API_SP.RUR.TOTL.ZS_DS2_en_csv_v2_50124.csv" was downloaded from <a href="https://data.worldbank.org" target="_blank">data.worldbank.org</a>.

The "Data" file is the "API_SP.RUR.TOTL.ZS_DS2_en_csv_v2_50124.csv" was downloaded from <a href = "https://data.worldbank.org" target="_blank">data.worldbank.org</a>.

<h3>Repository</h3>
<a href="https://github.com/INF554/a6-phumphri.git" target="_blank">GitHub</a>
