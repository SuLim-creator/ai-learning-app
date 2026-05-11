-- CreateTable
CREATE TABLE "GeneratedContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "GeneratedContent_lessonId_idx" ON "GeneratedContent"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedContent_lessonId_version_key" ON "GeneratedContent"("lessonId", "version");
