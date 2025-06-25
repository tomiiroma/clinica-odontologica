-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_id_historia_fkey";

-- AlterTable
ALTER TABLE "Turno" ALTER COLUMN "id_historia" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "estado" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_historia_fkey" FOREIGN KEY ("id_historia") REFERENCES "HistoriaClinica"("id_historia") ON DELETE SET NULL ON UPDATE CASCADE;
