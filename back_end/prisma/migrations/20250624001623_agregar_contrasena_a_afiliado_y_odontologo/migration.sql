/*
  Warnings:

  - Added the required column `contraseña` to the `Afiliado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contraseña` to the `Odontologo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Afiliado" ADD COLUMN     "contraseña" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Odontologo" ADD COLUMN     "contraseña" TEXT NOT NULL;
