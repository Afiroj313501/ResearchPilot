import prisma from "./database";

async function testDatabase() {
  try {
    await prisma.$connect();

    console.log("✅ PostgreSQL connected successfully");

    const userCount = await prisma.user.count();

    console.log(`👤 Users in database: ${userCount}`);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();