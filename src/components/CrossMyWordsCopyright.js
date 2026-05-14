import React from 'react';

const CrossMyWordsCopyright = () => {
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
              <p className="text-slate-500 text-sm">Copyright Notice</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-slate-700 space-y-1">
            <p><strong>App Name:</strong> Cross My Words!</p>
            <p><strong>Developer / Publisher:</strong> Edward Granados</p>
            <p><strong>Contact:</strong>{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-8 text-slate-700 leading-relaxed">

          {/* Ownership */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Ownership</h2>
            <p>
              © 2026 Edward Granados. All rights reserved.
            </p>
            <p className="mt-3">
              Cross My Words! and all of its content — including but not limited to the application
              code, game design, graphics, user interface, artwork, and text — are the exclusive
              property of Edward Granados and are protected by applicable copyright, trademark, and
              intellectual property laws.
            </p>
          </section>

          {/* Restrictions */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Restrictions</h2>
            <p className="mb-3">
              You may not, without prior written permission from Edward Granados:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              <li>Copy, reproduce, or redistribute any part of the App or its content</li>
              <li>Modify, adapt, translate, or create derivative works based on the App</li>
              <li>Reverse engineer, decompile, or disassemble the App</li>
              <li>Use any content from the App for commercial purposes</li>
            </ul>
          </section>

          {/* Third-party */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Third-Party Software</h2>
            <p>
              Cross My Words! is built using third-party frameworks and services including Flutter,
              Firebase, and Google AdMob. These are the property of their respective owners and are
              used in accordance with their individual licence agreements.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-100 pt-6">
            <p className="text-sm text-slate-500">
              For copyright enquiries, please contact{' '}
              <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline font-medium">
                coreplushelp@gmail.com
              </a>.
            </p>
          </section>

        </div>

        {/* Footer links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-5 mt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/crossmywords/policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            <span className="text-slate-300">·</span>
            <a href="/crossmywords/support" className="text-blue-600 hover:underline font-medium">Support</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CrossMyWordsCopyright;
