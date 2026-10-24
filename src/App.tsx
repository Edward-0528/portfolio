import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { CorePlus } from './pages/CorePlus'
import { CosmicCuties } from './pages/CosmicCuties'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// App store policy and support pages, carried over unchanged from the previous site. Their URLs are
// registered with Apple, Google Play and AdMob, so they must keep working. Lazy-loaded so they
// don't add weight to the portfolio pages.
const CorePlusSupport = lazy(() => import('./legal/CorePlusSupport'))
const WordTracePolicy = lazy(() => import('./legal/WordTracePolicy'))
const WordTraceDeleteAccount = lazy(() => import('./legal/WordTraceDeleteAccount'))
const CrossMyWordsPolicy = lazy(() => import('./legal/CrossMyWordsPolicy'))
const CrossMyWordsSupport = lazy(() => import('./legal/CrossMyWordsSupport'))
const CrossMyWordsCopyright = lazy(() => import('./legal/CrossMyWordsCopyright'))
const CrossMyWordsDeleteAccount = lazy(() => import('./legal/CrossMyWordsDeleteAccount'))

export function App() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-muted">Loading…</p>}>
      <Routes>
        <Route path="/coreplus" element={<CorePlusSupport />} />
        <Route path="/wordtrace/policy" element={<WordTracePolicy />} />
        <Route path="/wordtrace/deleteme" element={<WordTraceDeleteAccount />} />
        <Route path="/crossmywords/policy" element={<CrossMyWordsPolicy />} />
        <Route path="/crossmywords/support" element={<CrossMyWordsSupport />} />
        <Route path="/crossmywords/copyright" element={<CrossMyWordsCopyright />} />
        <Route path="/cmw/policy" element={<CrossMyWordsPolicy />} />
        <Route path="/cmw/delete-account" element={<CrossMyWordsDeleteAccount />} />
        <Route path="/cmw/support" element={<CrossMyWordsSupport />} />
        <Route path="/cmw/copyright" element={<CrossMyWordsCopyright />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </Suspense>
  )
}

function Portfolio() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/core-plus" element={<CorePlus />} />
        <Route path="/work/cosmic-cuties" element={<CosmicCuties />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
