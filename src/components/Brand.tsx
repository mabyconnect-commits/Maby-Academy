import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = { sm: 28, md: 34, lg: 44 }[size];
  const text = { sm: "text-base", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span
        className="grid place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 font-black shrink-0"
        style={{ width: dims, height: dims, fontSize: dims * 0.45 }}
        aria-hidden
      >
        M
      </span>
      <span className={cn("font-semibold tracking-tight text-mist-100", text)}>
        Maby <span className="text-gradient-gold">Academy</span>
      </span>
    </Link>
  );
}
