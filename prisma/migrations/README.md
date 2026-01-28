# Prisma Migrations

## Creating Your First Migration

Since we started with `db:push`, you need to create an initial migration:

```bash
# This will create a migration based on your current schema
npx prisma migrate dev --name init
```

This creates a migration file that matches your current database state.

## For Production

After creating migrations, use:

```bash
# Apply migrations to production
npx prisma migrate deploy
```

**Note**: The first time, you may need to baseline:
```bash
# If database already has tables from db:push
npx prisma migrate resolve --applied init
npx prisma migrate deploy
```

## Migration Commands

```bash
# Create new migration (development)
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Check migration status
npx prisma migrate status

# Reset database (development only!)
npx prisma migrate reset
```
