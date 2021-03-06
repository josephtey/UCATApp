PGDMP         +    
            y           UCATApplicationDB    12.3    12.3 W    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16393    UCATApplicationDB    DATABASE     q   CREATE DATABASE "UCATApplicationDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';
 #   DROP DATABASE "UCATApplicationDB";
                postgres    false            �            1259    16451 
   Categories    TABLE     �   CREATE TABLE public."Categories" (
    category_id integer NOT NULL,
    name text NOT NULL,
    level integer,
    description text,
    intervals integer[],
    per_stem integer,
    topic text
);
     DROP TABLE public."Categories";
       public         heap    postgres    false            �            1259    16449    Categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Categories_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Categories_category_id_seq";
       public          postgres    false    213            �           0    0    Categories_category_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Categories_category_id_seq" OWNED BY public."Categories".category_id;
          public          postgres    false    212            �            1259    16410 	   Structure    TABLE     �   CREATE TABLE public."Structure" (
    structure_id integer NOT NULL,
    name text NOT NULL,
    description text,
    section_order integer[],
    type text NOT NULL,
    "time" integer,
    category_id integer
);
    DROP TABLE public."Structure";
       public         heap    postgres    false            �            1259    16408    Exams_exam_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Exams_exam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Exams_exam_id_seq";
       public          postgres    false    205            �           0    0    Exams_exam_id_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public."Exams_exam_id_seq" OWNED BY public."Structure".structure_id;
          public          postgres    false    204            �            1259    16529    Question_Stems    TABLE     �   CREATE TABLE public."Question_Stems" (
    stem_id integer NOT NULL,
    text text,
    question_order integer[],
    image text,
    type text,
    category_id integer,
    layout text
);
 $   DROP TABLE public."Question_Stems";
       public         heap    postgres    false            �            1259    16527    Question_Stems_stem_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Question_Stems_stem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Question_Stems_stem_id_seq";
       public          postgres    false    219            �           0    0    Question_Stems_stem_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public."Question_Stems_stem_id_seq" OWNED BY public."Question_Stems".stem_id;
          public          postgres    false    218            �            1259    16394 	   Questions    TABLE     %  CREATE TABLE public."Questions" (
    question_id integer NOT NULL,
    type text NOT NULL,
    options text[],
    question text,
    answer text NOT NULL,
    explanation text,
    difficulty integer,
    stem_id integer,
    image text,
    option_images text[],
    category_id integer
);
    DROP TABLE public."Questions";
       public         heap    postgres    false            �            1259    16397    Questions_question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Questions_question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Questions_question_id_seq";
       public          postgres    false    202            �           0    0    Questions_question_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Questions_question_id_seq" OWNED BY public."Questions".question_id;
          public          postgres    false    203            �            1259    16429 	   Responses    TABLE     j  CREATE TABLE public."Responses" (
    response_id integer NOT NULL,
    value text,
    flagged boolean NOT NULL,
    session_id integer NOT NULL,
    student_id integer NOT NULL,
    question_id integer NOT NULL,
    section_id integer NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    correct boolean,
    points real,
    stem_id integer
);
    DROP TABLE public."Responses";
       public         heap    postgres    false            �            1259    16427    Responses_response_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Responses_response_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Responses_response_id_seq";
       public          postgres    false    209            �           0    0    Responses_response_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Responses_response_id_seq" OWNED BY public."Responses".response_id;
          public          postgres    false    208            �            1259    16492    Sections    TABLE     �   CREATE TABLE public."Sections" (
    section_id integer NOT NULL,
    name text NOT NULL,
    description text,
    question_order integer[],
    "time" integer
);
    DROP TABLE public."Sections";
       public         heap    postgres    false            �            1259    16501    Sections_Questions    TABLE     p   CREATE TABLE public."Sections_Questions" (
    section_id integer NOT NULL,
    question_id integer NOT NULL
);
 (   DROP TABLE public."Sections_Questions";
       public         heap    postgres    false            �            1259    16490    Sections_section_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Sections_section_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Sections_section_id_seq";
       public          postgres    false    215            �           0    0    Sections_section_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Sections_section_id_seq" OWNED BY public."Sections".section_id;
          public          postgres    false    214            �            1259    16421    Sessions    TABLE     H  CREATE TABLE public."Sessions" (
    session_id integer NOT NULL,
    completed boolean NOT NULL,
    score integer,
    structure_id integer NOT NULL,
    student_id integer NOT NULL,
    start_time timestamp without time zone[],
    end_time timestamp without time zone[],
    score_breakdown json,
    show_review boolean
);
    DROP TABLE public."Sessions";
       public         heap    postgres    false            �            1259    16419    Sessions_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Sessions_session_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Sessions_session_id_seq";
       public          postgres    false    207            �           0    0    Sessions_session_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Sessions_session_id_seq" OWNED BY public."Sessions".session_id;
          public          postgres    false    206            �            1259    16514    Structures_Sections    TABLE     r   CREATE TABLE public."Structures_Sections" (
    structure_id integer NOT NULL,
    section_id integer NOT NULL
);
 )   DROP TABLE public."Structures_Sections";
       public         heap    postgres    false            �            1259    16440    Students    TABLE     �   CREATE TABLE public."Students" (
    student_id integer NOT NULL,
    username text NOT NULL,
    roles text[],
    display_name text
);
    DROP TABLE public."Students";
       public         heap    postgres    false            �            1259    16438    Students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Students_student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Students_student_id_seq";
       public          postgres    false    211            �           0    0    Students_student_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Students_student_id_seq" OWNED BY public."Students".student_id;
          public          postgres    false    210            �           2604    16454    Categories category_id    DEFAULT     �   ALTER TABLE ONLY public."Categories" ALTER COLUMN category_id SET DEFAULT nextval('public."Categories_category_id_seq"'::regclass);
 G   ALTER TABLE public."Categories" ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    212    213    213            �           2604    16532    Question_Stems stem_id    DEFAULT     �   ALTER TABLE ONLY public."Question_Stems" ALTER COLUMN stem_id SET DEFAULT nextval('public."Question_Stems_stem_id_seq"'::regclass);
 G   ALTER TABLE public."Question_Stems" ALTER COLUMN stem_id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    16399    Questions question_id    DEFAULT     �   ALTER TABLE ONLY public."Questions" ALTER COLUMN question_id SET DEFAULT nextval('public."Questions_question_id_seq"'::regclass);
 F   ALTER TABLE public."Questions" ALTER COLUMN question_id DROP DEFAULT;
       public          postgres    false    203    202            �           2604    16432    Responses response_id    DEFAULT     �   ALTER TABLE ONLY public."Responses" ALTER COLUMN response_id SET DEFAULT nextval('public."Responses_response_id_seq"'::regclass);
 F   ALTER TABLE public."Responses" ALTER COLUMN response_id DROP DEFAULT;
       public          postgres    false    208    209    209            �           2604    16495    Sections section_id    DEFAULT     ~   ALTER TABLE ONLY public."Sections" ALTER COLUMN section_id SET DEFAULT nextval('public."Sections_section_id_seq"'::regclass);
 D   ALTER TABLE public."Sections" ALTER COLUMN section_id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    16424    Sessions session_id    DEFAULT     ~   ALTER TABLE ONLY public."Sessions" ALTER COLUMN session_id SET DEFAULT nextval('public."Sessions_session_id_seq"'::regclass);
 D   ALTER TABLE public."Sessions" ALTER COLUMN session_id DROP DEFAULT;
       public          postgres    false    206    207    207            �           2604    16413    Structure structure_id    DEFAULT     {   ALTER TABLE ONLY public."Structure" ALTER COLUMN structure_id SET DEFAULT nextval('public."Exams_exam_id_seq"'::regclass);
 G   ALTER TABLE public."Structure" ALTER COLUMN structure_id DROP DEFAULT;
       public          postgres    false    204    205    205            �           2604    16443    Students student_id    DEFAULT     ~   ALTER TABLE ONLY public."Students" ALTER COLUMN student_id SET DEFAULT nextval('public."Students_student_id_seq"'::regclass);
 D   ALTER TABLE public."Students" ALTER COLUMN student_id DROP DEFAULT;
       public          postgres    false    210    211    211            �          0    16451 
   Categories 
   TABLE DATA           i   COPY public."Categories" (category_id, name, level, description, intervals, per_stem, topic) FROM stdin;
    public          postgres    false    213   �m       �          0    16529    Question_Stems 
   TABLE DATA           k   COPY public."Question_Stems" (stem_id, text, question_order, image, type, category_id, layout) FROM stdin;
    public          postgres    false    219   �o       �          0    16394 	   Questions 
   TABLE DATA           �   COPY public."Questions" (question_id, type, options, question, answer, explanation, difficulty, stem_id, image, option_images, category_id) FROM stdin;
    public          postgres    false    202   �o       �          0    16429 	   Responses 
   TABLE DATA           �   COPY public."Responses" (response_id, value, flagged, session_id, student_id, question_id, section_id, "timestamp", correct, points, stem_id) FROM stdin;
    public          postgres    false    209   �o       �          0    16492    Sections 
   TABLE DATA           [   COPY public."Sections" (section_id, name, description, question_order, "time") FROM stdin;
    public          postgres    false    215   �o       �          0    16501    Sections_Questions 
   TABLE DATA           G   COPY public."Sections_Questions" (section_id, question_id) FROM stdin;
    public          postgres    false    216   �~       �          0    16421    Sessions 
   TABLE DATA           �   COPY public."Sessions" (session_id, completed, score, structure_id, student_id, start_time, end_time, score_breakdown, show_review) FROM stdin;
    public          postgres    false    207          �          0    16410 	   Structure 
   TABLE DATA           p   COPY public."Structure" (structure_id, name, description, section_order, type, "time", category_id) FROM stdin;
    public          postgres    false    205   +       �          0    16514    Structures_Sections 
   TABLE DATA           I   COPY public."Structures_Sections" (structure_id, section_id) FROM stdin;
    public          postgres    false    217   H       �          0    16440    Students 
   TABLE DATA           O   COPY public."Students" (student_id, username, roles, display_name) FROM stdin;
    public          postgres    false    211   e       �           0    0    Categories_category_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."Categories_category_id_seq"', 2, true);
          public          postgres    false    212            �           0    0    Exams_exam_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Exams_exam_id_seq"', 122, true);
          public          postgres    false    204            �           0    0    Question_Stems_stem_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."Question_Stems_stem_id_seq"', 3275, true);
          public          postgres    false    218            �           0    0    Questions_question_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Questions_question_id_seq"', 8143, true);
          public          postgres    false    203            �           0    0    Responses_response_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public."Responses_response_id_seq"', 1288, true);
          public          postgres    false    208            �           0    0    Sections_section_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Sections_section_id_seq"', 177, true);
          public          postgres    false    214            �           0    0    Sessions_session_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Sessions_session_id_seq"', 752, true);
          public          postgres    false    206            �           0    0    Students_student_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Students_student_id_seq"', 36, true);
          public          postgres    false    210                       2606    16459    Categories Categories_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY (category_id);
 H   ALTER TABLE ONLY public."Categories" DROP CONSTRAINT "Categories_pkey";
       public            postgres    false    213                       2606    16418    Structure Exams_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Structure"
    ADD CONSTRAINT "Exams_pkey" PRIMARY KEY (structure_id);
 B   ALTER TABLE ONLY public."Structure" DROP CONSTRAINT "Exams_pkey";
       public            postgres    false    205                       2606    16537 "   Question_Stems Question_Stems_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public."Question_Stems"
    ADD CONSTRAINT "Question_Stems_pkey" PRIMARY KEY (stem_id);
 P   ALTER TABLE ONLY public."Question_Stems" DROP CONSTRAINT "Question_Stems_pkey";
       public            postgres    false    219                       2606    16407    Questions Questions_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT "Questions_pkey" PRIMARY KEY (question_id);
 F   ALTER TABLE ONLY public."Questions" DROP CONSTRAINT "Questions_pkey";
       public            postgres    false    202                       2606    16437    Responses Responses_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT "Responses_pkey" PRIMARY KEY (response_id);
 F   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT "Responses_pkey";
       public            postgres    false    209                       2606    24579 *   Sections_Questions Sections_Questions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Sections_Questions"
    ADD CONSTRAINT "Sections_Questions_pkey" PRIMARY KEY (section_id, question_id);
 X   ALTER TABLE ONLY public."Sections_Questions" DROP CONSTRAINT "Sections_Questions_pkey";
       public            postgres    false    216    216                       2606    16500    Sections Sections_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Sections"
    ADD CONSTRAINT "Sections_pkey" PRIMARY KEY (section_id);
 D   ALTER TABLE ONLY public."Sections" DROP CONSTRAINT "Sections_pkey";
       public            postgres    false    215                       2606    16426    Sessions Sessions_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (session_id);
 D   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT "Sessions_pkey";
       public            postgres    false    207                       2606    24593 ,   Structures_Sections Structures_Sections_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Structures_Sections"
    ADD CONSTRAINT "Structures_Sections_pkey" PRIMARY KEY (structure_id, section_id);
 Z   ALTER TABLE ONLY public."Structures_Sections" DROP CONSTRAINT "Structures_Sections_pkey";
       public            postgres    false    217    217                       2606    16448    Students Students_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY (student_id);
 D   ALTER TABLE ONLY public."Students" DROP CONSTRAINT "Students_pkey";
       public            postgres    false    211                       1259    24585    fki_question_id_fkey    INDEX     \   CREATE INDEX fki_question_id_fkey ON public."Sections_Questions" USING btree (question_id);
 (   DROP INDEX public.fki_question_id_fkey;
       public            postgres    false    216                       1259    24591    fki_section_id_fkey    INDEX     Z   CREATE INDEX fki_section_id_fkey ON public."Sections_Questions" USING btree (section_id);
 '   DROP INDEX public.fki_section_id_fkey;
       public            postgres    false    216            	           1259    24631    fki_session_id_fkey    INDEX     Q   CREATE INDEX fki_session_id_fkey ON public."Responses" USING btree (session_id);
 '   DROP INDEX public.fki_session_id_fkey;
       public            postgres    false    209                       1259    16543    fki_stem_id    INDEX     F   CREATE INDEX fki_stem_id ON public."Questions" USING btree (stem_id);
    DROP INDEX public.fki_stem_id;
       public            postgres    false    202                       1259    24620    fki_structure_id_fkey    INDEX     _   CREATE INDEX fki_structure_id_fkey ON public."Structures_Sections" USING btree (structure_id);
 )   DROP INDEX public.fki_structure_id_fkey;
       public            postgres    false    217            (           2606    32776    Question_Stems category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Question_Stems"
    ADD CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES public."Categories"(category_id) NOT VALID;
 K   ALTER TABLE ONLY public."Question_Stems" DROP CONSTRAINT category_id_fkey;
       public          postgres    false    219    213    3085                       2606    32786    Structure category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Structure"
    ADD CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES public."Categories"(category_id) NOT VALID;
 F   ALTER TABLE ONLY public."Structure" DROP CONSTRAINT category_id_fkey;
       public          postgres    false    205    213    3085                       2606    40960    Questions category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES public."Categories"(category_id) NOT VALID;
 F   ALTER TABLE ONLY public."Questions" DROP CONSTRAINT category_id_fkey;
       public          postgres    false    3085    213    202                       2606    24594     Sessions current_section_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT current_section_id_fkey FOREIGN KEY (session_id) REFERENCES public."Sessions"(session_id) NOT VALID;
 L   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT current_section_id_fkey;
       public          postgres    false    207    207    3078                        2606    16485    Responses question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT question_id_fkey FOREIGN KEY (question_id) REFERENCES public."Questions"(question_id) NOT VALID;
 F   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT question_id_fkey;
       public          postgres    false    209    3073    202            $           2606    24580 #   Sections_Questions question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sections_Questions"
    ADD CONSTRAINT question_id_fkey FOREIGN KEY (question_id) REFERENCES public."Questions"(question_id) ON DELETE CASCADE NOT VALID;
 O   ALTER TABLE ONLY public."Sections_Questions" DROP CONSTRAINT question_id_fkey;
       public          postgres    false    216    202    3073            %           2606    24586 "   Sections_Questions section_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sections_Questions"
    ADD CONSTRAINT section_id_fkey FOREIGN KEY (section_id) REFERENCES public."Sections"(section_id) ON DELETE CASCADE NOT VALID;
 N   ALTER TABLE ONLY public."Sections_Questions" DROP CONSTRAINT section_id_fkey;
       public          postgres    false    3087    216    215            &           2606    24610 #   Structures_Sections section_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Structures_Sections"
    ADD CONSTRAINT section_id_fkey FOREIGN KEY (section_id) REFERENCES public."Sections"(section_id) ON DELETE CASCADE NOT VALID;
 O   ALTER TABLE ONLY public."Structures_Sections" DROP CONSTRAINT section_id_fkey;
       public          postgres    false    215    217    3087            !           2606    24621    Responses section_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT section_id_fkey FOREIGN KEY (section_id) REFERENCES public."Sections"(section_id) NOT VALID;
 E   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT section_id_fkey;
       public          postgres    false    3087    215    209            "           2606    24626    Responses session_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT session_id_fkey FOREIGN KEY (session_id) REFERENCES public."Sessions"(session_id) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT session_id_fkey;
       public          postgres    false    3078    207    209                       2606    16538    Questions stem_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Questions"
    ADD CONSTRAINT stem_id_fkey FOREIGN KEY (stem_id) REFERENCES public."Question_Stems"(stem_id) NOT VALID;
 B   ALTER TABLE ONLY public."Questions" DROP CONSTRAINT stem_id_fkey;
       public          postgres    false    202    3096    219            #           2606    32781    Responses stem_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT stem_id_fkey FOREIGN KEY (stem_id) REFERENCES public."Question_Stems"(stem_id) NOT VALID;
 B   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT stem_id_fkey;
       public          postgres    false    209    219    3096                       2606    16465    Sessions structure_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT structure_id_fkey FOREIGN KEY (structure_id) REFERENCES public."Structure"(structure_id) NOT VALID;
 F   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT structure_id_fkey;
       public          postgres    false    205    3076    207            '           2606    24615 %   Structures_Sections structure_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Structures_Sections"
    ADD CONSTRAINT structure_id_fkey FOREIGN KEY (structure_id) REFERENCES public."Structure"(structure_id) ON DELETE CASCADE NOT VALID;
 Q   ALTER TABLE ONLY public."Structures_Sections" DROP CONSTRAINT structure_id_fkey;
       public          postgres    false    205    217    3076                       2606    16470    Sessions student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT student_id_fkey FOREIGN KEY (student_id) REFERENCES public."Students"(student_id) NOT VALID;
 D   ALTER TABLE ONLY public."Sessions" DROP CONSTRAINT student_id_fkey;
       public          postgres    false    3083    207    211                       2606    16480    Responses student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Responses"
    ADD CONSTRAINT student_id_fkey FOREIGN KEY (student_id) REFERENCES public."Students"(student_id) NOT VALID;
 E   ALTER TABLE ONLY public."Responses" DROP CONSTRAINT student_id_fkey;
       public          postgres    false    209    211    3083            �   �  x���OO�0�ϓO�\"R���c�u��
�8�2�Yk;����#�WA2�>�O�͛�~Yӊk�5�`s��i>�e����pCn��k�[�L�Ò\C&`K�#���4A��QrKg{�b)�'���&��I	����U�o��+XQuqR\�@U.'���r��
����1t7�i��,s�ځ�?�ڠ��J����J�t�.f�lj�Z�0�dى�9ܶ�qfY9���9�0�!�CKX���sԞ�S4�A�I�u�e��Q W�<���ꡣ���
ŝY��pS��V���
فj��R����_�Er2��xl��z�q|7�Q�<3�7F�l��تF,��GM���Q��{�Q9�t�e�,O�o�\�?�u���#�1�La��sc��<^��J��P�9Ȳ�	i�      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x����n^Gr���| g����:���&�c$$+oh����I��40��?�{(`VQj�����T����h������wW�ys������W�~��/�Ҿ:���-�2-e�eY�����bQ,�E�(ŢX�bSl�M�)6Ŧ��bS�Sq\.�f9,�2,�R�X���Q4�F�(��뫣�n����7�n�����O������>\]?^�|�������w��?_=�_]����w�?ܾ��������������zs���G?}uu������Ǜ��>�ts�x~��������n�><^?�~x�}s�������Ο�����/����_����i��L[��<my���i�u�����ʧʧʧʧʧʧʧʧʧr��.R��G����SO<u���SO<u��qz��tf��֙�3[g��l��:�uf���|y�������~����3�g�ϰ�a?�~Ť��{��:�u���y��^�^,�Y��Xg��b��z�9R�տ����������?^�����󗿹�����S	*���RxJᩜ_����m�T��q����a���Ĳ,篻���,��St�N�):� .A\��q	��%�K� .A\��q	��%�K� .A\��q	��%�K� .A\5�
��/l|�ڶ�mk�ֶ�m[۶�mm�ڶ�mk�ֶ�m[۶�mm�ڶ�mk�ֶ�m[۶�mm�ڶ�mk�ֶ�m[۶�mm�ڶ�mk�ֶ�m�������m%h�"�y���|��{���O7��~.g���a�a���Ĳ,�\Ϋ�\(E�h��Q4�F�(���8(���8(���St�N�):E��unk�۪W��݇G�-u�>�}p�������~�A1(Ť��bRL�I1)&Ť�EQEQEQEQEQ�E(B�P�"�ŢX�bQ,�E�(ŢX�b�Fh������l�I�I�I�I�I�I�I�I�I�I�I�I�I�ɹP����<x����<x����<x��q��2[�Eo���ޏ{?����s8��y��p���<���<�y8��y��p���<���<�y8��y��p���tS�M7u��qS�M7u��qSǅr\�q!ǅr\�q!ǅ|.�ۅ�o�.�]x��v�����~�V�P]3�C�����K,�r��C~�9�琟C~�9�琟C~�9�琟C~�9�琟C~�9�琟C~�9�琟C~�9��p��y�9��p��y�9��p�#�T]���u���)�S��O�"<Ex���)�S��O�<x2�d�����'O���TD�":ѩ�N�0��t
�)L�0��t
�)�ў�k��o?������Ƿ?����]1�d��d�d�d�d�d�d�d%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%ňňňňňňňňňňňňňňňňňňňňU�\�[.�uO(B��uúaݰnX7���uúaݰnX7JQ��(EQ��E)�R�(JQ��(EQ��E)�R�(JQ����䞼\?�RE�
���D��-&ZL��h1�b��D��-&ZL��h1�b��D��-&ZL��h1���������������������������=�������p!� � � � � � � � � � � �s�����6l��9`s����6l��9`��.$/�ׂv�-h��݂v�-h��݂v�-h��ݹPt�N�)Š�bP�A1(Š��bRL�I1)&Ť���(��(��(��(��(�"�E(B�P�"��x��</�Rȥ�K!�B.�\
�r)�Rȥ�K!�B.�B��9�0����z�Cs�a=̡�9�0����z�Cs�a=̡�9�0����z�c^��|�޵��D��_7����e��
�.+\V��pY��<�x�l�
�`+�V�� [����1���H�+�WP��^A��z�
��;o�����c��Ώ�;?v~������c��Ώ�;?v~������g�����{n����O7�>޽�y87{�������?�?�{{��W�S\nߞ������<�>�����?<�������B��͏ןn����y ���|�����7?	���k�����Y��g��:�u>�|����Y���٩�Sg��N��:;uv���٩{��^꺗�{��^꺗�{��^���Anx����Anx�����w0�`���)S�L1�b0�`���)S�L1�b0�`���)S��x"�y�R�(HQ�����r� !B
�)�w�)A��%F�3���dĒKF,�dĒKF,�dĒKF,�dĒKF,�dĒKF,�dĒKF,�dĒ���/�z*@V�� Y�d�
� +@V�� Y�d�
���Xl��b��b����:l�a�[uت��ܗ���4?��]��_<6\ ��_ ��_|�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A���o�A��l���l���l��6�s}[/<�4Mb�$6Mb��7�� ��7�� ��7�� ��c�c��ǘ=��1f�1{��c�c��ǘ=��1f�1{��c�c��ǘ=��1f�1{��c�c���s��$�oqAk@k@k@k@k@k@k@k@k@k@k@k@k@k@k@k@k@k@k@k@kGd(C�
�P0��1��`c(C�����/f�������I�I�I�I�I�I�I�I�I�I�I�I�I�I�I�I�I�I�B!fS1���Țb6���M�l*fS1���Țb6���M�l*fS1���Țb6���M�l*fS1���ԹP0"













:��6���60l`����a��L2iȤ!��L2iȤ!��L2iȤ!��L2iȤ��N�u*�Si�J�TZ�e>�Y�<��1�c�����?&L���1�c�����?&L���1�c�����?&L���1�c�����?&L���1�c���)�Sx��N��;�w
��)�Sx��N��;�w
��)�Sx��7�Jr�f�f�f�f�f�f�f�f�f�f9�rd��ʑőőőőő�m�a܆q�m�a܆q�m�a܆q�m�a܆Qg��D��:u&�Lԙ�3Qgr�Z���AP�(�Q � F�0
`�(�Q � ����a�0x<�����a�0x<��6z~��l�7��1u��cLc�Sǘ:��1��1u��cLc�Sǘ�\(����������������������������>
�^��x{�����ۛ�7oo�޼�y{�����ۛ�7oo�޼�y{��*���G��7�o�ߌ�3�f�����7�o�ߌ��p?��1܏�~�c�����p?��1܏�~�c�����p?��1܏�~�c�����p?��1܏�~�c�.�)���������������_'�[�Q^�Q^�Q^�Q^�Q^�Q^�Q^�j^(E�h��Q4�F�(E�8(��������k'�a�2�^���0{f/��e����a�2�^���0�\(6Ŧ��bSl�M!���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y���Y��s鿤ͷx���� Ӓ��      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   |   x���1�0 ��<���V03���1�H��u$D�߁���妻[���Z��L:O��6�^M��1���#7:��b$�WT��ϟ�_��T�{�8�X�۾���SM����G��m'D�     