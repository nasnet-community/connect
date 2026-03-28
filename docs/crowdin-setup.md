# Crowdin Setup Handoff

You do not need to create the Crowdin project until the semantic message catalogs in `messages/*.json` are the translation source you want to keep long term.

## Current Status

The repository is ready for local semantic-message development and validation.

Before creating the Crowdin project, the recommended checkpoint is:

1. semantic messages are being used in shared layout and at least one more real feature slice
2. `npm run i18n:compile` passes
3. `npm run build.types` passes
4. `npm run i18n:validate -- --markdown` passes

## What You Will Need To Do Manually

Once you decide to switch translator workflow to Crowdin, the manual actions are:

1. Create a Crowdin project.
2. Connect the GitHub repository.
3. Configure the project to use `crowdin.yml` from the repository root.
4. Import existing translations once from the repository.
5. Set the repository variable `TRANSLATION_COVERAGE_ISSUE_NUMBER` in GitHub Actions so the pinned-issue workflow knows which issue to update.
6. Pin that issue in GitHub after the first workflow run.

## Recommended Crowdin Settings

- Treat Git as the source of truth for source messages.
- Treat Crowdin as the translator and reviewer workspace.
- Sync only `messages/*.json` for the new semantic workflow.
- Sync only `messages/*.json`; the old `src/locales` workflow has been removed from the repository.
- Use PR or service-branch based sync rather than direct pushes to the default branch.

## Suggested GitHub Issue Title

`Translation Coverage Dashboard`

## After Crowdin Is Connected

The next repository change should be extending `.github/workflows/translation-coverage.yml` to pull Crowdin API status and merge it into the issue body alongside local validator output.
