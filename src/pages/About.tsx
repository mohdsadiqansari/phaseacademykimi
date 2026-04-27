import { Shield, Target, Users, Award } from 'lucide-react'
import SEO from '@/components/SEO'

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <SEO
        title="About Phase Academy | Our Mission & Team"
        description="Phase Academy is a leading cybersecurity training platform. Learn about our mission, values, and expert instructors."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Our Mission</h1>
          <p className="text-zinc-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            At Phase Academy, we believe that the best defense is a well-trained offense. Our mission is to democratize cybersecurity education and produce the next generation of ethical hackers and security professionals who can defend our digital world.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Shield, title: 'Integrity', desc: 'We teach ethical hacking with a strong emphasis on responsible disclosure and legal compliance.' },
            { icon: Target, title: 'Precision', desc: 'Every course is meticulously crafted by active practitioners to reflect real-world scenarios.' },
            { icon: Users, title: 'Community', desc: 'We foster a global network of learners who support each other in their security journey.' },
            { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards of educational quality and student outcomes.' },
          ].map((v, i) => (
            <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{v.title}</h3>
              <p className="text-sm text-zinc-500 mt-2">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Expert-Crafted Courses' },
              { value: '10,000+', label: 'Students Worldwide' },
              { value: '98%', label: 'Student Satisfaction' },
              { value: '24/7', label: 'Community Support' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Dr. Marcus Webb', role: 'Lead Instructor - Ethical Hacking', bio: 'Former NSA red team operator with 15+ years in offensive security. OSCP, OSCE, and CISSP certified.' },
              { name: 'Sarah Chen', role: 'Instructor - Network Security', bio: 'CCIE Security and former Cisco TAC engineer. Specializes in enterprise network defense and SD-WAN security.' },
              { name: 'James Okafor', role: 'Instructor - Malware Analysis', bio: 'Threat intelligence researcher at a Fortune 500 company. Expert in reverse engineering and APT analysis.' },
            ].map((person, i) => (
              <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-6 text-center">
                <div className="w-20 h-20 bg-red-600/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                <p className="text-xs font-mono text-red-500 mt-1">{person.role}</p>
                <p className="text-sm text-zinc-500 mt-3">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
