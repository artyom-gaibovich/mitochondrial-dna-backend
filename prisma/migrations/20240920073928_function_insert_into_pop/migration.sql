CREATE OR REPLACE FUNCTION public.insert_into_pop()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    pop_count INTEGER := 0;
BEGIN
    INSERT INTO pop (refid, poptype, popname, cntry, province, ethnos, subethnos, poplang, healthy, healthycmt, policy, urbanity, lat, long, locdescr, popcmt)
    SELECT r.refid, b.poptype, b.popname, b.cntry, b.province, b.ethnos, b.subethnos, b.poplang, b.healthy, b.healthycmt, b.policy, b.urbanity,
           CASE b.lat WHEN null THEN null ELSE CAST(b.lat AS FLOAT) END,
           CASE b.long WHEN null THEN null ELSE CAST(b.long AS FLOAT) END,
           b.locdescr, b.popcmt
    FROM (
        SELECT DISTINCT refname, poptype, popname, cntry, province, ethnos, subethnos, poplang, healthy, healthycmt, policy, urbanity, lat, long, locdescr, popcmt
        FROM buff
    ) b
    INNER JOIN ref r ON r.refname = b.refname
    ON CONFLICT (refid, popname) DO NOTHING;  -- Игнорировать дубликаты

    GET DIAGNOSTICS pop_count = ROW_COUNT;

    RETURN pop_count;
END;
$$;
