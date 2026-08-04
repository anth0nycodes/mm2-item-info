# Contributing to mm2-item-info

Thanks for your interest in contributing! This document covers how to set up the project, make changes, and submit them.

## Getting Started

This project uses [pnpm](https://pnpm.io) as its package manager.

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/mm2-item-info.git
   cd mm2-item-info
   ```

2. Add the original repository as an `upstream` remote so you can keep your fork in sync:

   ```bash
   git remote add upstream https://github.com/anth0nycodes/mm2-item-info.git
   ```

   To pull in the latest changes later:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Run the CLI locally in dev mode:

   ```bash
   pnpm dev -h
   ```

## Development

Useful scripts:

| Script       | Description                                  |
| ------------ | -------------------------------------------- |
| `pnpm dev`   | Run the CLI from source with `tsx`           |
| `pnpm build` | Compile TypeScript to `dist/`                |
| `pnpm start` | Run the compiled output                      |
| `pnpm check` | Type-check without emitting (`tsc --noEmit`) |

Before opening a PR, make sure the project type-checks:

```bash
pnpm check
```

## Making Changes

1. Create a branch off `main`:

   ```bash
   git checkout -b your-name/feature-name
   ```

2. Make your changes. Keep them focused — one logical change per PR.

3. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).

4. Push your branch and open a pull request against `main`. Fill out the PR template.

## Reporting Bugs

Open a [bug report](https://github.com/anth0nycodes/mm2-item-info/issues/new?template=bug_report.md) and include steps to reproduce, expected vs. actual behavior, and your environment details.

## Code of Conduct

Be respectful and constructive. Keep discussions on-topic and welcoming to newcomers.
