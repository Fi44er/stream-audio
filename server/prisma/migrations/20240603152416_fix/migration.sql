/*
  Warnings:

  - The primary key for the `room-likes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "room-likes" DROP CONSTRAINT "room-likes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "room-likes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "room-likes_id_seq";
