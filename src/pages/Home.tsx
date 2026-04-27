import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Users, BookOpen, Trophy, Clock, Shield, UserCheck, Award, MessageSquare, Star, ChevronDown, Mail, Phone, MapPin } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import SEO from '@/components/SEO'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const catalogRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { data: featuredCourses } = trpc.course.getFeatured.useQuery()
  const { data: allCourses } = trpc.course.list.useQuery({})
  const { data: testimonials } = trpc.testimonial.list.useQuery({ featured: true })
  const { data: galleryImages } = trpc.gallery.list.useQuery({})
  const { data: settings } = trpc.settings.get.useQuery()
  const { data: categories } = trpc.course.getCategories.useQuery()

  const submitContact = trpc.contact.submit.useMutation()

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = [statsRef, featuredRef, catalogRef, whyRef, testimonialsRef, galleryRef, ctaRef, contactRef]
    sections.forEach((ref) => {
      if (ref.current) {
        const items = ref.current.querySelectorAll('.scroll-animate')
        items.forEach((item) => observer.observe(item))
      }
    })

    return () => observer.disconnect()
  }, [featuredCourses, allCourses, testimonials, galleryImages])

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    submitContact.mutate({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    })
    form.reset()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEO
        title="Phase Academy | Cybersecurity Training Platform"
        description="Master cybersecurity with hands-on courses in ethical hacking, network security, web penetration testing, and more. Start learning today."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Phase Academy',
          url: 'https://phaseacademy.com',
          logo: 'https://phaseacademy.com/images/logo.png',
          description: 'Master the Art of Cyber Defense',
          sameAs: [settings?.socialTwitter, settings?.socialLinkedin, settings?.socialGithub].filter(Boolean),
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="animate-in fade-in zoom-in-50 slide-in-from-top-10 duration-1000 mb-8">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto group animate-float">
              <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse group-hover:bg-red-500/50 transition-colors duration-500"></div>
              <img src="/images/logo.png" alt="Phase Academy" className="hero-logo relative w-full h-full object-contain rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-all duration-700 ease-out" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 uppercase leading-[1.1] animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-1000">
            "To us, your firewall<br className="hidden md:block" /> is just a <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-900 animate-pulse">loading screen</span>."
          </h1>
          <p className="mt-8 text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
            <span className="text-red-500 font-medium tracking-widest text-sm sm:text-base uppercase">— Anonymous Black Hat Hacker</span>
            <br /><br />
            In a world where every system is a target, ignorance is your only true vulnerability. Master the dark arts of offensive security to anticipate the attack and forge impenetrable cyber defenses.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/courses"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white/20 hover:border-red-500 text-white font-medium rounded-lg transition-all hover:text-red-500"
            >
              Free Consultation
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-zinc-600" />
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="bg-[#111111] border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, value: '50+', label: 'Courses' },
              { icon: Users, value: '10,000+', label: 'Students' },
              { icon: Trophy, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="scroll-animate text-center border-r border-white/5 last:border-0">
                <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section ref={featuredRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Courses</h2>
              <p className="text-zinc-500 mt-2">Hand-picked by our security experts</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses?.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section ref={catalogRef} className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Course Catalog</h2>
            <p className="text-zinc-500 mt-2">From beginner fundamentals to advanced exploitation techniques</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="px-4 py-2 bg-red-600 text-white text-sm rounded-full">All</span>
            {categories?.map((cat) => (
              <span key={cat} className="px-4 py-2 bg-[#1A1A1A] text-zinc-400 text-sm rounded-full hover:bg-white/5 transition-colors">
                {cat.replace('-', ' ')}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses?.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Why Phase Academy?</h2>
              <p className="text-zinc-500 mt-4 leading-relaxed">
                We don't just teach theory. We prepare you for real-world cyber warfare with hands-on labs, expert instructors, and a thriving community.
              </p>
            </div>
            <div className="space-y-8">
              {[
                { icon: Shield, title: 'Real-World Labs', desc: 'Hands-on environments that mirror actual enterprise infrastructures.' },
                { icon: UserCheck, title: 'Expert Instructors', desc: 'Learn from active penetration testers and security researchers.' },
                { icon: Award, title: 'Certification Ready', desc: 'Courses aligned with OSCP, CEH, CompTIA Security+, and more.' },
                { icon: MessageSquare, title: 'Community Access', desc: 'Join a network of 10,000+ cybersecurity professionals.' },
              ].map((item, i) => (
                <div key={i} className="scroll-animate flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors">
                  <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Student Success Stories</h2>
            <p className="text-zinc-500 mt-2">Hear from cybersecurity professionals who trained with us</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials?.slice(0, 4).map((t) => (
              <div key={t.id} className="scroll-animate bg-[#0A0A0A] border border-white/5 rounded-xl p-6 hover:border-red-500/30 transition-colors">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < (t.rating || 5) ? 'text-red-500 fill-red-500' : 'text-zinc-700'}`} />
                  ))}
                </div>
                <p className="text-zinc-400 italic text-sm leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3 mt-6">
                  <img src={t.avatar || '/images/avatar-1.jpg'} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-red-500/30" />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs font-mono text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Inside Our Labs</h2>
            <p className="text-zinc-500 mt-2">Real environments. Real tools. Real skills.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages?.slice(0, 6).map((img) => (
              <div key={img.id} className="scroll-animate group relative aspect-[4/3] rounded-xl overflow-hidden">
                <img src={img.url} alt={img.caption || ''} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-sm text-white font-medium">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consult CTA */}
      <section ref={ctaRef} className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1A0505]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-animate">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Not Sure Where to Start?</h2>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Talk to our cybersecurity advisors for free. We'll analyze your goals and recommend the perfect learning path.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/contact" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all hover:scale-105">
                Book Free Consultation
              </Link>
              <Link to="/courses" className="px-8 py-3 border border-white/20 hover:border-red-500 text-white font-medium rounded-lg transition-all hover:text-red-500">
                Browse All Courses
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-mono text-zinc-600">
              <span className="flex items-center gap-1"><span className="text-green-500">&#10003;</span> No credit card required</span>
              <span className="flex items-center gap-1"><span className="text-green-500">&#10003;</span> 15-minute session</span>
              <span className="flex items-center gap-1"><span className="text-green-500">&#10003;</span> Expert advisors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="scroll-animate">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Get in Touch</h2>
              <p className="text-zinc-500 mt-2">Have questions? We're here to help.</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail className="w-5 h-5 text-red-500" />
                  {settings?.contactEmail || 'hello@phaseacademy.com'}
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="w-5 h-5 text-red-500" />
                  {settings?.contactPhone || '+1 (555) 123-4567'}
                </div>
                <div className="flex items-start gap-3 text-zinc-400">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                  {settings?.contactAddress || '123 Cyber Lane, Tech District, San Francisco, CA 94105'}
                </div>
              </div>
            </div>
            <div className="scroll-animate">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input name="name" type="text" placeholder="Name" required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                <input name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                <input name="subject" type="text" placeholder="Subject" className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none" />
                <textarea name="message" placeholder="Message" rows={4} required className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none resize-none" />
                <button type="submit" disabled={submitContact.isPending} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
                  {submitContact.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CourseCard({ course }: { course: { id: number; title: string; slug: string; shortDescription: string | null; category: string; level: string; duration: string | null; thumbnail: string | null; featured: number | null } }) {
  return (
    <Link to={`/courses/${course.slug}`} className="featured-card catalog-card group bg-[#111111] border border-white/5 rounded-xl overflow-hidden hover:border-red-500/30 transition-all hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img src={course.thumbnail || '/images/course-ethical-hacking.jpg'} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
      </div>
      <div className="p-5">
        {course.featured === 1 && (
          <span className="inline-block px-2 py-1 bg-red-600/20 text-red-500 text-xs font-medium rounded mb-2">Featured</span>
        )}
        <h3 className="text-lg font-semibold text-white group-hover:text-red-500 transition-colors">{course.title}</h3>
        <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{course.shortDescription || course.title}</p>
        <div className="flex items-center gap-3 mt-3 text-xs font-mono text-zinc-600">
          <span className="capitalize">{course.category.replace('-', ' ')}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="capitalize">{course.level}</span>
          {course.duration && (
            <><span className="w-1 h-1 rounded-full bg-zinc-700" /><span>{course.duration}</span></>
          )}
        </div>
      </div>
    </Link>
  )
}
