import { useState } from 'react'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminTestimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name: '', role: '', content: '', rating: 5, avatar: '', featured: 0 })

  const { data: testimonials, refetch } = trpc.testimonial.list.useQuery({})
  const createMutation = trpc.testimonial.create.useMutation({ onSuccess: () => { refetch(); setIsModalOpen(false); resetForm(); } })
  const updateMutation = trpc.testimonial.update.useMutation({ onSuccess: () => { refetch(); setIsModalOpen(false); setEditing(null); resetForm(); } })
  const deleteMutation = trpc.testimonial.delete.useMutation({ onSuccess: () => refetch() })

  const resetForm = () => setForm({ name: '', role: '', content: '', rating: 5, avatar: '', featured: 0 })

  const openEdit = (item: any) => {
    setEditing(item)
    setForm({ name: item.name, role: item.role || '', content: item.content, rating: item.rating || 5, avatar: item.avatar || '', featured: item.featured })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Manage Testimonials</h1>
        <button onClick={() => { setEditing(null); resetForm(); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Name</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Role</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials?.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar || '/images/avatar-1.jpg'} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm text-white">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{t.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < (t.rating || 5) ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${t.featured ? 'bg-red-500/10 text-red-500' : 'bg-zinc-500/10 text-zinc-500'}`}>
                      {t.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(t)} className="p-1.5 text-zinc-500 hover:text-white transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate({ id: t.id }) }} className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Role" className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content" rows={3} required className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">Rating:</span>
                <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} className="w-16 px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              </div>
              <input value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })} placeholder="Avatar URL" className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <label className="flex items-center gap-2 text-sm text-zinc-400">
                <input type="checkbox" checked={form.featured === 1} onChange={e => setForm({ ...form, featured: e.target.checked ? 1 : 0 })} className="accent-red-600" /> Featured
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
