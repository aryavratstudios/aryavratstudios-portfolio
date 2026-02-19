# AryavratHQ — TODO

> Last updated: 2026-02-19

---

## 🔴 CRITICAL (Ship-blockers)

- [ ] Server-side price validation in `completePayment()` — client can tamper price `high` — 2026-02-19
- [ ] Rate limiting on auth, payment, and coupon endpoints (Upstash or custom) `high` — 2026-02-19
- [ ] Audit `app/(dashboard)/admin/actions.ts` for regressions from last session `high` — 2026-02-19
- [ ] Fix remaining `bg-primary text-white` button readability issues `high` — 2026-02-19

## 🟠 HIGH (UX / Correctness)

- [ ] Designer assignment system — auto-assign on project creation, admin on/off toggle `high` — 2026-02-19
- [ ] Discord bot slash commands: `/project`, `/assign`, `/note`, `/payment`, `/list` `high` — 2026-02-19
- [ ] Deploy Discord bot (Railway or Fly.io) — currently only runs locally `high` — 2026-02-19
- [ ] Checkout security enhancements: payment token, IP logging, UPI shown post-confirm, audit trail `high` — 2026-02-19

## 🟡 MEDIUM (Features)

- [ ] New sidebar UI from `damn` spec — dark glassmorphism, proper nav links `medium` — 2026-02-19
- [ ] New admin dashboard UI — stat cards, charts, latest orders table (dark theme) `medium` — 2026-02-19
- [ ] Client ↔ Designer chat system (Supabase Realtime) — text, images, files, links, docs `medium` — 2026-02-19
- [ ] Voice/video calls in chat (WebRTC / Agora free tier) `medium` — 2026-02-19
- [ ] Admin monitoring panel for chat — can read all conversations `medium` — 2026-02-19
- [ ] CSP headers in `next.config.ts` `medium` — 2026-02-19
- [ ] Input sanitization / server-side validation library (zod) for all server actions `medium` — 2026-02-19

## 🔵 LOW (Tech Debt / Housekeeping)

- [ ] Move `damn` → `docs/SPEC.md` and parse into structured requirements `low` — 2026-02-19
- [ ] Reconcile `supabase/schema.sql` vs `supabase/migrations/` — pick canonical source `low` — 2026-02-19
- [ ] Initialize GSD state files: ROADMAP.md, STATE.md, DECISIONS.md `low` — 2026-02-19
- [ ] Write integration tests: payment flow, auth gate, admin role check `low` — 2026-02-19
