import { useState } from 'react'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminCourses() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [form, setForm] = useState({
    title: '', slug: '', description: '', shortDescription: '', category: 'ethical-hacking' as 'ethical-hacking' | 'network-security' | 'web-security' | 'malware-analysis' | 'digital-forensics' | 'cloud-security',
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced', duration: '', price: 0, thumbnail: '', featured: 0,
    status: 'published' as 'published' | 'draft', curriculum: '', whatYoullLearn: '', requirements: '',
    metaTitle: '', metaDescription: '',
  })

  const { data: courses, refetch } = trpc.course.list.useQuery({})
  const createMutation = trpc.course.create.useMutation({ onSuccess: () => { refetch(); setIsModalOpen(false); resetForm(); } })
  const updateMutation = trpc.course.update.useMutation({ onSuccess: () => { refetch(); setIsModalOpen(false); setEditingCourse(null); resetForm(); } })
  const deleteMutation = trpc.course.delete.useMutation({ onSuccess: () => refetch() })
  const toggleFeatured = trpc.course.toggleFeatured.useMutation({ onSuccess: () => refetch() })
  const toggleStatus = trpc.course.toggleStatus.useMutation({ onSuccess: () => refetch() })

  const resetForm = () => {
    setForm({
      title: '', slug: '', description: '', shortDescription: '', category: 'ethical-hacking',
      level: 'beginner', duration: '', price: 0, thumbnail: '', featured: 0,
      status: 'published', curriculum: '', whatYoullLearn: '', requirements: '',
      metaTitle: '', metaDescription: '',
    })
  }

  const openEdit = (course: any) => {
    setEditingCourse(course)
    setForm({
      title: course.title,
      slug: course.slug,
      description: course.description || '',
      shortDescription: course.shortDescription || '',
      category: course.category,
      level: course.level,
      duration: course.duration || '',
      price: course.price || 0,
      thumbnail: course.thumbnail || '',
      featured: course.featured,
      status: course.status,
      curriculum: course.curriculum ? JSON.stringify(course.curriculum) : '',
      whatYoullLearn: course.whatYoullLearn ? JSON.stringify(course.whatYoullLearn) : '',
      requirements: course.requirements ? JSON.stringify(course.requirements) : '',
      metaTitle: course.metaTitle || '',
      metaDescription: course.metaDescription || '',
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Manage Courses</h1>
        <button
          onClick={() => { setEditingCourse(null); resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Course
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Title</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Category</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Level</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Featured</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course) => (
                <tr key={course.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail || '/images/course-ethical-hacking.jpg'} alt="" className="w-10 h-10 rounded object-cover" />
                      <span className="text-sm text-white">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400 capitalize">{course.category.replace('-', ' ')}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400 capitalize">{course.level}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus.mutate({ id: course.id })}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        course.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-500/10 text-zinc-500'
                      }`}
                    >
                      {course.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {course.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured.mutate({ id: course.id })}
                      className={`${course.featured ? 'text-red-500' : 'text-zinc-600'}`}
                    >
                      <Star className={`w-4 h-4 ${course.featured ? 'fill-red-500' : ''}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(course)} className="p-1.5 text-zinc-500 hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm('Delete this course?')) deleteMutation.mutate({ id: course.id }) }}
                        className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Slug</label>
                  <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none">
                    {['ethical-hacking', 'network-security', 'web-security', 'malware-analysis', 'digital-forensics', 'cloud-security'].map(c => (
                      <option key={c} value={c}>{c.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value as any })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none">
                    {['beginner', 'intermediate', 'advanced'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Duration</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Price (cents)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Thumbnail URL</label>
                  <input value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Curriculum (JSON array)</label>
                <textarea value={form.curriculum} onChange={e => setForm({ ...form, curriculum: e.target.value })} rows={2} placeholder='[{"title":"Module 1","lessons":["Lesson 1"]}]' className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none font-mono text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">What You'll Learn (JSON array)</label>
                  <textarea value={form.whatYoullLearn} onChange={e => setForm({ ...form, whatYoullLearn: e.target.value })} rows={2} placeholder='["Skill 1", "Skill 2"]' className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none font-mono text-xs" />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Requirements (JSON array)</label>
                  <textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={2} placeholder='["Req 1", "Req 2"]' className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none resize-none font-mono text-xs" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Meta Title</label>
                  <input value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-500 uppercase mb-1 block">Meta Description</label>
                  <input value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-zinc-400">
                  <input type="checkbox" checked={form.featured === 1} onChange={e => setForm({ ...form, featured: e.target.checked ? 1 : 0 })} className="accent-red-600" />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-400">
                  <input type="checkbox" checked={form.status === 'published'} onChange={e => setForm({ ...form, status: e.target.checked ? 'published' : 'draft' })} className="accent-red-600" />
                  Published
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancel</button>
                <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingCourse ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
