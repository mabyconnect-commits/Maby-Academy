import { clientMeta, ok, readJson, route } from "@/lib/api";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation";
import { authenticate } from "@/server/services/auth";

export const POST = route(async (request: Request) => {
  const { email, password } = loginSchema.parse(await readJson(request));
  const user = await authenticate(email, password);
  const { expiresAt } = await createSession(user.id, clientMeta(request));

  return ok({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    expiresAt,
  });
});
