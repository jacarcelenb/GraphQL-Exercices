--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2024-11-07 19:05:32

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
-- TOC entry 223 (class 1259 OID 122989)
-- Name: detail_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detail_orders (
    do_id integer NOT NULL,
    ord_id integer,
    piz_id integer,
    do_subtotal numeric,
    do_total numeric
);


ALTER TABLE public.detail_orders OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 122972)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    emp_code text,
    usr_id integer,
    rol_id integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 122971)
-- Name: employees_emp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_emp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_emp_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 219
-- Name: employees_emp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_emp_id_seq OWNED BY public.employees.emp_id;


--
-- TOC entry 210 (class 1259 OID 122929)
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
-- TOC entry 209 (class 1259 OID 122928)
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
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 209
-- Name: ingredients_ing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_ing_id_seq OWNED BY public.ingredients.ing_id;


--
-- TOC entry 222 (class 1259 OID 122981)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    ord_id integer NOT NULL,
    usr_id integer,
    ord_date date,
    ord_description text
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 122980)
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
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_ord_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_ord_id_seq OWNED BY public.orders.ord_id;


--
-- TOC entry 212 (class 1259 OID 122938)
-- Name: pizzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas (
    piz_id integer NOT NULL,
    piz_name text NOT NULL,
    piz_origin text NOT NULL,
    piz_state boolean NOT NULL,
    piz_description text,
    piz_price numeric,
    pis_id integer
);


ALTER TABLE public.pizzas OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 122947)
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
-- TOC entry 213 (class 1259 OID 122946)
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
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 213
-- Name: pizzas_ingredients_pi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_ingredients_pi_id_seq OWNED BY public.pizzas_ingredients.pi_id;


--
-- TOC entry 211 (class 1259 OID 122937)
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
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 211
-- Name: pizzas_piz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_piz_id_seq OWNED BY public.pizzas.piz_id;


--
-- TOC entry 216 (class 1259 OID 122954)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    rol_id integer NOT NULL,
    rol_description text,
    rol_status boolean
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 122953)
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
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_rol_id_seq OWNED BY public.roles.rol_id;


--
-- TOC entry 218 (class 1259 OID 122963)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    usr_id integer NOT NULL,
    usr_fulname text NOT NULL,
    usr_email text NOT NULL,
    usr_password text NOT NULL,
    usr_status boolean NOT NULL,
    user_cedula text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 122962)
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
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_usr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_usr_id_seq OWNED BY public.users.usr_id;


--
-- TOC entry 3203 (class 2604 OID 122975)
-- Name: employees emp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN emp_id SET DEFAULT nextval('public.employees_emp_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 122932)
-- Name: ingredients ing_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ing_id SET DEFAULT nextval('public.ingredients_ing_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 122984)
-- Name: orders ord_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN ord_id SET DEFAULT nextval('public.orders_ord_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 122941)
-- Name: pizzas piz_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas ALTER COLUMN piz_id SET DEFAULT nextval('public.pizzas_piz_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 122950)
-- Name: pizzas_ingredients pi_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients ALTER COLUMN pi_id SET DEFAULT nextval('public.pizzas_ingredients_pi_id_seq'::regclass);


--
-- TOC entry 3201 (class 2604 OID 122957)
-- Name: roles rol_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN rol_id SET DEFAULT nextval('public.roles_rol_id_seq'::regclass);


--
-- TOC entry 3202 (class 2604 OID 122966)
-- Name: users usr_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN usr_id SET DEFAULT nextval('public.users_usr_id_seq'::regclass);


--
-- TOC entry 3381 (class 0 OID 122989)
-- Dependencies: 223
-- Data for Name: detail_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detail_orders (do_id, ord_id, piz_id, do_subtotal, do_total) FROM stdin;
\.


--
-- TOC entry 3378 (class 0 OID 122972)
-- Dependencies: 220
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (emp_id, emp_code, usr_id, rol_id) FROM stdin;
\.


--
-- TOC entry 3368 (class 0 OID 122929)
-- Dependencies: 210
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (ing_id, ing_name, ing_calories, ing_state) FROM stdin;
1	F	89	t
\.


--
-- TOC entry 3380 (class 0 OID 122981)
-- Dependencies: 222
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (ord_id, usr_id, ord_date, ord_description) FROM stdin;
\.


--
-- TOC entry 3370 (class 0 OID 122938)
-- Dependencies: 212
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas (piz_id, piz_name, piz_origin, piz_state, piz_description, piz_price, pis_id) FROM stdin;
\.


--
-- TOC entry 3372 (class 0 OID 122947)
-- Dependencies: 214
-- Data for Name: pizzas_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas_ingredients (pi_id, piz_id, ing_id, pi_portion) FROM stdin;
\.


--
-- TOC entry 3374 (class 0 OID 122954)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (rol_id, rol_description, rol_status) FROM stdin;
\.


--
-- TOC entry 3376 (class 0 OID 122963)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (usr_id, usr_fulname, usr_email, usr_password, usr_status, user_cedula) FROM stdin;
\.


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 219
-- Name: employees_emp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_emp_id_seq', 1, false);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 209
-- Name: ingredients_ing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_ing_id_seq', 33, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_ord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_ord_id_seq', 1, false);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 213
-- Name: pizzas_ingredients_pi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_ingredients_pi_id_seq', 1, false);


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 211
-- Name: pizzas_piz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_piz_id_seq', 1, false);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 215
-- Name: roles_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_rol_id_seq', 1, false);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_usr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usr_id_seq', 1, false);


--
-- TOC entry 3220 (class 2606 OID 122995)
-- Name: detail_orders detail_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_pkey PRIMARY KEY (do_id);


--
-- TOC entry 3216 (class 2606 OID 122979)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);


--
-- TOC entry 3206 (class 2606 OID 122936)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ing_id);


--
-- TOC entry 3218 (class 2606 OID 122988)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (ord_id);


--
-- TOC entry 3210 (class 2606 OID 122952)
-- Name: pizzas_ingredients pizzas_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT pizzas_ingredients_pkey PRIMARY KEY (piz_id, ing_id);


--
-- TOC entry 3208 (class 2606 OID 122945)
-- Name: pizzas pizzzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzzas_pkey PRIMARY KEY (piz_id);


--
-- TOC entry 3212 (class 2606 OID 122961)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (rol_id);


--
-- TOC entry 3214 (class 2606 OID 122970)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (usr_id);


--
-- TOC entry 3226 (class 2606 OID 123040)
-- Name: detail_orders detail_orders_ord_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_ord_id_fkey FOREIGN KEY (ord_id) REFERENCES public.orders(ord_id) NOT VALID;


--
-- TOC entry 3227 (class 2606 OID 123045)
-- Name: detail_orders detail_orders_piz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detail_orders
    ADD CONSTRAINT detail_orders_piz_id_fkey FOREIGN KEY (piz_id) REFERENCES public.pizzas(piz_id) NOT VALID;


--
-- TOC entry 3223 (class 2606 OID 123020)
-- Name: employees employees_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(rol_id) NOT VALID;


--
-- TOC entry 3224 (class 2606 OID 123025)
-- Name: employees employees_usr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.users(usr_id) NOT VALID;


--
-- TOC entry 3221 (class 2606 OID 123010)
-- Name: pizzas_ingredients fk_ing_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT fk_ing_id FOREIGN KEY (ing_id) REFERENCES public.ingredients(ing_id) NOT VALID;


--
-- TOC entry 3222 (class 2606 OID 123015)
-- Name: pizzas_ingredients fk_piz_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas_ingredients
    ADD CONSTRAINT fk_piz_id FOREIGN KEY (piz_id) REFERENCES public.pizzas(piz_id) NOT VALID;


--
-- TOC entry 3225 (class 2606 OID 123030)
-- Name: orders orders_usr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_usr_id_fkey FOREIGN KEY (usr_id) REFERENCES public.users(usr_id) NOT VALID;


-- Completed on 2024-11-07 19:05:33

--
-- PostgreSQL database dump complete
--

