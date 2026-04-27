import { useState } from 'react'
import { Trash2, Mail, CheckCircle, Reply } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminContacts() {
  const [filter, setFilter] = useState('all')
  const { data: contacts, refetch } = trpc.contact.list.useQuery({ status: filter !== 'all' ? filter : undefined, limit: 100 })
  const markRead = trpc.contact.markRead.useMutation({ onSuccess: () => refetch() })
  const markReplied = trpc.contact.markReplied.useMutation({ onSuccess: () => refetch() })
  const deleteMutation = trpc.contact.delete.useMutation({ onSuccess: () => refetch() })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Contact Submissions</h1>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-lg capitalize transition-colors ${
                filter === f ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-zinc-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Name</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Email</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Message</th>
                <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Status</th>
                <th className="text-right px-4 py-3 text-xs font-mono uppercase tracking-wider text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-sm text-white">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Mail className="w-3 h-3" /> {c.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-400">{c.subject || '-'}</td>
                  <td className="px-4 py-3 text-sm text-zinc-400 max-w-xs truncate">{c.message}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      c.status === 'new' ? 'bg-yellow-500/10 text-yellow-500' :
                      c.status === 'read' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {c.status === 'new' && (
                        <button onClick={() => markRead.mutate({ id: c.id })} className="p-1.5 text-zinc-500 hover:text-blue-500 transition-colors" title="Mark as read">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {c.status !== 'replied' && (
                        <button onClick={() => markReplied.mutate({ id: c.id })} className="p-1.5 text-zinc-500 hover:text-green-500 transition-colors" title="Mark as replied">
                          <Reply className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => { if (confirm('Delete this contact?')) deleteMutation.mutate({ id: c.id }) }} className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors" title="Delete">
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
    </div>
  )
}
