/*
  Warnings:

  - Added the required column `descricao` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "local" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("atualizado_em", "capacidade", "criado_em", "id", "nome") SELECT "atualizado_em", "capacidade", "criado_em", "id", "nome" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
