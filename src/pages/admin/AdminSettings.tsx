import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminSettings() {
  const { data: settings, refetch } = trpc.settings.get.useQuery()
  const updateMutation = trpc.settings.update.useMutation({ onSuccess: () => refetch() })
  const [form, setForm] = useState({
    siteTitle: '',
    siteDescription: '',
    logoUrl: '',
    faviconUrl: '',
    defaultMetaTitle: '',
    defaultMetaDescription: '',
    socialTwitter: '',
    socialLinkedin: '',
    socialGithub: '',
    socialYoutube: '',
    socialDiscord: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    analyticsGaId: '',
  })

  useEffect(() => {
    if (settings) {
      setForm({
        siteTitle: settings.siteTitle || '',
        siteDescription: settings.siteDescription || '',
        logoUrl: settings.logoUrl || '',
        faviconUrl: settings.faviconUrl || '',
        defaultMetaTitle: settings.defaultMetaTitle || '',
        defaultMetaDescription: settings.defaultMetaDescription || '',
        socialTwitter: settings.socialTwitter || '',
        socialLinkedin: settings.socialLinkedin || '',
        socialGithub: settings.socialGithub || '',
        socialYoutube: settings.socialYoutube || '',
        socialDiscord: settings.socialDiscord || '',
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        contactAddress: settings.contactAddress || '',
        analyticsGaId: settings.analyticsGaId || '',
      })
    }
  }, [settings])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(form)
  }

  const inputClass = "w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
  const labelClass = "text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1 block"

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <button
          onClick={handleSubmit}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Site Title</label>
              <input value={form.siteTitle} onChange={e => setForm({ ...form, siteTitle: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Site Description</label>
              <input value={form.siteDescription} onChange={e => setForm({ ...form, siteDescription: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Favicon URL</label>
              <input value={form.faviconUrl} onChange={e => setForm({ ...form, faviconUrl: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">SEO Defaults</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Default Meta Title</label>
              <input value={form.defaultMetaTitle} onChange={e => setForm({ ...form, defaultMetaTitle: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Default Meta Description</label>
              <input value={form.defaultMetaDescription} onChange={e => setForm({ ...form, defaultMetaDescription: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Twitter / X</label>
              <input value={form.socialTwitter} onChange={e => setForm({ ...form, socialTwitter: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn</label>
              <input value={form.socialLinkedin} onChange={e => setForm({ ...form, socialLinkedin: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>GitHub</label>
              <input value={form.socialGithub} onChange={e => setForm({ ...form, socialGithub: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>YouTube</label>
              <input value={form.socialYoutube} onChange={e => setForm({ ...form, socialYoutube: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Discord</label>
              <input value={form.socialDiscord} onChange={e => setForm({ ...form, socialDiscord: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email</label>
              <input value={form.contactEmail} onChange={e => setForm({ ...form, contactEmail: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input value={form.contactPhone} onChange={e => setForm({ ...form, contactPhone: e.target.value })} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Address</label>
              <input value={form.contactAddress} onChange={e => setForm({ ...form, contactAddress: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Analytics</h2>
          <div>
            <label className={labelClass}>Google Analytics ID</label>
            <input value={form.analyticsGaId} onChange={e => setForm({ ...form, analyticsGaId: e.target.value })} placeholder="G-XXXXXXXXXX" className={inputClass} />
          </div>
        </div>
      </form>
    </div>
  )
}
