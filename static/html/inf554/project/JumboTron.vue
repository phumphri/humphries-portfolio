<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <!-- Bootstrap CSS -->
        <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        <link rel="stylesheet" type="text/css" href="./public/jumbotron.css" /> -->

        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

            <a class="navbar-brand" href="#">Navbar</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">

                    <!-- Home button.  Works fine. -->
                    <li class="nav-item active">
                        <a class="nav-link" href="#">
                            Home
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#trips_by_year_month_row">
                            Trips
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#sample_row_2">
                            Riders
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#sample_row_3">
                            Stations
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>

                    <!-- Link button.  Probably delete. -->
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> -->

                    <!-- Disabled button, probably remove it. -->
                    <!-- <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li> -->

                    <!-- Dropdown listbox.  Probably replicate the current jumbotron links. -->
                    <!-- Currently not working:  Menu item displayed when hovering. -->
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Topics</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                            <a class="dropdown-item" href="#sample_row_1">Trips</a>
                            <a class="dropdown-item" href="#sample_row_2">Routes</a>
                            <a class="dropdown-item" href="#sample_row_3">Passholders</a>
                        </div>
                    </li> -->
                </ul>

                <!-- Search feature, probably remove it. -->
                <!-- <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->
            </div>
        </nav>

        <main role="main">
            <!-- Main jumbotron for a primary marketing message or call to action -->
            <div class="jumbotron">
                <div class="container">
                    <h1 class="display-3">700,000+ Trips</h1>
                    <p>This website examines trips, routes, and passholder behavior.</p>
                    <p>
                        <a class="btn btn-primary btn-lg" target="_blank" href="https://bikeshare.metro.net/" role="button">Learn more &raquo;</a>
                    </p>
                </div>
            </div>

            <div class="container">
                <!-- This row contains headings above the small Vue-components. -->
                <div class="row">
                    <div class="col-sm-4">
                        <h2>Trips</h2>
                    </div>
                    <div class="col-sm-4">
                        <h2>Riders</h2>
                    </div>
                    <div class="col-sm-4">
                        <h2>Stations</h2>
                    </div>
                </div>

                <!-- This contains the small version of the graphics. -->
                <div class="row">
                    <div class="col-sm-4" id="small_sample_parent_1">
                        <SampleBarChart div_id="small_sample_1" parent_id="small_sample_parent_1" json_file="bars_1.json" />
                    </div>
                    <div class="col-sm-4" id="small_sample_parent_2">
                        <SampleBarChart div_id="small_sample_2" parent_id="small_sample_parent_2" json_file="bars_2.json" />
                    </div>
                    <div class="col-sm-4" id="small_sample_parent_3">
                        <SampleBarChart div_id="small_sample_3" parent_id="small_sample_parent_3" json_file="bars_3.json" />
                    </div>
                </div>

                <!-- This row, located directly under the titles and graphics, is a synopsis and link. -->
                <div class="row">
                    <div class="col-sm-4">
                        <p>The amount, frequency, and seasonality of trips are examined.</p>
                        <p>This seeks to deteremine the number of bikes needed for various scenarios.</p>
                        <p>
                            <!-- <a class="btn btn-secondary" href="#sample_row_1" role="button">View details &raquo;</a> -->
                            <a class="btn btn-secondary" href="#trips_by_year_month_row" role="button">View details &raquo;</a>
                        </p>
                    </div>
                    <div class="col-sm-4">
                        <p>This seeks to determine who is using this service.</p>
                        <p>
                            <a class="btn btn-secondary" href="#sample_row_2" role="button">View details &raquo;</a>
                        </p>
                    </div>
                    <div class="col-sm-4">
                        <p>Start and corresponding stop stations are examined.</p>
                        <p>This seeks to deteremine where additional stations are needed or there is an excess of stations.</p>
                        <p>
                            <a class="btn btn-secondary" href="#sample_row_3" role="button">View details &raquo;</a>
                        </p>
                    </div>
                </div>
                <hr />
            </div>
        </main>

        <!-- <footer class="container">
            <p>&copy; Company 2017-{{ site.time | date: "%Y" }}</p>
    </footer>-->
    </div>
</template>


<script>
    window.onresize = function () {
        location.reload();
    };

    import SampleBarChart from "./SampleBarChart.vue";

    export default {
        name: "JumboTron",
        components: {
            SampleBarChart
        },
        props: {
            msg: String
        },
        mounted() {
            () => { };
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: white;
    }
</style>