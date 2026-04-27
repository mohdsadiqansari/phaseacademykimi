import SEO from '@/components/SEO'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title="Privacy Policy | Phase Academy"
        description="Phase Academy privacy policy. Learn how we collect, use, and protect your personal data."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-zinc-500 mt-2">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 leading-relaxed">
            Phase Academy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-zinc-400 leading-relaxed">
            We may collect personal information that you voluntarily provide to us when you register for an account, express interest in obtaining information about us or our products and services, participate in activities on the website, or otherwise contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
            <li>Name and contact information (email address, phone number)</li>
            <li>Account credentials</li>
            <li>Payment information (if applicable)</li>
            <li>Course progress and completion data</li>
            <li>Communication preferences</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-zinc-400 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website and services</li>
            <li>Understand and analyze how you use our website and services</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you for customer service, updates, and marketing</li>
            <li>Send you emails and notifications</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
          <p className="text-zinc-400 leading-relaxed">
            We may use cookies, web beacons, tracking pixels, and other tracking technologies to collect information about your browsing activities. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Data Security</h2>
          <p className="text-zinc-400 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Your Rights</h2>
          <p className="text-zinc-400 leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate information</li>
            <li>The right to erasure ("right to be forgotten")</li>
            <li>The right to restrict processing</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Contact Us</h2>
          <p className="text-zinc-400 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@phaseacademy.com or through our contact page.
          </p>
        </div>
      </div>
    </div>
  )
}
