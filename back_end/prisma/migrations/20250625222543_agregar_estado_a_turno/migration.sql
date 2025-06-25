/*
  Warnings:

  - Made the column `id_historia` on table `Turno` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_id_historia_fkey";

-- AlterTable
ALTER TABLE "Turno" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'pendiente',
ALTER COLUMN "id_historia" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_historia_fkey" FOREIGN KEY ("id_historia") REFERENCES "HistoriaClinica"("id_historia") ON DELETE RESTRICT ON UPDATE CASCADE;
