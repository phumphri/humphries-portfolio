function select_data() {

    console.log(" ")
    console.log("g.series:  " + g.series)
    console.log("g.year:  " + g.year)

    var series_children = g.structured_json.children

    console.log("series_children:")
    console.log(series_children)

    var series_object = series_children.find(function(element) {
        return element.name == g.series
    })

    console.log("series_object:")
    console.log(series_object)

    var year_children = series_object.children

    var year_object = year_children.find(function(element) {
        return element.name == g.year
    })

    console.log("year_object:")
    console.log(year_object)

    country_children = year_object.children

    console.log("country_children:")
    console.log(country_children)


}
