import { useState } from 'react'
import { Link } from 'react-router'
import { Search, ArrowRight, Filter } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import SEO from '@/components/SEO'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLevel, setActiveLevel] = useState('all')

  const { data: courses } = trpc.course.list.useQuery({
    search: search || undefined,
    category: activeCategory !== 'all' ? activeCategory : undefined,
    level: activeLevel !== 'all' ? activeLevel : undefined,
  })
  const { data: categories } = trpc.course.getCategories.useQuery()

  const levels = ['beginner', 'intermediate', 'advanced']

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title="Cybersecurity Courses | Phase Academy"
        description="Browse our complete catalog of cybersecurity courses. Ethical hacking, network security, web penetration testing, malware analysis, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Browse All Courses</h1>
          <p className="text-zinc-500 mt-3 max-w-2xl">
            Master cybersecurity with our hands-on courses designed by industry experts. From beginner fundamentals to advanced exploitation techniques.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#111111] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-zinc-500" />
            <span className="text-sm text-zinc-500">Filters:</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${activeCategory === 'all' ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-zinc-400 hover:bg-white/5'}`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-colors capitalize ${activeCategory === cat ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-zinc-400 hover:bg-white/5'}`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Level tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveLevel('all')}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${activeLevel === 'all' ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-zinc-400 hover:bg-white/5'}`}
          >
            All Levels
          </button>
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-2 text-sm rounded-full transition-colors capitalize ${activeLevel === level ? 'bg-red-600 text-white' : 'bg-[#1A1A1A] text-zinc-400 hover:bg-white/5'}`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="group bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.thumbnail || '/images/course-ethical-hacking.jpg'}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                {course.featured === 1 && (
                  <span className="inline-block px-2 py-1 bg-red-600/20 text-red-500 text-xs font-medium rounded mb-2">
                    Featured
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                  {course.shortDescription || ''}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs font-mono text-zinc-600">
                  <span className="capitalize">{course.category.replace('-', ' ')}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="capitalize">{course.level}</span>
                  {course.duration && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>{course.duration}</span>
                    </>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-400">
                    {course.price === 0 ? 'Free' : `$${(course.price || 0) / 100}`}
                  </span>
                  <span className="text-sm text-red-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Enroll Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {courses?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
