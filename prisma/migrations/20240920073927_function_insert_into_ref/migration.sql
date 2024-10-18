CREATE OR REPLACE FUNCTION public.insert_into_ref()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    ref_count INTEGER := 0;
BEGIN
    INSERT INTO ref (reftype, refname, reflang, title, titleorig, www, refcmt)
    SELECT DISTINCT reftype, refname, reflang, title, titleorig, www, refcmt
    FROM buff
    ON CONFLICT (refname) DO NOTHING;
    GET DIAGNOSTICS ref_count = ROW_COUNT;
    RETURN ref_count;
END;
$$;
