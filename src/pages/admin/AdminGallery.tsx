import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '', category: '', order: 0 })

  const { data: images, refetch } = trpc.gallery.list.useQuery({})
  const createMutation = trpc.gallery.create.useMutation({ onSuccess: () => { refetch(); setIsModalOpen(false); setForm({ url: '', caption: '', category: '', order: 0 }); } })
  const deleteMutation = trpc.gallery.delete.useMutation({ onSuccess: () => refetch() })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate(form)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Manage Gallery</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((img) => (
          <div key={img.id} className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover" />
              <button
                onClick={() => { if (confirm('Delete this image?')) deleteMutation.mutate({ id: img.id }) }}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm text-white truncate">{img.caption || 'Untitled'}</p>
              <p className="text-xs text-zinc-500">{img.category || 'Uncategorized'}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add Image</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="Image URL" required className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <input value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} placeholder="Caption" className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={createMutation.isPending} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50">
                  {createMutation.isPending ? 'Adding...' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
