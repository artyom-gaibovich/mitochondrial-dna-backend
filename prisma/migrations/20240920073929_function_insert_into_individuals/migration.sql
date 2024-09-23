CREATE OR REPLACE FUNCTION public.insert_into_individuals()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    ind_count INTEGER := 0;
BEGIN
    INSERT INTO individuals (popid, indname, hg, hgorig, hgcmt, indcmt)
    SELECT p.popid, b.indname, b.hg, b.hgorig, b.hgcmt, b.indcmt
    FROM buff b
    INNER JOIN pop p ON b.popname = p.popname;
    GET DIAGNOSTICS ind_count = ROW_COUNT;

    RETURN ind_count;
END;
$$;
