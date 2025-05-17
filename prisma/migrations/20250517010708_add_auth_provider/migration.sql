-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_provider" TEXT NOT NULL DEFAULT 'credentials';
