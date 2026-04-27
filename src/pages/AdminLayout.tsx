import { Routes, Route, Link, useLocation, Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import {
  LayoutDashboard, BookOpen, MessageSquare, Image, Star, Mail, Settings, Shield, LogOut
} from 'lucide-react'
import AdminDashboard from './admin/AdminDashboard'
import AdminCourses from './admin/AdminCourses'
import AdminTestimonials from './admin/AdminTestimonials'
import AdminGallery from './admin/AdminGallery'
import AdminReviews from './admin/AdminReviews'
import AdminContacts from './admin/AdminContacts'
import AdminSettings from './admin/AdminSettings'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
  { icon: MessageSquare, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: Image, label: 'Gallery', path: '/admin/gallery' },
  { icon: Star, label: 'Reviews', path: '/admin/reviews' },
  { icon: Mail, label: 'Contacts', path: '/admin/contacts' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export default function AdminLayout() {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const isAdmin = user?.role === 'admin'

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-zinc-500 mt-2">You need admin privileges to access this area.</p>
          <Link to="/" className="text-red-500 hover:text-red-400 mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 flex-shrink-0 fixed h-full overflow-y-auto">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Phase Academy" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-semibold">Phase Academy</span>
          </Link>
          <p className="text-xs font-mono text-zinc-600 mt-1 ml-11">Admin Panel</p>
        </div>

        <nav className="px-4 pb-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
                  isActive
                    ? 'bg-red-600/10 text-white border-l-2 border-red-600'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <img src={user.avatar || '/images/avatar-1.jpg'} alt="" className="w-8 h-8 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{user.name || 'Admin'}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
          </div>
          <a
            href="/api/logout"
            className="flex items-center gap-2 mt-3 text-xs text-zinc-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3 h-3" /> Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/courses" element={<AdminCourses />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/gallery" element={<AdminGallery />} />
            <Route path="/reviews" element={<AdminReviews />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
