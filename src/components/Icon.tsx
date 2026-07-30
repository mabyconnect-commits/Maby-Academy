import { cn } from "@/lib/utils";

/**
 * The icon set.
 *
 * The design draws every icon as a single stroked path at 1.8 weight — no
 * emoji anywhere in navigation or on cards. Emoji were a stand-in: they render
 * differently on every platform, carry their own colour so they fight the gold
 * accent, and read as decoration rather than interface. These are one shape
 * each, inherit `currentColor`, and sit on the same 24-unit grid so they align
 * optically at every size.
 */
export const ICON_PATHS = {
  // Navigation
  home: "M3 10.5 L12 3 L21 10.5 V20 A1 1 0 0 1 20 21 H4 A1 1 0 0 1 3 20 Z",
  // An open book, drawn as two mirrored leaves. The earlier single-path
  // version used stacked arcs and rendered as a rounded blob below ~20px.
  book: "M4 4 H10 A2 2 0 0 1 12 6 V20 A2 2 0 0 0 10 18 H4 Z M20 4 H14 A2 2 0 0 0 12 6 V20 A2 2 0 0 1 14 18 H20 Z",
  play: "M5 3.5 L20 12 L5 20.5 Z",
  edit: "M4 20 H8 L19 9 A2.5 2.5 0 0 0 15.5 5.5 L4.5 16.5 Z",
  award: "M12 2 A6 6 0 1 0 12 14 A6 6 0 0 0 12 2 M8 13.5 L6 22 L12 19 L18 22 L16 13.5",
  seedling: "M12 21 V11 M12 11 C12 7 9 4 5 4 C5 8 8 11 12 11 M12 11 C12 7.5 15 4.5 19 4.5 C19 8.5 16 11 12 11",
  journal: "M6 3 H18 A2 2 0 0 1 20 5 V21 L12 17 L4 21 V5 A2 2 0 0 1 6 3",
  users: "M16 20 V18 A4 4 0 0 0 12 14 H7 A4 4 0 0 0 3 18 V20 M9.5 10 A3.5 3.5 0 1 0 9.5 3 A3.5 3.5 0 0 0 9.5 10 M21 20 V18 A4 4 0 0 0 18 14.2",
  calendar: "M4 6 A2 2 0 0 1 6 4 H18 A2 2 0 0 1 20 6 V19 A2 2 0 0 1 18 21 H6 A2 2 0 0 1 4 19 Z M4 9 H20 M8 4 V2 M16 4 V2",
  handshake: "M2 11 L6 7 L12 12 L18 7 L22 11 M6 7 V15 L10 19 L12 17 M18 7 V15 L14 19 L12 17",
  trophy: "M8 4 H16 V10 A4 4 0 0 1 8 10 Z M8 5 H5 V7 A3 3 0 0 0 8 10 M16 5 H19 V7 A3 3 0 0 1 16 10 M12 14 V18 M8 21 H16",
  tools: "M14 3 L21 10 L18 13 L11 6 Z M11 6 L4 13 V20 H11 L14 17 M6.5 15.5 L9.5 18.5",
  spark: "M12 3 L13.8 9.2 L20 11 L13.8 12.8 L12 19 L10.2 12.8 L4 11 L10.2 9.2 Z",
  search: "M10.5 17 A6.5 6.5 0 1 0 10.5 4 A6.5 6.5 0 0 0 10.5 17 M15.5 15.5 L21 21",
  bell: "M18 15 V10 A6 6 0 0 0 6 10 V15 L4 18 H20 Z M9.5 18 A2.5 2.5 0 0 0 14.5 18",
  card: "M3 7 A2 2 0 0 1 5 5 H19 A2 2 0 0 1 21 7 V17 A2 2 0 0 1 19 19 H5 A2 2 0 0 1 3 17 Z M3 10 H21",
  lifebuoy:
    "M12 20 A8 8 0 1 0 12 4 A8 8 0 0 0 12 20 M12 15.5 A3.5 3.5 0 1 0 12 8.5 A3.5 3.5 0 0 0 12 15.5 M6.4 6.4 L9.5 9.5 M14.5 14.5 L17.6 17.6 M17.6 6.4 L14.5 9.5 M9.5 14.5 L6.4 17.6",
  settings:
    "M12 15.5 A3.5 3.5 0 1 0 12 8.5 A3.5 3.5 0 0 0 12 15.5 M19.4 15 A1.7 1.7 0 0 0 19.8 16.9 L19.9 17 A2 2 0 1 1 17 19.9 A1.7 1.7 0 0 0 14.1 21 A2 2 0 1 1 10 21 A1.7 1.7 0 0 0 7.1 19.9 A2 2 0 1 1 4.2 17 A1.7 1.7 0 0 0 3 14.1 A2 2 0 1 1 3 10 A1.7 1.7 0 0 0 4.1 7.1 A2 2 0 1 1 7 4.2 A1.7 1.7 0 0 0 9.9 3 A2 2 0 1 1 14 3 A1.7 1.7 0 0 0 16.9 4.1 A2 2 0 1 1 19.8 7 A1.7 1.7 0 0 0 21 9.9 A2 2 0 1 1 21 14 A1.7 1.7 0 0 0 19.4 15",
  shield: "M12 21 C17 19 20 15 20 10 V5 L12 2.5 L4 5 V10 C4 15 7 19 12 21 Z",
  chart: "M4 20 V4 M4 20 H20 M8 16 V11 M12.5 16 V7 M17 16 V13",
  clipboard:
    "M9 4 H6 A2 2 0 0 0 4 6 V19 A2 2 0 0 0 6 21 H18 A2 2 0 0 0 20 19 V6 A2 2 0 0 0 18 4 H15 M9 4 A1.5 1.5 0 0 1 10.5 2.5 H13.5 A1.5 1.5 0 0 1 15 4 A1.5 1.5 0 0 1 13.5 5.5 H10.5 A1.5 1.5 0 0 1 9 4",
  flag: "M5 21 V3 M5 4 H15 L13.5 7.5 L15 11 H5",
  scroll: "M6 4 H18 A1 1 0 0 1 19 5 V17 A3 3 0 0 1 16 20 H8 A3 3 0 0 1 5 17 V6 A2 2 0 0 1 6 4 M9 9 H15 M9 13 H15",
  building:
    "M4 21 V4 H13 V21 M13 10 H20 V21 M3 21 H21 M7 8 H10 M7 12 H10 M7 16 H10 M16 14 H17.5",
  toggle: "M8 17 H16 A5 5 0 0 0 16 7 H8 A5 5 0 0 0 8 17 M8 15 A3 3 0 1 0 8 9 A3 3 0 0 0 8 15",
  wallet:
    "M3 8 A2 2 0 0 1 5 6 H19 A2 2 0 0 1 21 8 V18 A2 2 0 0 1 19 20 H5 A2 2 0 0 1 3 18 Z M3 8 L3 6.5 A1.5 1.5 0 0 1 4.5 5 H16 M17 13 H17.01",
  check: "M5 13 L10 18 L19 7",
  chevronRight: "M9 5 L16 12 L9 19",
  logout: "M9 21 H5 V3 H9 M15 17 L20 12 L15 7 M20 12 H9",
  flame: "M12 22 C8.5 22 6 19.5 6 16 C6 12 10 10 10 6 C13 7.5 13 10 12.5 11.5 C14 11 15 9.5 15 8 C17 10 18 13 18 16 C18 19.5 15.5 22 12 22",
  lock: "M6 11 H18 A1 1 0 0 1 19 12 V20 A1 1 0 0 1 18 21 H6 A1 1 0 0 1 5 20 V12 A1 1 0 0 1 6 11 M8 11 V7 A4 4 0 0 1 16 7 V11",
  file: "M14 3 H7 A2 2 0 0 0 5 5 V19 A2 2 0 0 0 7 21 H17 A2 2 0 0 0 19 19 V8 Z M14 3 V8 H19",
  help: "M12 20 A8 8 0 1 0 12 4 A8 8 0 0 0 12 20 M9.5 9.5 A2.5 2.5 0 1 1 12 12 V13.5 M12 16.5 H12.01",
  target:
    "M12 20 A8 8 0 1 0 12 4 A8 8 0 0 0 12 20 M12 16 A4 4 0 1 0 12 8 A4 4 0 0 0 12 16 M12 13 A1 1 0 1 0 12 11 A1 1 0 0 0 12 13",
} as const;

export type IconName = keyof typeof ICON_PATHS;

export function Icon({
  name,
  size = 16,
  className,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
