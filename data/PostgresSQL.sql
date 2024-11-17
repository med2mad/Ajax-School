--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    _id integer NOT NULL,
    name character varying(255) NOT NULL,
    age integer NOT NULL,
    photo character varying(255) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: profiles__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profiles__id_seq OWNER TO postgres;

--
-- Name: profiles__id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profiles__id_seq OWNED BY public.profiles._id;


--
-- Name: profiles _id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles ALTER COLUMN _id SET DEFAULT nextval('public.profiles__id_seq'::regclass);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (_id, name, age, photo) FROM stdin;
1	66%	23	66%.png
2	66_	21	66_.png
3	Agustin Ortizortiz	33	Agustin Ortizortiz.jpg
4	AjAx	31	AjAx.png
5	Alita Willmer	21	Alita Willmer.jpg
6	Anjanette Devendorf	28	Anjanette Devendorf.jpg
7	Arden Fingal	38	Arden Fingal.jpg
8	Augustine Lucko	38	Augustine Lucko.jpg
9	Augustine Tuero	39	Augustine Tuero.jpg
10	Avalon Gilbert Carpin	32	Avalon Gilbert Carpin.jpg
11	Barabara Kieltyka	31	Barabara Kieltyka.jpg
12	Birgit Squibbs	38	Birgit Squibbs.jpg
13	Bo Dembek	26	Bo Dembek.jpg
14	Britteny Abalos	39	Britteny Abalos.jpg
15	Brittney Mcclaren	29	Brittney Mcclaren.jpg
16	Bruce Alsager	31	Bruce Alsager.jpg
17	Bryda Avalon	30	Bryda Avalon.jpg
18	Caitlyn Novar	24	Caitlyn Novar.jpg
19	Camilila Keyzer	26	Camilila Keyzer.jpg
20	Carmon Dziadzio	33	Carmon Dziadzio.jpg
21	Carolyne Sjodin	32	Carolyne Sjodin.jpg
22	Carson Rupolo	30	Carson Rupolo.jpg
23	Cassy Es	34	Cassy Es.jpg
24	Chanel Emshwiller	35	Chanel Emshwiller.jpg
25	Christian Schamel	28	Christian Schamel.jpg
26	Coral Gysel	28	Coral Gysel.jpg
27	Dean Semanco	35	Dean Semanco.jpg
28	Deann Baltasar	40	Deann Baltasar.jpg
29	Dillon Ponder	27	Dillon Ponder.jpg
30	Dong Cansler	26	Dong Cansler.jpg
31	Eda Testone	24	Eda Testone.jpg
32	Edyth Cernohous	35	Edyth Cernohous.jpg
33	Elias Bellack	27	Elias Bellack.jpg
34	Eliza Crandall	34	Eliza Crandall.jpg
35	Emmanuel Dahmen	20	Emmanuel Dahmen.jpg
36	Erin Buzick	22	Erin Buzick.jpg
37	Erwin Mosch	25	Erwin Mosch.jpg
38	Ezekiel Jaskiewicz	21	Ezekiel Jaskiewicz.jpg
39	Flora Cisneros	28	Flora Cisneros.jpg
40	Garrett Zier	29	Garrett Zier.jpg
41	Genaro Adolphsen	37	Genaro Adolphsen.jpg
42	Genny Miyata	39	Genny Miyata.jpg
43	Georgianna Cabal	31	Georgianna Cabal.jpg
44	Holly Dienger	23	Holly Dienger.jpg
45	Janita Lestina	23	Janita Lestina.jpg
46	Josef Towey	26	Josef Towey.jpg
47	Judie Calisti	32	Judie Calisti.jpg
48	Julie Kilps	40	Julie Kilps.jpg
49	Kareem Prink	36	Kareem Prink.jpg
50	Krystal Delahaye	25	Krystal Delahaye.jpg
51	Lamar Ruys	23	Lamar Ruys.jpg
52	Lamar1	26	Lamar1.jpg
53	Lamar2	27	Lamar2.jpg
54	Laticia Steder	22	Laticia Steder.jpg
55	Laurie Goldberger	21	Laurie Goldberger.jpg
56	Laurinda Bjur	39	Laurinda Bjur.jpg
57	Leonora Lawal	29	Leonora Lawal.jpg
58	Lettie Barquera	32	Lettie Barquera.jpg
59	Letty Gillfillan	37	Letty Gillfillan.jpg
60	Lilia Rutten	37	Lilia Rutten.jpg
61	Lorenzo Sprengel	31	Lorenzo Sprengel.jpg
62	Lorinda Brandal	37	Lorinda Brandal.jpg
63	Lucila Fern	37	Lucila Fern.jpg
64	Mallie Lagro	26	Mallie Lagro.jpg
65	Manuela Welsby	28	Manuela Welsby.jpg
66	Mari Serratt	26	Mari Serratt.jpg
67	Mariano Stramel	25	Mariano Stramel.jpg
68	Markita Abdula	30	Markita Abdula.jpg
69	Marquitta Cumbaa	27	Marquitta Cumbaa.jpg
70	Matt Rosten	24	Matt Rosten.jpg
71	Melina Koloski	34	Melina Koloski.jpg
72	Monte Venezio	37	Monte Venezio.jpg
73	Natisha Bac	30	Natisha Bac.jpg
74	Nicholas Hermandez	28	Nicholas Hermandez.jpg
75	Nicholas Lauer	26	Nicholas Lauer.jpg
76	Norberto Domzalski	21	Norberto Domzalski.jpg
77	Penny Bartick	34	Penny Bartick.jpg
78	Perry Strebler	23	Perry Strebler.jpg
79	profile	38	profile.jpg
80	Reuben Clews	27	Reuben Clews.jpg
81	Rodolfo Gimbel	26	Rodolfo Gimbel.jpg
82	Ronnie Bihun	28	Ronnie Bihun.jpg
83	Roxanna Landau	38	Roxanna Landau.jpg
84	Rudolf Huskin	32	Rudolf Huskin.jpg
85	Samual Dozer	25	Samual Dozer.jpg
86	Samual Uphold	24	Samual Uphold.jpg
87	Serina Frewin	25	Serina Frewin.jpg
88	Shayne Pascoal	39	Shayne Pascoal.jpg
89	Sherly Kines	25	Sherly Kines.jpg
90	Steffanie Donahay	27	Steffanie Donahay.jpg
91	Stephan Kegel	24	Stephan Kegel.jpg
92	Susana Levenduski	38	Susana Levenduski.jpg
93	Suzann Castens	27	Suzann Castens.jpg
94	Taneka Holveck	22	Taneka Holveck.jpg
95	Teena Dudzik	32	Teena Dudzik.jpg
96	Therese Shocklee	39	Therese Shocklee.jpg
97	Towanda Schnurer	33	Towanda Schnurer.jpg
98	Tracy Descoteau	29	Tracy Descoteau.jpg
99	Twanda Klis	28	Twanda Klis.jpg
100	Winford Emmer	39	Winford Emmer.jpg
\.


--
-- Name: profiles__id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles__id_seq', 100, true);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (_id);


--
-- PostgreSQL database dump complete
--

