CREATE OR REPLACE FUNCTION public.insert_into_var()
RETURNS integer AS $$
DECLARE
    inserted_count integer;
BEGIN
     insert
    	into
    	var (indid,
    	spos,
    	epos,
    	vartype,
    	vardata)
    select
    	bti.indid,
    	bv.spos,
    	epos,
    	vartype,
    	vardata
    from
    	buff_to_individuals bti
    join buff_var bv on
    	bti.buffid = bv.buffid
    join individuals ind on
    	bti.indid = ind.indid
    where
    	bv.vardata is not null;
    GET DIAGNOSTICS inserted_count = ROW_COUNT;
    RETURN inserted_count;
END;
$$ LANGUAGE plpgsql;
