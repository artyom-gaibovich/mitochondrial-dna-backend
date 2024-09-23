-- DROP FUNCTION public.recreate_buff();

CREATE OR REPLACE FUNCTION public.recreate_buff()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN


	drop table buff_to_individuals;
	drop table buff_var;
	drop table buff;



	CREATE TABLE public.buff (
    	buffid serial4 NOT NULL,
    	reftype varchar(20) NULL,
    	refname varchar(200) NULL,
    	refnameparent varchar(200) NULL,
    	reflang varchar(200) NULL,
    	title text NULL,
    	titleorig text NULL,
    	www varchar(1000) NULL,
    	refcmt varchar(1000) NULL,
    	poptype varchar(20) NULL,
    	popname varchar(200) NULL,
    	cntry varchar(100) NULL,
    	province varchar(200) NULL,
    	ethnos varchar(200) NULL,
    	subethnos varchar(200) NULL,
    	poplang varchar(200) NULL,
    	healthy bool NULL,
    	healthycmt varchar(200) NULL,
    	"policy" varchar(200) NULL,
    	urbanity varchar(200) NULL,
    	lat varchar(50) NULL,
    	long varchar(50) NULL,
    	locdescr varchar(1000) NULL,
    	popcmt varchar(1000) NULL,
    	indname varchar(200) NULL,
    	hg varchar(200) NULL,
    	hgorig varchar(200) NULL,
    	hgcmt varchar(1000) NULL,
    	indcmt varchar(1000) NULL,
    	CONSTRAINT buff_pkey PRIMARY KEY (buffid)
    );


	CREATE TABLE public.buff_to_individuals (
    	indid int4 NOT NULL,
    	buffid int4 NOT NULL,
    	CONSTRAINT buff_to_individuals_pkey PRIMARY KEY (indid, buffid),
    	CONSTRAINT buff_to_individuals_buffid_fkey FOREIGN KEY (buffid) REFERENCES public.buff(buffid) ON DELETE CASCADE ON UPDATE CASCADE,
    	CONSTRAINT buff_to_individuals_indid_fkey FOREIGN KEY (indid) REFERENCES public.individuals(indid) ON DELETE CASCADE ON UPDATE CASCADE
    );


	CREATE TABLE public.buff_var (
    	buffvarid serial4 NOT NULL,
    	spos int4 NOT NULL,
    	epos int4 NOT NULL,
    	vartype int2 NOT NULL,
    	vardata text NULL,
    	buffid int4 NOT NULL,
    	CONSTRAINT buff_var_pkey PRIMARY KEY (buffvarid),
    	CONSTRAINT buff_var_buffid_fkey FOREIGN KEY (buffid) REFERENCES public.buff(buffid) ON DELETE CASCADE ON UPDATE CASCADE
    );

	PERFORM setval('public.buff_buffid_seq', (SELECT buffid FROM hist ORDER BY buffid DESC LIMIT 1), true);


END;
$function$
;
