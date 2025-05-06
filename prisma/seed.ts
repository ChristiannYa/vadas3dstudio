import { PrismaClient } from "../src/app/generated/prisma";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash the password - using 10 salt rounds
  const passwordHash = await bcrypt.hash("test123", 10);

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test",
      last_name: "User",
      email: "test@example.com",
      email_verified: true,
      password_hash: passwordHash,
    },
  });

  console.log("Created test user:", testUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
