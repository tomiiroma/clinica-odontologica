/*
  Warnings:

  - You are about to drop the column `fecha_inicio` on the `Tratamiento` table. All the data in the column will be lost.
  - You are about to drop the column `finalizado` on the `Tratamiento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tratamiento" DROP COLUMN "fecha_inicio",
DROP COLUMN "finalizado",
ADD COLUMN     "cantidadSesiones" INTEGER;
