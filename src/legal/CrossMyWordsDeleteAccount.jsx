import React, { useState } from 'react';

const EMAIL = 'coreplushelp@gmail.com';
const SUBJECT = 'Cross My Words! – Account Deletion Request';
const BODY = `Hi,

I would like to request the deletion of my Cross My Words! account and all associated data.

Email address used to sign in to the app: [YOUR EMAIL HERE]
Sign-in method (Google or Apple): [GOOGLE / APPLE]

Thank you.`;

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  SUBJECT
)}&body=${encodeURIComponent(BODY)}`;

const DELETED = [
  {
    icon: '🔐',
    label: 'Firebase Authentication account',
    desc: 'Your sign-in identity, and the link between your Google or Apple account and the game.',
  },
  {
    icon: '🗃️',
    label: 'Your saved progress record',
    desc: 'Your current level, total stars, per-level stars and best times, your calculated difficulty rating, and your display name and profile photo URL if we held them.',
  },
];

const RETAINED = [
  {
    label: 'Aggregated analytics',
    desc: 'Statistics that cannot identify you or your device may be kept indefinitely. App-instance analytics data is deleted automatically by Google within our retention period of no more than 14 months.',
  },
  {
    label: 'Purchase records',
    desc: 'Apple and Google keep their own records of any in-app purchase for tax and accounting reasons. We cannot delete those, and we never held your payment details in the first place.',
  },
  {
    label: 'Support correspondence',
    desc: 'If you have emailed us, we keep that correspondence for up to 24 months.',
  },
];

const CrossMyWordsDeleteAccount = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl select-none">
              ✏️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Cross My Words!</h1>
              <p className="text-slate-500 text-sm">Delete Your Account &amp; Data</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-slate-700 space-y-1">
            <p><strong>App Name:</strong> Cross My Words!</p>
            <p><strong>Developer / Publisher:</strong> Edward</p>
            <p><strong>Contact:</strong>{' '}
              <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8 text-slate-700 leading-relaxed">

          {/* Fastest route */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Delete your account</h2>
            <p className="mb-4">
              You only have an account if you chose to sign in with Google or Apple. If you have always
              played as a guest, there is nothing for us to delete — your progress lives only on your
              device, and uninstalling the game removes it.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
              <p className="font-semibold text-slate-800 mb-1">
                Fastest option: delete it yourself, in the app
              </p>
              <p className="text-sm text-slate-600">
                Open Cross My Words! and go to <strong>Settings → Delete Account</strong>, then
                confirm. Your account and saved progress are removed immediately. No email, no waiting.
              </p>
            </div>
          </section>

          {/* Email route */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Or request deletion by email
            </h2>
            <p className="mb-4">
              If you have uninstalled the game, lost access to your sign-in, or would simply rather we
              did it, email us and we will process the request within{' '}
              <strong>7 business days</strong>.
            </p>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                Use the button below for a pre-filled email, <strong>or</strong> write to{' '}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium focus:outline-none"
                  title="Copy email address"
                >
                  {EMAIL}
                  <span className="text-xs text-slate-400">{copied ? '✓ copied' : '(copy)'}</span>
                </button>
              </li>
              <li>
                Send it from, or tell us, the{' '}
                <strong>email address you used to sign in</strong> — we do not store email addresses
                against game records, so this is how we locate your account.
              </li>
              <li>
                Tell us whether you signed in with <strong>Google</strong> or <strong>Apple</strong>.
                If you used Apple's "Hide My Email", include the relay address Apple generated.
              </li>
              <li>
                Use the subject line{' '}
                <span className="font-mono bg-gray-100 px-1 rounded text-sm">
                  Cross My Words! – Account Deletion Request
                </span>
              </li>
            </ol>

            <a
              href={MAILTO}
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Deletion Request Email
            </a>

            <p className="mt-4 text-sm text-slate-500">
              We will email you a confirmation once the deletion is complete.
            </p>
          </section>

          {/* What gets deleted */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What gets deleted</h2>
            <ul className="space-y-2">
              {DELETED.map(({ icon, label, desc }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
                >
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">
              Deletion is permanent and cannot be undone. Your progress is not recoverable afterwards,
              so if you only want to start over, consider simply replaying instead.
            </p>
          </section>

          {/* What is kept */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What is kept, and why</h2>
            <ul className="space-y-3">
              {RETAINED.map(({ label, desc }) => (
                <li key={label}>
                  <p className="font-semibold text-slate-800 text-sm">{label}</p>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              A "Remove Ads" purchase is not revoked by deleting your account. It is tied to your Apple
              or Google account, and you can restore it from the in-app store at any time.
            </p>
          </section>

          {/* Footer */}
          <section className="border-t border-gray-100 pt-6">
            <p className="text-sm text-slate-500">
              Full details of what we collect are in our{' '}
              <a href="/cmw/policy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </a>
              . Questions? Write to{' '}
              <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline font-medium">
                {EMAIL}
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CrossMyWordsDeleteAccount;
