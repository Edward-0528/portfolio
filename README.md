# edwardgranados.app

My portfolio: case studies for **Core+** (React Native, live on iOS and Android) and **Cosmic Cuties** (Flutter), plus how I use AI tools to ship.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and React Router. Deployed on Netlify.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and production build into dist/
npm run lint
```

## Structure

- `src/pages/`: Home, Core+ and Cosmic Cuties case studies
- `src/components/`: layout, phone frame, the problem → approach → result story block
- `src/site.ts`: contact links and the project numbers shown on the site, kept in one place
- `src/legal/`: privacy, support and account-deletion pages for my apps (Core+, Cross My Words, WordTrace). Their URLs are registered with Apple, Google Play and AdMob, so these routes must keep working.
- `public/app-ads.txt`: AdMob authorized sellers file; must stay at the site root.
