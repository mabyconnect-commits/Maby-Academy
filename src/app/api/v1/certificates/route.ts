import { ok, route } from "@/lib/api";
import { requireUser } from "@/lib/auth/session";
import { getMyCertificates, verifyUrl } from "@/server/services/certificates";

export const GET = route(async () => {
  const user = await requireUser();
  const certificates = await getMyCertificates(user.id);

  return ok({
    certificates: certificates.map((c) => ({
      ...c,
      verifyUrl: verifyUrl(c.verifyToken),
    })),
  });
});
