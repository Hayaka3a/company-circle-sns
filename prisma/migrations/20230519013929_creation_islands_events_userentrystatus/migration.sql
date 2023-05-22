/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Users" (
    "userID" SERIAL NOT NULL,
    "familyName" VARCHAR(12) NOT NULL,
    "firstName" VARCHAR(12) NOT NULL,
    "familyName_kana" VARCHAR(12) NOT NULL,
    "firstName_kana" VARCHAR(12) NOT NULL,
    "mailAddress" VARCHAR(250) NOT NULL,
    "password" VARCHAR(16) NOT NULL,
    "icon" TEXT NOT NULL,
    "employeeCode" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Islands" (
    "islandID" SERIAL NOT NULL,
    "islandName" VARCHAR(100) NOT NULL,
    "thumbnail" TEXT,
    "detail" VARCHAR(300) NOT NULL,
    "ownerID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Islands_pkey" PRIMARY KEY ("islandID")
);

-- CreateTable
CREATE TABLE "Events" (
    "eventID" SERIAL NOT NULL,
    "eventName" VARCHAR(100) NOT NULL,
    "thumbnail" TEXT,
    "detail" VARCHAR(300) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "User_entry_status" (
    "user_entry_statusID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "islandID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,

    CONSTRAINT "User_entry_status_pkey" PRIMARY KEY ("user_entry_statusID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mailAddress_key" ON "Users"("mailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Users_employeeCode_key" ON "Users"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Islands_islandName_key" ON "Islands"("islandName");

-- CreateIndex
CREATE UNIQUE INDEX "Events_eventName_key" ON "Events"("eventName");

-- AddForeignKey
ALTER TABLE "User_entry_status" ADD CONSTRAINT "User_entry_status_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_entry_status" ADD CONSTRAINT "User_entry_status_islandID_fkey" FOREIGN KEY ("islandID") REFERENCES "Islands"("islandID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_entry_status" ADD CONSTRAINT "User_entry_status_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Events"("eventID") ON DELETE RESTRICT ON UPDATE CASCADE;
