# Deploying Maby Academy to Vercel

A step-by-step checklist for `mabyacademy.site`.

> **Secrets are never written into this file.** `SESSION_SECRET` and your
> database URLs are set in the Vercel dashboard only. If a secret ever lands
> in the repository, rotate it — anyone who can read the repo can read it.

---

## You can deploy before any of this

If you just want the site live now, **click Deploy with no environment
variables set**. The build succeeds and every route serves a "setup required"
page explaining what to add. Nothing crashes, and your domain resolves.

The academy itself — courses, logins, certificates — needs a database, so
setup mode is a staging post rather than a destination. When you add
`DATABASE_URL` and redeploy, the setup page disappears on its own and the real
site takes over.

The steps below are that second part.

---

## Fastest path — provision Neon from inside Vercel

You do not need a separate Neon account or to copy any connection string.

1. Open your project in Vercel → **Storage** tab
2. **Create Database → Neon (Serverless Postgres)**
3. Choose a region near your students (Frankfurt for West/East Africa)
4. Connect it to the project

Vercel injects the connection variables automatically. This app accepts every
name Vercel uses — `DATABASE_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, and
the unpooled `DATABASE_URL_UNPOOLED` / `POSTGRES_URL_NON_POOLING` — so there
is nothing to copy across.

Then add **one** variable by hand:

| Name | Value |
| --- | --- |
| `SESSION_SECRET` | 32+ random characters (`openssl rand -base64 48`) |

It cannot be auto-generated: it signs login sessions, so it must stay
identical across every deploy and every serverless instance. A value that
changed per deploy would sign people out at random.

`NEXT_PUBLIC_APP_URL` is optional — it defaults to your Vercel domain. Set it
to your real domain before issuing any certificates, since verification links
are printed permanently.

Redeploy, and the academy comes online.

The longer, manual route follows for anyone not on Vercel.

---

## Step 1 — Create the database (Neon)

Vercel functions are serverless: each running instance opens its own database
connection, so a plain Postgres box runs out of connections quickly. You need
a provider with a built-in pooler. Neon is the easiest because it plugs
straight into Vercel.

1. Go to **https://neon.tech** and sign up.
2. Create a project — name it `maby-academy`.
3. Pick a region **close to your students**. If most are in Nigeria/Ghana/Kenya,
   choose **Europe (Frankfurt)** — it is the lowest-latency Neon region for
   West and East Africa. Remember which one you picked; you will match it in
   Vercel later.
4. Open the project dashboard → **Connection Details**.

Neon shows you two connection strings. You need both:

| Neon label | Goes into |
| --- | --- |
| **Pooled connection** (host contains `-pooler`) | `DATABASE_URL` |
| **Direct connection** (no `-pooler`) | `DIRECT_DATABASE_URL` |

Both look like:

```
postgresql://USER:PASSWORD@ep-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
postgresql://USER:PASSWORD@ep-xxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

Keep `?sslmode=require` on the end of both.

> Getting these two the wrong way round is the single most common mistake.
> The app URL has `-pooler` in it. The migration URL does not.

---

## Step 2 — Import the project into Vercel

1. Go to **https://vercel.com** and sign in with the GitHub account that owns
   `mabyconnect-commits/Maby-Academy`.
2. **Add New → Project** → import the repository.
3. Under **Branch**, select the branch you want to deploy.
4. Framework preset is auto-detected as **Next.js**. Leave the build settings
   alone — the repo defines a `vercel-build` script that runs database
   migrations before building, and Vercel picks it up automatically.
5. **Do not deploy yet.** Add the environment variables first (next step),
   otherwise the build fails on purpose.

---

## Step 3 — Environment variables

In the import screen (or later under **Settings → Environment Variables**),
add these. Tick **Production**, **Preview** and **Development** for each
unless noted.

| Name | Required | Value |
| --- | --- | --- |
| `DATABASE_URL` | **yes** | Neon **pooled** string (the one with `-pooler`) |
| `SESSION_SECRET` | **yes** | The 64-character random string generated for you — never commit it |
| `NEXT_PUBLIC_APP_URL` | **yes** | `https://mabyacademy.site` |
| `DIRECT_DATABASE_URL` | recommended | Neon **direct** string (no `-pooler`). If omitted, migrations reuse `DATABASE_URL`. |
| `REFERRAL_COMMISSION_RATES` | no | `0.10,0.05,0.02` (this is the default) |

`SESSION_TTL_DAYS` is optional and defaults to 30.

**These must exist before the first build**, not just at runtime — the app
validates its configuration when it loads.

The one exception is `DATABASE_URL`. Leave it out entirely and the build
still succeeds, deploying in setup mode. Provide it, and validation turns
strict: a deploy that has a database but no `SESSION_SECRET` fails the build
with

```
Invalid environment configuration:
  - SESSION_SECRET: Required
```

rather than shipping a site whose logins break on first use.

---

## Step 4 — Deploy

Click **Deploy**. The build will:

1. `prisma generate` — build the database client
2. `prisma migrate deploy` — create every table in your Neon database
3. `next build` — build the app

First deploy takes roughly 2–4 minutes. When it finishes you get a URL like
`maby-academy-xxxx.vercel.app`. Open it — the homepage should load with zero
courses and zero members, because the database is empty. That is correct.

---

## Step 5 — Connect mabyacademy.site

1. In Vercel: **Settings → Domains → Add**.
2. Enter `mabyacademy.site`. Add `www.mabyacademy.site` too — Vercel will
   offer to redirect it to the apex domain. Accept.
3. Vercel shows you the DNS records to create. Go to wherever you bought the
   domain and add them:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Vercel displays the exact values on screen — **use those if they differ from
the table above**, as they occasionally change.

4. DNS propagation takes anywhere from a few minutes to a couple of hours.
   Vercel issues the HTTPS certificate automatically once it resolves.

Confirm `NEXT_PUBLIC_APP_URL` is `https://mabyacademy.site` before you enrol
real students — that value is printed onto every certificate's verification
link, and certificates issued beforehand keep the old URL permanently.

---

## Step 6 — Match the function region to the database

**Settings → Functions → Function Region.**

Set it to the same region you chose for Neon (Frankfurt → `fra1`). A function
in Washington querying a database in Frankfurt adds a transatlantic round trip
to every single query — this one setting is worth more than any code
optimisation.

---

## Step 7 — Create your admin account

The demo seed deliberately refuses to run against production, because it
creates accounts whose password is published in this repository.

So:

1. Go to **https://mabyacademy.site/register** and sign up normally with
   `Mabyconnect@gmail.com` and a strong password. This makes you a `STUDENT`.

2. Promote yourself. From your own machine, in the project folder:

```bash
DATABASE_URL="<your Neon pooled string>" \
  npm run set-role -- Mabyconnect@gmail.com ADMIN
```

You should see:

```
✓ Mabi <mabyconnect@gmail.com>: STUDENT → ADMIN
```

3. Refresh the site. **Instructor tools** now appears in your dashboard
   sidebar, and `/admin` is open to you.

Promote instructors the same way:

```bash
DATABASE_URL="<your Neon pooled string>" \
  npm run set-role -- instructor@example.com INSTRUCTOR
```

---

## Post-launch checklist

- [ ] Homepage loads on `https://mabyacademy.site`
- [ ] Registration works and lands you on the dashboard
- [ ] You have promoted yourself to `ADMIN` and `/admin` opens
- [ ] `www.mabyacademy.site` redirects to the apex domain
- [ ] Function region matches the database region
- [ ] `NEXT_PUBLIC_APP_URL` has no trailing slash and uses `https://`

---

## Things to know before real students arrive

**Password resets generate a token but nothing emails it.** A student who
forgets their password currently cannot recover it on their own. Until email
is wired up, reset it for them manually or keep the academy invite-only.

**Paid courses do not take payment yet.** Enrolment creates a `PAID` order
through a `manual` provider and correctly pays out referral commissions, but
no money is collected. Keep courses free (`priceMinor: 0`) until a real
checkout is connected, or you will hand out paid content and accrue
commission liabilities against revenue you never received.

**Preview deployments run migrations too.** Every branch deploy runs
`prisma migrate deploy` against whatever `DATABASE_URL` that environment has.
If you set the same production database for Preview, a branch with a
destructive migration will change production data. Either give previews their
own Neon branch, or scope `DATABASE_URL` to Production only.

---

## If a deploy fails

| Message | Cause | Fix |
| --- | --- | --- |
| `Invalid environment configuration: SESSION_SECRET: Required` | Variable missing at build time | Add it in Settings → Environment Variables, redeploy |
| `Can't reach database server` | Wrong or unreachable connection string | Re-copy from Neon; keep `?sslmode=require` |
| Every page shows "Maby Academy is deployed / it just needs a database" | Setup mode — no `DATABASE_URL` | Add it and redeploy; the page disappears automatically |
| `P1012: Environment variable not found: DIRECT_DATABASE_URL` | An older build ran `prisma migrate deploy` directly | Fixed — the build now falls back to `DATABASE_URL`. Redeploy the latest commit. |
| `prisma migrate deploy` hangs or errors on advisory lock | Migrations are running through the pooled URL | Set `DIRECT_DATABASE_URL` to the direct (non-`-pooler`) string |
| `too many connections` under load | `DATABASE_URL` is the direct URL | Swap it to the pooled (`-pooler`) string |
| Build succeeds, every page 500s | Usually a bad `DATABASE_URL` | Check Vercel → Deployments → Runtime Logs |

Runtime logs live under **Deployments → [your deployment] → Runtime Logs**.
That is the first place to look for anything that breaks after a successful
build.
