
<link rel="stylesheet" 
    type="text/css" 
    href="https://humphries-inf554.s3-us-west-1.amazonaws.com/viterbi_3.css">
<table>
    <tr>
        <td class="cardinal_background">
            <img src="https://vsoeapp1.vsoe.usc.edu/images/USC-Bar-cardinal.gif">
        </td>
        <td class="cardinal_background project_name">South America Energy</td>
        <td class="cardinal_background gold_color">
            Patrick Humphries, M.B.A.<br />
            INF 554 Data Visualization<br />
            August 2019</td>
    </tr>
</table>

    

# Assignment
<b>Assignment 2. </b>Use UN Data for the same 10 countries of Assignment 1 to create a bubble cloud with Inkscape (http://www.inkscape.org). Recreate the same bubble cloud using using SVG code (i.e., writing SVG yourself not the SVG created by Inkscape!) and using javascript (i.e., dynamically generating the SVG). Use node.js to develop and document your set-up in the README.md.



# Approach
<p>Since the author used armed forces of South America to critique a newpaper infographic, the approach taken was do something similar for energy</p>
<p>A Google Sheet was populated with energy data for the twelve sovereign nations of South America.</p>
<p>Using this Google Sheet, bubble charts were created using Inkscape and SVG.</p>

# Provenance
<p>File "SYB62_T23_201904_Production, Trade and Supply of Energy" was downloaded from 
<a target="_blank" href="http://data.un.org">http://data.un.org</a>.</p>
<p>Using the QUERY function of Google Sheets, data was selected and organized into tables.</p>
<p>The values of these tables were copied to a new Google Sheet. This Google sheet was used as the source for the following charts.</p>
<p>This Google Sheet was published to the web with View authority granted to Public.</p>

## Code
<p><a target="_blank" href="https://github.com/phumphri/humphries-portfolio/blob/master/templates/sae_2.html">sae_2.html</a></p>
<p><a target="_blank" href="https://github.com/phumphri/humphries-portfolio/blob/master/static/js/total_energy_by_production_and_import.js">total_energy_by_production_and_import.js</a></p>
<p><a target="_blank" href="https://github.com/phumphri/humphries-portfolio/blob/master/static/js/sae_hidden_or_visible_2.js">sae_hidden_or_visible_2.js</a></p>
<p><a target="_blank" href="https://github.com/phumphri/humphries-portfolio/blob/master/static/js/app.js">app.js</a></p>
<p><a target="_blank" href="https://github.com/phumphri/humphries-portfolio/blob/master/static/img/sae_2.svg">sae_2.svg</a></p>


## Data
<p><a target="_blank" href="https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit#gid=703773082">SA_Energy_Data</a></p>

# Execution
<p>This application can be executed on a local machine.  It was delivered as an archive file.</p>
<p>This application has also been deployed to the Internet.  The application was developed using Node.js.  Then it was adapted for Flask and pushed to GitHub, which in turn was regenerated and published by Heroku.</p>

## Local
* Create and position on a target directory.
* Unzip the deliverable into the target directory.
* Open a command window and position on the directory.
* Start the server by entering the command "node app.js".

## Internet
* Open the Chrome browser and open URL "viterbi.cloud".
* Wait ten seconds to be redirected to the "Portfolio".
* Under legend for "INF-554:  Data Visualization", select hyperlink "Week 2".

## Navigation
* Select the "Assingment" button to see the "Assignment", "Approach", "Provenance", "Code", and "Data."
* Select the "Inkscape" button to see the bubble chart energy per capita using Inkscape.
* Select the "SVG" button to see a the bubble chart using SVG.

## Features
* Hover over the green line to display its purpose.
* Hover over the vertical axis to see an explanation of the scale.
* Hover over any bubble to display the energy per capita for that country.
* Select a year on the SVG version to see different energy per capita.
* Select year 2016 to match the values of the Inkscape rendering.
* Energy production for a country is indicated by the horizontal axis.
* Energy net imports for a country is indicated by the verticle axis.

