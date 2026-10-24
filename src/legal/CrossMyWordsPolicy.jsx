import React from 'react';

const LAST_UPDATED = 'October 1, 2026';
const CONTACT_EMAIL = 'coreplushelp@gmail.com';

const THIRD_PARTIES = [
  {
    service: 'Google Firebase — Authentication',
    purpose: 'Signing you in with Google or Apple and keeping you signed in',
    link: 'https://firebase.google.com/support/privacy',
    label: 'firebase.google.com/support/privacy',
  },
  {
    service: 'Google Firebase — Cloud Firestore',
    purpose: 'Storing your saved game progress so it follows you between devices',
    link: 'https://firebase.google.com/support/privacy',
    label: 'firebase.google.com/support/privacy',
  },
  {
    service: 'Google Firebase — Analytics',
    purpose: 'Aggregate statistics on how the game is used',
    link: 'https://firebase.google.com/support/privacy',
    label: 'firebase.google.com/support/privacy',
  },
  {
    service: 'Google Firebase — Crashlytics',
    purpose: 'Crash and error diagnostics',
    link: 'https://firebase.google.com/support/privacy',
    label: 'firebase.google.com/support/privacy',
  },
  {
    service: 'Google Firebase — Remote Config',
    purpose: 'Adjusting game settings without shipping an update',
    link: 'https://firebase.google.com/support/privacy',
    label: 'firebase.google.com/support/privacy',
  },
  {
    service: 'Google AdMob',
    purpose: 'Serving banner, interstitial and rewarded advertisements',
    link: 'https://policies.google.com/technologies/partner-sites',
    label: 'policies.google.com/technologies/partner-sites',
  },
  {
    service: 'Google Play Games Services',
    purpose: 'Leaderboards and achievements (Android)',
    link: 'https://policies.google.com/privacy',
    label: 'policies.google.com/privacy',
  },
  {
    service: 'Google Play Billing',
    purpose: 'Processing in-app purchases (Android)',
    link: 'https://policies.google.com/privacy',
    label: 'policies.google.com/privacy',
  },
  {
    service: 'Apple Game Center',
    purpose: 'Leaderboards and achievements (iOS)',
    link: 'https://www.apple.com/legal/privacy/',
    label: 'apple.com/legal/privacy',
  },
  {
    service: 'Sign in with Apple',
    purpose: 'Authentication (iOS)',
    link: 'https://www.apple.com/legal/privacy/',
    label: 'apple.com/legal/privacy',
  },
  {
    service: 'Apple App Store (In-App Purchase)',
    purpose: 'Processing in-app purchases (iOS)',
    link: 'https://www.apple.com/legal/privacy/',
    label: 'apple.com/legal/privacy',
  },
];

const Section = ({ number, title, children }) => (
  <section>
    <h2 className="text-xl font-bold text-slate-900 mb-4">
      {number}. {title}
    </h2>
    {children}
  </section>
);

const SubHeading = ({ children, first = false }) => (
  <h3
    className={`text-base font-semibold text-slate-800 mb-2${
      first ? '' : ' mt-5'
    }`}
  >
    {children}
  </h3>
);

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {children}
  </a>
);

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
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p><strong>Last Updated:</strong> {LAST_UPDATED}</p>
            <p><strong>Platforms:</strong> Apple App Store &amp; Google Play Store</p>
            <p><strong>Intended Audience:</strong> General audience, ages 13 and over</p>
          </div>
        </div>

        {/* Policy body — plain prose for crawler readability */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-10 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p className="mb-3">
              This Privacy Policy explains what information Cross My Words! ("we", "us", "our")
              collects when you use our mobile game ("the App"), why we collect it, who we share it
              with, and the choices you have. It applies to the iOS and Android versions of the App.
            </p>
            <p>
              The short version: <strong>you can play the entire game without an account.</strong> If
              you never sign in, your progress stays on your device and we hold no profile for you.
              Signing in with Google or Apple is optional and exists only so your progress can be
              backed up and restored. The App does show advertisements, and advertising is the main
              reason any identifier leaves your device.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <Section number="1" title="Information We Collect">
            <SubHeading first>1.1 Information you give us</SubHeading>
            <p className="mb-2">
              <strong>Account information (optional).</strong> If you choose to sign in with Google or
              Apple, we receive from that provider a unique account identifier and, where you permit
              it, your display name, email address and profile photo. We use these only to identify
              your saved game. If you use Sign in with Apple you may choose Apple's "Hide My Email"
              option, and we will only ever see the relay address.
            </p>
            <p>
              <strong>Correspondence.</strong> If you email us for support or to exercise a privacy
              right, we keep your message and address so we can reply and keep a record of the request.
            </p>

            <SubHeading>1.2 Information stored only on your device</SubHeading>
            <p className="mb-2">
              The following never leaves your device unless you sign in, and is erased when you
              uninstall the App:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your level progress, stars and best completion times</li>
              <li>Your audio, music and gameplay preferences</li>
              <li>A difficulty rating the game calculates from your play, used to tune level generation</li>
              <li>A random number generated on first launch, used to vary level layouts between players</li>
              <li>Whether you have purchased "Remove Ads", and your remaining hint count</li>
            </ul>

            <SubHeading>1.3 Information stored in the cloud (only if you sign in)</SubHeading>
            <p className="mb-2">
              When you sign in, we create a single record for you in Google Cloud Firestore,
              containing exactly the following:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your account identifier, and your display name and profile photo URL if the provider supplied them</li>
              <li>Whether the account is a guest account</li>
              <li>Your current level, total stars, and your per-level stars and best times</li>
              <li>The difficulty rating described in section 1.2</li>
              <li>The date your record was created, and the date you last played</li>
            </ul>
            <p className="mt-2">
              We do not store your email address, your password (we never see one), your contacts,
              your photos, your precise location, or any payment details in this record.
            </p>

            <SubHeading>1.4 Information collected automatically</SubHeading>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Analytics.</strong> Google Firebase Analytics automatically records events such
                as first launch, session starts and screen views, together with your device model,
                operating system version, app version, language, and a country or region derived from
                your IP address. It also generates an app instance identifier, which is specific to
                your installation of this App. We do not send Firebase Analytics your name or email
                address, and we use it only in aggregate to understand how the game is played.
              </li>
              <li>
                <strong>Crash diagnostics.</strong> If the App crashes or hits an error, Google
                Firebase Crashlytics collects a stack trace, your device model and operating system
                version, the app version, and the state of the App at the time, along with a
                Crashlytics installation identifier. This is used only to find and fix defects.
              </li>
              <li>
                <strong>Advertising identifiers.</strong> See section 2, which describes advertising in
                full.
              </li>
              <li>
                <strong>Connectivity status.</strong> The App checks whether you currently have a
                network connection so it can show an offline notice and defer cloud saving. This check
                happens on your device and the result is not transmitted or stored.
              </li>
            </ul>
            <p className="mt-3 text-sm text-slate-500">
              We do not use cookies or web tracking technologies in the App, and the App contains no
              third-party social media SDKs or trackers beyond the services listed in section 4.
            </p>
          </Section>

          {/* 2. Advertising */}
          <Section number="2" title="Advertising">
            <p className="mb-3">
              The App displays advertisements supplied by <strong>Google AdMob</strong>: a banner on
              the results screen, an interstitial shown after a number of completed levels, and an
              optional rewarded video you can watch in exchange for a hint. Advertising is how the
              free version of the game is funded.
            </p>

            <SubHeading first>2.1 What AdMob receives</SubHeading>
            <p className="mb-2">
              To select and measure ads, Google and its advertising partners may receive:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Your device's resettable advertising identifier — the <strong>Advertising ID</strong>{' '}
                on Android, or the <strong>Identifier for Advertisers (IDFA)</strong> on iOS. On iOS
                the IDFA is only available if you grant tracking permission (see section 2.3)
              </li>
              <li>Your IP address, from which an approximate (city or region level) location is inferred. The App never requests GPS or precise location permission</li>
              <li>Your device model, operating system version, screen characteristics and language</li>
              <li>Which ads were requested, shown, clicked or completed, and in which part of the game</li>
            </ul>
            <p className="mt-2">
              Depending on your consent and device settings, this information may be used to show you{' '}
              <strong>personalised</strong> ads — selected using a profile Google builds about your
              interests, including activity in other apps and sites — or only{' '}
              <strong>non-personalised</strong> ads, selected from context such as your coarse location
              and the fact that you are playing a word game. Under certain privacy laws, sharing data
              for personalised advertising is treated as "selling" or "sharing" personal information;
              see section 7.
            </p>

            <SubHeading>2.2 Consent in the EEA, United Kingdom and Switzerland</SubHeading>
            <p>
              If you are in the European Economic Area, the United Kingdom or Switzerland, the App
              presents a consent message before personalised advertising identifiers are used, managed
              through Google's certified consent platform. You may refuse consent and still play the
              game in full; you will see non-personalised ads instead. You can change or withdraw your
              choice at any time from the <strong>Privacy options</strong> entry in the App's Settings
              screen, and withdrawing consent takes effect from the moment you withdraw it.
            </p>

            <SubHeading>2.3 App Tracking Transparency on iOS</SubHeading>
            <p>
              On iOS, Apple requires your explicit permission before an app may access the IDFA or
              otherwise track you across apps and websites owned by other companies. The App asks for
              this permission through the standard iOS prompt. If you decline, the App continues to
              work normally and you will see non-personalised ads. You can change your answer at any
              time in <strong>Settings → Privacy &amp; Security → Tracking</strong>.
            </p>

            <SubHeading>2.4 Opting out of personalised advertising on your device</SubHeading>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Android:</strong> Settings → Privacy → Ads, where you can delete your
                Advertising ID entirely or opt out of ad personalisation. The exact path varies by
                Android version and manufacturer.
              </li>
              <li>
                <strong>iOS:</strong> Settings → Privacy &amp; Security → Tracking (to withdraw app
                tracking permission), and Settings → Privacy &amp; Security → Apple Advertising (to
                turn off Apple's own personalised ads).
              </li>
            </ul>

            <SubHeading>2.5 Removing advertising</SubHeading>
            <p>
              You can remove all advertising permanently with the one-time <strong>Remove Ads</strong>{' '}
              in-app purchase. Once it is active the App stops requesting ads altogether, and no
              further advertising identifiers are shared.
            </p>

            <p className="mt-4 text-sm">
              Google explains how it uses data from partner apps at{' '}
              <Link href="https://policies.google.com/technologies/partner-sites">
                policies.google.com/technologies/partner-sites
              </Link>
              , and lists AdMob's own advertising partners at{' '}
              <Link href="https://support.google.com/admob/answer/9012903">
                support.google.com/admob/answer/9012903
              </Link>
              .
            </p>
          </Section>

          {/* 3. How We Use Information */}
          <Section number="3" title="How We Use Information">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left border border-gray-200 px-3 py-2 font-semibold text-slate-800">Purpose</th>
                    <th className="text-left border border-gray-200 px-3 py-2 font-semibold text-slate-800">Legal basis (GDPR)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Running the game and saving your progress on your device', 'Performance of a contract'],
                    ['Backing up and restoring your progress when you sign in', 'Performance of a contract'],
                    ['Authenticating you via Google or Apple', 'Performance of a contract'],
                    ['Leaderboards and achievements, where you opt in to them', 'Consent'],
                    ['Processing in-app purchases and honouring "Remove Ads"', 'Performance of a contract'],
                    ['Diagnosing crashes and fixing defects', 'Legitimate interests'],
                    ['Understanding in aggregate how the game is used, to improve it', 'Legitimate interests'],
                    ['Showing non-personalised advertisements', 'Legitimate interests'],
                    ['Showing personalised advertisements', 'Consent'],
                    ['Responding to your support or privacy requests', 'Legitimate interests / legal obligation'],
                  ].map(([purpose, basis]) => (
                    <tr key={purpose} className="align-top">
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{purpose}</td>
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We do not use your information to make automated decisions that have a legal or similarly
              significant effect on you, and we do not use it to build advertising profiles ourselves.
            </p>
          </Section>

          {/* 4. Sharing */}
          <Section number="4" title="Who We Share Information With">
            <p className="mb-4">
              <strong>We do not sell your personal information for money.</strong> We share data only
              with the service providers below, each of which processes it for the stated purpose.
              Sharing data for personalised advertising may constitute "sharing" or a "sale" under
              certain United States privacy laws — section 7 explains how to opt out.
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
                  {THIRD_PARTIES.map(({ service, purpose, link, label }) => (
                    <tr key={service} className="align-top">
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{service}</td>
                      <td className="border border-gray-200 px-3 py-2 text-slate-700">{purpose}</td>
                      <td className="border border-gray-200 px-3 py-2">
                        <Link href={link}>{label}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We may also disclose information where we are legally required to, or to establish,
              exercise or defend legal claims. If the App is ever transferred to another developer,
              your information may transfer with it, and we will update this policy before that
              happens.
            </p>
          </Section>

          {/* 5. International transfers */}
          <Section number="5" title="Where Your Information Is Processed">
            <p>
              Our service providers are based in the United States, and information collected through
              the App — including your saved progress — is stored and processed on Google's
              infrastructure there and in other countries where Google operates. Where information is
              transferred out of the European Economic Area, the United Kingdom or Switzerland, Google
              relies on the European Commission's Standard Contractual Clauses and the EU–US and
              UK–US Data Privacy Frameworks. Details are in Google's privacy documentation linked in
              section 4.
            </p>
          </Section>

          {/* 6. Retention and deletion */}
          <Section number="6" title="How Long We Keep Information">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Your saved progress</strong> is kept for as long as your account exists. It is
                deleted when you delete your account.
              </li>
              <li>
                <strong>On-device data</strong> is removed when you uninstall the App or clear its
                storage.
              </li>
              <li>
                <strong>Analytics data</strong> tied to an app instance is automatically deleted by
                Google after our configured retention period, which does not exceed 14 months.
                Aggregated statistics that cannot identify any individual or device may be kept
                indefinitely.
              </li>
              <li>
                <strong>Crash reports</strong> are retained by Crashlytics for up to 90 days, or up to
                180 days for aggregated crash statistics.
              </li>
              <li>
                <strong>Support emails</strong> are kept for up to 24 months.
              </li>
            </ul>

            <SubHeading>Deleting your account</SubHeading>
            <p className="mb-2">There are two ways to delete your account and its data:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>In the App:</strong> open <strong>Settings → Delete Account</strong> and
                confirm. This removes your sign-in credentials and your saved progress record.
              </li>
              <li>
                <strong>By email:</strong> follow the instructions on our{' '}
                <a href="/cmw/delete-account" className="text-blue-600 hover:underline font-medium">
                  account deletion page
                </a>
                . We complete these requests within 7 business days.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">
              Deleting your account does not delete purchase records held by Apple or Google, which
              those companies retain for their own tax and accounting purposes, and does not revoke a
              "Remove Ads" entitlement — you can restore that purchase at any time.
            </p>
          </Section>

          {/* 7. Your rights */}
          <Section number="7" title="Your Privacy Rights">
            <SubHeading first>7.1 Everyone</SubHeading>
            <p>
              Whatever your location, you can play without an account, delete your account from inside
              the App, opt out of personalised advertising on your device, remove advertising entirely
              by purchase, and contact us with any privacy question using the details in section 9.
            </p>

            <SubHeading>7.2 European Economic Area, United Kingdom and Switzerland</SubHeading>
            <p className="mb-2">
              Under the GDPR and UK GDPR you have the right to request access to the personal data we
              hold about you, to have inaccurate data corrected, to have your data erased, to restrict
              or object to our processing, to receive your data in a portable format, and to withdraw
              consent where we rely on it. You also have the right to lodge a complaint with your
              national data protection authority.
            </p>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>
              . We respond within one month. Because we do not collect your email address into your
              game record, we may need you to send your request from the address you signed in with so
              that we can locate your data.
            </p>

            <SubHeading>7.3 California, and other United States state privacy laws</SubHeading>
            <p className="mb-2">
              If you are a California resident, the CCPA as amended by the CPRA gives you the right to
              know what personal information we collect and disclose, to request its deletion, to
              request correction, to opt out of the sale or sharing of your personal information for
              cross-context behavioural advertising, and not to be discriminated against for exercising
              these rights. Residents of other states with comparable laws have similar rights.
            </p>
            <p className="mb-2">
              The category of personal information we share for cross-context behavioural advertising is{' '}
              <strong>identifiers</strong> (your device advertising identifier and IP address) together
              with <strong>internet or other electronic network activity</strong> and{' '}
              <strong>coarse geolocation inferred from IP</strong>. We do not knowingly sell or share
              the personal information of anyone under 16. We do not collect sensitive personal
              information as that term is defined in the CPRA.
            </p>
            <p>
              To opt out, use the device controls in section 2.4, or decline tracking permission on
              iOS, or buy <strong>Remove Ads</strong>, which stops all ad requests. You may also email
              us and we will action the request on your behalf. We honour Global Privacy Control
              signals where we are technically able to receive them.
            </p>
          </Section>

          {/* 8. Children */}
          <Section number="8" title="Children's Privacy">
            <p className="mb-3">
              Cross My Words! is a general-audience game intended for players{' '}
              <strong>aged 13 and over</strong>. It is not directed to children under 13, it is not
              part of the Google Play "Designed for Families" programme, and we do not knowingly
              collect personal information from children under 13.
            </p>
            <p>
              If you are a parent or guardian and believe your child under 13 has provided us with
              personal information, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>{' '}
              and we will delete the account and its data promptly. In the EEA and the UK, where the
              age of digital consent is between 13 and 16 depending on the country, the consent message
              described in section 2.2 applies and personalised advertising is not used without a valid
              consent.
            </p>
          </Section>

          {/* 9. Contact */}
          <Section number="9" title="Contact Us">
            <p className="mb-2">
              For any question about this policy, or to exercise a privacy right:
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a href="https://edwardgranados.app" className="text-blue-600 hover:underline font-medium">
                edwardgranados.app
              </a>
            </p>
            <p>
              <strong>Account deletion:</strong>{' '}
              <a href="/cmw/delete-account" className="text-blue-600 hover:underline font-medium">
                edwardgranados.app/cmw/delete-account
              </a>
            </p>
          </Section>

          {/* 10. Security */}
          <Section number="10" title="Security">
            <p>
              Your saved progress is held in Google Cloud Firestore and protected by server-side
              security rules that permit each signed-in player to read and write only their own
              record. Traffic between the App and our service providers is encrypted in transit. We
              never handle your payment card details: in-app purchases are processed entirely by Apple
              or Google. No method of transmission or storage is completely secure, however, and we
              cannot guarantee absolute security.
            </p>
          </Section>

          {/* 11. Changes */}
          <Section number="11" title="Changes to This Policy">
            <p>
              We may update this policy as the App changes or as the law requires. We will revise the
              "Last Updated" date above, and where a change materially affects your rights we will
              give notice inside the App before it takes effect. Continued use of the App after a
              change takes effect constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* Footer note */}
          <section className="border-t border-gray-100 pt-6">
            <p className="text-sm text-slate-400 italic">
              Privacy policy for Cross My Words! — a word puzzle game for iOS and Android.
              Last updated {LAST_UPDATED}.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CrossMyWordsPolicy;
