# Architecture Decision Records (ADRs)

Real engineering teams (Microsoft, Google, ThoughtWorks-style) likhte hain **chhote docs har
non-trivial decision ke liye** — taaki 6 mahine baad koi (khud aap bhi) samjh sake "yeh aisa kyun
banaya, X kyun nahi use kiya".

## Kab likhna hai

- Jab do ya zyada reasonable approach ho aur aapne ek choose kiya (e.g. "apna validator kyun
  likha, Zod ka pattern follow kiya ki nahi")
- Jab kisi TS feature ko **jaan-boojh kar avoid** kiya (e.g. "Namespaces samjhe, par use nahi kiya — kyun")
- Jab koi trade-off accept kiya (e.g. "runtime validation vs compile-time-only type safety")

## Kab NAHI likhna

- Chhoti implementation details (variable naming, file structure) — yeh sirf code review level
  cheez hai, ADR nahi

## Format

Naya ADR: `docs/adr/NNNN-short-title.md`, [template](0000-template.md) copy karke.

## Index

| # | Title | Phase |
|---|-------|-------|
| — | _abhi koi nahi — Phase 1 se shuru hoga_ | — |
