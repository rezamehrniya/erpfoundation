# ERP Foundation

**Open architectural primitives for building modular, tenant-safe ERP systems.**

ERP Foundation is a public, lightweight reference repository for safe ERP builder patterns. It provides architecture docs, specifications, examples, and TypeScript validation utilities for module manifests, permissions, and event payload safety.

> “ERP Foundation is not a complete ERP application. It is a public reference for ERP builder primitives: module manifests, tenant boundaries, permission namespaces, audit-safe events, and lifecycle-aware module design.”

This project is inspired by real-world ERP delivery architecture, but it does not contain any private production ERP implementation.

## What ERP Foundation is

- Public documentation for ERP builder architecture boundaries.
- Safe reference specs for module manifests and metadata usage.
- Example JSON manifests and safety-focused event/permission examples.
- Lightweight TypeScript toolkit for validation and guardrails.

## What ERP Foundation is not

- Not a complete ERP product.
- Not private ERP Core code.
- Not customer-specific logic, workflows, or compliance engines.
- Not production deployment tooling or secret management.

## Why ERP systems need safe foundations

ERP platforms often fail when core architecture boundaries are unclear. ERP Foundation focuses on explicit constraints that keep modular ERP systems maintainable and safer:

- Tenant isolation as a testable requirement.
- Namespaced permissions to prevent cross-module privilege bleed.
- Event payload hygiene to reduce accidental sensitive-data leakage.
- Lifecycle-aware module design to support extensibility without kernel drift.

## Core concepts

- Kernel stays business-neutral.
- Business workflows live in modules.
- Tenant isolation must be explicit.
- Permissions are module namespaced.
- Event payloads and audits must be safety-checked.
- Manifests describe modules but do not bypass runtime guards.
- Configuration should control behavior without schema chaos.
- Metadata should be safe projection only, never runtime internals exposure.

## Repository structure

- `docs/architecture`: architecture boundaries and principles
- `docs/specs`: manifest and safety specifications
- `docs/guides`: practical safe-module guidance
- `examples`: sample manifests, permission namespaces, and events
- `src`: TypeScript validation and safety utilities
- `tests`: Vitest coverage for core primitives

## Quick start

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm validate:examples
```

## Example manifest validation

```bash
pnpm validate:examples
```

This command validates manifests in `examples/manifests` against the v1 schema and safety rules.

## Project status

- Status: **early foundation (v0.x)**
- Scope: documentation + examples + lightweight validation toolkit
- Non-goal: full ERP implementation

## Contribution policy

Contributions are welcome for documentation clarity, spec improvements, and safe validation extensions. Please review `CONTRIBUTING.md` before opening a PR.

## Security policy summary

If you find a vulnerability or sensitive-data exposure risk, follow the process in `SECURITY.md` and avoid public disclosure until maintainers respond.
