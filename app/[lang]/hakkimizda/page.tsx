import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { notFound } from 'next/navigation'
import AboutPageClient from './AboutPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'tr' ? 'Hakkımızda' : 'About Us',
    description: lang === 'tr'
      ? 'Pointcraft dijital ajans hakkında - ekibimiz, misyonumuz ve değerlerimiz.'
      : 'About Pointcraft digital agency - our team, mission and values.',
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <AboutPageClient dict={dict} lang={lang as Locale} />
}
