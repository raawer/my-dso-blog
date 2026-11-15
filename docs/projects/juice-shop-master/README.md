# Juice Shop Master

A DevSecOps training project documenting three challenges from the
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), a deliberately
vulnerable web application used for security education. One challenge was chosen
per difficulty tier (3★, 4★, 5★), each covering a **different class of
vulnerability**. Every challenge was solved hands-on in a local lab and is
documented end to end — reconnaissance, exploitation, impact and mitigation —
with a short video walkthrough.

:::warning Educational purpose only
This project was produced for training during a DevSecOps course. All attacks
were performed against a local OWASP Juice Shop instance in a personal VM. Never
apply these techniques to systems you are not authorized to test.
:::

## Table of Contents

- [The Challenges](#the-challenges)
- [Quickstart](#quickstart)
- [How the Three Connect](#how-the-three-connect)
- [Key Takeaways](#key-takeaways)

## The Challenges

| # | Challenge | Difficulty | Category | Technique | Write-up | Video |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Database Schema | ⭐⭐⭐ | Injection | `UNION`-based SQL injection | [Read](./database-schema/README.md) | [Loom](https://www.loom.com/share/ee6c1a8be99848899a60bd4649dcef9f) |
| 2 | Forgotten Developer Backup | ⭐⭐⭐⭐ | Sensitive Data Exposure | Poison Null Byte | [Read](./forgotten-developer-backup/README.md) | [Loom](https://www.loom.com/share/089f169cccdb4e02bf902a2971c3dadb) |
| 3 | Unsigned JWT | ⭐⭐⭐⭐⭐ | Vulnerable Components | `alg: none` signature bypass | [Read](./unsigned-jwt/README.md) | [Loom](https://www.loom.com/share/2058821e9ba64a589d93c6e4408e2749) |

## Quickstart

The target runs locally, never against a third-party system. To reproduce the
lab, run the Juice Shop container and bind it to localhost only:

```bash
docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop
```

Then open the app at `http://127.0.0.1:3000` and the challenge tracker at
`http://127.0.0.1:3000/#/score-board`. In this project the container runs inside a
**Kali Linux VM** and is started automatically on boot as a **systemd service**, so
the lab survives reboots. The step-by-step working checklist lives at the
repository root (`JUICE_SHOP_CHECKLIST.md`).

## How the Three Connect

Picked for variety, the challenges also tell one story about how small weaknesses
chain into bigger ones:

- **Injection** (Challenge 1) leaks the database schema — the first step toward
  reading sensitive tables.
- **Sensitive Data Exposure** (Challenge 2) retrieves a forgotten `package.json`
  backup, which reveals the application's exact dependencies and versions.
- **Vulnerable Components** (Challenge 3) forges an unsigned JWT. The outdated JWT
  library that accepts `alg: none` — exactly the kind of detail the leaked
  `package.json` discloses — is the vulnerable component the category is named
  for.

Information disclosure feeds the next weakness: the output of one becomes the
input to the next.

## Key Takeaways

- **Never mix command and data.** Parameterized queries stop SQL injection at the
  root (Challenge 1).
- **Nothing sensitive belongs in a web-served directory**, and extension checks
  must validate the resolved path, not a string suffix (Challenge 2).
- **Never trust a token to describe how it should be verified.** Pin the accepted
  algorithm server-side and reject `alg: none` (Challenge 3).
