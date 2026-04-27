import { useEffect } from 'react'
import { useLocation } from 'react-router'

interface SEOProps {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
  schema?: Record<string, unknown>
}

export default function SEO({
  title = 'Phase Academy | Cybersecurity Training Platform',
  description = 'Master cybersecurity with hands-on courses in ethical hacking, network security, web penetration testing, and more. Start learning today.',
  ogTitle,
  ogDescription,
  ogImage = '/images/logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical,
  schema,
}: SEOProps) {
  const location = useLocation()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://phaseacademy.com'
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`

  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        if (property) meta.setAttribute('property', name)
        else meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    setMeta('description', description)
    setMeta('og:title', ogTitle || title, true)
    setMeta('og:description', ogDescription || description, true)
    setMeta('og:type', ogType, true)
    setMeta('og:url', canonicalUrl, true)
    setMeta('og:image', `${baseUrl}${ogImage}`, true)
    setMeta('twitter:card', twitterCard)
    setMeta('twitter:title', ogTitle || title)
    setMeta('twitter:description', ogDescription || description)
    setMeta('twitter:image', `${baseUrl}${ogImage}`)

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonicalUrl

    // JSON-LD Schema
    if (schema) {
      let script = document.getElementById('jsonld-schema') as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = 'jsonld-schema'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(schema)
    }

    return () => {
      // cleanup on unmount not needed for this SPA
    }
  }, [title, description, ogTitle, ogDescription, ogImage, ogType, twitterCard, canonicalUrl, schema, baseUrl])

  return null
}
