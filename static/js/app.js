// Load required libraries.
const http = require('http')
const fs = require('fs')
const path = require("path")
const hostname = "127.0.0.1"
const port = 3000

const Class_404 = require('./Class_404')
const class_404 = new Class_404()

const Class_500 = require('./Class_500')
const class_500 = new Class_500()

// Define web server.
const server = http.createServer((req, res) => {

    // Get the path that is in the url.
    var url = req.url

    if (url.length < 2) {
        url = "/index.html"
    }

    if (url == "/bummer.html") {
        err_message = "Relax, this was only a test."
        class_500.display(err_message, res)
        return
    }

    // Concatenate the current directory and the url to get the file name.
    var file_name = path.join(process.cwd(), url)

    // Check if the file exists.
    if (fs.existsSync(file_name)) {

        fs.readFile(file_name, "binary", (err, file) => {

            if (err) {
                class_500.display(err, res)
                return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(file, "binary")
            return
        })

    } else {

        class_404.display (url, res)
        return
    }

});


// Start server.
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});







