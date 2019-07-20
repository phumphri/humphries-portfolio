
function draw_per_capita_by_year(selected_year_paramenter) {

  selected_year = selected_year_paramenter

  console.log('function per_capita_by_year.drawChar(' + selected_year + ') was called.')

  ta03.innerHTML = 'To begin, select a year.'

  switch (selected_year) {
    case 1990:
      ta03.innerHTML = 'Venezuela by far has most energy per capita.  Brazil, as big as it is, is below the trendline.'
      break
    case 1995:
      ta03.innerHTML = 'Each year, the trendline moves up as well as Argentina.'
      break
    case 2000:
      ta03.innerHTML = 'Like Argentina in 1995, Chile is also increasing.'
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
      ta03.innerHTML = 'The trendline decreases slightly.'
      break
    case 2016:
      ta03.innerHTML = 'Venezuela significantly falters whereas Chile and Argentina become dominant.'
      break
  }
  console.log('selected_year:' + selected_year)
  url = 'https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit?usp=sharing'
  // url = 'https://docs.google.com/spreadsheets/d/1MOXKOGDX7NK4qpNeETDtucsPJU02orIjcIfrA0OJsHY/edit?usp=sharing'

  queryString = encodeURIComponent('SELECT A, B, C   where D = ' + selected_year)


  query = new google.visualization.Query(url + '&gid=923832174&headers=1&tq=' + queryString)


  query.send(handle_per_capita_by_year);
}

function handle_per_capita_by_year(response) {
  if (response.isError()) {
    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage())
    return
  }


  // The third column of the DataTable will have values for tooltips.
  // This requires unloading the current DataTable and building a new DataTable.
  // The "role" of the third column is "tooltip" of the new DataTable.

  dataTable = response.getDataTable()

  numberOfRows = dataTable.getNumberOfRows()
  console.log('Number of rows:  ' + numberOfRows)

  numberOfColumns = dataTable.getNumberOfColumns()
  console.log('Number of columns:  ' + numberOfColumns)

  newDataTable = new google.visualization.DataTable()
  newDataTable.addColumn('number', 'Total')
  newDataTable.addColumn('number', 'Per Capita')
  newDataTable.addColumn({type: 'string', role: 'tooltip'})
  newDataTable.addColumn({type: 'string', role: 'annotation'})

  for (i = 0; i < numberOfRows; i++){
    console.log(dataTable.getValue(i,0) + ', ' + dataTable.getValue(i,1) + ', ' + dataTable.getValue(i,2))

    tooltip = dataTable.getValue(i,2) + ': ' + dataTable.getValue(i,0) + ', ' + dataTable.getValue(i,1)

    newDataTable.addRow([dataTable.getValue(i,0), dataTable.getValue(i,1), tooltip, dataTable.getValue(i,2)])
  }

  options = {
    height: 600,
    title: 'Supply per capita (gigajoules) over Total supply (petajoules) for Year ' + selected_year,
    legend: 'none',
    hAxis: { format: '##,###', maxValue: '14000' },
    vAxis: { maxValue: '120'},
    trendlines: {0: {} }
    }
  
  chart = new google.visualization.ScatterChart(document.getElementById('per_capita_by_year_div'))
  
  chart.draw(newDataTable, options)
}