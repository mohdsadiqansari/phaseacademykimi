import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import SEO from '@/components/SEO'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  })
  const { data: settings } = trpc.settings.get.useQuery()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    submitContact.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    })
    form.reset()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title="Contact Phase Academy | Get in Touch"
        description="Have questions about our cybersecurity courses? Contact Phase Academy for support, inquiries, or consultation requests."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Contact Us</h1>
          <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
            Have questions about our courses or need help choosing the right learning path? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Email</p>
                    <p className="text-sm text-white">{settings?.contactEmail || 'hello@phaseacademy.com'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Phone</p>
                    <p className="text-sm text-white">{settings?.contactPhone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Address</p>
                    <p className="text-sm text-white">{settings?.contactAddress || '123 Cyber Lane, San Francisco, CA 94105'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-600/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-500 uppercase">Response Time</p>
                    <p className="text-sm text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white">Are the courses free?</p>
                  <p className="text-sm text-zinc-500 mt-1">Yes, all our courses are completely free. We believe quality cybersecurity education should be accessible to everyone.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Do I get a certificate?</p>
                  <p className="text-sm text-zinc-500 mt-1">Yes, upon successful completion of any course, you'll receive a Phase Academy certificate.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">What skill level do I need?</p>
                  <p className="text-sm text-zinc-500 mt-1">We offer courses from beginner to advanced. Each course clearly states its prerequisites.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                <p className="text-zinc-500 mt-2">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Name</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Email</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Subject</label>
                    <input name="subject" type="text" className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Message</label>
                    <textarea name="message" rows={5} required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none resize-none" />
                  </div>
                  <button type="submit" disabled={submitContact.isPending} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
                    {submitContact.isPending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
