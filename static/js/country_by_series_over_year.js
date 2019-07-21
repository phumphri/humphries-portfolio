
function draw_country_by_series_over_year(country) {

  console.log('function country_by_series_and_year.drawChar(' + country + ') was called.')

  country_name = 'South America'

  ta02.innerHTML = 'Analysis for South America'

  switch (country) {
    case 'SA':
      country_name = 'South America'
      ta02.innerHTML = 'South America has a steady increase in production, with the corresponding increase in supply.'
      break
    case 'AR':
      country_name = 'Argentina'
      ta02.innerHTML = 'Argentina has offset the decline in production with an increase in imports.'
      break
    case 'BO':
      country_name = 'Bolivia (Plurin. State of)'
      ta02.innerHTML = 'Bolivia has significant increase in production with an equivalent increase in exports.'
      break
    case 'BR':
      country_name = 'Brazil'
      ta02.innerHTML = 'Brazil has eliminated the need for imports by having production match demaind.'
      break
    case 'CH':
      country_name = 'Chile'
      ta02.innerHTML = 'Chile has drastically increased imports to meet demand.'
      break
    case 'CO':
      country_name = 'Colombia'
      ta02.innerHTML = 'Columbia has significantly increased exports by increasing production.'
      break
    case 'EC':
      country_name = 'Ecuador'
      ta02.innerHTML = 'Ecuador has increased exports by increasing production and decreasing demand.'
      break
    case 'GU':
      country_name = 'Guyana'
      ta02.innerHTML = 'The data for Guyana is questionable and needs further investigation.'
      break
    case 'PA':
      country_name = 'Paraguay'
      ta02.innerHTML = 'Paraguay has meet inreasing demand by increasing production while exports are steady.'
      break
    case 'PE':
      country_name = 'Peru'
      ta02.innerHTML = 'Peru has had to use its stock and to fill the difference between production and demand.'
      break
    case 'SU':
      country_name = 'Suriname'
      ta02.innerHTML = 'The data for Suriname is questionable and needs further investigation.'
      break
    case 'UR':
      country_name = 'Uruguay'
      ta02.innerHTML = 'Uruguay has meet increasing demand with significant imports and increasing production.'
      break
    case 'VE':
      country_name = 'Venezuela (Boliv. Rep. of)'
      ta02.innerHTML = 'Venezuela has decreasing production that has resulted in decreasing exports.'
      break
  }

  console.log('country_name:' + country_name)

  var url = 'https://docs.google.com/spreadsheets/d/1CeiVB_u3H8lGjD9KlxkKzsdhivRMPKF0D8XT2qAzt0Y/edit?usp=sharing'
  
  var queryString = encodeURIComponent('SELECT A, sum(D) where (B = "' + country_name + '")  and (C<>"Supply per capita (gigajoules)") group by A pivot C')

  var query = new google.visualization.Query(url + '&gid=703773082&headers=1&tq=' + queryString)

  query.send(handle_country_by_series_over_year);
}

function handle_country_by_series_over_year(response) {
  if (response.isError()) {
    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage())
    return
  }

  var options = {
    height: 600,
    title: country_name + ' by Series over Year',
    hAxis: { format: '####' }
  }

  var data = response.getDataTable()
  var chart = new google.visualization.LineChart(document.getElementById('country_by_series_over_year_div'))
  chart.draw(data, options);
}