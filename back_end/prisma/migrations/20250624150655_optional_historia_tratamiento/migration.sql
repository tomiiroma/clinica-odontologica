-- DropForeignKey
ALTER TABLE "Tratamiento" DROP CONSTRAINT "Tratamiento_id_historia_fkey";

-- AlterTable
ALTER TABLE "Tratamiento" ALTER COLUMN "id_historia" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tratamiento" ADD CONSTRAINT "Tratamiento_id_historia_fkey" FOREIGN KEY ("id_historia") REFERENCES "HistoriaClinica"("id_historia") ON DELETE SET NULL ON UPDATE CASCADE;
