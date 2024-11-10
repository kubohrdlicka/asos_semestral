# Bakalarska praca Radovan Sliz Frontend

Package manager
```bash
pnpm
```

## Run in development
```bash
pnpm run dev
```

# Version guidelines
- Always describe new features in CHANGELOG.md under the correct version

# Guidelines
- always use `pnpm` instead of `npm`
- always use `prettier` + `eslint` !
- unused code is always removed, not commented out
- should use absolute imports via aliases
- always use `i18n` for copywriting
- should not use global imports (e.g. in `main.ts`)

- imported icons are always renamed via alias so the name describes the icon's function
- should use TailwindCSS for styles


## Naming conventions
- always use CamelCase for components, lowercase is reserved for standard HTML elements
- should use at least two words for component names
- all view components should comply to `*View.vue`
- all layout components should comply to `*Layout.vue`
- always use CaleCase for variable names
