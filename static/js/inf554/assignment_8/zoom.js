function zoom(d) {

    var focus0 = focus; focus = d;

    // Custom zoom feature, with alternate 3 second transition.
    var transition = d3.transition()
        .duration(d3.event.altKey ? 3000 : 1000)
        .tween("zoom", function (d) {
            var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
            return function (t) { zoomTo(i(t)); };
        });

    // Hide the text of the parent of a group so not to interfere with the children.
    transition.selectAll("text")
        .filter(function (d) {

            if (typeof d == "undefined") { return false}
       
            return d.parent === focus || this.style.display === "inline";
        })
        .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
        .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
}
