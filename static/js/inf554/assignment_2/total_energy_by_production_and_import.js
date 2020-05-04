function draw_total_energy_by_production_and_import(year) {

  if (year == "undefined") {
    year = 1990
  }

  selected_year = year

  console.log('function per_capita_by_year.drawChar(' + selected_year + ') was called.')

  ta03.innerHTML = 'To begin, select a year.'

  switch (selected_year) {
    case 1990:
      var s = "Venezuela by far has most energy per capita.  "
      s = s + "Brazil, with large production and imports, is only on par with Chile."
      ta03.innerHTML = s
      break
    case 1995:
      ta03.innerHTML = "Chile advances, surpassing Brazil and nearly matches Argentina."
      break
    case 2000:
      ta03.innerHTML = 'Like Chile in 1995, Argentina is also increasing.'
      break
    case 2005:
      ta03.innerHTML = 'Gains made by Chile and Argentina.  Loss for Venezuela.'
      break
    case 2010:
      ta03.innerHTML = 'Gains by all large markes:  Chile, Argentina, Venezuela, and Brazil.'
      break
    case 2014:
      ta03.innerHTML = 'Venezuela drastically declines to the levels of Chile and Argentina.'
      break
    case 2015:
      ta03.innerHTML = 'Venezuela continues to decline as Chile, Argentina, and finally Brazil advance.'
      break
    case 2016:
      ta03.innerHTML = 'Venezuela significantly falters whereas Chile and Argentina become dominant.'
      break
  }

  // Query data from Google Sheets.
  console.log('selected_year:  ' + selected_year)

  var url = 'https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit?usp=sharing'

  // A Year
  // B Country
  // C Series
  // D Value

  var s = 'SELECT B, SUM(D) '
  s = s + 'WHERE (A = ' + selected_year + ') '
  s = s + 'and (B <> "South America") '
  s = s + 'and (B <> "Guyana") '
  s = s + 'and (B <> "Suriname") '
  s = s + 'group by B '
  s = s + 'pivot C'
  var queryString = encodeURIComponent(s)

  query = new google.visualization.Query(url + '&gid=703773082&headers=1&tq=' + queryString)

  query.send(handle_total_energy_by_production_and_imports);
}

// Chart the data from Google Sheets for a selected year.
function handle_total_energy_by_production_and_imports(response) {

  // Chart Attributes
  var chart_width = 1100
  var chart_height = 600

  var left_margin = 100
  var bottom_margin = 50
  var top_margin = 50
  var right_margin = 200
  var min_circle = 5
  var max_circle = 30

  // Delete all elements in the drawing div, including svg.
  var drawing_div = document.getElementById("drawing")
  while (drawing_div.hasChildNodes()) {
    drawing_div.removeChild(drawing_div.firstChild)
  }

  // Add the svg to the drawing division.
  var svg = d3.select("#drawing")
    .append("svg")
    .attr("width", chart_width)
    .attr("height", chart_height)

  // Data Table Attributes
  var country_index = 0
  var stock_index = 1
  var imports_index = 2
  var production_index = 3
  var percapita_index = 4
  var total_index = 5

  // Check for a successful query.
  if (response.isError()) {
    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage())
    return
  }

  // Pull the Data Table from the Google Sheets Response.
  var dataTable = response.getDataTable()

  var numberOfRows = dataTable.getNumberOfRows()
  console.log('Number of rows:  ' + numberOfRows)

  var numberOfColumns = dataTable.getNumberOfColumns()
  console.log('Number of columns:  ' + numberOfColumns)

  // Dump the Data Table to the console.
  for (var i = 0; i < numberOfRows; i++) {
    var s = dataTable.getValue(i, 0)
    for (var j = 1; j < numberOfColumns; j++) {
      s = s + ", " + dataTable.getValue(i, j)
    }
    console.log(s)
  }

  // Build circle table.
  console.log("circle_table:")
  var circle_table = []
  for (var i = 0; i < numberOfRows; i++) {
    var circle_row = []
    for (var j = 0; j < numberOfColumns; j++) {
      s = dataTable.getValue(i, j)
      circle_row.push(s)
    }
    circle_table.push(circle_row)
    console.log(circle_row)
  }

  // Define Production Scale
  var max_production = 12000
  var min_production = 0
  // var max_production = d3.max(circle_table, function (d) { return d[production_index] })
  // var min_production = d3.min(circle_table, function (d) { return d[production_index] })
  var production_scale = d3.scaleLinear()
    .domain([min_production - 1000, max_production + 1000])
    .range([left_margin, chart_width - right_margin])
  // .domain([min_production, max_production])
  // .range([left_margin + max_circle, chart_width - right_margin - max_circle])

  // Define Import Scale 
  var max_import = 2000
  var min_import = -6000
  // var max_import = d3.max(circle_table, function (d) { return d[imports_index] })
  // var min_import = d3.min(circle_table, function (d) { return d[imports_index] })
  var imports_scale = d3.scaleLinear()
    .domain([min_import - 1000, max_import + 1000])
    .range([top_margin, chart_height - bottom_margin])
  // .domain([min_import, max_import])
  // .range([top_margin + max_circle, chart_height - bottom_margin - max_circle])

  // Define Per Capita Scale
  var max_per_capita = d3.max(circle_table, function (d) { return d[percapita_index] })
  var min_per_capita = d3.min(circle_table, function (d) { return d[percapita_index] })
  var percapita_scale = d3.scaleLinear()
    .domain([min_per_capita, max_per_capita])
    .range([min_circle, max_circle])
    .nice()

  // Line for import/export separation.
  svg.append("line")
    .attr("x1", left_margin.toString())
    .attr("y1", imports_scale(0).toString())
    .attr("x2", (chart_width - right_margin).toString())
    .attr("y2", imports_scale(0).toString())
    .attr("stroke", "green")
    .attr("stroke-width", "20")
    .style("stroke-opacity", .2)
    .append("svg:title")
    .text(function (d) { return "Exporters above, importers below." })

  // Draw circles.
  var circles = svg.selectAll("circle")
    .data(circle_table)
    .enter()
    .append("circle")

  circles
    .attr("cx", function (d) { return production_scale(d[production_index]).toString() })
    .attr("cy", function (d) { return imports_scale(d[imports_index]).toString() })
    .attr("r", function (d) { return percapita_scale(d[percapita_index]).toString() })
    .style("fill", "green")
    .style("stroke", "red")
    .style("fill-opacity", .2)
    .append("svg:title")
    .text(function (d) { return d[percapita_index] })

  // Label circles.
  var circle_labels = svg.selectAll("text")
    .data(circle_table)
    .enter()
    .append("text")

  circle_labels
    .attr("y", function (d) { return imports_scale(d[imports_index]).toString() })
    .attr("x", function (d) { return (production_scale(d[production_index]) + percapita_scale(d[percapita_index])).toString() })
    .attr("stroke", "black")
    .text(function (d) { return d[country_index] })


  // Horizontal Axis
  var xAxis = d3.axisBottom().scale(production_scale)

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (chart_height - bottom_margin) + ")")
    .call(xAxis)

  // Vertical Axis
  var yAxis = d3.axisLeft().scale(imports_scale)

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + left_margin + ", 0)")
    .call(yAxis)
    .append("svg:title")
    .text(function (d) { return "Negative indicates exports." })

  // Label for y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", "50")
    .attr("x", (((chart_height / 2) * (-1)).toString()))
    .style("text-anchor", "middle")
    .text("Net imports [Imports - Exports - Bunkers] (petajoules)")
    .append("svg:title")
    .text(function (d) { return "Negative indicates exports." })


  // Label for x axis
  svg.append("text")
    .attr("y", (chart_height - 10).toString())
    .attr("x", (chart_width / 2).toString())
    .style("text-anchor", "middle")
    .text("Primary energy production (petajoules)")

  console.log("imports_scale(0):  " + imports_scale(0).toString())



}