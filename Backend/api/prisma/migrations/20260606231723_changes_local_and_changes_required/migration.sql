/*
  Warnings:

  - Made the column `changes` on table `room_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `local` on table `rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `room_logs` MODIFY `changes` JSON NOT NULL;

-- AlterTable
ALTER TABLE `rooms` MODIFY `local` VARCHAR(191) NOT NULL;
