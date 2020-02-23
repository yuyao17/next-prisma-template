# Migration `20200216134953-init`

This migration has been generated at 2/16/2020, 1:49:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "email" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "name" text   ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200216134953-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,14 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = env("PG_URL")
+}
+
+model User {
+  email String  @default("") @unique
+  id    Int     @default(autoincrement()) @id
+  name  String?
+}
```


