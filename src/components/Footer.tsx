import { Link } from 'react-router'
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Youtube } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function Footer() {
  const { data: settings } = trpc.settings.get.useQuery()

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="Phase Academy"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="text-lg font-semibold text-white">Phase Academy</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Master the Art of Cyber Defense. Hands-on training for the next generation of security professionals.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {settings?.socialTwitter && (
                <a href={settings.socialTwitter} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings?.socialLinkedin && (
                <a href={settings.socialLinkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings?.socialGithub && (
                <a href={settings.socialGithub} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {settings?.socialYoutube && (
                <a href={settings.socialYoutube} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">Courses</h4>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">Ethical Hacking</Link></li>
              <li><Link to="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">Network Security</Link></li>
              <li><Link to="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">Web Security</Link></li>
              <li><Link to="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">Malware Analysis</Link></li>
              <li><Link to="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">Digital Forensics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <Mail className="w-4 h-4 text-red-500" />
                {settings?.contactEmail || 'hello@phaseacademy.com'}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <Phone className="w-4 h-4 text-red-500" />
                {settings?.contactPhone || '+1 (555) 123-4567'}
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-400">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                <span>{settings?.contactAddress || '123 Cyber Lane, San Francisco, CA 94105'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Phase Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
