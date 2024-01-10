--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: okoro
--

CREATE TABLE public.activity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    task character varying(255),
    runnerid integer,
    description text,
    location character varying(255),
    date date,
    "time" time without time zone,
    status character varying(50),
    setterid integer
);


ALTER TABLE public.activity OWNER TO okoro;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: okoro
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying NOT NULL,
    image character varying NOT NULL,
    description character varying NOT NULL,
    tip character varying NOT NULL,
    runners integer,
    icons text
);


ALTER TABLE public.tasks OWNER TO okoro;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: okoro
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO okoro;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: okoro
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: okoro
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    gender text,
    photo text,
    school text,
    schoolstate text,
    field text,
    yearenrolled integer,
    yeargrad integer,
    idcard text,
    role text NOT NULL,
    active boolean DEFAULT true,
    gig text,
    bio text,
    wallet integer,
    level text DEFAULT 'new'::text,
    trust integer DEFAULT 100,
    completed integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO okoro;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: okoro
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO okoro;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: okoro
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: okoro
--

COPY public.activity (id, task, runnerid, description, location, date, "time", status, setterid) FROM stdin;
0d3fb56e-181d-480a-b8cf-5ebc6dc5c354	errands	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
8f3de314-5231-45ea-9fe0-b191d3652a5e	chores	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
630fb8b2-8bdb-4a15-8c31-e0f292a07f81	errands	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
d2662f6f-a59d-427f-9d85-21adc5e5137f	cook	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
d433e2b4-16ec-43b1-a80c-2ddd68560ff4	errands	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
e91d78ef-1e17-4bac-b285-d28c6c0901eb	farming	0	fgfdhd	hgdjhfh kaduna	2023-12-21	12:45:00	pending	37
9a24561f-138d-49d3-9e2c-53acbc7b23ea	home lessons	53	a simple task	2, hong kaduna	2024-01-01	22:33:00	cancelled	11
d04bcec6-f028-442d-b601-ef796a687eab	farming	37	 A simple errand	2, alkali rd kaduna	2024-01-08	11:16:00	processing	11
9338a53d-a380-47a2-a7e3-e31d67d2201d	assistance	21	kjnlskcklsakcs	jblscksc kaduna	2023-12-22	07:27:00	pending	11
877ce3f4-95b2-4ba1-8d05-89b200d0fdd8	moving	10	A simple task	5, Hong Avenue kaduna	2023-12-23	11:49:00	pending	11
f7725b10-1bbb-4270-9f9b-69c9a18e046c	chores	10	A simple task	12, Aliyu kaduna	2023-12-24	07:38:00	pending	11
5a7e98e6-0b1d-4e3b-9ca5-265a97e98cd0	baby sitting	21	A simple task	12, Aliyu kaduna	2023-12-24	07:38:00	pending	11
02350cc0-0cde-44e1-86de-bacccfd6e6bc	cleaning	21	A simple task	12, Hong Avenue kaduna	2023-12-24	16:41:00	pending	11
5d75d9c5-c3f6-4e02-ab17-6cfcf1471ab3	errands	10	hjjhchvmn mnm,	rsyu87t80 kaduna	2023-12-25	07:45:00	pending	11
13861f68-5a4f-4726-be50-02d10ac571eb	home lessons	9	jdkvdlkddsv;dkdsvldjvdsv	12, hong avenue kaduna	2023-12-21	15:03:00	pending	11
23ab176f-9ebb-43ec-b36a-e2a1072aae03	errands	0	A simple task	5, Hong Avenue kaduna	2023-12-27	10:13:00	pending	11
0f1bc728-288f-4b3c-87e1-6027419a475f	baby sitting	0	A simple task	1, Hong kaduna	2024-01-08	11:25:00	pending	11
2f9b3798-dccf-420b-b3d4-a10c362a773e	farming	0	A simple farming 	2, Hong select location state	2023-12-30	12:39:00	pending	11
0468861e-a1c5-498c-ab81-4f775f3cee0d	farming	37	A farming task	1, shehu idris kaduna	2024-01-01	12:05:00	pending	11
bcf98c0b-aa31-4f7d-942b-71e54d55dda3	errands	5	A simple smal task	2, briggs kaduna	2023-12-28	13:17:00	pending	11
395d2391-f07a-453f-b5e5-95e6ab198257	moving	23	Move them	2, judas kaduna	2023-12-28	17:45:00	pending	11
3b67454e-d9ff-4a35-8fcf-dab9e5a0a847	errands	0	A simple task	1, Hong kaduna	2024-01-08	11:25:00	pending	11
86f5d998-61fa-40dd-af75-01051f2fc896	cleaning	0	A simple farming 	2, Hong kaduna	2023-12-30	12:39:00	pending	11
3bd2c0f5-6831-46c4-be10-a6518c0aea4f	farming	37	A simple farming 	2, Hong kaduna	2023-12-30	12:39:00	processing	11
509156c7-72d0-4e0a-aae8-34b2ea9c816d	farming	0	A farming task	1, shehu idris kaduna	2023-12-29	12:05:00	pending	11
23ee4a2d-fda2-4873-915b-d2ea5c0467eb	errands	0	A simple task	12, hong avenue kaduna	2023-12-21	10:38:00	processing	37
337cd2b4-2ce3-45c1-b297-00ca714bd0dd	baby sitting	8	A simple task	1, Hong kaduna	2024-01-08	11:25:00	pending	11
de86eccd-ee99-4110-9c6f-2510427982b1	farming	37	A simple Farming task	3, new era kaduna	2023-12-31	08:44:00	pending	11
6aa969d8-ad90-44bd-a320-250b4af2af57	cleaning	0	A simple task	1, Hong kaduna	2024-01-08	11:25:00	pending	11
7a48f760-9651-4edd-b429-43ca0f245710	home lessons	53	A simple home lesson	1, hong avenue kaduna	2024-01-02	11:46:00	processing	54
561c4534-39b9-420d-95b7-7128c76cfe38	farming	37	A simple farming gig	2, hong avenue kaduna	2023-12-29	09:37:00	processing	11
b926c30e-72bb-4cec-87c2-66752e634638	cleaning	0	A simple task	1, Hong kaduna	2024-01-08	11:25:00	pending	11
c70c5429-fbf7-4f4d-8572-6839d471cc48	cook	52	A simple cooking task	2, Hong Avenue kaduna	2024-01-01	09:56:00	pending	11
6981e5fd-620f-4564-bda5-444518297710	baby sitting	8	COme and baby sit my child	2, hing rd kaduna	2024-01-02	17:40:00	cancelled	11
ba2eec1c-c984-4e86-a870-9fd1b51b1ae7	baby sitting	8	A simple task	2, hp street kaduna	2024-01-05	07:16:00	pending	55
5d94710b-a508-401b-af07-17f500505800	errands  	0	A simple tasks	2, hong kaduna	2024-01-08	10:53:00	pending	11
71586b44-b920-4e2c-87a7-e0edebee367a	farming	37	A farming task	1, shehu idris kaduna	2023-12-29	12:05:00	processing	11
dde6bdf8-04ef-4dbc-b528-267376a4deba	errands  	0	A simple tasks	2, hong kaduna	2024-01-08	10:53:00	pending	11
18f591cb-b030-48ff-b5dc-a7237da9d219	home lessons	0	A simple home lesson task 	12, alfa rd kaduna	2024-01-01	10:18:00	pending	11
b8ec1860-a595-4c59-90e5-a3652e3ee7f8	home lessons	53	A simple Home lesson task	5 China rd kaduna	2024-01-01	10:42:00	pending	11
e1832e79-8749-462f-8896-7b8e112bb768	home lessons	53	A simple home lesson task	2, Hong city kaduna	2024-01-01	15:06:00	pending	11
23f13f15-0b85-4291-ac60-02569e3a8274	errands  	0	A simple task	2, hong kaduna	2024-01-08	10:56:00	pending	11
d3417aa4-d3de-4011-bbd7-f0b1bcfd0d8c	cook	52	A simple cooking task	3, Hong Avenue kaduna	2024-01-01	16:00:00	processing	11
65ce4dbe-7f6f-48b1-bee6-c32b759cc65e	farming	37	A simple farming gig	2, hong avenue kaduna	2023-12-30	09:37:00	pending	11
afed244e-be36-4081-8494-f45ae7bd91b6	farming	37	A simple farming gig	2, hong avenue kaduna	2023-12-30	09:37:00	pending	11
44f5e4dd-0c39-4aca-b623-119b251f910a	baby sitting  	0	A simple task	2, hong kaduna	2024-01-08	10:56:00	pending	11
98147445-87e5-4064-b12e-7c3ec8d831bc	errands	0	a simple task	2, hong kaduna	2024-01-08	11:05:00	pending	11
00bb7a95-ca21-41bd-933a-6475c33c1dbe	errands	10	 A simple errand	2, alkali rd kaduna	2024-01-08	11:16:00	pending	11
79554b2a-26bf-49b9-a1be-057a6b39baf4	home	0	 A simple errand	2, alkali rd kaduna	2024-01-08	11:16:00	pending	11
8ed6599b-b158-45ce-9181-ca7583bc2925	baby	0	 A simple errand	2, alkali rd kaduna	2024-01-08	11:16:00	pending	11
bcfa033d-10d7-46db-9482-63db1dfb15d6	moving	23	A normal moving stuff	2, Hong kaduna	2024-01-08	12:24:00	pending	11
4871651b-02a0-4870-a307-266e1c2c90bf	home lessons	53	A simple lessons	2, Hong kaduna	2024-01-08	16:46:00	pending	11
91fda2d3-f941-4ab5-bda8-f11e1c1bccab	farming	37	A simple farming	2, hong avenue kaduna	2024-01-08	12:29:00	processing	11
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: okoro
--

COPY public.tasks (id, title, image, description, tip, runners, icons) FROM stdin;
1	errands	https://res.cloudinary.com/okorosamuel/image/upload/v1700724099/Hermes/blackguy_ajm1tu.webp	\nEmploying someone to run errands is pivotal for time optimization and reducing the burden of daily tasks. It allows individuals to prioritize work, family, and personal pursuits while ensuring necessary chores are efficiently handled, leading to a more balanced and stress-free lifestyle.	500	50	https://res.cloudinary.com/okorosamuel/image/upload/v1703005535/Hermes/bicycle-svgrepo-com_udv9jl.svg
6	farming	https://res.cloudinary.com/okorosamuel/image/upload/v1700737029/Hermes/farming.avif_vg3pm1.avif	Hiring a farmer is essential for sustainable agriculture, ensuring food production and environmental stewardship. Farmers play a vital role in providing nourishment, supporting local economies, and implementing practices that promote soil health and biodiversity. Their expertise is fundamental to the foundation of a thriving and resilient food system.	1000	80	https://res.cloudinary.com/okorosamuel/image/upload/v1703006617/Hermes/green-construction-gardening-planting-farming-svgrepo-com_fubo1p.svg
7	assistance	https://res.cloudinary.com/okorosamuel/image/upload/v1700737057/Hermes/assistance_ws5dme.jpg	Assistants contribute to time management, organization, and task delegation, allowing leaders to focus on strategic priorities. Their support fosters a streamlined workflow, enhances teamwork, and ensures that crucial responsibilities are managed effectively within a busy work environment.	1000	200	https://res.cloudinary.com/okorosamuel/image/upload/v1703006747/Hermes/shopping-support-online-svgrepo-com_ynhvcu.svg
3	baby sitting	https://res.cloudinary.com/okorosamuel/image/upload/v1700737070/Hermes/babysitter_y5etg8.jpg	Securing a babysitter is essential for parents to maintain work-life balance, fostering relationships, and allowing vital self-care. It enables parents to recharge, ensuring they can provide the best care for their children. A reliable babysitter contributes to the overall well-being of both parents and children, promoting a healthy family dynamic.	1000	20	https://res.cloudinary.com/okorosamuel/image/upload/v1703006230/Hermes/children-care-svgrepo-com_pn65zv.svg
5	moving	https://res.cloudinary.com/okorosamuel/image/upload/v1700737843/Hermes/young-couple-moving-new-home-together-african-american-couple-with-cardboard-boxes_wv0xme.jpg	Engaging a mover is vital for a seamless relocation process. It ensures the safe and efficient transport of belongings, minimizing stress for individuals or families. A skilled moving service streamlines the moving experience, offering expertise and reliability during a significant life transition, ultimately saving time and effort.	1000	150	https://res.cloudinary.com/okorosamuel/image/upload/v1703006483/Hermes/moving-books-move-worker-mover-svgrepo-com_1_qbsufb.svg
8	home lessons	https://res.cloudinary.com/okorosamuel/image/upload/v1700737119/Hermes/homelessons_amnrwx.jpg	\nEmploying a home lesson teacher is vital for personalized education. They offer individualized attention, cater to specific learning needs, and create a conducive learning environment. A home lesson teacher fosters academic growth, boosts confidence, and tailors teaching methods to enhance a student in understanding and performing in various subjects.	1000	500	https://res.cloudinary.com/okorosamuel/image/upload/v1703007220/Hermes/professor-lecture-about-graduation-svgrepo-com_swxzu9.svg
9	cook	https://res.cloudinary.com/okorosamuel/image/upload/v1700737107/Hermes/cooking_vykgig.jpg	Hiring a cook is essential for culinary expertise, providing nutritious and well-prepared meals. Cooks save time, alleviate the stress of meal preparation, and contribute to a healthier lifestyle. Their culinary skills enhance the dining experience, supporting individuals and families in maintaining a balanced and enjoyable diet.	1000	150	https://res.cloudinary.com/okorosamuel/image/upload/v1703007336/Hermes/chef-cooking-on-stove-svgrepo-com_ffmze4.svg
10	chores	https://res.cloudinary.com/okorosamuel/image/upload/v1700737084/Hermes/chores1_v0jg0p.jpg	Hiring someone for basic chores is invaluable for time management and reducing daily stress. Delegating tasks such as cleaning, organizing, and routine maintenance ensures a well-maintained living space, allowing individuals to focus on more meaningful activities, work responsibilities, and personal well-being. It promotes a balanced and efficient lifestyle.	1000	500	https://res.cloudinary.com/okorosamuel/image/upload/v1703007436/Hermes/man-carrying-package-svgrepo-com_kcinqu.svg
4	cleaning	https://res.cloudinary.com/okorosamuel/image/upload/v1700737094/Hermes/cleaning_itdpzt.jpg	Hiring a cleaner is essential for maintaining a hygienic and organized living space. It alleviates the burden of household chores, granting individuals more time for work, leisure, and personal well-being. A cleaner contributes to a healthier environment and enhances the overall quality of life.	500	100	https://res.cloudinary.com/okorosamuel/image/upload/v1703006383/Hermes/cleaning-svgrepo-com_fd3a4a.svg
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: okoro
--

COPY public.users (id, name, email, password, gender, photo, school, schoolstate, field, yearenrolled, yeargrad, idcard, role, active, gig, bio, wallet, level, trust, completed) FROM stdin;
1	Okoro Samuel	sam@email.com	$2b$10$EsJKbzJyrrv4Hx/KBnQWS.GAq/CHGutkHZbedMKcn9c5Awk1fcq1G	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
2	fatima nasiru	fati@email.com	$2b$10$XeuMY0SgIPm87mhj5yCBouxt2yronSgqJpad6Ql.zemF0AMduqcei	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
8	ngozi sule	ngozi@email.com	$2b$10$V/Mlsai.s/LC8YZFzFkgMOT/5rXdpbJYFMgdyeBKcscbn9udK38PG	female	http://res.cloudinary.com/okorosamuel/image/upload/v1704008011/Hermes/758084bda3cfc07be111983b89b27a59.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701464337/Hermes/9e8067ea3c70d6c06b5778f0b2f3dc3f.jpg	runner	t	baby sitting	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	2000	standard	100	7
10	sarah nwachukwu	sarah@email.com	$2b$10$pzyRhheUc3gpgLykOOS/1.rZVQtmZchQMVWfru/70NsqAIO0meIfS	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701466044/Hermes/fbc9483b49f66001352b0a0af8a9d3e3.webp	afit	kaduna	cyber security	2020	2025	https://res.cloudinary.com/okorosamuel/image/upload/v1701466045/Hermes/6635028cff22ddd4d1df97d47e9443b6.jpg	runner	t	errands	i am a good girl. i know how to take care of babies. i have plenty years of experience	15000	standard	100	7
12	zee nuhu	zee@email.com	$2b$10$F6h1GKI3HpdVU6vK2cIX8.ntiLqgyAW7dtsXhHaKdmZlU/DQyVo7G	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
13	job kolo	kolo@email.com	$2b$10$092weJknUIOgv.wlUC.TfOODRsiqnAJVyw.X073VeuFyJG2K.2wli	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
14	aaron	aaron7joseph007@gmail.com	$2b$10$U3lEHOkfeFfrEA.nRq5hK.na021uWhRvHYiDsm0V.DePi41z8YSwu	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
15	job sabi	sabi@email.com	$2b$10$gSEOVnux0yW3HqjUxa1CNeiEmRuTCV7siHVl3.flvf8RNd1YVQheW	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
16	jon snow	snow@email.com	$2b$10$AEqA1NjCKam5BUwJZwEDiOUJyCgtZrElyzX4ULStKgUgOkpdjt2OK	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
17	jude messi	messi@email.com	$2b$10$S.KH2YJxmBR1TiQUuF.YteFL92.mRyyb4IklbNxeHqu1oziozpfhS	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
18	goat	goat@email.com	$2b$10$kYZoXkDyrF5R/XzW0eiZves.lT4IT3mWygrBoa99pt1ZTucS9Mgta	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
19	muiz	muiz@email.com	$2b$10$QtC23SRXfhZoXr7cOmgC0e9aMiVzvXnFSvv75TXVDbUVp9ukW47qW	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
9	kemi remi	kemi@email.com	$2b$10$GVCDdRovI/ziM4kmc/YCc.MZOpsly8Xld4WfNrtKIg1zcsqomu8lu	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701464466/Hermes/1e7d4a494361209d52d5b322baf89f48.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701464466/Hermes/af94b9d5626ade813c4ea76e8b917ab1.jpg	runner	t	baby sitting	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	5000	new	100	0
21	okon john	okon@email.com	$2b$10$xevp/Hrk/gPrbn4EgMKCCO2S9NMBEX3mittE.KKjJgRufwOv4UkMC	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701677141/Hermes/b5c908f73f76c36babfb8e9c9725de9c.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677143/Hermes/c9cb69800a17f0c8aee35232ff2181e9.jpg	runner	t	cleaning	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	1500	new	100	0
22	judith okem	okem@email.com	$2b$10$Do9UKCacspLVIGAOZmqwq.u/AvP4AF0H.pev/KX8/4VJHpA8iYC.u	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701677213/Hermes/e77422372932ad6c5f32492a300b117c.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677214/Hermes/6135c4e5bdd768f7835341e4a58607ce.jpg	runner	t	cleaning	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	2500	new	100	0
23	nkem jude	nkem@email.com	$2b$10$zMIsxlc4Z36N5y591vHGDufHtuElWJUtnQe/btCgHTwDBW3TDgo6.	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701677331/Hermes/fc26aa04b84665facfe916dd95a906f3.avif	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677332/Hermes/fa93f23e9294b16d487ed6f54356bf39.jpg	runner	t	moving	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	4500	new	100	0
5	jane wayne	jane@email.com	$2b$10$mkbm6aodVljMt3T4vXG2S.quU21/Z4hGDHcZqXvBLA7sZnXNYX2um	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701463867/Hermes/ff655fdc9b94f7e48fbc5a88f22ca6f7.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701463869/Hermes/26ccbe94439f4f2d7e2324da0fd4e55c.jpg	runner	t	errands	I am a good girl.	2000	standard	100	10
6	john ifeanyi	john@email.com	$2b$10$JA1RHtZcXikNYT6RsZSkROFNalzDwCO2oPSJQc.7SI003tef6NL9W	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701464036/Hermes/057759b52647dc151700af5084128f4f.avif	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701464037/Hermes/7ca46d8bc38a9a975aa6aba6d2aed9fc.jpg	runner	t	errands	I am a good guy.	1500	elite	100	20
7	ben kassem	ben@email.com	$2b$10$FxxRl4rSaR0albc0EHWuhequ0UxQzFhYltDJ1G/3MmE6K9fEnS/ji	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701464211/Hermes/b4bf328ae7174b6ef66485de70570c1b.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701464213/Hermes/6ef96e5f3bee94e1746599776d181007.jpg	runner	t	errands	I am a good guy. I am noble and honest. i have a 4.5gpa and i am loyal.	1000	new	100	1
11	Okoro	okoro@email.com	$2b$10$elwGKiuZq6bgVN8fAaJmae82JWPF0FkC/bACSWrvJ/o0RO24chG6G	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	10000	new	100	0
39	fali joe	fali@email.com	$2b$10$XRsDxU15v2otdG2i3VEeeuKDhiOARLWQo6xgv0nX07SdoT3B5yVDa	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
24	theo adams	adams@email.com	$2b$10$0BGSjei.yJ6rYykd089tUe96a0S0EFkTdeC3MPlqQDqNFHSANXTP6	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701677414/Hermes/23c6b3ba9578837066203dc3b1fceba8.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677415/Hermes/0835ae6ee1037fe4681805a304b51df5.jpg	runner	t	moving	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	5000	new	100	0
38	ruthy sule	ruth@email.com	QWERT123!	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701678405/Hermes/e0a44aa455bedf499add8364f4fc89c6.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678406/Hermes/4b421eaeddb8c89d250fecfc3f7c8104.jpg	runner	t	chores	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal. I am multi-talented and brave	10000	new	100	0
25	osas paul	osas@email.com	$2b$10$NN7Tjp.noOQwZwunWmPMcOEKg5S2WDEAXoEVvsg0Tlvs18yZhlMSe	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701677549/Hermes/e8b75eb39b2497eff74252faa33c475b.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677551/Hermes/faa4a54349175e9ed6ccebbafc14cad8.jpg	runner	t	farming	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	3000	new	100	0
26	sule abraham	sule@email.com	$2b$10$E/givy39cajD9lfrpVVqfegkfQKj7Vdh53vAqV4V9QSCsvmj74kUC	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701677640/Hermes/d5940d70badb5c1582adefb511086f3f.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677641/Hermes/38104ca61a9278f06349b60bcde1e56c.jpg	runner	t	farming	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	3500	new	100	0
27	ada chukwu	ada@email.com	$2b$10$y95on/GFvUAfBQ76WEWNPu713zuTbGs2HoQg9aO4jmWvyMMD4TZsC	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701677749/Hermes/e4b429860a3b77d9a26798485eb406c7.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677749/Hermes/7e9b6e0c1ea9d8eb7346efce46d2f002.jpg	runner	t	assistance	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	6500	new	100	0
28	dorcas saul	dorcas@email.com	$2b$10$Fd2p36b2LHliObsebGCGweWepTLqFPJI11i7k/mMEG4e9PGyh.fAy	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701677827/Hermes/1daf010748be381d595bb70a4a147cb5.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677828/Hermes/8012f62c64e604d76d44e65176dd330c.jpg	runner	t	assistance	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	1000	new	100	0
29	angela musa	angela@email.com	$2b$10$VFwPEfC65Qe3HX0vqoyyvO.9edXsDRgbOL4sgxK2MkPAyaRW/zlb6	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701677909/Hermes/ad6cb31e59b57d756b99ee1656ae7a5e.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677910/Hermes/183d3779c96087ef3380efcd00163fd4.jpg	runner	t	assistance	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	10000	new	100	0
30	musa ahmed	musa@email.com	$2b$10$KIYVvoRtSoh.DHSpvqjpuOYgUY52MvML0ZRgMEVZ7tecNembGvl3G	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701677996/Hermes/549bb96e037efe33132e515431c89f7b.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701677997/Hermes/114dc4ebe0dc52dc94d98a19dbe08b03.jpg	runner	t	home lessons	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	1000	new	100	0
31	richard miles	miles@email.com	$2b$10$jGG8gr1IS9SuJQjWAnL1CeaTINUcDTZsg7qaA2ac7i1FhaQE9B9.S	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701678034/Hermes/a3325da533ce939f1c36a955ddd0c616.avif	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678034/Hermes/05ea351659328847ce59b5503eff89ab.jpg	runner	t	home lessons	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	5000	new	100	0
32	adaobi okoro	adaobi@email.com	$2b$10$lFiu6mPAgJP77C3K/q4nTunjlU56W1vIANYVLU7wDPB0JSzzLnzpi	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701678098/Hermes/4241131fd098540e1cbeaa423d646408.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678099/Hermes/2485e379235209b04205bb489ea6f2c2.jpg	runner	t	home lessons	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	3000	new	100	0
33	helen john	helen@email.com	$2b$10$B6uFvz1StbYRnQESL9FxouE1kMEljr97Z7LjXPz4AseOQCbgrdYZ6	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701678154/Hermes/0673a2c00b8d64441c6fe6f086afc3bf.webp	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678155/Hermes/16c73cb072a72654c9d2415e341b4e22.jpg	runner	t	cook	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	4000	new	100	0
34	rashida ahmed	rashida@email.com	$2b$10$Ur6he5byi/sPty.QdhV/mOyiybiDCf.vJ5vMY7AaY0BR7SlbqsRji	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701678199/Hermes/9d2b345e431d7c1a05ea971dd774ca1d.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678199/Hermes/21b13c00f4afbf982ecc179c8412ceba.jpg	runner	t	cook	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	5000	new	100	0
35	deborah david	deborah@email.com	$2b$10$UOzX0os.0Jk7CQz3nRURleUmaraPeO0pjWIskYo1C4EAgx2A.t.12	female	https://res.cloudinary.com/okorosamuel/image/upload/v1701678248/Hermes/d2eb3e73a0a51a8c5e601f0909a0d8dd.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678250/Hermes/5fe355f4b32faa25b24c157a38f86a4c.jpg	runner	t	cook	I am a good girl. I am noble and honest. i have a 4.5gpa and i am loyal.	10000	new	100	0
36	abel eweko	abel@email.com	$2b$10$g6M.a///E18Apa8Ocvwtp.5efnZaWN9k4N99I3F68szALWINeXuUy	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701678333/Hermes/17944601ebe4a2cbd8415c9ee8d459fb.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678334/Hermes/41d24ba6bb692a5ef8ca3e22918093d1.jpg	runner	t	chores	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	2000	new	100	0
37	Cain Eweko	cain@email.com	$2b$10$DE5KxtVXVxCUzzNpvPgqT..VE3jYDAiL8Iw6P5LMs95DVk.JShZNK	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701678361/Hermes/261ed4add81205c19435d0fa8950fab2.jpg	afit	kaduna	computer	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1701678362/Hermes/9883682c1c9fbe4e2fbdfc010c5fc055.jpg	runner	t	farming	I am a good boy. I am noble and honest. i have a 4.5gpa and i am loyal.	5000	elite	100	17
49	sam sam	samsam@email.com	$2b$10$hLohgaSY1L9ByxxJDX.qEuUfjeL7Ej3EoW7qBN8qAKL5rB3lkXN42	male	https://res.cloudinary.com/okorosamuel/image/upload/v1702367053/Hermes/16996b3089aed4290c2e343e67da5ad6.jpg	afit	kaduna	cyber security	2020	2025	https://res.cloudinary.com/okorosamuel/image/upload/v1702367054/Hermes/453fdbbf3812d68e84cf1977a9ac5607.jpg	runner	t	errands	i can run errands with speed and accurate	500	new	100	0
50	debo 	debo@email.com	$2b$10$JGhRenz8cbB25s.eyhXxb.fT0qoO20ttMKITqD54bxs/bXKsQeJgO	female	https://res.cloudinary.com/okorosamuel/image/upload/v1702654036/Hermes/5cc6e0762d12527287e23da1f8a28b34.jpg	afit	kaduna	cyber security	2012	2018	https://res.cloudinary.com/okorosamuel/image/upload/v1702654038/Hermes/b68e4dce7bddf8b842f2477de97b7c30.jpg	runner	t	chores	i am a good girl	1000	new	100	0
51	jude saul	saul@email.com	$2b$10$gSWdPw0IyT4PQpjm8QNBCeP716CLGE7NljdQ2VUCVDHtJP9H.uJBq	male	https://res.cloudinary.com/okorosamuel/image/upload/v1702656429/Hermes/83648284424b34cd38f8e018af13b878.jpg	afit	kaduna	cyber security	2020	2025	https://res.cloudinary.com/okorosamuel/image/upload/v1702656431/Hermes/36f6be6b314e9a2e4cdccd75a509d08b.jpg	runner	t	farming	i am a good farmer. I can work very hard	2000	new	100	0
40	chioma jesus	chioma@email.com	$2b$10$zJm3HZgs/RYcoCqM2sX.huUouxWdeH0TRVPe.Zusvw.JyZ5tWXEXi	male	https://res.cloudinary.com/okorosamuel/image/upload/v1701885421/Hermes/6ca9e26cb88985beb9e71ad3fea8a4b8.jpg	afit	kaduna	cyber security	2020	2025	https://res.cloudinary.com/okorosamuel/image/upload/v1701885423/Hermes/77b9424ed9b96c35a55cf8d0e3cb4208.jpg	runner	t	cook	i am a good girl. i know how to cook delicious delicacies and i am affordable. I am Igbo and just like the stereotype goes, I am a very good cook.	9000	new	100	0
42	tanko abu	tanko@email.com	$2b$10$snCS6OhJStvG1blMYBfifeuDqKnWFFG2zRvmROkW8T2a53Qok9ar6	male	https://res.cloudinary.com/okorosamuel/image/upload/v1702030784/Hermes/996a7814b62ef42c2bc1880ff2617081.jpg	afit	kaduna	cyber security	2020	2023	https://res.cloudinary.com/okorosamuel/image/upload/v1702030785/Hermes/1fe26855c9f3a11327c6a095a6c0f448.jpg	runner	t	farming	i am a very skilled farmer. i have experience working in my parent's farm and other people's farms	2000	new	100	0
43	joy sule	joy@email.com	$2b$10$MlDRDa4ap5ergGcLhDvqO.4mhwwh12P0LkTp.qFbJpH0KBb8brecC	female	https://res.cloudinary.com/okorosamuel/image/upload/v1702031247/Hermes/7f5f507efff8d19c3942568cc18a9aa9.jpg	afit	kaduna	cyber security	2020	2021	https://res.cloudinary.com/okorosamuel/image/upload/v1702031249/Hermes/813ffb148e3845b82d29eb06260566de.jpg	runner	t	chores	i am good at plenty of chores and i am a fine girl. i have have good cgpa and i have courage 	1000	new	100	0
44	gift ugwu	gift@email.com	$2b$10$szCkfW8BwXgmbmidOu13MuPqRQMkZaB1G2g4ZVlKMA5m4S5YQyUgG	female	https://res.cloudinary.com/okorosamuel/image/upload/v1702033826/Hermes/df93f1748f4ca1c0cbd0a34f474d4a80.jpg	afit	kaduna	cyber security	2020	2025	https://res.cloudinary.com/okorosamuel/image/upload/v1702033828/Hermes/1d755605a71afb9abce897818e1113e7.jpg	runner	t	cook	i am a good cook	6000	new	100	0
54	Fali Joe	falijoe@email.com	$2b$10$EaKNoQqK9GbwDEHUTr1Rme3WHC0Qphuhj0ipa7zN6/mqh2rj26PZa	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
52	Joy Aranda	joyaranda@email.com	$2b$10$2pclh2KfGkygskEFNzoEluY2xYk9AptWMaugCw5kJFw.jTJArGCI.	female	https://res.cloudinary.com/okorosamuel/image/upload/v1704098732/Hermes/e974686b7fcbe0420e9749cfbd66195e.jpg	afit	kaduna	cyber security	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1704098733/Hermes/36de45596a7e2c80e3bb3b8223c2e1d3.jpg	runner	t	cook	my name is joy aranda and i'm a student at the air force institute of technology. i am a skilled chef and i know how to cook different delicacies both local and international.	0	new	100	0
45	paul umar	umar@email.com	$2b$10$NyIBF8RmizdwefUqm3dWzOBSkE8XPkR97cJRi/DM8lJ44inG7O7hW	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
46	sam chika	chika@email.com	$2b$10$b10ax67JVSezzwRu54Hc2u8FO2Mx1d5p72LiLDoJ52alBTosiH7jm	male	https://res.cloudinary.com/okorosamuel/image/upload/v1702365647/Hermes/98fbaed26697220ade80baca84cecade.jpg	afit	kaduna	cyber security	2020	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1702365648/Hermes/1dbcefa3cb386effe95b0d6b5552bb9e.jpg	runner	t	home lessons	i have a 4.7 cgpa and i know book very well. 	1000	new	100	0
47	falama hedima	falama@email.com	$2b$10$.LHVKHwcTXy/z4w7CTDAUu2i2QO7z6N1s1Ff3aDZZnoTkFMtitGVK	male	https://res.cloudinary.com/okorosamuel/image/upload/v1702365862/Hermes/19650aa07db9cd16efa29d116750a5f9.jpg	afit	kaduna	cyber security	2020	2023	https://res.cloudinary.com/okorosamuel/image/upload/v1702365864/Hermes/8e919b2f10303c5fda31c8af010ce172.jpg	runner	t	cleaning	i know how to clean	1000	new	100	0
53	Emma Paul	emmapaul@email.com	$2b$10$htlZPRKg2fmJhkebl9VTP.PYtJSkdSfmDxA4bX.zGNnWMogJPhQw2	male	https://res.cloudinary.com/okorosamuel/image/upload/v1704100376/Hermes/d8a418992541067885e5dd3679d2a6c3.jpg	afit	kaduna	cyber security	2021	2024	https://res.cloudinary.com/okorosamuel/image/upload/v1704100377/Hermes/ed53eaa8cc3a416776ffd15de524e1af.jpg	runner	t	home lessons	i am dedicated and educated person. i have a 4.9 gpa and i'm a very resposible person. please employ me. abeg!!!	0	new	100	0
55	aaron josh	aaron@email.com	$2b$10$mb5CbOqZjMIEZEJ35/BByujsWuX2ROFN1is.IwVqS/UFkqO9SiXCO	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
56	paul okoro	okoropaul@email.com	$2b$10$mlPf6cuxfuzY.MHlUu1XyOAADTZMYW7Rc486Gn2IbdYnrEWHGfIJ6	\N	\N	\N	\N	\N	\N	\N	\N	setter	t	\N	\N	\N	new	100	0
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: okoro
--

SELECT pg_catalog.setval('public.tasks_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: okoro
--

SELECT pg_catalog.setval('public.users_id_seq', 56, true);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: okoro
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

