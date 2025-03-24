--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2024-11-07 19:04:48

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
-- TOC entry 222 (class 1259 OID 131244)
-- Name: detail_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detail_orders (
    de_id integer NOT NULL,
    ord_id integer NOT NULL,
    piz_id integer NOT NULL,
    de_subtotal numeric NOT NULL,
    de_total numeric NOT NULL
);


ALTER TABLE public.detail_orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 131243)
-- Name: detail_orders_de_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detail_orders_de_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detail_orders_de_id_seq OWNER TO postgres;

--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 221
-- Name: detail_orders_de_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detail_orders_de_id_seq OWNED BY public.detail_orders.de_id;


--
-- TOC entry 210 (class 1259 OID 131192)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    ing_id integer NOT NULL,
    ing_name text NOT NULL,
    ing_calories double precision NOT NULL,
    ing_state boolean NOT NULL
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 131191)
-- Name: ingredients_ing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_ing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_ing_id_seq OWNER TO postgres;

--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 209
-- Name: ingredients_ing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_ing_id_seq OWNED BY public.ingredients.ing_id;


--
-- TOC entry 224 (class 1259 OID 139289)
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    mn_id integer NOT NULL,
    mn_name text,
    mn_route text,
    mn_icon text
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 139288)
-- Name: menu_mn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_mn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_mn_id_seq OWNER TO postgres;

--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 223
-- Name: menu_mn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_mn_id_seq OWNED BY public.menu.mn_id;


--
-- TOC entry 220 (class 1259 OID 131235)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    ord_id integer NOT NULL,
    usr_id integer NOT NULL,
    ord_date date NOT NULL,
    ord_description text NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 131234)
-- Name: orders_ord_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_ord_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_ord_id_seq OWNER TO postgres;

--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_ord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_ord_id_seq OWNED BY public.orders.ord_id;


--
-- TOC entry 212 (class 1259 OID 131201)
-- Name: pizzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas (
    piz_id integer NOT NULL,
    piz_name text NOT NULL,
    piz_origin text NOT NULL,
    piz_state boolean NOT NULL,
    piz_description text
);


ALTER TABLE public.pizzas OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 131210)
-- Name: pizzas_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas_ingredients (
    pi_id integer NOT NULL,
    piz_id integer NOT NULL,
    ing_id integer NOT NULL,
    pi_portion integer NOT NULL
);


ALTER TABLE public.pizzas_ingredients OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 131209)
-- Name: pizzas_ingredients_pi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizzas_ingredients_pi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizzas_ingredients_pi_id_seq OWNER TO postgres;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 213
-- Name: pizzas_ingredients_pi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_ingredients_pi_id_seq OWNED BY public.pizzas_ingredients.pi_id;


--
-- TOC entry 211 (class 1259 OID 131200)
-- Name: pizzas_piz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizzas_piz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizzas_piz_id_seq OWNER TO postgres;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 211
-- Name: pizzas_piz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_piz_id_seq OWNED BY public.pizzas.piz_id;


--
-- TOC entry 226 (class 1259 OID 139298)
-- Name: rol_menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_menu (
    rm_id integer NOT NULL,
    rol_id integer NOT NULL,
    mn_id integer NOT NULL,
    rm_status boolean DEFAULT true NOT NULL
);


ALTER TABLE public.rol_menu OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 139297)
-- Name: rol_menu_rm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_menu_rm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_menu_rm_id_seq OWNER TO postgres;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 225
-- Name: rol_menu_rm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_menu_rm_id_seq OWNED BY public.rol_menu.rm_id;


--
-- TOC entry 216 (class 1259 OID 131217)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    rol_id integer NOT NULL,
    rol_description text,
    rol_status boolean
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 131216)
-- Name: roles_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_rol_id_seq OWNER TO postgres;

--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_rol_id_seq OWNED BY public.roles.rol_id;


--
-- TOC entry 218 (class 1259 OID 131226)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    usr_id integer NOT NULL,
    usr_name text NOT NULL,
    usr_email text NOT NULL,
    usr_password text NOT NULL,
    usr_status boolean NOT NULL,
    rol_id integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 131225)
-- Name: users_usr_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_usr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_usr_id_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_usr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_usr_id_seq OWNED BY public.users.usr_id;


--
-- TOC entry 3210 (class 2604 OID 131247)
-- Name: detail_orders de_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders ALTER COLUMN de_id SET DEFAULT nextval('public.detail_orders_de_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 131195)
-- Name: ingredients ing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ing_id SET DEFAULT nextval('public.ingredients_ing_id_seq'::regclass);


--
-- TOC entry 3211 (class 2604 OID 139292)
-- Name: menu mn_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN mn_id SET DEFAULT nextval('public.menu_mn_id_seq'::regclass);


--
-- TOC entry 3209 (class 2604 OID 131238)
-- Name: orders ord_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN ord_id SET DEFAULT nextval('public.orders_ord_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 131204)
-- Name: pizzas piz_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas ALTER COLUMN piz_id SET DEFAULT nextval('public.pizzas_piz_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 131213)
-- Name: pizzas_ingredients pi_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients ALTER COLUMN pi_id SET DEFAULT nextval('public.pizzas_ingredients_pi_id_seq'::regclass);


--
-- TOC entry 3212 (class 2604 OID 139301)
-- Name: rol_menu rm_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menu ALTER COLUMN rm_id SET DEFAULT nextval('public.rol_menu_rm_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 131220)
-- Name: roles rol_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN rol_id SET DEFAULT nextval('public.roles_rol_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 131229)
-- Name: users usr_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN usr_id SET DEFAULT nextval('public.users_usr_id_seq'::regclass);


--
-- TOC entry 3392 (class 0 OID 131244)
-- Dependencies: 222
-- Data for Name: detail_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detail_orders (de_id, ord_id, piz_id, de_subtotal, de_total) FROM stdin;
\.


--
-- TOC entry 3380 (class 0 OID 131192)
-- Dependencies: 210
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (ing_id, ing_name, ing_calories, ing_state) FROM stdin;
2	Queso Mozarella	15	t
1	Salami	13	t
\.


--
-- TOC entry 3394 (class 0 OID 139289)
-- Dependencies: 224
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (mn_id, mn_name, mn_route, mn_icon) FROM stdin;
1	Dashboard	/main	pi pi-book
2	Roles	/roles	pi pi-user
5	Ingredientes	/ingredientes	pi pi-briefcase
3	Accesos	/accesos	pi pi-unlock
4	Usuarios	/usuarios	pi pi-users
6	Pizzas	/pizzas	pi pi-cart-minus\n
\.


--
-- TOC entry 3390 (class 0 OID 131235)
-- Dependencies: 220
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (ord_id, usr_id, ord_date, ord_description) FROM stdin;
\.


--
-- TOC entry 3382 (class 0 OID 131201)
-- Dependencies: 212
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas (piz_id, piz_name, piz_origin, piz_state, piz_description) FROM stdin;
1	Pizza de Salami	Italia	t	Pizza Familiar de Salami
2	Pizza de Queso	EEUU	t	Pizza gigante de Queso
4	Pizza de Jamon	Canada	t	Pizza de Jamán
\.


--
-- TOC entry 3384 (class 0 OID 131210)
-- Dependencies: 214
-- Data for Name: pizzas_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas_ingredients (pi_id, piz_id, ing_id, pi_portion) FROM stdin;
1	1	1	3
2	2	2	3
6	4	1	6
\.


--
-- TOC entry 3396 (class 0 OID 139298)
-- Dependencies: 226
-- Data for Name: rol_menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol_menu (rm_id, rol_id, mn_id, rm_status) FROM stdin;
7	1	1	t
8	1	2	t
9	1	3	t
10	1	4	t
11	1	5	t
12	2	1	t
13	1	6	t
\.


--
-- TOC entry 3386 (class 0 OID 131217)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (rol_id, rol_description, rol_status) FROM stdin;
1	ADMIN	t
2	OPERADOR	t
\.


--
-- TOC entry 3388 (class 0 OID 131226)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (usr_id, usr_name, usr_email, usr_password, usr_status, rol_id) FROM stdin;
1	Juana Diaz	juanad@gmail.com	$2a$10$vOSNRUUpGNeE9copBLjLe.t4hJSwtgM07DxiqpX6KPcbwmvAfBnFK	t	1
4	Kara Danvers	kdanvers@gmail.com	$2a$10$Xc9D3mwvUgDQHQSI3DDiFukj1DPayeNNi/Ir4OJJKqgS5ePUQ5fkm	f	2
5	Antonio Quiña	aquina@gmail.com	$2a$10$nb.cVjOHCupfMBwUdQ6FwuPB/ohAzLV4GPfMkk30QgssW9UgE1kUC	t	1
6	Jorge Carcelen	jorgecarcelen98@gmail.com	$2a$10$YnZL9L6Gmrr/XT6NLYw5ZOlgeHNZlfH8bhCV1n/Helu98vqkRO1uq	t	2
\.


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 221
-- Name: detail_orders_de_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detail_orders_de_id_seq', 1, false);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 209
-- Name: ingredients_ing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_ing_id_seq', 2, true);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 223
-- Name: menu_mn_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_mn_id_seq', 6, true);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 219
-- Name: orders_ord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_ord_id_seq', 1, false);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 213
-- Name: pizzas_ingredients_pi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_ingredients_pi_id_seq', 6, true);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 211
-- Name: pizzas_piz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_piz_id_seq', 4, true);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 225
-- Name: rol_menu_rm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_menu_rm_id_seq', 13, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_rol_id_seq', 3, true);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_usr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usr_id_seq', 6, true);


--
-- TOC entry 3227 (class 2606 OID 131251)
-- Name: detail_orders detail_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_pkey PRIMARY KEY (de_id);


--
-- TOC entry 3215 (class 2606 OID 131199)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ing_id);


--
-- TOC entry 3229 (class 2606 OID 139296)
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (mn_id);


--
-- TOC entry 3225 (class 2606 OID 131242)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (ord_id);


--
-- TOC entry 3219 (class 2606 OID 131215)
-- Name: pizzas_ingredients pizzas_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT pizzas_ingredients_pkey PRIMARY KEY (piz_id, ing_id);


--
-- TOC entry 3217 (class 2606 OID 131208)
-- Name: pizzas pizzzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzzas_pkey PRIMARY KEY (piz_id);


--
-- TOC entry 3231 (class 2606 OID 139304)
-- Name: rol_menu rol_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menu
    ADD CONSTRAINT rol_menu_pkey PRIMARY KEY (rm_id);


--
-- TOC entry 3221 (class 2606 OID 131224)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (rol_id);


--
-- TOC entry 3223 (class 2606 OID 131233)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (usr_id);


--
-- TOC entry 3236 (class 2606 OID 131272)
-- Name: detail_orders detail_orders_ord_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_ord_id_fkey FOREIGN KEY (ord_id) REFERENCES public.orders(ord_id) NOT VALID;


--
-- TOC entry 3237 (class 2606 OID 131277)
-- Name: detail_orders detail_orders_piz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_piz_id_fkey FOREIGN KEY (piz_id) REFERENCES public.pizzas(piz_id) NOT VALID;


--
-- TOC entry 3232 (class 2606 OID 131252)
-- Name: pizzas_ingredients fk_ing_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT fk_ing_id FOREIGN KEY (ing_id) REFERENCES public.ingredients(ing_id) NOT VALID;


--
-- TOC entry 3233 (class 2606 OID 131257)
-- Name: pizzas_ingredients fk_piz_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT fk_piz_id FOREIGN KEY (piz_id) REFERENCES public.pizzas(piz_id) NOT VALID;


--
-- TOC entry 3235 (class 2606 OID 131267)
-- Name: orders orders_usr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.users(usr_id) NOT VALID;


--
-- TOC entry 3239 (class 2606 OID 139310)
-- Name: rol_menu rol_menu_mn_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menu
    ADD CONSTRAINT rol_menu_mn_id_fkey FOREIGN KEY (mn_id) REFERENCES public.menu(mn_id) NOT VALID;


--
-- TOC entry 3238 (class 2606 OID 139305)
-- Name: rol_menu rol_menu_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menu
    ADD CONSTRAINT rol_menu_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(rol_id) NOT VALID;


--
-- TOC entry 3234 (class 2606 OID 131262)
-- Name: users users_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(rol_id) NOT VALID;


-- Completed on 2024-11-07 19:04:48

--
-- PostgreSQL database dump complete
--

