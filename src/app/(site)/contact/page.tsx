import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton, Card } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach Maby Academy — support, community, and how to report anyone impersonating us or asking for your keys.",
};

const CHANNELS: {
  icon: IconName;
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
}[] = [
  {
    icon: "lifebuoy",
    title: "Support",
    body: "Questions about a course, your account, a certificate, or a payment. We read every message.",
    href: "mailto:support@mabyacademy.online",
    cta: "support@mabyacademy.online",
    external: true,
  },
  {
    icon: "users",
    title: "Community",
    body: "Ask other members, share what you're learning, and get unstuck. Held to our community guidelines.",
    href: "/community",
    cta: "Open the community",
  },
  {
    icon: "book",
    title: "Common questions",
    body: "Most things are answered already — how lessons work, pricing, safety, and certificates.",
    href: "/faq",
    cta: "Read the FAQ",
  },
];

/**
 * Contact. No form — a form needs a backend route and spam handling that
 * doesn't exist yet, and a broken form is worse than an honest mailto. The
 * fraud-report callout is the reason this page earns its place: it gives
 * people a clear, prominent path the moment someone asks for their keys.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="eyebrow-wide">Contact</p>
      <h1 className="mt-4 text-[34px] leading-[1.1] font-black tracking-tight text-mist-100 sm:text-[44px]">
        Get in touch
      </h1>
      <p className="mt-5 text-base leading-[1.75] text-mist-300">
        Pick the channel that fits. For anything urgent about safety or fraud,
        skip straight to the red box below.
      </p>

      <div className="mt-12 space-y-4">
        {CHANNELS.map((c) => (
          <Card key={c.title} pad="wide" className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0 text-gold-500">
              <Icon name={c.icon} size={20} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-bold text-mist-100">{c.title}</h2>
              <p className="mt-1.5 text-[13px] leading-[1.65] text-mist-400">
                {c.body}
              </p>
              {c.external ? (
                <a
                  href={c.href}
                  className="mt-3 inline-block text-[13px] font-semibold text-gold-500 hover:text-gold-400"
                >
                  {c.cta} →
                </a>
              ) : (
                <Link
                  href={c.href}
                  className="mt-3 inline-block text-[13px] font-semibold text-gold-500 hover:text-gold-400"
                >
                  {c.cta} →
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card variant="gold" pad="wide" className="mt-8 border-flag-500/40">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0 text-flag-500">
            <Icon name="flag" size={18} strokeWidth={2.2} />
          </span>
          <div>
            <h2 className="text-[15px] font-bold text-mist-100">
              Report fraud or impersonation
            </h2>
            <p className="mt-2 text-[13px] leading-[1.7] text-mist-300">
              We will <strong className="text-mist-100">never</strong> ask for
              your seed phrase, private key, or recovery phrase — not support,
              not an instructor, not the founder. If anyone claims to represent
              Maby Academy and asks for these, or impersonates us, it is fraud.
              Tell us at{" "}
              <a
                href="mailto:security@mabyacademy.online"
                className="font-semibold text-gold-400 hover:text-gold-300"
              >
                security@mabyacademy.online
              </a>{" "}
              and do not send them anything.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-12">
        <LinkButton href="/register" size="lg">
          Start learning free
        </LinkButton>
      </div>
    </div>
  );
}
