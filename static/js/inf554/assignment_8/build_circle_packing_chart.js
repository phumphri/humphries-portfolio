function build_circle_packing_chart() {

    // Define local variables
    v = {}

    // Execute nested functions to build the circle packing chart.
    set_margins()
    set_width_and_height()
    set_up_svg()
    build_chart()


    function set_margins() {

        v.window = {}
        v.window.width = Math.floor(window.innerWidth * 0.40)
        v.window.height = Math.floor(window.innerHeight * 0.65)

        v.margin = {}
        v.margin.top = Math.floor(v.window.height * 0.10)
        v.margin.right = Math.floor(v.window.width * 0.10)
        v.margin.bottom = Math.floor(v.window.height * 0.15)
        v.margin.left = Math.floor(v.window.width * 0.15)
    }

    function set_width_and_height() {

        g.circle_packing_chart_div.style.width = v.window.width.toString() + "px"
        g.circle_packing_chart_div.style.height = v.window.height.toString() + "px"

        v.width = v.window.width - v.margin.left - v.margin.right
        v.height = v.window.height - v.margin.top - v.margin.bottom;
    }

    function set_up_svg() {

        // Get the reference to the svg.
        v.svg = d3.select("#circle_packing_chart_svg")

        // If not found, create one.
        if (v.svg.empty()) {
            v.svg = g.circle_packing_chart_div
                .append('svg')
                .attr('id', 'circle_packing_chart_svg')
        }

        // Configure the svg.
        v.svg
            .attr("width", v.width + v.margin.left + v.margin.right)
            .attr("height", v.height + v.margin.top + v.margin.bottom)
            .style("background-color", "mistyrose")
    }


    function build_chart() {

        // Set svg margin to twenty pixels.
        margin = 20

        // Set initial diameter to the svg width.
        diameter = parseInt(v.svg.attr("width"))

        // Append a group to the center of the svg.
        // This group will receive all the circles.  TODO  change global prefix
        gr = v.svg.append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        // Create a color scale for seven levels.
        // Select the hue from light green to a dark blue.
        color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(6,100%,94.1%)", "hsl(0,100%,30%)"])
            .interpolate(d3.interpolateHcl);

        // Crate the circle packing within margins and add padding.
        pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        // Build a hierarchy out of the json file.
        root = d3.hierarchy(g.structured_json)
            .sum(function (d) { return d.value; })
            .sort(function (a, b) { return b.value - a.value; });

        // Define the focus to be a collection of root and nodes.
        var focus = root,
            nodes = pack(root).descendants(),
            view;

        // Create a circle for each node and append it to the group.
        circle = gr.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
            .style("fill", function (d) { return d.children ? color(d.depth) : "white"; })
            .on("click", function (d) {

                if (focus === d) {
                    () => {}
                } else {
                    zoom(d)
                    d3.event.stopPropagation()
                }
            });
        // If parent does not exists, then "node--root".
        // If parent exists and child exists, then "node".
        // If parent exists but not children, then "node--leaf".

        // Add text for the circles.
        text = gr.selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
            .text(function (d) { return d.data.name; });
        // Hide the text for nodes that are roots (parents of the current nodes).

        // Update node to be a collection of all circles and associated texts.
        node = gr.selectAll("circle,text");

        // Adjust color to be slightly darker and zoom to the current root.
        v.svg
            .style("background", color(-1))
            .on("click", function () {
                zoom(root);
            });

        // Position and size all nodes.
        zoomTo([root.x, root.y, root.r * 2 + margin])
    }
}
