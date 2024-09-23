CREATE OR REPLACE FUNCTION public.insert_into_buff_to_individuals()
RETURNS VOID AS
$$
BEGIN
    INSERT INTO buff_to_individuals (buffid, indid)
    SELECT
        b.buffid,
        i.indid
    FROM
        individuals i
    JOIN
        buff b ON i.indname = b.indname
    WHERE
        NOT EXISTS (
            SELECT 1
            FROM buff_to_individuals bi
            WHERE bi.buffid = b.buffid
              AND bi.indid = i.indid
        );

    RAISE NOTICE 'Data has been successfully inserted into buff_to_individuals.';
END;
$$ LANGUAGE plpgsql;
