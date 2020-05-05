<h1>Assignment 8</h1>
<ul>
    <li>Course:  INF 554 Information Visualization</li>
    <li>Semester:  Fall 2019</li>
    <li>Student Name:  Patrick Humphries</li>
    <li>Student Email:  pvhumphr@usc.edu</li>
    <li>Website:  <a href="http://pdms.usc.edu/~pvhumphr/a8/index.html" 
        target="_blank">http://pdms.usc.edu/~pvhumphr/a8/index.html</a></li>
</ul>

<h3>Development and Published Site  </h3>

<p> Create index.html. 
    Present your the data and cite your source in the page. 
    You are encouraged to break-down the charts code in separate files(.css and .js). 
    Use GIT and node. 
    Use a consistent color scheme for the graphs and the page. 
    Publish the page under a8 at:   </p>

<p> http://pdms.usc.edu/~<username>/a8/</p>

<p> Add a link to the published URL in "README.md". </p>

<h3>Bubble Chart Using Circle Packing   </h3>

<p> Based on the data and design from assignment 2, create a bubble chart with 
    D3 using the circle packing layout. </p>

<h3>Line Chart  </h3>

<p> Use 10 countries and the data from assignment 1 to create a line chart 
    similar to what Google charts can generate, complete with a legend. </p>

<h3>Pie Chart   </h3>

<p> Using 5 countries and the data of your choice, create a pie chart. 
    Using Bootstrap, implement a card to show generic data information and 
    information on how to interact with the chart when the mouse is not 
    hovering on the pie chart. 
    When the mouse is hovering a sector of the pie chart, show information 
    that corresponds to the data for that sector. 
    Add visual feedback on mouse hover. </p>

<h3>Appproach   </h3>

<p> Since the author used armed forces of South America to critique a newpaper 
    infographic, the approach taken was do something similar for energy.</p>

<p> A JSON file was populated with energy data for ten of the twelve sovereign 
    nations of South America.   </p>

<p> Function d3.json loaded the data into a data structure. </p>

<p> This data structure was filtered and sorted per user input. </p>

<p><b>All elements in the "body" where generated with D3.js and Bootstrap 3.</b><p>

<h3>Provenance  </h3>

<p> File "SYB62_T23_201904_Production, Trade and Supply of Energy" was 
    downloaded from http://data.un.org. </p>

<p> Using the QUERY function of Google Sheets, data was selected and organized 
    into tables.    </p>

<p> The values of these tables were copied to Google Sheet "SA_Energy_Data".    </p>

<p> This Google Sheet was downloaded as CSV, converted to JSON, an saved to 
    "data.json".    </p>


