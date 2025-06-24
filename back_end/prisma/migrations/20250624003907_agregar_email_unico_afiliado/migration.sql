/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Afiliado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Afiliado_email_key" ON "Afiliado"("email");
