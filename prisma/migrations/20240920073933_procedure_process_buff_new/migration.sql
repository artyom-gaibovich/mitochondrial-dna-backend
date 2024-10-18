CREATE OR REPLACE FUNCTION public.procedure_process_buff()
RETURNS TABLE(ref_inserted_count INTEGER, pop_inserted_count INTEGER, individuals_inserted_count INTEGER, var_inserted_count INTEGER, rflp_inserted_count INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    ref_count INTEGER;
    pop_count INTEGER;
    ind_count INTEGER;
    var_count INTEGER;
    rflp_count INTEGER;
BEGIN
    ref_count := insert_into_ref();
    pop_count := insert_into_pop();
    ind_count := insert_into_individuals();

    PERFORM insert_into_buff_to_individuals();
    var_count := insert_into_var();
    rflp_count := insert_into_rflp();
    PERFORM update_hist();



    RETURN QUERY
    SELECT ref_count, pop_count, ind_count, var_count, rflp_inserted_count;
END;
$$;
