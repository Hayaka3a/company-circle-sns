-- CreateTable
CREATE TABLE "users" (
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

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_mailAddress_key" ON "users"("mailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_employeeCode_key" ON "users"("employeeCode");
