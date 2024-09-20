-- CreateTable
CREATE TABLE "buff_var" (
    "buffvarid" SERIAL NOT NULL,
    "spos" INTEGER NOT NULL,
    "epos" INTEGER NOT NULL,
    "vartype" SMALLINT NOT NULL,
    "vardata" TEXT NOT NULL,
    "buffid" INTEGER NOT NULL,

    CONSTRAINT "buff_var_pkey" PRIMARY KEY ("buffvarid")
);

-- AddForeignKey
ALTER TABLE "buff_var" ADD CONSTRAINT "buff_var_buffid_fkey" FOREIGN KEY ("buffid") REFERENCES "buff"("buffid") ON DELETE CASCADE ON UPDATE CASCADE;
