import React, { useState } from 'react';

const faqs = [
  {
    q: 'My progress has disappeared. How do I get it back?',
    a: `If you were signed in with a Google or Apple account, your progress is saved to the cloud. Open the app, tap the profile icon, and sign back in with the same account to restore your progress.\n\nIf you were playing as a guest, your progress is saved locally on your device and cannot be recovered if the app was deleted or your device was reset.`,
  },
  {
    q: 'How do I turn off the music or sound effects?',
    a: `Tap the settings icon on the home screen. From there you can toggle music and sound effects on or off independently, and adjust their volumes using the sliders.`,
  },
  {
    q: 'I purchased hints but they have not appeared. What should I do?',
    a: `First make sure you are connected to the internet and try restarting the app. If the hints still have not appeared, tap the Restore Purchases button on the hints screen to recover your purchase.\n\nIf the issue persists please contact us using the details below.`,
  },
  {
    q: 'How do I restore my purchases on a new device?',
    a: `Open the hints screen and tap Restore Purchases. You must be signed in to the App Store or Google Play with the same account you used when you originally made the purchase.`,
  },
  {
    q: 'The app is crashing or not loading correctly. What can I do?',
    a: `Try the following steps in order:\n\n1. Close the app fully and reopen it.\n2. Check that your device software is up to date.\n3. Uninstall and reinstall the app. If you were signed in, your progress will be restored automatically.\n4. If the problem continues, please contact us and include your device model and operating system version.`,
  },
  {
    q: 'Can I play without creating an account?',
    a: `Yes. Guest play is fully supported — you can play every level without signing in. Creating an account simply lets you sync your progress across multiple devices and appear on global leaderboards.`,
  },
  {
    q: 'How do I delete my account and data?',
    a: `Send us an email at coreplushelp@gmail.com with the subject line "Delete My Account" and we will remove your account and all associated data within 30 days.`,
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm sm:text-base">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-100">
          {a.split('\n\n').map((para, i) => (
            <p key={i} className={`text-slate-600 text-sm sm:text-base leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const CrossMyWordsSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl select-none">
              ✏️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Cross My Words!</h1>
              <p className="text-slate-500 text-sm">Support</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Having trouble with Cross My Words? We are here to help. Browse the common questions
            below or get in touch directly and we will get back to you as soon as possible.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Still need help? Get in touch.</h2>
          <p className="text-slate-600 text-sm sm:text-base mb-6">
            We read every message and aim to respond within 48 hours.
          </p>
          <a
            href="mailto:coreplushelp@gmail.com?subject=Cross%20My%20Words%20Support"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email Support
          </a>
          <p className="mt-4 text-sm text-slate-400">
            coreplushelp@gmail.com
          </p>
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="/crossmywords/policy"
              className="text-blue-600 hover:underline font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300">·</span>
            <a
              href="mailto:coreplushelp@gmail.com?subject=Delete%20My%20Account"
              className="text-blue-600 hover:underline font-medium"
            >
              Delete My Account
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CrossMyWordsSupport;
