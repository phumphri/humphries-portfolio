function sort_data() {

    // Sort selected data by ascending country name (default).
    if (g.sort_by_ascending_key) {
        g.selected_data.sort((a, b) => { return d3.ascending(a.key, b.key) })
        return
    }

    // Sort selected data by ascending data value.
    if (g.sort_by_ascending_value) {
        g.selected_data.sort((a, b) => { return d3.ascending(a.value, b.value) })
        return
    }

    // Sort selected data by descending data value.
    if (g.sort_by_descending_value) {
        g.selected_data.sort((a, b) => { return d3.descending(a.value, b.value) })
        return
    }
}
