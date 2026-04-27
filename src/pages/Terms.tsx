import SEO from '@/components/SEO'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title="Terms & Conditions | Phase Academy"
        description="Phase Academy terms and conditions. Read our policies regarding course access, payments, and user responsibilities."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Terms & Conditions</h1>
          <p className="text-zinc-500 mt-2">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 leading-relaxed">
            Welcome to Phase Academy. These Terms and Conditions ("Terms") govern your access to and use of our website, courses, and services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
          <p className="text-zinc-400 leading-relaxed">
            Phase Academy provides online cybersecurity education and training. These Terms constitute a legally binding agreement between you and Phase Academy regarding your use of our platform.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Account Registration</h2>
          <p className="text-zinc-400 leading-relaxed">
            To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Course Access</h2>
          <p className="text-zinc-400 leading-relaxed">
            Upon enrollment in a course, you are granted a limited, non-exclusive, non-transferable license to access and view the course content for your personal, non-commercial educational purposes. You may not:
          </p>
          <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
            <li>Share your account credentials with others</li>
            <li>Reproduce, distribute, or publicly display course content</li>
            <li>Use course content for commercial purposes without authorization</li>
            <li>Attempt to modify, reverse engineer, or create derivative works from our platform</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Code of Conduct</h2>
          <p className="text-zinc-400 leading-relaxed">
            You agree to use our platform and the skills you learn ethically and legally. Specifically:
          </p>
          <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
            <li>You will not use techniques learned for illegal activities</li>
            <li>You will obtain proper authorization before testing any systems</li>
            <li>You will practice responsible disclosure of vulnerabilities</li>
            <li>You will respect the privacy and rights of others</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Intellectual Property</h2>
          <p className="text-zinc-400 leading-relaxed">
            All content on our platform, including text, graphics, logos, icons, images, audio clips, video clips, digital downloads, and software, is the property of Phase Academy or its content suppliers and is protected by international copyright laws.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Disclaimer</h2>
          <p className="text-zinc-400 leading-relaxed">
            Our courses are provided for educational purposes only. Phase Academy is not responsible for any misuse of the knowledge or skills acquired through our platform. You assume full responsibility for your actions.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Limitation of Liability</h2>
          <p className="text-zinc-400 leading-relaxed">
            To the maximum extent permitted by law, Phase Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-zinc-400 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Contact</h2>
          <p className="text-zinc-400 leading-relaxed">
            If you have any questions about these Terms, please contact us at legal@phaseacademy.com or through our contact page.
          </p>
        </div>
      </div>
    </div>
  )
}
