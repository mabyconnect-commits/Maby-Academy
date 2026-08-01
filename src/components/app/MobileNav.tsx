"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { isActive, type NavItem } from "./nav-config";

/**
 * The mobile bottom bar.
 *
 * Horizontally scrollable rather than capped at five items, which is what the
 * design specifies — the alternative is hiding destinations that then exist
 * nowhere on a phone. Items come from the same nav declaration as the sidebar,
 * filtered to those that opted into `mobileOrder`.
 */
export function MobileNav({ items, unread }: { items: NavItem[]; unread: number }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="no-print fixed inset-x-0 bottom-0 z-20 flex overflow-x-auto border-t border-mist-100/10 bg-ink-870/97 px-1.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-[10px] lg:hidden"
    >
      {items.map((item) => {
        const active = isActive(item, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex min-w-[60px] flex-1 flex-col items-center gap-[5px] rounded-lg px-1 py-2 transition-colors",
              active ? "bg-gold-500/12 text-gold-500" : "text-mist-100/50",
            )}
          >
            <Icon name={item.icon} size={19} />
            <span className="text-[9px] font-semibold whitespace-nowrap">
              {item.short}
            </span>
            {item.badge && unread > 0 && (
              <span
                className="absolute top-1 right-1.5 size-2 rounded-full bg-gold-500"
                aria-label={`${unread} unread`}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
