import { useParams, Link } from 'react-router'
import { ArrowLeft, Clock, BarChart, BookOpen, CheckCircle, Star, User } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import SEO from '@/components/SEO'
import { useState } from 'react'

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [reviewName, setReviewName] = useState('')
  const [reviewEmail, setReviewEmail] = useState('')
  const [reviewContent, setReviewContent] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview')

  const { data: course } = trpc.course.getBySlug.useQuery({ slug: slug || '' })
  const { data: reviews } = trpc.review.listByCourse.useQuery({ courseId: course?.id || 0 }, { enabled: !!course })
  const submitReview = trpc.review.create.useMutation()

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500">Course not found.</p>
          <Link to="/courses" className="text-red-500 hover:text-red-400 mt-4 inline-block">
            Browse all courses
          </Link>
        </div>
      </div>
    )
  }

  const curriculum = course.curriculum ? JSON.parse(course.curriculum as unknown as string) as { title: string; lessons: string[] }[] : []
  const whatYoullLearn = course.whatYoullLearn ? JSON.parse(course.whatYoullLearn as unknown as string) as string[] : []
  const requirements = course.requirements ? JSON.parse(course.requirements as unknown as string) as string[] : []

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    submitReview.mutate({
      courseId: course.id,
      userName: reviewName,
      userEmail: reviewEmail,
      content: reviewContent,
      rating: reviewRating,
    })
    setReviewName('')
    setReviewEmail('')
    setReviewContent('')
    setReviewRating(5)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title={course.metaTitle || `${course.title} | Phase Academy`}
        description={course.metaDescription || course.description || ''}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to courses
        </Link>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img src={course.thumbnail || '/images/course-ethical-hacking.jpg'} alt={course.title} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-[#111111] border border-white/5 rounded-xl p-6 h-fit">
            <h1 className="text-2xl font-bold text-white mb-2">{course.title}</h1>
            <p className="text-sm text-zinc-500 mb-6">{course.shortDescription}</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Clock className="w-4 h-4 text-red-500" />
                {course.duration || 'Self-paced'}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400 capitalize">
                <BarChart className="w-4 h-4 text-red-500" />
                {course.level}
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400 capitalize">
                <BookOpen className="w-4 h-4 text-red-500" />
                {course.category.replace('-', ' ')}
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <span className="text-2xl font-bold text-white">{course.price === 0 || !course.price ? 'Free' : `$${(course.price || 0) / 100}`}</span>
            </div>
            <button className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/5 mb-8">
          {(['overview', 'curriculum', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'text-red-500 border-b-2 border-red-500' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                <p className="text-zinc-400 leading-relaxed">{course.description}</p>
              </div>
              {whatYoullLearn.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {whatYoullLearn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400">
                        <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {requirements.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400">
                        <CheckCircle className="w-5 h-5 text-zinc-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-4">
            {curriculum.length === 0 ? (
              <p className="text-zinc-500">Curriculum details coming soon.</p>
            ) : (
              curriculum.map((module, i) => (
                <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{module.title}</h3>
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-zinc-400">
                        <span className="w-6 h-6 bg-red-600/10 rounded flex items-center justify-center text-xs text-red-500">{j + 1}</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="bg-[#111111] border border-white/5 rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < (review.rating || 5) ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
                      ))}
                    </div>
                    <p className="text-zinc-400 text-sm">{review.content}</p>
                    <div className="flex items-center gap-2 mt-4">
                      <User className="w-5 h-5 text-zinc-600" />
                      <span className="text-sm text-zinc-500">{review.userName || 'Anonymous'}</span>
                    </div>
                    {review.reply && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-sm text-red-500 font-medium">Reply from Phase Academy:</p>
                        <p className="text-sm text-zinc-500 mt-1">{review.reply}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-zinc-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-xl p-6 h-fit">
              <h3 className="text-lg font-semibold text-white mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-500">Rating:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setReviewRating(i + 1)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-5 h-5 ${i < reviewRating ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Your review"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submitReview.isPending}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
