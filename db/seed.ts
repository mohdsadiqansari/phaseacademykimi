import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const DATABASE_URL = "mysql://2S63jsWJHQ4fTDk.root:d6MzlqAIMRw6wfYg2ztmZeeUlPKWCNP4@ep-t4ni387b5e83b7519dc8.epsrv-t4n281l4mrmemi4zls9a.ap-southeast-1.privatelink.aliyuncs.com:4000/19dc471a-9fe2-81b9-8000-096c70dadeaf";

const pool = mysql.createPool(DATABASE_URL);
const db = drizzle(pool, { schema, mode: "planetscale" });

async function seed() {
  // ─── Site Settings ───
  const existingSettings = await db.select().from(schema.siteSettings).limit(1);
  if (existingSettings.length === 0) {
    await db.insert(schema.siteSettings).values({
      siteTitle: "Phase Academy",
      siteDescription: "Master the Art of Cyber Defense",
      contactEmail: "hello@phaseacademy.com",
      contactPhone: "+1 (555) 123-4567",
      contactAddress: "123 Cyber Lane, Tech District, San Francisco, CA 94105",
      defaultMetaTitle: "Phase Academy | Cybersecurity Training Platform",
      defaultMetaDescription: "Master cybersecurity with hands-on courses in ethical hacking, network security, web penetration testing, and more.",
    });
    console.log("✓ Site settings seeded");
  }

  // ─── Courses ───
  const existingCourses = await db.select().from(schema.courses).limit(1);
  if (existingCourses.length === 0) {
    await db.insert(schema.courses).values([
      {
        title: "Complete Ethical Hacking Bootcamp",
        slug: "complete-ethical-hacking-bootcamp",
        description: "Master the art of penetration testing with hands-on labs, real-world scenarios, and expert instruction. From reconnaissance to exploitation, this course covers the entire kill chain.",
        shortDescription: "From reconnaissance to exploitation — master the full kill chain.",
        category: "ethical-hacking" as any,
        level: "beginner" as any,
        duration: "40 hours",
        price: 0,
        thumbnail: "/images/course-ethical-hacking.jpg",
        featured: 1,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Reconnaissance", lessons: ["Passive Recon", "Active Recon", "OSINT Techniques"] },
          { title: "Scanning & Enumeration", lessons: ["Port Scanning", "Service Enumeration", "Vulnerability Scanning"] },
          { title: "Exploitation", lessons: ["Metasploit Basics", "Web Exploitation", "Privilege Escalation"] },
          { title: "Post-Exploitation", lessons: ["Persistence", "Data Exfiltration", "Covering Tracks"] },
          { title: "Reporting", lessons: ["Documentation", "Executive Summaries", "Remediation"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Perform comprehensive penetration tests", "Use industry-standard tools like Metasploit and Burp Suite", "Identify and exploit common vulnerabilities", "Write professional security reports"]) as any,
        requirements: JSON.stringify(["Basic Linux knowledge", "Understanding of networking fundamentals", "A computer with 8GB+ RAM"]) as any,
        metaTitle: "Complete Ethical Hacking Bootcamp | Phase Academy",
        metaDescription: "Learn ethical hacking from scratch. Hands-on labs, real-world scenarios, expert instruction. Start your cybersecurity career today.",
      },
      {
        title: "Advanced Network Security",
        slug: "advanced-network-security",
        description: "Deep dive into enterprise network defense. Learn to design, implement, and maintain secure network architectures against sophisticated threats.",
        shortDescription: "Design and defend enterprise-grade network architectures.",
        category: "network-security" as any,
        level: "intermediate" as any,
        duration: "32 hours",
        price: 0,
        thumbnail: "/images/course-network-security.jpg",
        featured: 0,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Network Architecture", lessons: ["Segmentation Strategies", "Zero Trust Design", "SDN Security"] },
          { title: "Firewall & IDS", lessons: ["Firewall Configuration", "IDS/IPS Deployment", "SIEM Integration"] },
          { title: "Wireless Security", lessons: ["WPA3 Analysis", "Rogue AP Detection", "Wireless Pentesting"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Design secure network architectures", "Configure enterprise firewalls and IDS", "Implement network monitoring solutions", "Defend against lateral movement"]) as any,
        requirements: JSON.stringify(["Networking fundamentals (TCP/IP, OSI model)", "Basic Linux administration", "Familiarity with routing and switching"]) as any,
        metaTitle: "Advanced Network Security | Phase Academy",
        metaDescription: "Master enterprise network defense. Learn secure architecture design, firewall configuration, and intrusion detection systems.",
      },
      {
        title: "Web Application Penetration Testing",
        slug: "web-application-penetration-testing",
        description: "Learn to find and exploit vulnerabilities in web applications. Covers OWASP Top 10, API testing, and modern web frameworks.",
        shortDescription: "Find and exploit web vulnerabilities like a pro.",
        category: "web-security" as any,
        level: "intermediate" as any,
        duration: "28 hours",
        price: 0,
        thumbnail: "/images/course-web-security.jpg",
        featured: 1,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Web Fundamentals", lessons: ["HTTP/HTTPS Deep Dive", "Session Management", "Authentication Mechanisms"] },
          { title: "OWASP Top 10", lessons: ["Injection Attacks", "Broken Authentication", "Sensitive Data Exposure"] },
          { title: "Advanced Techniques", lessons: ["XXE & SSRF", "Deserialization", "Business Logic Flaws"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Identify OWASP Top 10 vulnerabilities", "Test REST and GraphQL APIs", "Use Burp Suite Professional effectively", "Write proof-of-concept exploits"]) as any,
        requirements: JSON.stringify(["Basic web development knowledge", "Understanding of HTTP protocol", "Familiarity with JavaScript"]) as any,
        metaTitle: "Web Application Penetration Testing | Phase Academy",
        metaDescription: "Master web app security testing. Learn OWASP Top 10, API pentesting, and advanced exploitation techniques.",
      },
      {
        title: "Malware Analysis & Reverse Engineering",
        slug: "malware-analysis-reverse-engineering",
        description: "Dissect malware samples, understand their behavior, and learn reverse engineering techniques used by professional threat hunters.",
        shortDescription: "Dissect malware and understand attacker techniques.",
        category: "malware-analysis" as any,
        level: "advanced" as any,
        duration: "48 hours",
        price: 0,
        thumbnail: "/images/course-malware.jpg",
        featured: 0,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Static Analysis", lessons: ["PE File Structure", "String Analysis", "Packer Detection"] },
          { title: "Dynamic Analysis", lessons: ["Sandbox Setup", "Behavioral Analysis", "Memory Forensics"] },
          { title: "Reverse Engineering", lessons: ["x86/x64 Assembly", "IDA Pro & Ghidra", "Deobfuscation"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Analyze malware samples statically and dynamically", "Reverse engineer binary executables", "Set up secure analysis environments", "Write YARA rules for threat detection"]) as any,
        requirements: JSON.stringify(["Solid programming background (C/C++, Python)", "Assembly language basics", "Windows internals knowledge"]) as any,
        metaTitle: "Malware Analysis & Reverse Engineering | Phase Academy",
        metaDescription: "Learn professional malware analysis and reverse engineering. Static analysis, dynamic analysis, and disassembly with industry tools.",
      },
      {
        title: "Digital Forensics Masterclass",
        slug: "digital-forensics-masterclass",
        description: "Comprehensive digital forensics training covering evidence acquisition, analysis, and presentation for legal proceedings.",
        shortDescription: "Master digital evidence collection and analysis.",
        category: "digital-forensics" as any,
        level: "intermediate" as any,
        duration: "36 hours",
        price: 0,
        thumbnail: "/images/course-forensics.jpg",
        featured: 0,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Evidence Acquisition", lessons: ["Disk Imaging", "Memory Dumping", "Mobile Device Seizure"] },
          { title: "File System Analysis", lessons: ["NTFS Deep Dive", "Deleted File Recovery", "Timeline Analysis"] },
          { title: "Network Forensics", lessons: ["Packet Analysis", "Log Correlation", "Traffic Reconstruction"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Acquire digital evidence legally and forensically", "Recover deleted files and analyze file systems", "Correlate logs and reconstruct attack timelines", "Prepare evidence for legal proceedings"]) as any,
        requirements: JSON.stringify(["Basic IT administration skills", "Understanding of file systems", "Attention to detail"]) as any,
        metaTitle: "Digital Forensics Masterclass | Phase Academy",
        metaDescription: "Learn digital forensics from acquisition to courtroom. Evidence handling, file system analysis, and network forensics.",
      },
      {
        title: "Cloud Security Fundamentals",
        slug: "cloud-security-fundamentals",
        description: "Secure cloud infrastructure across AWS, Azure, and GCP. Learn identity management, encryption, and compliance in cloud environments.",
        shortDescription: "Secure AWS, Azure, and GCP like a pro.",
        category: "cloud-security" as any,
        level: "beginner" as any,
        duration: "24 hours",
        price: 0,
        thumbnail: "/images/course-cloud.jpg",
        featured: 1,
        status: "published" as any,
        curriculum: JSON.stringify([
          { title: "Cloud Architecture", lessons: ["Shared Responsibility Model", "IAM Fundamentals", "Virtual Networks"] },
          { title: "Data Protection", lessons: ["Encryption at Rest", "Encryption in Transit", "Key Management"] },
          { title: "Compliance", lessons: ["SOC 2", "GDPR in Cloud", "HIPAA Compliance"] },
        ]) as any,
        whatYoullLearn: JSON.stringify(["Understand cloud security architecture", "Implement IAM policies across providers", "Configure encryption and key management", "Ensure compliance in cloud environments"]) as any,
        requirements: JSON.stringify(["Basic cloud computing concepts", "Understanding of networking", "Familiarity with at least one cloud provider"]) as any,
        metaTitle: "Cloud Security Fundamentals | Phase Academy",
        metaDescription: "Learn cloud security across AWS, Azure, and GCP. IAM, encryption, compliance, and secure architecture design.",
      },
    ]);
    console.log("✓ Courses seeded");
  }

  // ─── Testimonials ───
  const existingTestimonials = await db.select().from(schema.testimonials).limit(1);
  if (existingTestimonials.length === 0) {
    await db.insert(schema.testimonials).values([
      {
        name: "Alex Chen",
        role: "Security Engineer at TechCorp",
        content: "Phase Academy completely transformed my career. The hands-on labs and real-world scenarios prepared me better than any certification exam ever could. I went from help desk to security engineer in 8 months.",
        rating: 5,
        avatar: "/images/avatar-1.jpg",
        featured: 1,
      },
      {
        name: "Sarah Mitchell",
        role: "Penetration Tester at RedTeam Inc",
        content: "The ethical hacking bootcamp is incredibly comprehensive. The instructors are clearly active practitioners, not just academics. The lab environments are realistic — I've encountered similar setups in actual engagements.",
        rating: 5,
        avatar: "/images/avatar-2.jpg",
        featured: 1,
      },
      {
        name: "Marcus Johnson",
        role: "CISO at FinSecure",
        content: "I enrolled my entire security team in Phase Academy courses. The ROI has been phenomenal. Our incident response time decreased by 40% and our threat detection capabilities improved significantly.",
        rating: 5,
        avatar: "/images/avatar-3.jpg",
        featured: 1,
      },
      {
        name: "Emily Rodriguez",
        role: "Cybersecurity Analyst",
        content: "The malware analysis course is world-class. Learning from instructors who actively work in threat intelligence makes all the difference. The reverse engineering modules are challenging but incredibly rewarding.",
        rating: 5,
        avatar: "/images/avatar-4.jpg",
        featured: 1,
      },
    ]);
    console.log("✓ Testimonials seeded");
  }

  // ─── Gallery Images ───
  const existingGallery = await db.select().from(schema.galleryImages).limit(1);
  if (existingGallery.length === 0) {
    await db.insert(schema.galleryImages).values([
      { url: "/images/gallery-lab-1.jpg", caption: "Hands-on Training Lab", category: "labs", order: 1 },
      { url: "/images/gallery-workshop.jpg", caption: "Live Workshop Session", category: "events", order: 2 },
      { url: "/images/gallery-cert.jpg", caption: "Certification Ceremony", category: "events", order: 3 },
      { url: "/images/gallery-team.jpg", caption: "Team Collaboration", category: "team", order: 4 },
      { url: "/images/gallery-hackathon.jpg", caption: "CTF Hackathon Event", category: "events", order: 5 },
      { url: "/images/gallery-server.jpg", caption: "Enterprise Lab Infrastructure", category: "labs", order: 6 },
    ]);
    console.log("✓ Gallery images seeded");
  }

  // ─── Reviews ───
  const existingReviews = await db.select().from(schema.reviews).limit(1);
  if (existingReviews.length === 0) {
    await db.insert(schema.reviews).values([
      {
        courseId: 1,
        userName: "David Park",
        userEmail: "david@example.com",
        content: "Absolutely the best ethical hacking course I've taken. The labs are incredibly realistic.",
        rating: 5,
        status: "approved",
      },
      {
        courseId: 1,
        userName: "Lisa Wang",
        userEmail: "lisa@example.com",
        content: "Great content but I wish there were more advanced modules. Still highly recommended for beginners!",
        rating: 4,
        status: "approved",
      },
      {
        courseId: 3,
        userName: "James Miller",
        userEmail: "james@example.com",
        content: "The web security course helped me land my first bug bounty. The OWASP module is pure gold.",
        rating: 5,
        status: "approved",
      },
      {
        courseId: 6,
        userName: "Anna Kowalski",
        userEmail: "anna@example.com",
        content: "Cloud security content is very relevant and up-to-date. Love the multi-provider approach.",
        rating: 5,
        status: "approved",
      },
    ]);
    console.log("✓ Reviews seeded");
  }

  await pool.end();
  console.log("\n✅ Seed complete!");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
