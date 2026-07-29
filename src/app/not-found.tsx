import Link from "next/link";
import { Logo } from "@/components/Brand";
import { LinkButton } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Logo />
      <p className="mt-10 text-6xl font-semibold text-gold-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-mist-400 max-w-md">
        The link may be out of date, or the course may have been moved. The
        catalogue is a good place to pick things back up.
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <LinkButton href="/courses">Browse courses</LinkButton>
        <LinkButton href="/" variant="secondary">
          Back home
        </LinkButton>
      </div>

      <p className="mt-10 text-sm text-mist-400">
        Already a member?{" "}
        <Link href="/dashboard" className="text-gold-400 hover:text-gold-300">
          Go to your dashboard
        </Link>
      </p>
    </div>
  );
}
