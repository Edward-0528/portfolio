import React, { useState } from 'react';

const WordTraceDeleteAccount = () => {
  const [copied, setCopied] = useState(false);

  const email = 'coreplushelp@gmail.com';
  const subject = 'WordTrace! – Account Deletion Request';
  const body = `Hi,\n\nI would like to request the deletion of my WordTrace! account and all associated data.\n\nEmail address used in the app: [YOUR EMAIL HERE]\n\nThank you.`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl select-none">
              🔤
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">WordTrace!</h1>
              <p className="text-slate-500 text-sm">Account Deletion Request</p>
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
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8 text-slate-700 leading-relaxed">

          {/* Intro */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Request Account Deletion</h2>
            <p>
              You can request the permanent deletion of your WordTrace! account and all associated data
              by sending an email to our support address. We will process your request within{' '}
              <strong>7 business days</strong>.
            </p>
          </section>

          {/* How to request */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">How to Request Deletion</h2>
            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              <li>
                Tap the button below to open a pre-filled email, <strong>or</strong> manually email us at{' '}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-violet-600 hover:underline font-medium focus:outline-none"
                  title="Copy email address"
                >
                  {email}
                  <span className="text-xs text-slate-400">{copied ? '✓ copied' : '(copy)'}</span>
                </button>
              </li>
              <li>
                Include the <strong>email address you used to sign in</strong> to WordTrace! so we can
                locate your account.
              </li>
              <li>
                Use the subject line: <span className="font-mono bg-gray-100 px-1 rounded text-sm">WordTrace! – Account Deletion Request</span>
              </li>
            </ol>

            <a
              href={mailtoLink}
              className="mt-6 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Deletion Request Email
            </a>
          </section>

          {/* What gets deleted */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">What Gets Deleted</h2>
            <p className="mb-3">When we process your deletion request, the following data is permanently removed:</p>
            <ul className="space-y-2">
              {[
                { icon: '🔐', label: 'Firebase Authentication account', desc: 'Your login credentials and sign-in identity.' },
                { icon: '🗃️', label: 'Firestore game data', desc: 'Your scores, progress, settings, and any other in-app data linked to your account.' },
              ].map(({ icon, label, desc }) => (
                <li key={label} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{label}</p>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              Data that is <strong>not</strong> tied to your individual account (e.g., aggregated, anonymised analytics)
              may be retained in accordance with our{' '}
              <a href="/wordtrace/policy" className="text-violet-600 hover:underline">Privacy Policy</a>.
            </p>
          </section>

          {/* Retention period */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Retention Period</h2>
            <p>
              After we receive your request, your account and associated data will be deleted within{' '}
              <strong>7 business days</strong>. You will receive a confirmation email once the deletion
              is complete. Data may be retained for a short additional period only where required by
              applicable law.
            </p>
          </section>

          {/* Questions */}
          <section className="border-t border-gray-100 pt-6">
            <p className="text-sm text-slate-500">
              Have questions? Contact us at{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-violet-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>{' '}
              — we're happy to help.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default WordTraceDeleteAccount;
