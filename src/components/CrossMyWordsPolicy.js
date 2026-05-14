import React from 'react';

const CrossMyWordsPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl select-none">
              ✏️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Cross My Words!</h1>
              <p className="text-slate-500 text-sm">Privacy Policy</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-slate-700 space-y-1">
            <p><strong>App Name:</strong> Cross My Words!</p>
            <p><strong>Developer / Publisher:</strong> Edward</p>
            <p><strong>Contact:</strong>{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>
            </p>
            <p><strong>Last Updated:</strong> May 13, 2026</p>
            <p><strong>Platforms:</strong> Apple App Store &amp; Google Play Store</p>
          </div>
        </div>

        {/* Policy body — plain prose for crawler readability */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              This Privacy Policy describes how Cross My Words! ("we", "us", or "our") collects, uses,
              and shares information when you use our mobile application ("the App"). By using the App,
              you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-base font-semibold text-slate-800 mb-2">1.1 Information You Provide</h3>
            <p className="mb-2">
              <strong>Account information:</strong> If you choose to sign in with Google or Apple, we
              receive your name and email address from those providers. Guest play is available and
              requires no account.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">1.2 Information Collected Automatically</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Usage data:</strong> Level completion, scores, stars earned, and gameplay
                progress, used to save your progress and improve the game.
              </li>
              <li>
                <strong>Device information:</strong> Device type, operating system version, and unique
                device identifiers.
              </li>
              <li>
                <strong>Crash reports:</strong> If the App crashes, diagnostic information is collected
                to help us fix bugs (via Firebase Crashlytics).
              </li>
              <li>
                <strong>Analytics:</strong> Aggregated, anonymised data about how players interact with
                the App (via Firebase Analytics). This data does not personally identify you.
              </li>
            </ul>

            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">1.3 Advertising</h3>
            <p className="mb-2">
              The App may display ads served by <strong>Google AdMob</strong>. AdMob may collect and
              use data to serve personalised or non-personalised advertisements, including device
              advertising identifiers. You can opt out of personalised ads through your device settings:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-2">
              <li>
                <strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalisation
              </li>
              <li>
                <strong>iOS:</strong> Settings → Privacy → Apple Advertising → turn off Personalised Ads
              </li>
            </ul>
            <p>
              For more information, see{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google's Privacy Policy
              </a>.
            </p>

            <h3 className="text-base font-semibold text-slate-800 mb-2 mt-4">1.4 In-App Purchases</h3>
            <p>
              Purchases (e.g. hint packs) are processed by the <strong>Google Play Store</strong> or
              the <strong>Apple App Store</strong>. We do not collect or store your payment card
              information. Purchase records are managed by the respective store platform.
            </p>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Save and sync your game progress across devices (when signed in)</li>
              <li>Authenticate your identity via Google Sign-In or Sign in with Apple</li>
              <li>
                Display leaderboards and achievements via Google Play Games Services / Game Center
              </li>
              <li>Diagnose crashes and fix technical issues</li>
              <li>Understand how the App is used in order to improve it</li>
              <li>Display advertisements</li>
            </ul>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. How We Share Your Information</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share data with the following
              third-party service providers, solely to operate the App:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left border border-gray-200 px-3 py-2 font-semibold text-slate-800">Service</th>
                    <th className="text-left border border-gray-200 px-3 py-2 font-semibold text-slate-800">Purpose</th>
                    <th className="text-left border border-gray-200 px-3 py-2 font-semibold text-slate-800">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      service: 'Google Firebase (Analytics, Auth, Crashlytics, Firestore)',
                      purpose: 'Analytics, authentication, crash reporting, data storage',
                      link: 'https://firebase.google.com/support/privacy',
                      label: 'firebase.google.com/support/privacy',
                    },
                    {
                      service: 'Google AdMob',
                      purpose: 'Advertising',
                      link: 'https://policies.google.com/privacy',
                      label: 'policies.google.com/privacy',
                    },
                    {
                      service: 'Google Play Games Services',
                      purpose: 'Leaderboards & achievements',
                      link: 'https://policies.google.com/privacy',
                      label: 'policies.google.com/privacy',
                    },
                    {
                      service: 'Apple Game Center',
                      purpose: 'Leaderboards & achievements (iOS)',
                      link: 'https://www.apple.com/legal/privacy/',
                      label: 'apple.com/legal/privacy',
                    },
                    {
                      service: 'Sign in with Apple',
                      purpose: 'Authentication (iOS)',
                      link: 'https://www.apple.com/legal/privacy/',
                      label: 'apple.com/legal/privacy',
                    },
                  ].map(({ service, purpose, link, label }) => (
                    <tr key={service} className="align-top">
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{service}</td>
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{purpose}</td>
                      <td className="border border-gray-200 px-3 py-2">
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {label}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We may also disclose information if required to do so by law or in response to valid
              legal requests.
            </p>
          </section>

          {/* 4. Data Retention */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Data Retention</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Account data</strong> is retained for as long as your account is active or as
                needed to provide the App's services.
              </li>
              <li>
                <strong>Anonymous analytics</strong> data may be retained in aggregated form
                indefinitely.
              </li>
              <li>
                You may request deletion of your account and associated data at any time by contacting
                us (see Section 8).
              </li>
            </ul>
          </section>

          {/* 5. Children's Privacy */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Children's Privacy</h2>
            <p className="mb-3">
              Cross My Words! is intended for a general audience and is suitable for all ages. We do
              not knowingly collect personal information from children under the age of 13. If you are
              a parent or guardian and believe your child has provided us with personal information,
              please contact us so we can delete it.
            </p>
            <p>
              When a child uses the App, advertising will default to non-personalised ads in compliance
              with applicable children's privacy laws (COPPA, GDPR-K).
            </p>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate data</li>
              <li><strong>Delete</strong> your data ("right to be forgotten")</li>
              <li>
                <strong>Opt out</strong> of personalised advertising (see Section 1.3)
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the details in Section 8.
            </p>
          </section>

          {/* 7. Security */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your information.
              However, no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
            <p className="mb-2">
              If you have any questions about this Privacy Policy or wish to request deletion of your
              data, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href="https://edwardgranados.me" className="text-blue-600 hover:underline font-medium">
                edwardgranados.me
              </a>
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              significant changes by updating the "Last Updated" date at the top of this page.
              Continued use of the App after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Footer note */}
          <section className="border-t border-gray-100 pt-6">
            <p className="text-sm text-slate-400 italic">
              This privacy policy was created for Cross My Words! — a word puzzle game for iOS and Android.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CrossMyWordsPolicy;
