/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `waitlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "waitlist"("email");
