import { BookOpen, Users, MessageSquare, Star } from 'lucide-react'
import { trpc } from '@/providers/trpc'

export default function AdminDashboard() {
  const { data: stats } = trpc.stats.dashboard.useQuery()
  const { data: recentContacts } = trpc.contact.list.useQuery({ limit: 5 })

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: BookOpen, label: 'Total Courses', value: stats?.totalCourses || 0, color: 'bg-blue-500/10 text-blue-500' },
          { icon: Users, label: 'Active Students', value: '10,000+', color: 'bg-green-500/10 text-green-500' },
          { icon: MessageSquare, label: 'New Contacts (7d)', value: stats?.newContacts7d || 0, color: 'bg-yellow-500/10 text-yellow-500' },
          { icon: Star, label: 'Pending Reviews', value: stats?.pendingReviews || 0, color: 'bg-red-500/10 text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-6">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Contacts</h2>
          {recentContacts && recentContacts.length > 0 ? (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm text-white">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.subject || 'No subject'}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    c.status === 'new' ? 'bg-yellow-500/10 text-yellow-500' :
                    c.status === 'read' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-green-500/10 text-green-500'
                  }`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No recent contacts.</p>
          )}
        </div>

        {/* Activity Overview */}
        <div className="bg-[#111111] border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Platform Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total Testimonials</span>
              <span className="text-sm font-semibold text-white">{stats?.totalTestimonials || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total Reviews</span>
              <span className="text-sm font-semibold text-white">{stats?.totalReviews || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Courses Published</span>
              <span className="text-sm font-semibold text-white">{stats?.totalCourses || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
