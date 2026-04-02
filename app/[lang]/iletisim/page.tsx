import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { notFound } from 'next/navigation'
import ContactPageClient from './ContactPageClient'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'tr' ? 'İletişim' : 'Contact',
    description: lang === 'tr'
      ? 'Pointcraft ile iletişime geçin. Projeleriniz için bize ulaşın.'
      : 'Get in touch with Pointcraft. Contact us for your projects.',
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  return <ContactPageClient dict={dict} lang={lang as Locale} />
}
