/**
 * Promote (or demote) a user by email.
 *
 * The demo seed is blocked in production, so this is how the first real
 * admin account is created: register through the site normally, then run
 * this against the production database.
 *
 *   npx tsx scripts/set-role.ts mabi@yourdomain.com ADMIN
 *   npx tsx scripts/set-role.ts grace@yourdomain.com INSTRUCTOR
 *   npx tsx scripts/set-role.ts someone@yourdomain.com STUDENT
 */
import { PrismaClient, Role } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const [email, role] = process.argv.slice(2);

  if (!email || !role) {
    console.error(
      "Usage: npx tsx scripts/set-role.ts <email> <STUDENT|INSTRUCTOR|ADMIN>",
    );
    process.exit(1);
  }

  const validRoles = Object.values(Role);
  const normalised = role.toUpperCase() as Role;

  if (!validRoles.includes(normalised)) {
    console.error(
      `✗ "${role}" is not a valid role. Choose one of: ${validRoles.join(", ")}`,
    );
    process.exit(1);
  }

  const user = await db.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    console.error(
      `✗ No account found for ${email}.\n` +
        "  Register through the site first, then run this again.",
    );
    process.exit(1);
  }

  if (user.role === normalised) {
    console.log(`• ${user.name} <${user.email}> is already ${normalised}.`);
    return;
  }

  await db.user.update({
    where: { id: user.id },
    data: { role: normalised },
  });

  // Privileged changes belong in the audit trail, including this one.
  await db.auditLog.create({
    data: {
      userId: user.id,
      action: "user.role_change",
      entityType: "User",
      entityId: user.id,
      metadata: { from: user.role, to: normalised, via: "scripts/set-role.ts" },
    },
  });

  console.log(
    `✓ ${user.name} <${user.email}>: ${user.role} → ${normalised}`,
  );
}

main()
  .catch((e) => {
    console.error("Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
