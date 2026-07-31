import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getLeaderboard, getUserRank } from "@/server/services/rewards";
import {
  getActiveSeason,
  getMySeasonStanding,
  getSeasonBoard,
} from "@/server/services/seasons";
import { isFeatureEnabled } from "@/server/services/features";
import { Card, EmptyState, Pill, ProgressBar } from "@/components/ui";
import { levelFor } from "@/lib/levels";
import { cn, formatDate, formatMoney, initials } from "@/lib/utils";

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
  const season = await getActiveSeason();

  // The board itself is always available. Only the prize amounts are gated,
  // so switching cash off leaves a working competition rather than a blank
  // page — and switching it on does not require rebuilding anything.
  const [board, myRank, cashEnabled, seasonBoard, myStanding] = await Promise.all([
    getLeaderboard(25),
    getUserRank(user.id),
    isFeatureEnabled("token_rewards"),
    season ? getSeasonBoard(season.id, 25) : Promise.resolve(null),
    season ? getMySeasonStanding(season.id, user.id) : Promise.resolve(null),
  ]);

  if (board.length === 0 && !season) {
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
    <div className="flex max-w-[760px] min-w-0 flex-col gap-8">
      {/* ================================================================= */}
      {/* This season                                                        */}
      {/* ================================================================= */}
      {season && seasonBoard && (
        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-[17px] font-extrabold text-mist-100">
                {season.name}
              </h2>
              <p className="mt-1 text-[11.5px] text-mist-400">
                Ends {formatDate(season.endsAt)} ·{" "}
                {seasonBoard.totalParticipants} qualifying
              </p>
            </div>
            {cashEnabled && season.prizePoolMinor > 0 && (
              <Pill tone="gold">
                {formatMoney(season.prizePoolMinor, season.currency)} pool
              </Pill>
            )}
          </div>

          {season.blurb && (
            <p className="mb-4 text-xs leading-[1.6] text-mist-400">
              {season.blurb}
            </p>
          )}

          {/* Stated plainly rather than buried, because a member who does not
              know the rules will assume the ones that suit them. */}
          <Card variant="gold" className="mb-4">
            <p className="eyebrow">How this is scored</p>
            <ul className="mt-2.5 space-y-1.5 text-[11.5px] leading-[1.5] text-mist-300">
              <li>
                Only points from finished work count — lessons completed,
                quizzes passed, assignments graded, sessions attended.
              </li>
              <li>
                Streak bonuses, referrals and badges do not count toward this
                board.
              </li>
              <li>
                You need at least {season.minQualifyingPoints} points across{" "}
                {season.minActiveDays} different days to qualify.
              </li>
            </ul>
          </Card>

          {seasonBoard.rows.length === 0 ? (
            <Card>
              <p className="text-xs leading-[1.6] text-mist-400">
                Nobody has qualified yet. Complete a lesson and you will be
                first on the board.
              </p>
            </Card>
          ) : (
            <Card pad="none" className="overflow-hidden">
              {seasonBoard.rows.map((row) => {
                const isMe = row.userId === user.id;
                return (
                  <div
                    key={row.userId}
                    className={cn(
                      "flex items-center gap-3 border-b border-rule px-3.5 py-[13px] last:border-b-0 sm:px-5",
                      isMe && "bg-gold-500/8",
                      !row.eligible && "opacity-60",
                    )}
                  >
                    <span className="w-[26px] shrink-0 text-[13px] font-extrabold text-mist-400 tabular-nums">
                      {row.rank ?? "—"}
                    </span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-xs font-extrabold text-ink-950">
                      {initials(row.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-mist-100">
                        {row.name}
                        {isMe && (
                          <Pill tone="gold" className="ml-2 align-middle">
                            You
                          </Pill>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] text-mist-400">
                        {row.activeDays} active day
                        {row.activeDays === 1 ? "" : "s"}
                        {!row.eligible && " · not yet qualifying"}
                      </span>
                    </span>
                    {cashEnabled && row.prizeMinor > 0 && (
                      <span className="hidden shrink-0 text-[11px] font-bold text-growth-500 tabular-nums sm:block">
                        {formatMoney(row.prizeMinor, season.currency)}
                      </span>
                    )}
                    <span className="shrink-0 text-right text-[13px] font-extrabold text-gold-500 tabular-nums">
                      {row.qualifyingPoints.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </Card>
          )}

          {/* Someone outside the visible slice, or not yet qualifying, needs
              to see exactly what is missing rather than simply be absent. */}
          {myStanding && (myStanding.rank == null || myStanding.rank > 25) && (
            <Card className="mt-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-mist-300">
                  {myStanding.eligible
                    ? `Your position — #${myStanding.rank}`
                    : "You are not qualifying yet"}
                </span>
                <span className="text-[13px] font-extrabold text-gold-500 tabular-nums">
                  {myStanding.qualifyingPoints.toLocaleString()} pts
                </span>
              </div>
              {!myStanding.eligible && (
                <div className="mt-3 space-y-2.5">
                  <div>
                    <div className="mb-1 flex justify-between text-[10.5px] text-mist-400">
                      <span>Points</span>
                      <span className="tabular-nums">
                        {myStanding.qualifyingPoints}/
                        {season.minQualifyingPoints}
                      </span>
                    </div>
                    <ProgressBar
                      value={Math.min(
                        100,
                        Math.round(
                          (myStanding.qualifyingPoints /
                            Math.max(1, season.minQualifyingPoints)) *
                            100,
                        ),
                      )}
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[10.5px] text-mist-400">
                      <span>Active days</span>
                      <span className="tabular-nums">
                        {myStanding.activeDays}/{season.minActiveDays}
                      </span>
                    </div>
                    <ProgressBar
                      value={Math.min(
                        100,
                        Math.round(
                          (myStanding.activeDays /
                            Math.max(1, season.minActiveDays)) *
                            100,
                        ),
                      )}
                    />
                  </div>
                </div>
              )}
            </Card>
          )}

          {cashEnabled && season.prizes.length > 0 && (
            <Card className="mt-3.5">
              <p className="eyebrow">Prizes</p>
              <ul className="mt-2.5 space-y-1.5">
                {season.prizes.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 text-[11.5px]"
                  >
                    <span className="min-w-0 text-mist-300">
                      {p.label ??
                        (p.rankFrom === p.rankTo
                          ? `Rank ${p.rankFrom}`
                          : `Ranks ${p.rankFrom}–${p.rankTo}`)}
                    </span>
                    <span className="shrink-0 font-bold text-growth-500 tabular-nums">
                      {formatMoney(p.amountMinor, season.currency)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10.5px] leading-[1.5] text-mist-400">
                Prizes are reviewed by a person before payment. Accounts that
                appear to be farming points are held back while we look.
              </p>
            </Card>
          )}
        </section>
      )}

      {/* ================================================================= */}
      {/* All time                                                           */}
      {/* ================================================================= */}
      {board.length > 0 && (
        <section className="min-w-0">
          <h2 className="text-[17px] font-extrabold text-mist-100">All time</h2>
          {/*
            Ranked on *lifetime* points, which cannot be spent — otherwise
            buying something in the rewards store would drop you down the
            board, and the leaderboard would quietly punish members for using
            their points.
          */}
          <p className="mt-1 mb-5 text-xs leading-[1.6] text-mist-400">
            Ranked by lifetime points earned. Spending points in the rewards
            store never costs you a place.
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
                      "min-w-0 p-3.5 text-center sm:p-[18px]",
                      // The winner's card sits higher; the others drop, which
                      // is what makes it read as a podium rather than three
                      // cards.
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

          {/* Someone outside the top 25 would otherwise have no idea where
              they stand, which makes the whole page feel like it isn't about
              them. */}
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
        </section>
      )}
    </div>
  );
}
