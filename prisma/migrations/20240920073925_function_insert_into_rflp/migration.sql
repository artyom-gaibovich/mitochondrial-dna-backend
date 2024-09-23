CREATE OR REPLACE FUNCTION public.insert_into_rflp()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    rflp_count INTEGER := 0;
BEGIN
    INSERT INTO rflp (rflpname)
    SELECT upper(regexp_replace(column_name, 'rflp_', '')) AS rflp
    FROM information_schema.columns
    WHERE table_name = 'buff'
    AND column_name LIKE 'rflp_%';
    GET DIAGNOSTICS rflp_count = ROW_COUNT;
    RETURN rflp_count;
END;
$$;
