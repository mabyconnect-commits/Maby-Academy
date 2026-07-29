import { clientMeta, ok, readJson, route } from "@/lib/api";
import { createSession } from "@/lib/auth/session";
import { registerSchema } from "@/lib/validation";
import { registerUser } from "@/server/services/auth";

export const POST = route(async (request: Request) => {
  const input = registerSchema.parse(await readJson(request));
  const user = await registerUser(input);
  await createSession(user.id, clientMeta(request));

  return ok(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      referralCode: user.referralCode,
    },
    201,
  );
});
