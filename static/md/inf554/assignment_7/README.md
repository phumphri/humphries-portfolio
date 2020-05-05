<h1>INF 554 Assignment 7</h1>
<p>Patrick Humphries    pvhumphr@usc.edu    7097-1087-72</p>
<p>INF 554 Information Visualizations</p>
<p>Fall 2019<p>

<h3>Links to Assignment 7</h3>

<a href="http://pdms.usc.edu/~pvhumphr/a7/a7.html" target="_blank" >a7.html on pdms.usc.edu</a>

<a href="http://www-scf.usc.edu/~pvhumphr/a7/a7.html" target="_blank" >a7.html on www-scf.usc.edu</a>

<h3>Assignment</h3>
<p>Use data from A1 limited to 10 countries and 1 year.</p>
<p>Describe the data and cite your source in page.</p>
<p>Load the data in JSON format and implement a D3 bar chart complete with axes, axes labels, tick marks, tick mark labels and title.</p>
<p>Use margin conventions and D3 data join, scales and axes to create the bar chart.</p>
<p>Use separate HTML, CSS and JS files.</p>
<p>Implement buttons in HTML and style to let the user know what is selected:</p>
<ul>
    <li>Reset</li>
    <li>Order: "Alphabetic by name", "Ascending by value" and "Descending by value"</li>
    <li>Filter: "All 10", "Top 5" and "Bottom 5"</li>
</ul>
<p>Note that filter and order are independent and reset is the starting state for all 10 countries sorted alphabetically.</p>
<p>With D3 implement transitions based on the buttons the user selects; use smooth transitions when object constancy is needed to help the user follow the data.<p>
<p>Use incremental commits that are consistent and tested.</p>
<p>Publish in a7 folder on server<p>
<p>Add a link to the published file in README.md. All files should be stored in the repository.</p>

<h3>Approach</h3>
<p>Since the author used armed forces of South America to critique a newpaper infographic, the approach taken was do something similar for energy.</p>
<p>A JSON file was populated with energy data for ten of the twelve sovereign nations of South America.</p>
<p>Function d3.json loaded the data into a data structure.</p>
<p>This data structure was filtered and sorted per user input.</p>
<p>The bars of the bar chart were organized as group ("g") elements and moved by the "transform" attribute.</p>
<p>Each bar contains a rectangle element ("rect") and a text element ("text").</p>
<p>Bars allow for easy addition of decorations and additional elements.</p>
<p><b>All elements in the "body" where generated with D3.js and Bootstrap 3.</b><p>

<h3>Provenance</h3>
<p>File "SYB62_T23_201904_Production, Trade and Supply of Energy" was downloaded from http://data.un.org.</p>
<p>Using the QUERY function of Google Sheets, data was selected and organized into tables.</p>
<p>The values of these tables were copied to Google Sheet "SA_Energy_Data".</p>
<p>This Google Sheet was downloaded as CSV, converted to JSON, an saved to "data.json".</p>

<h3>Links to Laboratory 7</h3>

<a href="http://pdms.usc.edu/~pvhumphr/a7/ex1.html" target="_blank" >ex1.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/ex2.html" target="_blank" >ex2.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/ex3.html" target="_blank" >ex3.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/ex4.html" target="_blank" >ex4.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/planets_transition_1.html" target="_blank" >ex5.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/ex6.html" target="_blank" >ex6.html</a>

<a href="http://pdms.usc.edu/~pvhumphr/a7/a7.html" target="_blank" >a7.html</a>
