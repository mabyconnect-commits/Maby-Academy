import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getLeaderboard, getUserRank } from "@/server/services/rewards";
import { Card, EmptyState, Pill } from "@/components/ui";
import { levelFor } from "@/lib/levels";
import { cn, initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Leaderboard" };
export const dynamic = "force-dynamic";

/** Podium order puts first place in the middle and lifts it. */
const PODIUM_SLOTS = [1, 0, 2];

const RANK_STYLES = [
  { text: "text-gold-500", ring: "border-gold-500/45", fill: "from-gold-400 to-gold-600" },
  { text: "text-mist-200", ring: "border-mist-200/35", fill: "from-mist-200 to-mist-400" },
  { text: "text-ember-500", ring: "border-ember-500/40", fill: "from-ember-400 to-ember-500" },
];

export default async function LeaderboardPage() {
  const user = await requireUser();
  const [board, myRank] = await Promise.all([
    getLeaderboard(25),
    getUserRank(user.id),
  ]);

  if (board.length === 0) {
    return (
      <EmptyState
        icon="trophy"
        title="No rankings yet"
        description="The board fills up as members complete lessons and submit work. Points come from finishing things."
      />
    );
  }

  const podium = board.slice(0, 3);
  const rest = board.slice(3);

  return (
    <div className="max-w-[760px]">
      {/*
        Ranked on *lifetime* points, which cannot be spent — otherwise buying
        something in the rewards store would drop you down the board, and the
        leaderboard would quietly punish members for using their points.
      */}
      <p className="mb-5 text-xs leading-[1.6] text-mist-400">
        Ranked by lifetime points earned. Spending points in the rewards store
        never costs you a place.
      </p>

      {podium.length === 3 && (
        <div className="mb-5 grid grid-cols-3 gap-3.5">
          {PODIUM_SLOTS.map((slot, column) => {
            const member = podium[slot];
            const style = RANK_STYLES[slot];
            return (
              <Card
                key={member.id}
                pad="none"
                className={cn(
                  "p-3.5 text-center sm:p-[18px]",
                  // The winner's card sits higher; the others drop, which is
                  // what makes it read as a podium rather than three cards.
                  column === 1 ? "mt-0" : "mt-4",
                  style.ring,
                )}
              >
                <p className={cn("text-[13px] font-extrabold", style.text)}>
                  {slot + 1}
                </p>
                <span
                  className={cn(
                    "mx-auto mt-3 mb-2.5 grid size-[46px] place-items-center rounded-full bg-gradient-to-br text-base font-extrabold text-ink-950",
                    style.fill,
                  )}
                >
                  {initials(member.name)}
                </span>
                <p className="truncate text-[13px] leading-[1.2] font-bold text-mist-100">
                  {member.name}
                </p>
                <p className="mt-[7px] text-xs font-bold text-gold-500 tabular-nums">
                  {member.lifetimePoints.toLocaleString()} XP
                </p>
              </Card>
            );
          })}
        </div>
      )}

      <Card pad="none" className="overflow-hidden">
        {rest.map((member, i) => {
          const rank = i + 4;
          const isMe = member.id === user.id;
          return (
            <div
              key={member.id}
              className={cn(
                "flex items-center gap-3 border-b border-mist-100/5 px-3.5 py-[15px] last:border-b-0 sm:px-5",
                isMe && "bg-gold-500/8",
              )}
            >
              <span className="w-[26px] shrink-0 text-[13px] font-extrabold text-mist-400 tabular-nums">
                {rank}
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-xs font-extrabold text-ink-950">
                {initials(member.name)}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-mist-100">
                {member.name}
                {isMe && (
                  <Pill tone="gold" className="ml-2 align-middle">
                    You
                  </Pill>
                )}
              </span>
              <span className="hidden text-[11px] font-semibold text-mist-400 sm:block">
                Level {levelFor(member.lifetimePoints).number}
              </span>
              <span className="shrink-0 text-right text-[13px] font-extrabold text-gold-500 tabular-nums">
                {member.lifetimePoints.toLocaleString()} XP
              </span>
            </div>
          );
        })}
      </Card>

      {/* Someone outside the top 25 would otherwise have no idea where they
          stand, which makes the whole page feel like it isn't about them. */}
      {myRank && myRank > board.length && (
        <Card className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-mist-300">
            Your position
          </span>
          <span className="text-[13px] font-extrabold text-gold-500 tabular-nums">
            #{myRank} · {user.lifetimePoints.toLocaleString()} XP
          </span>
        </Card>
      )}
    </div>
  );
}
