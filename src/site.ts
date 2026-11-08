// Facts used across pages. Numbers come from the project repos (git history,
// test runs, docs) as of October 2026 and the App Store listing as of November 2026;
// update them here, not inline.

export const PERSON = {
  name: 'Edward Granados',
  role: 'Software Engineer',
  location: 'Irvine, CA',
  email: 'alexanders.edward@gmail.com',
  github: 'https://github.com/Edward-0528',
  linkedin: 'https://www.linkedin.com/in/edward-granados-459342195/',
  resume: '/Edward-Granados-Resume.pdf',
}

export const CORE_PLUS = {
  appStore: 'https://apps.apple.com/app/id6752533436',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.anonymous.coreplus',
  web: 'https://coreplusct.com',
  commits: '730+',
  tests: '525',
  releases: '80+',
  /** App Store average and rating count. */
  rating: '5.0',
  ratings: '12',
}

export const COSMIC = {
  commits: '79',
  tests: '840+',
  levels: '500',
  /** Public TestFlight link. Leave empty until there is one; the site then offers an invite by email. */
  testflight: '',
}

export const CROSS_MY_WORDS = {
  appStore: 'https://apps.apple.com/us/app/cross-my-words/id6766165878',
  /** Shown until the Android build is out; then add the Play link here and drop this. */
  androidLaunch: 'December 2026',
}

/** Automated tests across Core+ (525) and Cosmic Cuties (840+). */
export const TOTAL_TESTS = '1,365+'

/** App Store reviews of Core+, summarized (titles are the reviewers' own). */
export const REVIEWS = [
  {
    title: 'Really cool smooth interface',
    gist: 'Easy, organised, and tracks calories and workouts in one place. Even casts workouts to the TV.',
    who: 'Eddieag79',
  },
  {
    title: 'Awesome App',
    gist: 'A beginner says the workout guides and calorie counter kept them on track.',
    who: 'Mary 00527',
  },
  {
    title: 'Maxx P',
    gist: 'Photographing meals makes daily macro and calorie tracking easy.',
    who: 'MaxxPitschke',
  },
  { title: 'Me encanta', gist: 'A short review in Spanish calling the app beautiful.', who: 'Kitty♥️Bonser' },
]

export const STACK = [
  { title: 'Mobile', items: ['React Native', 'Expo', 'Flutter', 'Flame', 'Dart', 'Swift', 'Kotlin'] },
  { title: 'Web', items: ['React', 'TypeScript', 'Tailwind', 'Vite'] },
  { title: 'Backend + data', items: ['Supabase', 'PostgreSQL', 'Firebase', 'Firestore', 'Node'] },
  { title: 'Ship it', items: ['Claude Code', 'Gemini', 'HealthKit', 'App Store Connect', 'Play Console', 'Netlify'] },
]
