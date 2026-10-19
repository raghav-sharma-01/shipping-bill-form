# Shipping Bill Form — Refactoring

A focused refactor of the Shipping Bill creation workflow. The goal is to keep the existing domain workflow while making persistence replaceable, responsibilities clearer, and the application easier to validate.

## Getting started

### Requirements
- Node.js compatible with the versions specified by the project tooling
- pnpm
- Access to the `fe-zen-arch` Git submodule

### Install and run

For a fresh clone, include submodules:

```bash
git clone --recurse-submodules <your-private-repository-url>
cd assignment-01
pnpm install
pnpm dev
```

If you already cloned without submodules:

```bash
git submodule update --init --recursive
pnpm install
pnpm dev
```

The starter's `fe-zen-arch` submodule supplies the `core`, `ui`, and `icons` imports. The app cannot build correctly when that directory is empty. Configure `PUBLIC_API_URL` in `.env` only if you have a reachable backend; local mock persistence does not require a backend.

## Architecture notes

- `src/shipping-bills/shipping-bill-form.tsx` owns the form composition and user interaction.
- `src/shipping-bills/model.ts` contains the domain types, empty form factories, and derived calculations.
- `src/shipping-bills/demo-store.ts` manages local demo state and local bill records.
- `src/shipping-bills/party-mock-service.ts` exposes asynchronous Promise-based search/lookup methods for exporters, branches, consignees, and ports.
- `src/shipping-bills/shipping-bill-mock-service.ts` exposes an asynchronous submit boundary for local-only environments. It simulates network latency and delegates persistence to the demo store.
- `src/shipping-bills/shipping-bill-service.ts` contains the HTTP payload mapping and optional backend integration.

### Submission flow

1. The form validates values using the existing form schema.
2. The form submits through `shippingBillMockService`, which returns a Promise and saves the record to local demo state.
3. The optional HTTP sync is attempted separately. If no backend is available, the local save remains successful.
4. The user receives a success toast and is navigated to the saved bill.

This is a frontend assignment, not a production customs platform. The mock service is intentionally small and uses no new dependencies. A production HTTP adapter should define explicit request/response types and a deliberate retry/error policy rather than silently treating every backend error as success.

## Validation checklist

Before submitting, verify these scenarios in the environment where the submodule is available:

- [ ] Application starts and the Shipping Bill form renders.
- [ ] Required fields show validation feedback.
- [ ] Exporter, branch, consignee, and port lookups return results.
- [ ] Search with no matches shows an empty state.
- [ ] Save creates a local bill and displays success feedback.
- [ ] Editing an existing bill updates its record.
- [ ] The form remains usable when the optional API endpoint is unavailable.
- [ ] No new runtime or development dependencies were added.

## AI Usage & Approach

Update this section to reflect the tools and checks you actually used before submission.

- **Tools used:** ChatGPT for assistance reviewing the assignment requirements, proposing a service boundary, and drafting documentation.
- **How AI was used:** To identify the required separation between UI and asynchronous data access and to help structure implementation notes.
- **Engineering judgment:** The refactor is deliberately incremental. The existing form and domain model are retained; the local submission path is placed behind a Promise-based service rather than introducing a large rewrite or new dependency.
- **Validation:** Run the app, exercise the checklist above, inspect the diff, and fix any issues before submitting. Do not claim a check passed unless you ran it.
- **Learnings:** Be prepared to explain why the mock service returns a Promise, why persistence is kept outside the UI component, and how the mock adapter could be replaced by an HTTP implementation.
