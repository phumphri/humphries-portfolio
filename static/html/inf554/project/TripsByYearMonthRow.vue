<template>
    <div>

        <!-- Interactive Trips by Year, Month, and Day -->
        <div  v-bind:id="row_id" class="row mt-5">
            <div class="col-sm-12">
                <h1>{{row_id}}</h1>
            </div>
        </div>
        <div class="row">

            <div class="col-sm-2 ml-5">
                <fileset>
                    <legend>Navigate</legend>
                    <p class="text-left">Drill down by clicking on a bar.  The lowest level is by hour for a year, month, and  day.</p>
                    <p class="text-left">Rollup by clicking on the background.  The highest level is total trips.</p>
                    <legend>Verify</legend>
                    <p class="text-left">Rollup to the highest level to see if the claim of 700,000+ trips is true.</p>
                    <legend>Explore</legend>
                    <p class="text-left">Navigate through the data and discover trends and patterns.</p>
                    <legend>Event</legend>
                    <p id="event_of_day" class="text-left">Bummer</p>
                </fileset>
            </div>

            <div v-bind:id="col_id" class="col-sm-9">
                <fileset class="mt-1">
                    <legend>Drill Down:  Click Bar | Rollup:  Click Background</legend>
                    <TripsByYearMonth 
                        v-bind:row_id="row_id"
                        v-bind:div_id="div_id" 
                        v-bind:parent_id="col_id" 
                        v-bind:csv_file="csv_file"/>
                </fileset>
            </div>
        </div>

        <!-- Static Trips by Season -->
        <div  v-bind:id="row_id_2" class="row mt-5">
            <div class="col-sm-12">
                <h1>{{row_id_2}}</h1>
            </div>
        </div>
        <div class="row">

            <div class="col-sm-2 ml-5">
                <fileset>
                    <legend>Analysis</legend>
                    <p class="text-left">After exploring data, two patterns emerged.  
                        First there is a seasonal pattern.
                        There are more riders during the summer months of May through October.
                        Second, there are two spikes of riders.  
                        The first spike around 9:00 AM could be attributed to commuters.
                        The second spike is abound 6:00 PM.
                        This could be a combination of commuters and revelers going to venues.
                        It is surprising that there is activity all the way up to 2:00 AM.
                    </p>
                </fileset>
            </div>

            <div class="col-sm-2">
                <fileset>
                    <legend>Next Steps</legend>
                    <p class="text-left">After exploring the volume of trips, patterns were discovered.
                        The next step is to determine the reason for these patterns.
                        This could be done by the analysis of passholders and routes.
                    </p>
                </fileset>
            </div>

            <div v-bind:id="col_id_2" class="col-sm-7">
                <fileset class="mt-1">
                    <TripsBySeason
                        v-bind:row_id_2="row_id_2"
                        v-bind:div_id_2="div_id_2" 
                        v-bind:parent_id_2="col_id_2" 
                        v-bind:csv_file_2="csv_file_2"/>
                </fileset>
            </div>

        </div>
    </div>

</template>

<script>

    // Import the module that will build the bar chart.
    import TripsByYearMonth from './TripsByYearMonth.vue'
    import TripsBySeason from './TripsBySeason.vue'

    // Import d3 for responsive bar chart.
    import * as d3 from "d3";

    export default {
        name: "TripsByYearMonthRow",
        props: ["row_id", "col_id", "div_id", "csv_file", "row_id_2", "col_id_2", "div_id_2", "csv_file_2"],
        components: {
            TripsByYearMonth,
            TripsBySeason
        },
        mounted() {

            // Define global variables.
            var g = {};
            g.b = d3.select("body");
            g.debug = false;

            // Check the prop values.
            if (g.debug) {
                g.b.append("div").append("text").text(".")
                g.b.append("div").append("text").text("Entered TripsByYearMonth_row.vue.")
                g.b.append("div").append("text").text("row_id:  " + this.row_id);
                g.b.append("div").append("text").text("div_id:  " + this.div_id);
                g.b.append("div").append("text").text("col_id:  " + this.col_id);
                g.b.append("div").append("text").text("csv_file:  " + this.csv_file);
                g.b.append("div").append("text").text("row_id_2:  " + this.row_id_2);
                g.b.append("div").append("text").text("div_id_2:  " + this.div_id_2);
                g.b.append("div").append("text").text("col_id_2:  " + this.col_id_2);
                g.b.append("div").append("text").text("csv_file_2:  " + this.csv_file_2);
            }

            // Set the row heading.
            var var_row_id = "#" + this.row_id
            d3.select(var_row_id).select("h1").text("All Trips")

        }
    }
</script>