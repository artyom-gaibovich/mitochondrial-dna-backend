-- DROP FUNCTION public.update_hist();

CREATE OR REPLACE FUNCTION public.update_hist()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_sql TEXT;
    v_seq_columns TEXT;
    v_snp_columns TEXT;
    v_rflp_columns TEXT;
    v_other_columns TEXT;
BEGIN
    -- Construct column list for seq columns
    v_seq_columns := (
        SELECT string_agg(
            'concat('' '','' '', quote_literal(''' || column_name || ':'' || ' || column_name || '))',
            ' || '
        )
        FROM information_schema.columns
        WHERE table_name = 'buff'
        AND column_name LIKE 'seq_%'
    );

    -- Construct column list for snp columns
    v_snp_columns := (
        SELECT string_agg(
            'concat('' '','' '', quote_literal(''' || column_name || ':'' || ' || column_name || '))',
            ' || '
        )
        FROM information_schema.columns
        WHERE table_name = 'buff'
        AND column_name LIKE 'snp_%'
    );

    -- Construct column list for rflp columns
    v_rflp_columns := (
        SELECT string_agg(
            'concat('' '','' '', quote_literal(''' || column_name || ':'' || ' || column_name || '))',
            ' || '
        )
        FROM information_schema.columns
        WHERE table_name = 'buff'
        AND column_name LIKE 'rflp_%'
    );

    -- Construct other columns
    v_other_columns := (
        SELECT string_agg(
            column_name,
            ', '
        )
        FROM information_schema.columns
        WHERE table_name = 'buff'
        AND column_name NOT LIKE 'seq_%'
        AND column_name NOT LIKE 'snp_%'
        AND column_name NOT LIKE 'rflp_%'
    );

    -- Construct dynamic SQL query
    v_sql := format(
        'INSERT INTO hist (seq, snp, rflp, %s) SELECT ' ||
        'concat(''SEQ:'' || %s), ' ||
        'concat(''SNP:'' || %s), ' ||
        'concat(''RFLP:'' || %s), ' ||
        '%s ' ||
        'FROM buff',
        v_other_columns,
        COALESCE(v_seq_columns, ''''),
        COALESCE(v_snp_columns, ''''),
        COALESCE(v_rflp_columns, ''''),
        v_other_columns
    );

    -- Execute the constructed SQL
    EXECUTE v_sql;

    -- Clean up the hist table
    DELETE FROM hist WHERE refname IS NULL OR refname = '' OR refname = 'refname';

    -- Update the seq, snp, and rflp columns
    UPDATE hist
    SET seq = upper(
        regexp_replace(
            regexp_replace(
                regexp_replace(
                    trim(seq),
                    '^SEQ:', '', 'g'
                ),
                'seq_', '', 'g'
            ),
            '''', '', 'g'
        )
    );

    UPDATE hist
    SET snp = upper(
        regexp_replace(
            regexp_replace(
                regexp_replace(
                    trim(snp),
                    '^SNP:', '', 'g'
                ),
                'snp_', '', 'g'
            ),
            '''', '', 'g'
        )
    );

    UPDATE hist
    SET rflp = upper(
        regexp_replace(
            regexp_replace(
                regexp_replace(
                    trim(rflp),
                    '^RFLP:', '', 'g'
                ),
                'rflp_', '', 'g'
            ),
            '''', '', 'g'
        )
    );
END $function$;
