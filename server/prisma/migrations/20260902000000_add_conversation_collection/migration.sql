ALTER TABLE "Conversation" ADD COLUMN "collectionId" TEXT;

ALTER TABLE "Conversation"
  ADD CONSTRAINT "Conversation_collectionId_fkey"
  FOREIGN KEY ("collectionId") REFERENCES "Collection"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "Conversation_collectionId_idx" ON "Conversation"("collectionId");
