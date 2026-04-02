import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import ThemeProvider from '@/components/providers/ThemeProvider'
import StoreProvider from '@/components/providers/StoreProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getDictionary, hasLocale, type Locale } from './dictionaries'

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isTr = lang === 'tr'

  return {
    title: {
      default: isTr
        ? 'Pointcraft | Dijital Ajans - Sosyal Medya, Yazılım, SEO & Video'
        : 'Pointcraft | Digital Agency - Social Media, Software, SEO & Video',
      template: isTr ? '%s | Pointcraft Dijital Ajans' : '%s | Pointcraft Digital Agency',
    },
    description: isTr
      ? 'Pointcraft dijital ajans olarak sosyal medya yönetimi, AI video oluşturma, yazılım hizmetleri, video çekim, SEO ve reklam hizmetleri sunuyoruz.'
      : 'Pointcraft digital agency offers social media management, AI video creation, software services, video production, SEO and advertising services.',
    keywords: isTr
      ? ['dijital ajans', 'sosyal medya yönetimi', 'AI video', 'yazılım', 'SEO', 'reklam', 'Istanbul']
      : ['digital agency', 'social media management', 'AI video', 'software', 'SEO', 'advertising', 'Istanbul'],
    authors: [{ name: 'Pointcraft' }],
    creator: 'Pointcraft',
    openGraph: {
      type: 'website',
      locale: isTr ? 'tr_TR' : 'en_US',
      alternateLocale: isTr ? 'en_US' : 'tr_TR',
      url: 'https://pointcraft.com',
      siteName: 'Pointcraft',
      title: isTr ? 'Pointcraft | Dijital Ajans' : 'Pointcraft | Digital Agency',
      description: isTr
        ? 'Markanızı dijital dünyada zirveye taşıyoruz.'
        : 'We take your brand to the top in the digital world.',
    },
    twitter: {
      card: 'summary_large_image',
      title: isTr ? 'Pointcraft | Dijital Ajans' : 'Pointcraft | Digital Agency',
      description: isTr
        ? 'Markanızı dijital dünyada zirveye taşıyoruz.'
        : 'We take your brand to the top in the digital world.',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://pointcraft.com/${lang}`,
      languages: {
        'tr': '/tr',
        'en': '/en',
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang} className={`${notoSerif.variable}`}>
      <body suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StoreProvider>
          <ThemeProvider>
            <Navbar dict={dict} lang={lang as Locale} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer dict={dict} lang={lang as Locale} />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
