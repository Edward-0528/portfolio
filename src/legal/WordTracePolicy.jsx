import React from 'react';

const WordTracePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* Simple puzzle-piece icon mark */}
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl select-none">
              🔤
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">WordTrace!</h1>
              <p className="text-slate-500 text-sm">Privacy Policy</p>
            </div>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-lg px-4 py-3 text-sm text-slate-700 space-y-1">
            <p><strong>App Name:</strong> WordTrace!</p>
            <p><strong>Developer / Publisher:</strong> Edward</p>
            <p><strong>Contact:</strong>{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>
            </p>
            <p><strong>Effective Date:</strong> April 30, 2026</p>
            <p><strong>Platforms:</strong> Apple App Store &amp; Google Play Store</p>
          </div>
        </div>

        {/* Policy body */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10 text-slate-700 leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p>
              WordTrace! is a free word puzzle game where you trace letters on a grid to find hidden words.
              The app is published by <strong>Edward</strong> and is available on the Apple App Store and
              the Google Play Store.
            </p>
            <p className="mt-3">
              This Privacy Policy explains what information we collect, why we collect it, and how we use it.
              We've written it in plain English so it's easy to understand. If you have questions, reach out
              to us any time at{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline">
                coreplushelp@gmail.com
              </a>.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>

            <h3 className="font-semibold text-slate-800 mb-2">Signed-in users (Google / Apple Sign-In)</h3>
            <p>
              If you choose to create an account using Google Sign-In or Apple Sign-In (powered by
              Firebase Authentication), we receive:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600">
              <li>Your <strong>email address</strong></li>
              <li>Your <strong>display name</strong> (as provided by Google or Apple)</li>
            </ul>
            <p className="mt-3">
              Your game progress, high scores, and completed puzzles are saved to{' '}
              <strong>Firebase Firestore</strong> and tied to your account so you can pick up where you
              left off across devices.
            </p>

            <h3 className="font-semibold text-slate-800 mt-5 mb-2">Guest users</h3>
            <p>
              You can play WordTrace! as a guest without signing in. <strong>We do not collect any
              personal information from guest users.</strong> Progress is stored locally on your device
              and is not synced to our servers.
            </p>

            <h3 className="font-semibold text-slate-800 mt-5 mb-2">Advertising (Google AdMob)</h3>
            <p>
              The free version of WordTrace! shows ads served by <strong>Google AdMob</strong>. AdMob may
              collect your device's <strong>Advertising ID</strong> (IDFA on iOS, GAID on Android) to
              serve relevant ads and measure ad performance. This data is collected and processed by
              Google, not directly by us.
            </p>
            <p className="mt-2">
              On iOS, we display Apple's App Tracking Transparency (ATT) prompt before any advertising
              tracking begins. You can decline, and the app will still work — you'll just see
              non-personalized ads.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
              <li>
                <strong>Account sync</strong> — to save your progress, streaks, and completed puzzles
                across your devices.
              </li>
              <li>
                <strong>Daily puzzle</strong> — to track whether you've completed today's puzzle and
                maintain your streak.
              </li>
              <li>
                <strong>Ad personalization</strong> — your Advertising ID may be used by AdMob to show
                ads that are relevant to you (only with your permission on iOS).
              </li>
              <li>
                <strong>Gameplay analytics</strong> — aggregated, anonymous data helps us understand
                which puzzles are too hard or too easy so we can improve the game.
              </li>
              <li>
                <strong>Customer support</strong> — if you email us, we use your email to respond to
                your request.
              </li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> sell your personal information to anyone, ever.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Third-Party Services */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Third-Party Services</h2>
            <p className="mb-4">
              WordTrace! uses the following third-party services. Each has its own privacy policy that
              governs how they handle your data:
            </p>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900">Firebase (by Google)</p>
                <p className="text-sm text-slate-600 mt-1">
                  Used for user authentication (sign-in) and cloud data storage (Firestore).
                </p>
                <a
                  href="https://firebase.google.com/support/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline text-sm mt-1 inline-block"
                >
                  firebase.google.com/support/privacy →
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900">Google AdMob</p>
                <p className="text-sm text-slate-600 mt-1">
                  Used to serve banner and rewarded ads. May collect Advertising IDs and usage data
                  for ad targeting.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline text-sm mt-1 inline-block"
                >
                  policies.google.com/privacy →
                </a>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="font-semibold text-slate-900">RevenueCat</p>
                <p className="text-sm text-slate-600 mt-1">
                  Used to manage in-app purchases (e.g., removing ads). RevenueCat processes purchase
                  receipts on our behalf.
                </p>
                <a
                  href="https://www.revenuecat.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:underline text-sm mt-1 inline-block"
                >
                  revenuecat.com/privacy →
                </a>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 5. In-App Purchases */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. In-App Purchases</h2>
            <p>
              WordTrace! offers an optional in-app purchase to remove advertisements. All transactions
              are processed securely through the <strong>Apple App Store</strong> or{' '}
              <strong>Google Play Store</strong>. We never see or store your credit card or payment
              details — that's handled entirely by Apple or Google.
            </p>
            <p className="mt-3">
              RevenueCat helps us verify that a purchase was completed, but it only receives a
              purchase receipt — not your payment method or billing information.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 6. Advertising */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Advertising</h2>
            <p>
              If you haven't purchased the ad-free upgrade, you'll see <strong>banner ads</strong> and
              may see <strong>rewarded ads</strong> (optional ads you can watch to earn in-game hints or
              bonuses). These are served by Google AdMob.
            </p>
            <p className="mt-3">
              <strong>Opting out of personalized ads:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-slate-600">
              <li>
                <strong>iOS:</strong> When you first open the app, we'll show you Apple's App Tracking
                Transparency prompt. Tap "Ask App Not to Track" to opt out. You can also change this
                later in <em>Settings → Privacy &amp; Security → Tracking</em>.
              </li>
              <li>
                <strong>Android:</strong> Go to <em>Settings → Google → Ads → Delete advertising ID</em>{' '}
                or toggle "Opt out of Ads Personalization."
              </li>
            </ul>
            <p className="mt-3">
              If you opt out, you'll still see ads — they just won't be personalized based on your
              interests.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 7. Children's Privacy */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Children's Privacy</h2>
            <p>
              WordTrace! is rated <strong>Everyone</strong> on the App Store and Google Play. The game
              is a general-audience word puzzle and is <strong>not directed at children under 13</strong>.
            </p>
            <p className="mt-3">
              We do not knowingly collect personal information from children under 13. If you believe
              a child has provided us with personal data, please contact us at{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline">
                coreplushelp@gmail.com
              </a>{' '}
              and we will delete it promptly.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 8. Data Retention & Deletion */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Data Retention &amp; Deletion</h2>
            <p>
              We keep your account data (email, display name, game progress) for as long as your account
              is active. If you'd like us to delete your data, simply email us at{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline">
                coreplushelp@gmail.com
              </a>{' '}
              with the subject line <strong>"Delete My Data — WordTrace!"</strong> and we'll remove your
              account and all associated data within 30 days.
            </p>
            <p className="mt-3">
              Guest users have no data stored on our servers. If you've been playing as a guest and want
              to clear locally stored progress, you can uninstall the app.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 9. Contact Us */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact Us</h2>
            <p>
              Have a question about this policy or about your data? We're happy to help.
            </p>
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mt-3 text-sm">
              <p><strong>Email:</strong>{' '}
                <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline">
                  coreplushelp@gmail.com
                </a>
              </p>
              <p className="mt-1"><strong>Publisher:</strong> Edward</p>
              <p className="mt-1"><strong>App:</strong> WordTrace!</p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 10. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time — for example, if we add new features
              or if laws change. When we do, we'll update the <strong>Effective Date</strong> at the top
              of this page.
            </p>
            <p className="mt-3">
              We encourage you to check back here periodically. Continued use of WordTrace! after a
              policy update means you accept the revised terms.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-xs mt-8 pb-4">
          <p>© {new Date().getFullYear()} Edward. WordTrace! Privacy Policy.</p>
          <p className="mt-1">
            <a href="/" className="hover:text-violet-500 transition-colors">← Back to portfolio</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default WordTracePolicy;
