-- CreateTable
CREATE TABLE "buff" (
    "buffid" SERIAL NOT NULL,
    "reftype" VARCHAR(20),
    "refname" VARCHAR(200),
    "refnameparent" VARCHAR(200),
    "reflang" VARCHAR(200),
    "title" TEXT,
    "titleorig" TEXT,
    "www" VARCHAR(1000),
    "refcmt" VARCHAR(1000),
    "poptype" VARCHAR(20),
    "popname" VARCHAR(200),
    "cntry" VARCHAR(100),
    "province" VARCHAR(200),
    "ethnos" VARCHAR(200),
    "subethnos" VARCHAR(200),
    "poplang" VARCHAR(200),
    "healthy" BOOLEAN,
    "healthycmt" VARCHAR(200),
    "policy" VARCHAR(200),
    "urbanity" VARCHAR(200),
    "lat" VARCHAR(50),
    "long" VARCHAR(50),
    "locdescr" VARCHAR(1000),
    "popcmt" VARCHAR(1000),
    "indname" VARCHAR(200),
    "hg" VARCHAR(200),
    "hgorig" VARCHAR(200),
    "hgcmt" VARCHAR(1000),
    "indcmt" VARCHAR(1000),
    "snp" TEXT NOT NULL,
    "rflp" TEXT NOT NULL,

    CONSTRAINT "buff_pkey" PRIMARY KEY ("buffid")
);

-- CreateTable
CREATE TABLE "hist" (
    "buffid" INTEGER NOT NULL,
    "reftype" VARCHAR(20),
    "refname" VARCHAR(200),
    "refnameparent" VARCHAR(200),
    "reflang" VARCHAR(200),
    "title" TEXT,
    "titleorig" TEXT,
    "www" VARCHAR(1000),
    "refcmt" VARCHAR(1000),
    "poptype" VARCHAR(20),
    "popname" VARCHAR(200),
    "cntry" VARCHAR(100),
    "province" VARCHAR(200),
    "ethnos" VARCHAR(200),
    "subethnos" VARCHAR(200),
    "poplang" VARCHAR(200),
    "healthy" BOOLEAN,
    "healthycmt" VARCHAR(200),
    "policy" VARCHAR(200),
    "urbanity" VARCHAR(200),
    "lat" VARCHAR(50),
    "long" VARCHAR(50),
    "locdescr" VARCHAR(1000),
    "popcmt" VARCHAR(1000),
    "indname" VARCHAR(200),
    "hg" VARCHAR(200),
    "hgorig" VARCHAR(200),
    "hgcmt" VARCHAR(1000),
    "indcmt" VARCHAR(1000),
    "snp" TEXT,
    "rflp" TEXT,
    "seq" TEXT,

    CONSTRAINT "hist_pkey" PRIMARY KEY ("buffid")
);

-- CreateTable
CREATE TABLE "ref" (
    "refid" SERIAL NOT NULL,
    "parentid" INTEGER,
    "reftype" VARCHAR(20) NOT NULL,
    "refname" VARCHAR(200) NOT NULL,
    "reflang" VARCHAR(200),
    "strtech" VARCHAR(200),
    "healthy" BOOLEAN,
    "title" TEXT,
    "titleorig" TEXT,
    "www" VARCHAR(1000),
    "refcmt" VARCHAR(1000),

    CONSTRAINT "ref_pkey" PRIMARY KEY ("refid")
);

-- CreateTable
CREATE TABLE "pop" (
    "popid" SERIAL NOT NULL,
    "popname" VARCHAR(200) NOT NULL,
    "poptype" VARCHAR(20) NOT NULL,
    "refid" INTEGER NOT NULL,
    "cntry" VARCHAR(100),
    "province" VARCHAR(200),
    "ethnos" VARCHAR(200),
    "subethnos" VARCHAR(200),
    "poplang" VARCHAR(200),
    "healthy" BOOLEAN,
    "healthycmt" VARCHAR(200),
    "policy" VARCHAR(200),
    "urbanity" VARCHAR(200),
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "locdescr" VARCHAR(1000),
    "popcmt" VARCHAR(1000),

    CONSTRAINT "pop_pkey" PRIMARY KEY ("popid")
);

-- CreateTable
CREATE TABLE "buff_to_individuals" (
    "indid" INTEGER NOT NULL,
    "buffid" INTEGER NOT NULL,

    CONSTRAINT "buff_to_individuals_pkey" PRIMARY KEY ("indid","buffid")
);

-- CreateTable
CREATE TABLE "individuals" (
    "indid" SERIAL NOT NULL,
    "indname" VARCHAR(200),
    "popid" INTEGER NOT NULL,
    "sex" CHAR(1),
    "hg" VARCHAR(200),
    "hgorig" VARCHAR(200),
    "hgcmt" VARCHAR(1000),
    "indcmt" VARCHAR(1000),

    CONSTRAINT "individuals_pkey" PRIMARY KEY ("indid")
);

-- CreateTable
CREATE TABLE "var" (
    "varid" SERIAL NOT NULL,
    "indid" INTEGER NOT NULL,
    "spos" INTEGER NOT NULL,
    "epos" INTEGER NOT NULL,
    "vartype" SMALLINT NOT NULL,
    "vardata" TEXT NOT NULL,

    CONSTRAINT "var_pkey" PRIMARY KEY ("varid")
);

-- CreateTable
CREATE TABLE "rflp" (
    "rflpid" SERIAL NOT NULL,
    "rflpname" VARCHAR(200) NOT NULL,

    CONSTRAINT "rflp_pkey" PRIMARY KEY ("rflpid")
);

-- CreateIndex
CREATE UNIQUE INDEX "ref_refname_key" ON "ref"("refname");

-- CreateIndex
CREATE UNIQUE INDEX "pop_refid_popname_key" ON "pop"("refid", "popname");

-- CreateIndex
CREATE UNIQUE INDEX "var_indid_varid_key" ON "var"("indid", "varid");

-- AddForeignKey
ALTER TABLE "ref" ADD CONSTRAINT "ref_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "ref"("refid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pop" ADD CONSTRAINT "pop_refid_fkey" FOREIGN KEY ("refid") REFERENCES "ref"("refid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buff_to_individuals" ADD CONSTRAINT "buff_to_individuals_indid_fkey" FOREIGN KEY ("indid") REFERENCES "individuals"("indid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buff_to_individuals" ADD CONSTRAINT "buff_to_individuals_buffid_fkey" FOREIGN KEY ("buffid") REFERENCES "buff"("buffid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individuals" ADD CONSTRAINT "individuals_popid_fkey" FOREIGN KEY ("popid") REFERENCES "pop"("popid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "var" ADD CONSTRAINT "var_indid_fkey" FOREIGN KEY ("indid") REFERENCES "individuals"("indid") ON DELETE CASCADE ON UPDATE CASCADE;
