/*
  Warnings:

  - Made the column `id_empresa` on table `despesas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_empresa` on table `receitas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "despesas" ALTER COLUMN "id_empresa" SET NOT NULL;

-- AlterTable
ALTER TABLE "receitas" ALTER COLUMN "id_empresa" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
