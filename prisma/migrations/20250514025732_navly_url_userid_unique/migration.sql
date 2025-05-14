/*
  Warnings:

  - A unique constraint covering the columns `[url,userId]` on the table `Navly` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Navly_url_userId_key" ON "Navly"("url", "userId");
