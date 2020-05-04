
function draw_country_footprint_over_year(country) {

  var selected_country = 'AR'

  if (typeof(country) != "undefined") {
    selected_country = country
  }

  console.log('function country_footprint_over_year.drawChar(' + selected_country + ') was called.')

  switch (selected_country) {
    case 'SA':
      country_name = 'South America'
      ta04.innerHTML = 'South America has a steady increase in production, with the corresponding increase in supply.'
      break
    case 'AR':
      country_name = 'Argentina'
      ta04.innerHTML = 'Argentina has offset the decline in production with an increase in imports.'
      break
    case 'BO':
      country_name = 'Bolivia (Plurin. State of)'
      ta04.innerHTML = 'Bolivia has significant increase in production with an equivalent increase in exports.'
      break
    case 'BR':
      country_name = 'Brazil'
      ta04.innerHTML = 'Brazil has eliminated the need for imports by having production match demaind.'
      break
    case 'CH':
      country_name = 'Chile'
      ta04.innerHTML = 'Chile has drastically increased imports to meet demand.'
      break
    case 'CO':
      country_name = 'Colombia'
      ta04.innerHTML = 'Columbia has significantly increased exports by increasing production.'
      break
    case 'EC':
      country_name = 'Ecuador'
      ta04.innerHTML = 'Ecuador has increased exports by increasing production and decreasing demand.'
      break
    case 'GU':
      country_name = 'Guyana'
      ta04.innerHTML = 'The data for Guyana is questionable and needs further investigation.'
      break
    case 'PA':
      country_name = 'Paraguay'
      ta04.innerHTML = 'Paraguay has meet inreasing demand by increasing production while exports are steady.'
      break
    case 'PE':
      country_name = 'Peru'
      ta04.innerHTML = 'Peru decreased exports and stocks to fill the difference between production and demand.'
      break
    case 'SU':
      country_name = 'Suriname'
      ta04.innerHTML = 'The data for Suriname is questionable and needs further investigation.'
      break
    case 'UR':
      country_name = 'Uruguay'
      ta04.innerHTML = 'Uruguay has meet increasing demand with significant imports and increasing production.'
      break
    case 'VE':
      country_name = 'Venezuela (Boliv. Rep. of)'
      ta04.innerHTML = 'Venezuela has decreasing production that has resulted in decreasing exports.'
      break
  }

  var url = 'https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit?usp=sharing'

  var queryString = encodeURIComponent('SELECT A, sum(D) where (B = "' + country_name + '")  and (C<>"Supply per capita (gigajoules)")      and (C<>"Total supply (petajoules)")   group by A pivot C')

  var query = new google.visualization.Query(url + '&gid=703773082&headers=1&tq=' + queryString)

  query.send(handle_country_footprint_over_year);
}

function handle_country_footprint_over_year(response) {
  if (response.isError()) {
    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage())
    return
  }

  var dataTable = response.getDataTable()

  var numberOfRows = dataTable.getNumberOfRows()
  console.log('Number of rows:  ' + numberOfRows)

  var numberOfColumns = dataTable.getNumberOfColumns()
  console.log('Number of columns:  ' + numberOfColumns)

  for (i = 0; i < numberOfRows; i++) {
    console.log(dataTable.getValue(i, 0) + ', ' + dataTable.getValue(i, 1) + ', ' + dataTable.getValue(i, 2) + ', ' + dataTable.getValue(i, 3))
    // Ignore energy being put into stock.
    if (dataTable.getValue(i, 1) < 0) {
      dataTable.setCell(i, 1, 0)
    }
    // Ignore energy being exported.
    if (dataTable.getValue(i, 2) < 0) {
      dataTable.setCell(i, 2, 0)
    }
  }


  // var newDataTable = new google.visualization.DataTable()
  // newDataTable.addColumn('number', 'Total')
  // newDataTable.addColumn('number', 'Per Capita')
  // newDataTable.addColumn({type: 'string', role: 'tooltip'})
  // newDataTable.addColumn({type: 'string', role: 'annotation'})

  // for (i = 0; i < numberOfRows; i++){
  //   console.log(dataTable.getValue(i,0) + ', ' + dataTable.getValue(i,1) + ', ' + dataTable.getValue(i,2))

  //   var tooltip = dataTable.getValue(i,2) + ': ' + dataTable.getValue(i,0) + ', ' + dataTable.getValue(i,1)

  //   newDataTable.addRow([dataTable.getValue(i,0), dataTable.getValue(i,1), tooltip, dataTable.getValue(i,2)])



  // }
  var options = {
    height: 600,
    title: country_name + ' Footprint over Year (petajoules)',
    hAxis: { format: '####' },
    isStacked: true
  }

  var data = response.getDataTable()
  var chart = new google.visualization.AreaChart(document.getElementById('country_footprint_over_year_div'))
  chart.draw(data, options);
}