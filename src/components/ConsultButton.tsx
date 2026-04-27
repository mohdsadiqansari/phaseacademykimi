import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function ConsultButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true)
      setName('')
      setEmail('')
      setMessage('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return
    submitMutation.mutate({
      name,
      email,
      subject: 'Consultation Request',
      message,
    })
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-600/30 flex items-center justify-center transition-all hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#111111] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
          <div className="p-4 bg-red-600">
            <h3 className="text-sm font-semibold text-white">Talk to an Expert</h3>
            <p className="text-xs text-white/80 mt-1">Get free career advice from our cybersecurity advisors.</p>
          </div>

          {submitted ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="text-sm font-medium text-white">Message Sent!</h4>
              <p className="text-xs text-zinc-400 mt-1">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setIsOpen(false) }}
                className="mt-4 text-xs text-red-500 hover:text-red-400"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                required
              />
              <textarea
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none resize-none"
                required
              />
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {submitMutation.isPending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
