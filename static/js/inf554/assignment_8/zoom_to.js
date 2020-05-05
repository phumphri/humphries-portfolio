function zoomTo(v) {
    // Zoom into the group of the current group.

    var k = diameter / v[2]

    view = v;

    node.attr("transform", function (d) {
        return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"
    })

    circle.attr("r", function (d) { return d.r * k; })
}