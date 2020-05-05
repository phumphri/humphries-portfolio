function select_data() {

    // Select all data if the reset button was selected.
    if (g.reset) {
        g.selected_data = g.dataset.slice(0)
        return
    }

    // Select all data if the select_all_ten button was selected.
    if (g.select_all_ten) {
        g.selected_data = g.dataset.slice(0)
        return
    }

    // Preserve the current sort order.
    v.sort_by_ascending_key = g.sort_by_ascending_key
    v.sort_by_ascending_value = g.sort_by_ascending_value
    v.sort_by_descending_value = g.sort_by_descending_value

    // Select all data
    g.selected_data = g.dataset.slice(0)

    // Select descending value for top five.
    // Select ascending value for bottom five.
    if (g.select_top_five) {
        g.sort_by_ascending_key = false
        g.sort_by_ascending_value = false
        g.sort_by_descending_value = true
    } else {
        g.sort_by_ascending_key = false
        g.sort_by_ascending_value = true
        g.sort_by_descending_value = false
    }

    // Sort the data and take just the first five records.
    sort_data()
    g.selected_data = g.selected_data.slice(0, 5)

    // Restore the original sort order.
    g.sort_by_ascending_key = v.sort_by_ascending_key
    g.sort_by_ascending_value = v.sort_by_ascending_value
    g.sort_by_descending_value = v.sort_by_descending_value
}
