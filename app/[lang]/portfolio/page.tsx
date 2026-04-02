import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { notFound } from 'next/navigation'
import PortfolioPageClient from '@/app/[lang]/portfolio/PortfolioPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'tr' ? 'Portföy' : 'Portfolio',
    description: lang === 'tr'
      ? 'Pointcraft tarafından tamamlanan projeler ve çalışmalar.'
      : 'Projects and works completed by Pointcraft.',
  }
}

export default async function PortfolioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <PortfolioPageClient dict={dict} lang={lang as Locale} />
}
