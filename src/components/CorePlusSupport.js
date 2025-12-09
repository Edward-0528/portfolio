import React from 'react';

function CorePlusSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Core Plus</h1>
          <p className="text-slate-600 mt-1">AI-Powered Nutrition Tracking</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* App Description */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About Core Plus</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Transform your weight loss journey with AI-powered nutrition tracking. Core Plus makes weight loss simple by eliminating complicated calorie counting. Just snap a photo of your meal, and our advanced AI instantly analyzes and logs everything - no more tedious manual entry!
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Instant AI Food Scanning:</strong> Snap a photo for automatic nutrition analysis</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Smart Nutrition Tracking:</strong> Personalized daily calorie goals based on your weight loss target</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Easy Manual Entry:</strong> Quick text-based food search with intelligent portion detection</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Progress Made Simple:</strong> Track meals effortlessly with real-time calorie deficit monitoring</span>
            </li>
          </ul>
        </section>

        {/* Support Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Support & Contact</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h3>
              <p className="text-slate-700 mb-3">
                We're here to help! If you have any questions, issues, or feedback about Core Plus, please don't hesitate to reach out.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Information</h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline">coreplushelp@gmail.com</a>
                </p>
                <p className="text-slate-700">
                  <strong>Response Time:</strong> We typically respond within 24-48 hours
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900">How accurate is the AI food scanning?</h4>
                  <p className="text-slate-600 mt-1">
                    Our AI is trained on thousands of foods and provides accurate calorie and macro estimates. For best results, take clear, well-lit photos of your meals.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900">Can I use Core Plus without taking photos?</h4>
                  <p className="text-slate-600 mt-1">
                    Yes! Core Plus also includes a manual text-based food search feature for when you prefer not to take photos or need to log foods from memory.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900">Is my data secure?</h4>
                  <p className="text-slate-600 mt-1">
                    Absolutely. We use secure data storage, never sell your information, and maintain a privacy-first approach. Your health data stays private.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900">How do I set my calorie goal?</h4>
                  <p className="text-slate-600 mt-1">
                    Core Plus calculates personalized daily calorie goals based on your weight loss target, current weight, and activity level during the initial setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy Policy for Core Plus</h2>
          <div className="text-slate-700 space-y-4">
            <p>
              <strong>Last Updated:</strong> December 8, 2025
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p>
                <strong>App Name:</strong> Core Plus
              </p>
              <p>
                <strong>Developer:</strong> Edward_Granados
              </p>
              <p>
                <strong>Contact Email:</strong> <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline">coreplushelp@gmail.com</a>
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Information We Collect</h3>
              <p>
                Core Plus collects information you provide when using the app, including:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Account information (email, profile details)</li>
                <li>Food photos for AI nutrition analysis</li>
                <li>Nutrition data you log (calories, macros, meals)</li>
                <li>Water intake tracking data</li>
                <li>Custom foods and recipes you create</li>
                <li>App usage data to improve our service</li>
                <li>Subscription and purchase information processed through our payment provider</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Health Data Access and Usage</h3>
              <p>
                <strong>Core Plus accesses health data from Apple Health (iOS) and Google Health Connect (Android) with your permission:</strong>
              </p>
              
              <p className="mt-3"><strong>Health Data We Access (Read-Only):</strong></p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Active Energy Burned:</strong> Calories burned from workouts and physical activity to calculate your net calories after exercise</li>
              </ul>
              
              <p className="mt-3"><strong>How We Use This Health Data:</strong></p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>To display net calories by subtracting calories burned from your daily intake</li>
                <li>To provide a complete picture of your daily energy balance</li>
              </ul>

              <p className="mt-3"><strong>Important - We Do NOT Store Health Data:</strong></p>
              <p className="mt-1">
                Core Plus reads health data from Apple Health and Google Health Connect in real-time but <strong>does not store, upload, or retain this data on our servers</strong>. The health data remains on your device and within Apple Health or Google Health Connect. We only access this data temporarily to display it within the app during your active session.
              </p>

              <p className="mt-3"><strong>Your Control:</strong></p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Health data access requires your explicit permission</li>
                <li>You can revoke access at any time through your device's Health app settings</li>
                <li>The app functions fully without health data access - this feature is optional</li>
              </ul>
              
              <p className="mt-3">
                <strong>Data Security:</strong> Your health data is never sold to third parties, shared with advertisers, or used for any purpose other than displaying your calories burned within the Core Plus app.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">How We Use Your Information</h3>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Provide and improve the Core Plus service</li>
                <li>Analyze food photos using AI to provide accurate nutrition data</li>
                <li>Track your nutrition and progress over time</li>
                <li>Manage your subscription and account status</li>
                <li>Send you app updates and support messages</li>
                <li>Respond to your inquiries and provide customer support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Subscription Management</h3>
              <p>
                Subscriptions are managed via RevenueCat, our trusted third-party payment processor. RevenueCat handles all receipt validation automatically and securely. Your payment information is processed directly through Apple's App Store or Google Play Store and is never stored on our servers.
              </p>
              <p className="mt-2">
                To manage your subscription, tap the 'Account' tab in the app, then tap your subscription status to view options. You can upgrade, downgrade, or cancel your subscription at any time through your Apple App Store or Google Play Store account settings.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your data. Your information is encrypted in transit and at rest. We never sell your personal information to third parties. All payment processing is handled securely through Apple's App Store, Google Play Store, and RevenueCat's secure payment systems.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Third-Party Services</h3>
              <p>
                Core Plus uses the following third-party services:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>RevenueCat:</strong> For subscription management and receipt validation</li>
                <li><strong>AI Services:</strong> For food image recognition and nutrition analysis</li>
                <li><strong>Apple App Store:</strong> For payment processing and subscription management (iOS)</li>
                <li><strong>Google Play Store:</strong> For payment processing and subscription management (Android)</li>
                <li><strong>Apple Health:</strong> For read-only access to calories burned data (iOS) - data is not stored on our servers</li>
                <li><strong>Google Health Connect:</strong> For read-only access to calories burned data (Android) - data is not stored on our servers</li>
              </ul>
              <p className="mt-2">
                These services have their own privacy policies and handle data according to their respective terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Data Retention</h3>
              <p>
                We retain your data for as long as your account is active or as needed to provide you services. You can request deletion of your data at any time by contacting us. Upon deletion request, we will remove your personal information within 30 days, though some data may be retained for legal or security purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of non-essential communications</li>
                <li>Manage your subscription through your App Store or Google Play account</li>
                <li>Request corrections to your personal information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Children's Privacy</h3>
              <p>
                Core Plus is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Us</h3>
              <p>
                <strong>Developer:</strong> Edward_Granados
              </p>
              <p className="mt-2">
                For privacy-related questions or requests, contact us at:{' '}
                <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline">
                  coreplushelp@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Terms of Service</h2>
          <div className="text-slate-700 space-y-4">
            <p>
              <strong>Last Updated:</strong> November 17, 2025
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Acceptance of Terms</h3>
              <p>
                By accessing and using Core Plus, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Use of Service</h3>
              <p>
                Core Plus is a nutrition tracking tool designed to help you monitor your food intake. The nutrition information provided by our AI is for informational purposes only and should not replace professional medical advice.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">User Responsibilities</h3>
              <p>You agree to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Provide accurate information</li>
                <li>Keep your account secure</li>
                <li>Use the app in compliance with applicable laws</li>
                <li>Not misuse or attempt to circumvent the service</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Disclaimer</h3>
              <p>
                Core Plus provides nutrition estimates based on AI analysis. While we strive for accuracy, results may vary. Always consult with a healthcare professional before making significant dietary changes. Core Plus is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Modifications</h3>
              <p>
                We reserve the right to modify these terms at any time. Continued use of Core Plus after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-slate-600">
            <p className="mb-2">© 2025 Core Plus. All rights reserved.</p>
            <p className="text-sm">
              <a href="mailto:coreplushelp@gmail.com" className="text-blue-600 hover:underline">
                coreplushelp@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CorePlusSupport;
