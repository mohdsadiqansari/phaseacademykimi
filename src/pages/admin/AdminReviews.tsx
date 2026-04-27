import { useState } from 'react'
import { CheckCircle, XCircle, Trash2, Star, MessageSquare } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminReviews() {
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [filter, setFilter] = useState('all')

  const { data: reviews, refetch } = trpc.review.listAll.useQuery({ status: filter !== 'all' ? filter : undefined })
  const approveMutation = trpc.review.approve.useMutation({ onSuccess: () => refetch() })
  const rejectMutation = trpc.review.reject.useMutation({ onSuccess: () => refetch() })
  const replyMutation = trpc.review.reply.useMutation({ onSuccess: () => { refetch(); setReplyingTo(null); setReplyText(''); } })
  const deleteMutation = trpc.review.delete.useMutation({ onSuccess: () => refetch() })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Manage Reviews</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
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

      <div className="space-y-4">
        {reviews?.map((review) => (
          <div key={review.id} className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{review.userName || 'Anonymous'}</p>
                  <p className="text-xs text-zinc-500">{review.userEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  review.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                  review.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {review.status}
                </span>
              </div>
            </div>

            <div className="flex gap-0.5 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < (review.rating || 5) ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
              ))}
            </div>

            <p className="text-sm text-zinc-400 mt-3">{review.content}</p>

            {review.reply && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-red-500 font-medium">Reply:</p>
                <p className="text-sm text-zinc-400 mt-1">{review.reply}</p>
              </div>
            )}

            {replyingTo === review.id ? (
              <div className="mt-4 flex gap-2">
                <input
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"
                />
                <button
                  onClick={() => replyMutation.mutate({ id: review.id, reply: replyText })}
                  disabled={replyMutation.isPending}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg disabled:opacity-50"
                >
                  Reply
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-4">
                {review.status === 'pending' && (
                  <>
                    <button
                      onClick={() => approveMutation.mutate({ id: review.id })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600/10 text-green-500 text-xs rounded-lg hover:bg-green-600/20 transition-colors"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate({ id: review.id })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600/10 text-red-500 text-xs rounded-lg hover:bg-red-600/20 transition-colors"
                    >
                      <XCircle className="w-3 h-3" /> Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => setReplyingTo(review.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 text-zinc-400 text-xs rounded-lg hover:bg-white/10 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" /> Reply
                </button>
                <button
                  onClick={() => { if (confirm('Delete this review?')) deleteMutation.mutate({ id: review.id }) }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/5 text-zinc-400 text-xs rounded-lg hover:text-red-500 hover:bg-red-600/10 transition-colors ml-auto"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
