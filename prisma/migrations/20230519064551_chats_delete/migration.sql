/*
  Warnings:

  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chats" DROP CONSTRAINT "Chats_threadID_fkey";

-- DropTable
DROP TABLE "Chats";
