import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { notFound } from 'next/navigation'
import ServicesPageClient from './ServicesPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'tr' ? 'Hizmetlerimiz' : 'Our Services',
    description: lang === 'tr'
      ? 'Sosyal medya yönetimi, AI video oluşturma, yazılım, video çekim, SEO ve reklam hizmetlerimiz.'
      : 'Our social media management, AI video creation, software, video production, SEO and advertising services.',
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <ServicesPageClient dict={dict} lang={lang as Locale} />
}
