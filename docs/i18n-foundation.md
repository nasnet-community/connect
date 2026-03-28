# i18n Foundation

This repository completed a staged migration away from the Angular Localize runtime and the Python translation maintenance script.

## Goals

- keep the current application runtime stable while the migration is in progress
- establish a single source of truth for locale metadata
- add TypeScript-based validation and reporting for translation coverage
- prepare the repository for Crowdin and pinned-issue coverage reporting

## What This Foundation Adds

- shared locale metadata in `src/i18n/config.ts`
- locale path helpers that do not assume two-character locale codes
- a TypeScript translation validator in `src/i18n/scripts/validate-translations.ts`
- a stable command for CI and future GitHub automation: `npm run i18n:validate`
- an initial semantic catalog source in `messages/*.json`
- an initial Paraglide bridge compiled to `src/paraglide`
- a Crowdin config file in `crowdin.yml`

## Current Status

- semantic message catalogs in `messages/*.json` are the active translation source
- the Angular Localize compatibility layer has been removed
- the legacy `src/locales/message.*.json` catalogs and Python translation script have been removed
- `npm run i18n:compile` and `npm run i18n:validate` are the supported localization commands

## Current Locale Source Of Truth

The authoritative locale metadata now lives in `src/i18n/config.ts`.

Add future locales there first, then wire runtime catalogs and UI support from that shared definition.

## Current Validation Command

```bash
npm run i18n:validate
```

Optional outputs:

```bash
npm run i18n:validate -- --markdown
npm run i18n:validate -- --json
```

The markdown output is intended to become the source for a pinned GitHub issue update in a later phase.

Compile the semantic catalogs with:

```bash
npm run i18n:compile
```

## Planned Migration Phases

1. Keep the current Angular Localize runtime in place while the foundation lands.
2. Introduce a TypeScript-native runtime with semantic keys.
3. Move feature areas incrementally off the legacy template-string runtime.
4. Integrate Crowdin as the translation workspace.
5. Add a GitHub Action that updates a pinned translation coverage issue from validator output and Crowdin status.
6. Remove the Python maintenance script and the Angular Localize compatibility layer once migration is complete. Completed.

Manual handoff details for the first Crowdin setup are tracked in `docs/crowdin-setup.md`.

## Crowdin Plan

Crowdin should be connected only after semantic catalogs are introduced.

Recommended workflow:

1. Git remains the source of truth for source messages.
2. Crowdin becomes the workspace for translators and reviewers.
3. GitHub receives translation updates through PRs or dedicated localization branches.
4. Coverage reporting is posted back to GitHub through automation.

## Pinned Issue Plan

The pinned issue should not be edited manually.

Instead, a later GitHub Action should:

1. fetch translation coverage data from the repository validator and Crowdin
2. render a markdown summary table
3. update one pinned issue, for example `Translation Coverage Dashboard`

That issue should answer three questions quickly:

- which locales are live
- which locales are incomplete
- whether any locale has missing or empty keys that block release
