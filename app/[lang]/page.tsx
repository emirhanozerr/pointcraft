import { getDictionary, hasLocale, type Locale } from './dictionaries'
import { notFound } from 'next/navigation'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import StatsSection from '@/components/home/StatsSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ContactCTA from '@/components/home/ContactCTA'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <HeroSection dict={dict} lang={lang as Locale} />
      <ServicesSection dict={dict} />
      <StatsSection dict={dict} />
      <PortfolioSection dict={dict} lang={lang as Locale} />
      <TestimonialsSection dict={dict} lang={lang as Locale} />
      <ContactCTA dict={dict} lang={lang as Locale} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pointcraft',
            url: 'https://pointcraft.com',
            description: lang === 'tr'
              ? 'Dijital ajans - sosyal medya, yazılım, SEO, video ve reklam hizmetleri'
              : 'Digital agency - social media, software, SEO, video and advertising services',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Istanbul',
              addressCountry: 'TR',
            },
            sameAs: [
              'https://instagram.com/pointcrafttr',
              'https://linkedin.com/company/pointcrafttr',
              'https://twitter.com/pointcrafttr',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: lang === 'tr' ? 'Dijital Hizmetler' : 'Digital Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Management' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Video Creation' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software Development' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Production' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Advertising' } },
              ],
            },
          }),
        }}
      />
    </>
  )
}
