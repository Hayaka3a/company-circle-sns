/*
  Warnings:

  - You are about to drop the `User_entry_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_entry_status" DROP CONSTRAINT "User_entry_status_eventID_fkey";

-- DropForeignKey
ALTER TABLE "User_entry_status" DROP CONSTRAINT "User_entry_status_islandID_fkey";

-- DropForeignKey
ALTER TABLE "User_entry_status" DROP CONSTRAINT "User_entry_status_userID_fkey";

-- DropTable
DROP TABLE "User_entry_status";

-- CreateTable
CREATE TABLE "UserEntryStatus" (
    "userEntryStatusID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "islandID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserEntryStatus_pkey" PRIMARY KEY ("userEntryStatusID")
);

-- CreateTable
CREATE TABLE "Posts" (
    "postID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "islandID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageID" SERIAL NOT NULL,
    "message" VARCHAR(200),
    "posredBy" TEXT NOT NULL,
    "postID" INTEGER NOT NULL,
    "scout" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isAnswered" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageID")
);

-- CreateTable
CREATE TABLE "Applications" (
    "applicationID" SERIAL NOT NULL,
    "message" VARCHAR(200),
    "messageID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("applicationID")
);

-- CreateTable
CREATE TABLE "Tags" (
    "tagID" SERIAL NOT NULL,
    "tagName" VARCHAR(22) NOT NULL,
    "tagNameKana" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("tagID")
);

-- CreateTable
CREATE TABLE "TagStatus" (
    "tagStatusID" SERIAL NOT NULL,
    "tagID" INTEGER NOT NULL,
    "islandID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TagStatus_pkey" PRIMARY KEY ("tagStatusID")
);

-- CreateTable
CREATE TABLE "Threads" (
    "threadID" SERIAL NOT NULL,
    "threadTitle" VARCHAR(22) NOT NULL,
    "islandID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Threads_pkey" PRIMARY KEY ("threadID")
);

-- CreateTable
CREATE TABLE "Chats" (
    "chatID" SERIAL NOT NULL,
    "text" VARCHAR(100) NOT NULL,
    "postedAt" TIMESTAMP(3),
    "postedBy" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "threadID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("chatID")
);

-- AddForeignKey
ALTER TABLE "UserEntryStatus" ADD CONSTRAINT "UserEntryStatus_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEntryStatus" ADD CONSTRAINT "UserEntryStatus_islandID_fkey" FOREIGN KEY ("islandID") REFERENCES "Islands"("islandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEntryStatus" ADD CONSTRAINT "UserEntryStatus_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("eventID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_islandID_fkey" FOREIGN KEY ("islandID") REFERENCES "Islands"("islandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("eventID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Posts"("postID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_messageID_fkey" FOREIGN KEY ("messageID") REFERENCES "Messages"("messageID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagStatus" ADD CONSTRAINT "TagStatus_tagID_fkey" FOREIGN KEY ("tagID") REFERENCES "Tags"("tagID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagStatus" ADD CONSTRAINT "TagStatus_islandID_fkey" FOREIGN KEY ("islandID") REFERENCES "Islands"("islandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_islandID_fkey" FOREIGN KEY ("islandID") REFERENCES "Islands"("islandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("eventID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_threadID_fkey" FOREIGN KEY ("threadID") REFERENCES "Threads"("threadID") ON DELETE RESTRICT ON UPDATE CASCADE;
