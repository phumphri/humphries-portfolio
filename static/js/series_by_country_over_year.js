
function draw_series_by_country_over_year(series) {

  console.log('function series_by_country_and_year.drawChar(' + series + ') was called.')

  series_name = 'Primary energy production (petajoules)'

  ta01.innerHTML = 'Brazil and Columbia trending up significantly.  Decrease for Venezuela.'

  switch (series) {
    case 'P':
      series_name = 'Primary energy production (petajoules)'
      ta01.innerHTML = 'Brazil and Columbia trending up significantly.  Decrease for Venezuela.'
      break
    case 'N':
      series_name = 'Net imports [Imports - Exports - Bunkers] (petajoules)'
      ta01.innerHTML = 'Brazil has eliminated imports.  Exports for Columbia have increased corresponding to increase in production.'
      break
    case 'C':
      series_name = 'Changes in stocks (petajoules)'
      ta01.innerHTML = 'Stocks for Columbia have decreased corresponding to the increase in exports.'
      break
    case 'T':
      series_name = 'Total supply (petajoules)'
      ta01.innerHTML = 'Total production for Brazil and Argentina have increased whereas decrease for Venezuela.'
      break
    case 'S':
      series_name = 'Supply per capita (gigajoules)'
      ta01.innerHTML = 'Despite being the top producer, Brazil is middle in per capita.  Chile and Argentina are trending higher.'
      break
  }

  console.log('series_name:' + series_name)

  var url = 'https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit?usp=sharing'
  
  var queryString = encodeURIComponent('SELECT A, sum(D) where (C = "' + series_name + '") and (B<>"South America") group by A pivot B')

  var query = new google.visualization.Query(url + '&gid=703773082&headers=1&tq=' + queryString)

  query.send(handle_series_by_country_over_year)
}

function handle_series_by_country_over_year(response) {
  if (response.isError()) {
    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage())
    return
  }

  var options = {
    height: 600,
    title: series_name + ' by Country over Year',
    hAxis: {format:'####'}
  }

  var data = response.getDataTable()
  var chart = new google.visualization.LineChart(document.getElementById('series_by_country_over_year_div'))
  chart.draw(data, options);
}