/**
 * The academy's external communities and channels.
 *
 * Kept in code (not the database) because these are official links whose change
 * should be reviewable in a diff — a swapped invite link is exactly the kind of
 * edit that should require a commit. Joining all of them is the "price" of a
 * free course, so this list is the single source of truth for both the join
 * page and any place that counts them.
 */
export type Community = {
  name: string;
  /** "WhatsApp community" or "Telegram channel" — shown as the small label. */
  platform: "WhatsApp" | "Telegram";
  kind: "Community" | "Channel";
  url: string;
  blurb: string;
};

export const COMMUNITIES: Community[] = [
  {
    name: "AllRound Growth",
    platform: "WhatsApp",
    kind: "Community",
    url: "https://chat.whatsapp.com/CsYAZTqWGUw1yFV55VrdaT",
    blurb: "The main growth community — crypto, money, health and faith, together.",
  },
  {
    name: "The Praying Community",
    platform: "WhatsApp",
    kind: "Community",
    url: "https://chat.whatsapp.com/DDVkFK6m5rl85garNxoXIq",
    blurb: "Faith and prayer alongside the growth — entirely optional, always welcome.",
  },
  {
    name: "Online Updates With Maby",
    platform: "WhatsApp",
    kind: "Community",
    url: "https://chat.whatsapp.com/IPKh96qS1H73OJ9z5S5DjU",
    blurb: "Announcements and updates so you never miss what's happening.",
  },
  {
    name: "Maby D'Speculator",
    platform: "Telegram",
    kind: "Channel",
    url: "https://t.me/MabyDSpeculator",
    blurb: "The Telegram channel for market thoughts and lessons.",
  },
  {
    name: "Maby Lounge",
    platform: "Telegram",
    kind: "Channel",
    url: "https://t.me/+IMPPY91eYAk1NTdk",
    blurb: "The lounge — the wider Telegram room for members.",
  },
  {
    name: "Maby Connect",
    platform: "Telegram",
    kind: "Channel",
    url: "https://t.me/Mabyconnect2022",
    blurb: "The Maby Connect channel — updates, drops and what's next.",
  },
];
