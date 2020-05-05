<h1>INF 554 Assignment 9</h1>
<ul>
    <li>Student:  Patrick Humphries</li>
    <li>Email:  pvhumphr@usc.edu
</ul>
<h3>Lab Pages</p>
<ul>
    <li><a href="http://viterbi.cloud" target="_blank">viterbi.cloud</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex1.html" target="_blank">ex1.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex2.html" target="_blank">ex2.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex3.html" target="_blank">ex3.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex4.html" target="_blank">ex4.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex5.html" target="_blank">ex5.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex6.html" target="_blank">ex6.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex7.html" target="_blank">ex7.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/ex8.html" target="_blank">ex8.html</a></li>
    <li><a href="http://pdms.usc.edu/~pvhumphr/a9/index.html" target="_blank">index.html</a></li>
</ul>
<h1>Assignment 9</h1>
<h3>Description</h3>
<p style="font-weight:bold">IMPORTANT:  USE STABLE JAVASCRIPT LIBRARIES FROM NODE, AS WELL AS STABLE D3 VERSION</p>
<ul>
    <li>Using D3 and the countries of assignment 1 (one year & 10 countries), build a proportional symbol map and a choropleth map</li>
    <li>Using D3 and data of your choice from the "Country of Los Angeles Open Data" website, 
        show the data on a map of the "Los Angeles County".  
        You can choose the map type.  Example datasets are ...ADD 5-6 for points and areas as links.</li>
</ul>
    <p>All maps should be imported as GeoJSON or TopoJSON.  
        Data can be imported in GeoJSON, TopoJSON, JSON or a delimiter-separated format (e.g. csv, tsv).  
        The page should be properly formatted and the maps should be doumented, including labels, legend, and title as appropriate.  
        Use a single page for all the maps.  
        It is recommended to split the JS code for each chart in separate .js files.  
        All JS libs should be used through node and D3 must be the must recent stable version.</p>
<h3>Rubic</h3>
<p style="font-weight:bold">15% of the greade is for artifacts generated and committed in class as requested by the instructor."</p>
<h4>Development and Published Site</h4>
<p>Demonstrate good developement proactices:</p>
<ul>
    <li>Document set-up & deployment in README.md</li>
    <li>Use incremental commits that are meaningful e.g. each commit adds one feature/component/bugfix.</li>
    <li>Test that your code works before you commit.</li>
    <li>Do not commit files that are not related to/needed for the assignment.</li>
    <li>Using npm is a good development practice and is strongly encouraged, but not required.</li>
    <li>Using Bootstrap and Angular is also a good development practice and is strongly encouraged, but not required.</li>
    <li>All files needed to deploy the site should be stored in the repository.  
        However, installable node packages should not be store in the repository.</li>
</ul>
<p>Publish your work on the USC SCF account at:</p>
<p>http://pdms.usc.edu/~<username>/a9/</p>
<p>Add a link to the published URL in README.md.  Describe the data and cite your sources in the webpage.</p>
<h2>Appproach</h2>
<h3>South America Energy Maps</h3>
<p>Since the author used armed forces of South America to critique a newpaper infographic, 
    the approach taken was do something similar for energy.</p>
<p>A JSON file was populated with energy data for ten of the twelve sovereign nations of South America.  
    This data was stored as a map for random access.</p>
<p>A GeoJSON file for South America was download from "Build Custom GeoJson" at "geojson-maps.ash.ms".  
    The data in the GeoJSON file was augmented with data from the JSON map.</p>
<p>A single function was used to create the proportional symbol and choropleth maps.  
    This was done because they shared identically sized Bootstrap divisions, projections, and data.</p>
<p>A hovering feature was added to all countries.  
    When hovering, data is display a card element for that country.  
    This was done to show the augmented data that would have been too much for a simple tooltip.</p>
<h3>Los Angeles County Maps</h3>
<p>Two GeoJSON files were downloaded from the "County of Los Angeles Open Data" website.  
    The first file drew city boundaries.  The second file drew bikeways.</p>
<p>A hover-and-card elements were also employed.  
<p>Hovering over a bikeway would display information regarding the bikeway.</p>
<p>Many of the lines for the bikeways were close together.  
    In addition, it is difficult to hover on just a line.  
    For these reasons, pan and zoom functions were added.</p>
<h2>Provenance</h2>
<p>File "SYB62_T23_201904_Production, Trade and Supply of Energy" was downloaded from http://data.un.org.</p>
<p>Using the QUERY function of Google Sheets, data was selected and organized into tables.</p>
<p>The values of these tables were copied to Google Sheet "SA_Energy_Data".</p>
<p>This Google Sheet was downloaded as CSV, converted to JSON, an saved to "data.json".</p>


