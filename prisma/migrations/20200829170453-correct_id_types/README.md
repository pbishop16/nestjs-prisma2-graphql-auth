# Migration `20200829170453-correct_id_types`

This migration has been generated by Paul Bishop at 8/29/2020, 12:04:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"firstName" text   ,
"lastName" text   ,
"email" text   NOT NULL ,
"password" text   NOT NULL ,
"lastLogin" timestamp(3)   ,
"createdAt" timestamp(3)   DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Post" (
"id" text   NOT NULL ,
"authorId" text   ,
"title" text   NOT NULL ,
"body" text   ,
"createdAt" timestamp(3)   DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200828025720-update_optional_columns..20200829170453-correct_id_types
--- datamodel.dml
+++ datamodel.dml
@@ -2,30 +2,30 @@
   provider = "prisma-client-js"
 }
 datasource db {
-  url = "***"
+  url = "***"
   provider = "postgresql"
 }
 model User {
-  id Int @id @default(autoincrement())
+  id String @id @default(uuid())
   firstName String?
   lastName String?
   email String @unique
   password String
   posts Post[]
   lastLogin DateTime?
   createdAt DateTime? @default(now())
-  updatedAt DateTime? @updatedAt
+  updatedAt DateTime?
 }
 model Post {
-  id Int @id @default(autoincrement())
-  authorId Int?
+  id String @id @default(uuid())
+  authorId String?
   title String
   body String?
   author User? @relation(fields: [authorId], references: [id])
   createdAt DateTime? @default(now())
-  updatedAt DateTime? @updatedAt
+  updatedAt DateTime? 
 }
```


