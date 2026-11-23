# Codex handoff

## Builder catalog across modes — 2026-10-14
- Last updated: 2026-10-14 Asia/Kolkata.
- Task: current chat; objective: show latest published Figma plugins and GitHub projects with live websites in every builder mode and legacy builder route.
- Status: IN_PROGRESS.
- Completed: clean initial worktree; read root AGENTS.md and Next.js bundled use-client guide. No prior ledger exists. Figma profile browser confirms Graph SVGs (1674313156467630799), Universal Image Converter (1674316937351331540), Texometric, Carousel Export. Public GitHub repo API saved to /tmp/heyaharshu-repos.json; multiple homepage-bearing projects absent from curated list.
- Changes: this ledger only.
- Verification: source audit shows separate stale plugin arrays; Modern missing RecentProjects; Init detail missing RecentProjects.
- Blockers: web search cannot open Figma; native browser successfully reads profile. gh absent; public GitHub REST works via curl.
- Next action: centralize plugin data, reuse across modes, expand live project catalog; run TypeScript/lint/build and browser checks.
- Implementation milestone: shared src/data/figma-plugins.ts now includes all four published plugins; shared FigmaPlugins cards on Init/Classic; Modern imports shared plugin list. RecentProjects supports Modern and is rendered in Modern builder, Init builder detail, Classic builder homepage, and legacy /builder. Public original repos with advertised homepages added to src/data/projects.ts (portfolio itself and forks excluded). New neutral SVG category icons in public/plugins/ are locally authored placeholders, not official plugin branding.
- Next action: verify live URLs and run build, TypeScript, lint, browser route checks.
- Verification milestone: first build compiled but caught builderDemos union inference on optional internal; corrected both legacy arrays with explicit optional-property type. Build retry pending.
- URL verification: public repo homepages checked with Python urllib concurrent requests; 16 return HTTP 200; vt-web returns 404 and was removed. All remaining linked live websites reachable at verification time.
- Global lint: fails on two pre-existing no-require-imports errors in refactor.js, plus four pre-existing img warnings. No unrelated lint fixes planned; focused changed-file lint pending.
- Build retry passed compilation, TypeScript and all page generation. Focused ESLint passed. Browser Modern confirms four plugins plus catalog rendered; this first preview uses earlier build containing vt-web. Removed broken vt-web and normalized display titles afterward; final rebuild required before completion.
- Final verification: npm run build passed after removal of vt-web and title normalization; focused npx eslint across all changed TS/TSX files passed. Production server restarted on port 3100 (exec session 48880).
- Browser final build: /portfolio/builder?view=modern, classic, init each show all four exact published plugin URLs and 16 Visit website links; no vt-web link and no horizontal overflow at desktop viewport. /builder?view=classic and hydrated /?view=classic and /?view=init confirm both new plugins. Modern screenshot visually inspected after entrance animation. Homepage mode content requires hydration before assertions.
- Files changed: src/data/projects.ts; src/data/figma-plugins.ts; src/components/FigmaPlugins.tsx; src/components/RecentProjects.tsx; src/components/BuilderPortfolio.tsx; src/components/ModePortfolioDetail.tsx; src/components/OldVersion.tsx; src/components/InitVersion.tsx; src/app/builder/page.tsx; public/plugins/graph-svgs.svg; public/plugins/universal-image-converter.svg; CODEX_HANDOFF.md.
- Status: COMPLETE (local implementation and proportionate verification). No commit, push, or deployment performed. Catalog uses shared curated static data; future publications require a catalog update.
- Exact next action: review http://localhost:3100/portfolio/builder?view=modern (also classic/init query); commit/push/deploy if requested. Global lint remains blocked only by existing refactor.js errors; mobile visual review not performed.

## Exact Figma plugin logos — 2026-10-15
- Last updated: 2026-10-15 Asia/Kolkata; task: current chat follow-up.
- Objective: replace generated placeholder icons with exact published logos and show logos in each mode.
- Status: IN_PROGRESS.
- Completed: read handoff and current shared catalog; Figma profile DOM exposes official resource icon URLs for all four plugins.
- Files planned: public/plugins assets, shared plugin catalog, FigmaPlugins cards.
- Evidence: https://www.figma.com/@heyaharshu resource icon IDs: Graph 6be9a03c-e78b-4bab-8ffe-d3f6c4d069ac; Converter 08c57fef-7f74-4ddb-a02e-3f01dfcc5357; Texometric a0fadbad-f87b-4dec-a03e-7930f4fdc557; Carousel 0cf73e34-9725-413b-b4e6-2fafea312fdd.
- Blockers: none. Next: download original icon assets, wire shared logos, build and verify.
- Scope correction from user: only project cards with live links. Removed Advance Dev Tools (empty liveUrl), leaving 16 verified live projects.
- Assets milestone: direct curl returned 403; browser pageAssets bundled all four official Figma resource PNGs with zero failures under /var/folders/0v/drnryz5570s6k8c2hfjf8y0w0000gn/T/browser-use/assets/ee8e28c6-e90b-4bbb-b4f7-2b3d90e264eb. Copied unchanged to public/plugins/{graph-svgs,universal-image-converter,texometric,carousel-export}.png. Shared catalog references originals; removed the two owned placeholder SVGs. Shared Init/Classic Figma cards now render logos.
- Next action: build/lint and restart preview, verify exact logos and live-only project cards.
- Final verification: npm run build and focused ESLint passed. All four published PNGs are 128x128 RGBA originals. Browser refreshed Init homepage confirms 16 website project cards and zero cards missing Visit website. Refreshed Modern confirms 16 cards, zero non-live cards, and all four original logo images loaded successfully; screenshot visually inspected. Production preview restarted on port 3100, session 52134.
- Status: COMPLETE. No commit/push/deployment. Exact next action: review refreshed localhost preview; future web project additions must have verified liveUrl. Existing global lint failures remain outside this task.

## Init restrained project list — 2026-10-15
- Updated: 2026-10-15 Asia/Kolkata; current chat follow-up.
- Status: IN_PROGRESS.
- Objective: only three top Init project entries, remove card presentation throughout Init; preserve full catalog in builder detail as rows and official plugin logos.
- Completed: read applicable instructions and ledger; examined existing Init top list and shared components.
- Ambiguity: user asks three entries but names two previous entries plus Tipsy Docy and UnCanva; async selection question pending. No top selection changed yet.
- Files planned: RecentProjects.tsx, FigmaPlugins.tsx, InitVersion.tsx, globals.css.
- Verification: prior build valid; no new checks yet. Next: convert shared Init presentation to rows while awaiting selection.
- Milestone: shared Init project and Figma components now use simple ruled rows, no recentProject card markup, keeping exact published plugin logos. Other mode styling unchanged. Awaiting top list selection; next run focused lint/build after selection.
- Decision: user selected two previous entries plus one combined Tipsy Docy / UnCanva entry. Current previous list has four entries; follow-up question asks which two to retain. Build of shared row changes passed. Top homepage replacement awaits exact names.
- Top-list decision: user confirms combined Tipsy Docy / UnCanva row. No response to follow-up after reasonable wait; stated assumption retains Opener and Hanumankind. Homepage now has exactly three entries, no full catalog or plugin cards; combined row has separate working website links. Full catalog remains on builder detail using ruled rows.
- Changed files: src/components/InitVersion.tsx, src/components/RecentProjects.tsx, src/components/FigmaPlugins.tsx, src/app/globals.css, CODEX_HANDOFF.md. Next: final build/lint and refreshed homepage verification.
- Final verification: production build (including TypeScript) and focused ESLint pass. Refreshed Init homepage browser confirms exactly three rows: Opener, Hanumankind, combined Tipsy Docy / UnCanva, four expected destinations, zero recentProject cards and no horizontal overflow at desktop viewport. Init builder detail previously verified 16 website rows, four plugin rows, zero cards, no overflow.
- Status: COMPLETE with explicitly stated retained-entry assumption (Opener + Hanumankind); user may revise these two names. Preview server port 3100 session 26121. No commit/push/deployment. Exact next action: review http://localhost:3100/?view=init#launches; adjust retained entries if user specifies alternatives.
- 2026-10-15 follow-up: explicit user reply retains Texometric + Carousel Export. Status IN_PROGRESS; replace prior assumed Opener + Hanumankind top rows, verify build and refresh preview. Combined Tipsy Docy / UnCanva row remains.
- Milestone: InitVersion.tsx now uses explicitly selected Texometric and Carousel Export rows with their published Figma links and existing hover previews. Next: focused lint/build.
- Final follow-up verification: focused ESLint and production build/TypeScript passed. Refreshed user Init homepage confirms exactly Texometric, Carousel Export, combined Tipsy Docy / UnCanva; zero cards and all four expected published links. Preview restarted at localhost:3100, session 21539.
- Status: COMPLETE; explicit selected entries supersede earlier retained-entry assumption. No commit/push/deployment. Next action: review http://localhost:3100/?view=init#launches.
