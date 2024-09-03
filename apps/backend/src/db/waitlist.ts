import prisma from "@repo/db/client";

export async function addEmail(email: string) {
  try {
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address");
    }
    const newWaitlistEntry = await prisma.waitlist.create({
      data: {
        email: email,
      },
    });
    return newWaitlistEntry;
  } catch (err) {
    console.error("Error adding email to waitlist:", err);
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}
