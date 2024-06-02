/*
  Warnings:

  - Added the required column `like` to the `room-likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room-likes" ADD COLUMN     "like" BOOLEAN NOT NULL;
