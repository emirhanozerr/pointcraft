import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { notFound } from 'next/navigation'
import BlogPageClient from './BlogPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Blog',
    description: lang === 'tr'
      ? 'Dijital pazarlama, SEO, sosyal medya ve teknoloji hakkında güncel yazılar.'
      : 'Latest articles about digital marketing, SEO, social media and technology.',
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <BlogPageClient dict={dict} lang={lang as Locale} />
}
