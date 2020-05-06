--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 12.2

-- Started on 2020-05-06 10:56:46

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 11 (class 2615 OID 16412)
-- Name: metrobike; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA metrobike;


ALTER SCHEMA metrobike OWNER TO postgres;

--
-- TOC entry 234 (class 1255 OID 51003)
-- Name: copy_bikes_by_month_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_bikes_by_month_to_csv()
    LANGUAGE sql
    AS $$COPY (SELECT * from metrobike.bikes_by_month) 
	TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\bikes_by_month.csv'
	WITH CSV HEADER$$;


ALTER PROCEDURE metrobike.copy_bikes_by_month_to_csv() OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 51046)
-- Name: copy_passholder_types_by_year_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_passholder_types_by_year_to_csv()
    LANGUAGE sql
    AS $$
		COPY (SELECT passholder_type, year, trips 
			  from metrobike.passholder_types_by_year)
		TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\passholder_type_by_year.csv'
		WITH CSV HEADER
	$$;


ALTER PROCEDURE metrobike.copy_passholder_types_by_year_to_csv() OWNER TO postgres;

--
-- TOC entry 235 (class 1255 OID 51004)
-- Name: copy_passholders_and_duration_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_passholders_and_duration_to_csv()
    LANGUAGE sql
    AS $$COPY (SELECT * from metrobike.passholders_and_duration) 
	TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\passholders_and_duration.csv'
	WITH CSV HEADER$$;


ALTER PROCEDURE metrobike.copy_passholders_and_duration_to_csv() OWNER TO postgres;

--
-- TOC entry 236 (class 1255 OID 51005)
-- Name: copy_passholders_by_month_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_passholders_by_month_to_csv()
    LANGUAGE sql
    AS $$COPY (SELECT * from metrobike.passholders_by_month) 
	TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\passholders_by_month.csv'
	WITH CSV HEADER$$;


ALTER PROCEDURE metrobike.copy_passholders_by_month_to_csv() OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 51047)
-- Name: copy_stations_and_regions_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_stations_and_regions_to_csv()
    LANGUAGE sql
    AS $$
		COPY (SELECT station_id, station_name, region, latitude, longitude 
			  from metrobike.stations_and_regions) 
		TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\stations_and_regions.csv'
		WITH CSV HEADER;
	$$;


ALTER PROCEDURE metrobike.copy_stations_and_regions_to_csv() OWNER TO postgres;

--
-- TOC entry 237 (class 1255 OID 51006)
-- Name: copy_stations_by_year_month(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_stations_by_year_month()
    LANGUAGE sql
    AS $$COPY (SELECT metrobike.stations_by_year_month()) TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\stations_by_year_months.json'$$;


ALTER PROCEDURE metrobike.copy_stations_by_year_month() OWNER TO postgres;

--
-- TOC entry 238 (class 1255 OID 51007)
-- Name: copy_stations_by_year_month_to_json(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_stations_by_year_month_to_json()
    LANGUAGE sql
    AS $$COPY (SELECT metrobike.stations_by_year_month_to_json()) TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\stations_by_year_months.json'$$;


ALTER PROCEDURE metrobike.copy_stations_by_year_month_to_json() OWNER TO postgres;

--
-- TOC entry 245 (class 1255 OID 51049)
-- Name: copy_trips_by_season_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_trips_by_season_to_csv()
    LANGUAGE sql
    AS $$
		COPY (SELECT * from metrobike.trips_by_season) 
		TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\trips_by_season.csv'
		WITH CSV HEADER
	$$;


ALTER PROCEDURE metrobike.copy_trips_by_season_to_csv() OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 51008)
-- Name: copy_trips_by_year_month_hour_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_trips_by_year_month_hour_to_csv()
    LANGUAGE sql
    AS $$COPY (SELECT * from metrobike.trips_by_year_month_hour) 
	TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\trips_by_year_months_hour.csv'
	WITH CSV HEADER$$;


ALTER PROCEDURE metrobike.copy_trips_by_year_month_hour_to_csv() OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 51009)
-- Name: copy_trips_by_year_month_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_trips_by_year_month_to_csv()
    LANGUAGE sql
    AS $$COPY (SELECT * from metrobike.trips_by_year_month) 
	TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\trips_by_year_months.csv'
	WITH CSV HEADER$$;


ALTER PROCEDURE metrobike.copy_trips_by_year_month_to_csv() OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 51010)
-- Name: copy_trips_by_year_month_to_json(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_trips_by_year_month_to_json()
    LANGUAGE sql
    AS $$COPY (SELECT metrobike.trips_by_year_month_to_json()) TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\trips_by_year_months.json'$$;


ALTER PROCEDURE metrobike.copy_trips_by_year_month_to_json() OWNER TO postgres;

--
-- TOC entry 244 (class 1255 OID 51048)
-- Name: copy_trips_rollup_year_month_day_hour_to_csv(); Type: PROCEDURE; Schema: metrobike; Owner: postgres
--

CREATE PROCEDURE metrobike.copy_trips_rollup_year_month_day_hour_to_csv()
    LANGUAGE sql
    AS $$
		COPY (SELECT year, month, day, hour, trips, day_of_week, event_of_day 
			  from metrobike.trips_rollup_year_month_day_hour_dow)
		TO 'C:\Users\Patrick\OneDrive\_INF554\a5-huff-n-puff\project_01\public\trips_rollup_year_month_day_hour.csv'
		WITH CSV HEADER
	$$;


ALTER PROCEDURE metrobike.copy_trips_rollup_year_month_day_hour_to_csv() OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 216 (class 1259 OID 42766)
-- Name: trips; Type: TABLE; Schema: metrobike; Owner: postgres
--

CREATE TABLE metrobike.trips (
    trip_id bigint NOT NULL,
    duration integer NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    start_station_id integer NOT NULL,
    start_lat double precision NOT NULL,
    start_lon double precision NOT NULL,
    end_station_id integer NOT NULL,
    end_lat double precision NOT NULL,
    end_lon double precision NOT NULL,
    bike_id integer NOT NULL,
    plan_duration integer NOT NULL,
    trip_route_category character varying(32) NOT NULL,
    passholder_type character varying(32) NOT NULL
);


ALTER TABLE metrobike.trips OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 42778)
-- Name: bikes_by_month; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.bikes_by_month AS
 SELECT unique_bikes.year_month,
    count(unique_bikes.bike_id) AS number_of_bikes
   FROM ( SELECT DISTINCT to_char(trips.start_time, 'YYYY_MM'::text) AS year_month,
            trips.bike_id
           FROM metrobike.trips) unique_bikes
  GROUP BY unique_bikes.year_month
  ORDER BY unique_bikes.year_month;


ALTER TABLE metrobike.bikes_by_month OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 51013)
-- Name: events; Type: TABLE; Schema: metrobike; Owner: postgres
--

CREATE TABLE metrobike.events (
    year integer NOT NULL,
    month integer NOT NULL,
    day integer NOT NULL,
    hour integer NOT NULL,
    event text
);


ALTER TABLE metrobike.events OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 51022)
-- Name: passholder_types_by_year; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.passholder_types_by_year AS
 SELECT a.passholder_type,
    a.year,
    sum(a.trip) AS trips
   FROM ( SELECT trips.passholder_type,
            (date_part('year'::text, trips.start_time))::integer AS year,
            1 AS trip
           FROM metrobike.trips) a
  GROUP BY a.passholder_type, a.year
  ORDER BY a.passholder_type, a.year;


ALTER TABLE metrobike.passholder_types_by_year OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 42782)
-- Name: passholders_and_duration; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.passholders_and_duration AS
 SELECT trips.passholder_type,
    trips.duration
   FROM metrobike.trips
  ORDER BY trips.passholder_type, trips.duration;


ALTER TABLE metrobike.passholders_and_duration OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 42786)
-- Name: passholders_by_month; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.passholders_by_month AS
 SELECT unique_passholders.year_month,
    unique_passholders.passholder_type,
    sum(unique_passholders.trip) AS trips
   FROM ( SELECT to_char(trips.start_time, 'YYYY_MM'::text) AS year_month,
            trips.passholder_type,
            1 AS trip
           FROM metrobike.trips) unique_passholders
  GROUP BY unique_passholders.year_month, unique_passholders.passholder_type
  ORDER BY unique_passholders.year_month, unique_passholders.passholder_type;


ALTER TABLE metrobike.passholders_by_month OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 42773)
-- Name: stations; Type: TABLE; Schema: metrobike; Owner: postgres
--

CREATE TABLE metrobike.stations (
    station_id integer NOT NULL,
    station_name character varying(256) NOT NULL,
    go_live_date timestamp without time zone NOT NULL,
    region character varying(32) NOT NULL,
    status character varying(32) NOT NULL
);


ALTER TABLE metrobike.stations OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 51026)
-- Name: stations_and_regions; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.stations_and_regions AS
 SELECT a.station_id,
    a.station_name,
    a.region,
    round((avg(a.latitude))::numeric, 6) AS latitude,
    round((avg(a.longitude))::numeric, 6) AS longitude
   FROM ( SELECT trips.start_station_id AS station_id,
            COALESCE(stations.station_name, ((trips.start_station_id)::text)::character varying) AS station_name,
            COALESCE(stations.region, ((trips.start_station_id)::text)::character varying) AS region,
            trips.start_lat AS latitude,
            trips.start_lon AS longitude
           FROM (metrobike.trips
             LEFT JOIN metrobike.stations ON ((trips.start_station_id = stations.station_id)))
        UNION
         SELECT trips.end_station_id AS station_id,
            COALESCE(stations.station_name, ((trips.end_station_id)::text)::character varying) AS station_name,
            COALESCE(stations.region, ((trips.end_station_id)::text)::character varying) AS region,
            trips.end_lat AS latitude,
            trips.end_lon AS longitude
           FROM (metrobike.trips
             LEFT JOIN metrobike.stations ON ((trips.end_station_id = stations.station_id)))) a
  GROUP BY a.station_id, a.station_name, a.region
  ORDER BY a.station_id;


ALTER TABLE metrobike.stations_and_regions OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 42790)
-- Name: stations_by_year_month; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.stations_by_year_month AS
 SELECT json_agg(aggregated_trips.*) AS json_objects
   FROM ( SELECT trips.year,
            trips.month,
            trips.start_station_id,
            trips.end_station_id,
            sum(trips.trip) AS value
           FROM ( SELECT to_char(trips_1.start_time, 'YYYY_MM'::text) AS key,
                    (date_part('year'::text, trips_1.start_time))::integer AS year,
                    (date_part('month'::text, trips_1.start_time))::integer AS month,
                    trips_1.start_station_id,
                    trips_1.end_station_id,
                    1 AS trip
                   FROM metrobike.trips trips_1) trips
          GROUP BY trips.year, trips.month, trips.start_station_id, trips.end_station_id
          ORDER BY trips.year, trips.month, trips.start_station_id, trips.end_station_id) aggregated_trips;


ALTER TABLE metrobike.stations_by_year_month OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 51031)
-- Name: trips_by_season; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_by_season AS
 WITH summer_months AS (
         SELECT b.hour,
            b.trips
           FROM ( SELECT a.hour,
                    sum(a.trip) AS trips
                   FROM ( SELECT ((date_part('hour'::text, trips.start_time))::integer + 1) AS hour,
                            1 AS trip
                           FROM metrobike.trips
                          WHERE (((date_part('month'::text, trips.start_time))::integer >= 5) AND ((date_part('month'::text, trips.start_time))::integer <= 11))) a
                  GROUP BY a.hour) b
        ), winter_months AS (
         SELECT b.hour,
            b.trips
           FROM ( SELECT a.hour,
                    sum(a.trip) AS trips
                   FROM ( SELECT ((date_part('hour'::text, trips.start_time))::integer + 1) AS hour,
                            1 AS trip
                           FROM metrobike.trips
                          WHERE (((date_part('month'::text, trips.start_time))::integer < 5) OR ((date_part('month'::text, trips.start_time))::integer > 11))) a
                  GROUP BY a.hour) b
        )
 SELECT summer_months.hour,
    summer_months.trips AS summer,
    winter_months.trips AS winter
   FROM (summer_months
     JOIN winter_months USING (hour));


ALTER TABLE metrobike.trips_by_season OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 42796)
-- Name: trips_by_year_month; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_by_year_month AS
 SELECT trip_by_year_month.key,
    trip_by_year_month.year,
    trip_by_year_month.month,
    sum(trip_by_year_month.trip) AS value
   FROM ( SELECT to_char(trips.start_time, 'YYYY_MM'::text) AS key,
            (date_part('year'::text, trips.start_time))::integer AS year,
            (date_part('month'::text, trips.start_time))::integer AS month,
            1 AS trip
           FROM metrobike.trips) trip_by_year_month
  GROUP BY trip_by_year_month.key, trip_by_year_month.year, trip_by_year_month.month
  ORDER BY trip_by_year_month.key, trip_by_year_month.year, trip_by_year_month.month;


ALTER TABLE metrobike.trips_by_year_month OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 42800)
-- Name: trips_by_year_month_hour; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_by_year_month_hour AS
 SELECT trip_by_year_month_hour.year,
    trip_by_year_month_hour.month,
    trip_by_year_month_hour.hour,
    sum(trip_by_year_month_hour.trip) AS value
   FROM ( SELECT (date_part('year'::text, trips.start_time))::integer AS year,
            (date_part('month'::text, trips.start_time))::integer AS month,
            (date_part('hour'::text, trips.start_time))::integer AS hour,
            1 AS trip
           FROM metrobike.trips) trip_by_year_month_hour
  GROUP BY trip_by_year_month_hour.year, trip_by_year_month_hour.month, trip_by_year_month_hour.hour
  ORDER BY trip_by_year_month_hour.year, trip_by_year_month_hour.month, trip_by_year_month_hour.hour;


ALTER TABLE metrobike.trips_by_year_month_hour OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 42804)
-- Name: trips_by_year_month_to_json; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_by_year_month_to_json AS
 SELECT json_agg(trips_by_year_month.*) AS json_objects
   FROM ( SELECT trips_by_year_month_1.key,
            trips_by_year_month_1.year,
            trips_by_year_month_1.month,
            trips_by_year_month_1.value
           FROM metrobike.trips_by_year_month trips_by_year_month_1) trips_by_year_month;


ALTER TABLE metrobike.trips_by_year_month_to_json OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 51036)
-- Name: trips_rollup_year_month_day_hour; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_rollup_year_month_day_hour AS
 SELECT COALESCE(a.year, 0) AS year,
    COALESCE(a.month, 0) AS month,
    COALESCE(a.day, 0) AS day,
    COALESCE(a.hour, 0) AS hour,
    sum(a.trip) AS trips
   FROM ( SELECT (date_part('year'::text, trips.start_time))::integer AS year,
            (date_part('month'::text, trips.start_time))::integer AS month,
            (date_part('day'::text, trips.start_time))::integer AS day,
            ((date_part('hour'::text, trips.start_time))::integer + 1) AS hour,
            1 AS trip
           FROM metrobike.trips) a
  GROUP BY GROUPING SETS ((), (a.year), (a.year, a.month), (a.year, a.month, a.day), (a.year, a.month, a.day, a.hour))
  ORDER BY COALESCE(a.year, 0), COALESCE(a.month, 0), COALESCE(a.day, 0), COALESCE(a.hour, 0);


ALTER TABLE metrobike.trips_rollup_year_month_day_hour OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 51041)
-- Name: trips_rollup_year_month_day_hour_dow; Type: VIEW; Schema: metrobike; Owner: postgres
--

CREATE VIEW metrobike.trips_rollup_year_month_day_hour_dow AS
 SELECT a.year,
    a.month,
    a.day,
    a.hour,
    a.trips,
        CASE
            WHEN ((a.year = 2016) AND (a.month = 1) AND (a.day = 1)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 1) AND (a.day = 18)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 2) AND (a.day = 15)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 5) AND (a.day = 30)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 7) AND (a.day = 4)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 9) AND (a.day = 5)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 10) AND (a.day = 10)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 11) AND (a.day = 11)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 11) AND (a.day = 24)) THEN 1
            WHEN ((a.year = 2016) AND (a.month = 11) AND (a.day = 26)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 1) AND (a.day = 2)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 1) AND (a.day = 16)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 2) AND (a.day = 20)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 5) AND (a.day = 29)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 7) AND (a.day = 4)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 9) AND (a.day = 4)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 10) AND (a.day = 9)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 11) AND (a.day = 10)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 11) AND (a.day = 23)) THEN 1
            WHEN ((a.year = 2017) AND (a.month = 11) AND (a.day = 25)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 1) AND (a.day = 1)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 1) AND (a.day = 15)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 2) AND (a.day = 19)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 5) AND (a.day = 28)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 7) AND (a.day = 4)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 9) AND (a.day = 3)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 10) AND (a.day = 8)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 11) AND (a.day = 12)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 11) AND (a.day = 22)) THEN 1
            WHEN ((a.year = 2018) AND (a.month = 11) AND (a.day = 25)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 1) AND (a.day = 1)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 1) AND (a.day = 21)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 2) AND (a.day = 18)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 5) AND (a.day = 27)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 7) AND (a.day = 4)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 9) AND (a.day = 2)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 10) AND (a.day = 14)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 11) AND (a.day = 11)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 11) AND (a.day = 28)) THEN 1
            WHEN ((a.year = 2019) AND (a.month = 11) AND (a.day = 25)) THEN 1
            WHEN ((a.year > 0) AND (a.month > 0) AND (a.day > 0)) THEN ((date_part('dow'::text, ((((((a.year || '-'::text) || a.month) || '-'::text) || a.day) || ' 00:00:00'::text))::date) + (1)::double precision))::integer
            ELSE 0
        END AS day_of_week,
    COALESCE(b.event, ' '::text) AS event_of_day
   FROM (metrobike.trips_rollup_year_month_day_hour a
     LEFT JOIN metrobike.events b ON (((a.year = b.year) AND (a.month = b.month) AND (a.day = b.day) AND (a.hour = b.hour))));


ALTER TABLE metrobike.trips_rollup_year_month_day_hour_dow OWNER TO postgres;

--
-- TOC entry 3820 (class 2606 OID 51020)
-- Name: events Events_pkey; Type: CONSTRAINT; Schema: metrobike; Owner: postgres
--

ALTER TABLE ONLY metrobike.events
    ADD CONSTRAINT "Events_pkey" PRIMARY KEY (year, month, day, hour);


--
-- TOC entry 3818 (class 2606 OID 16443)
-- Name: stations stations_pkey; Type: CONSTRAINT; Schema: metrobike; Owner: postgres
--

ALTER TABLE ONLY metrobike.stations
    ADD CONSTRAINT stations_pkey PRIMARY KEY (station_id);


--
-- TOC entry 3816 (class 2606 OID 16444)
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: metrobike; Owner: postgres
--

ALTER TABLE ONLY metrobike.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (trip_id);


--
-- TOC entry 3813 (class 1259 OID 42771)
-- Name: fki_end_station; Type: INDEX; Schema: metrobike; Owner: postgres
--

CREATE INDEX fki_end_station ON metrobike.trips USING btree (end_station_id);


--
-- TOC entry 3814 (class 1259 OID 42772)
-- Name: fki_start_station; Type: INDEX; Schema: metrobike; Owner: postgres
--

CREATE INDEX fki_start_station ON metrobike.trips USING btree (start_station_id);


--
-- TOC entry 3971 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE trips; Type: ACL; Schema: metrobike; Owner: postgres
--

GRANT SELECT ON TABLE metrobike.trips TO PUBLIC;


--
-- TOC entry 3972 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE stations; Type: ACL; Schema: metrobike; Owner: postgres
--

GRANT SELECT ON TABLE metrobike.stations TO PUBLIC;


-- Completed on 2020-05-06 10:57:02

--
-- PostgreSQL database dump complete
--

