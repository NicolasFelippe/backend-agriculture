-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" SERIAL NOT NULL,
    "CpfOrCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "agriculturalArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "producerId" INTEGER NOT NULL,
    "plantedCrops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_CpfOrCnpj_key" ON "RuralProducer"("CpfOrCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Farm_producerId_key" ON "Farm"("producerId");

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "RuralProducer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
