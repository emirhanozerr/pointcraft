import { redirect } from 'next/navigation'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  params: Promise<{ lang: Locale }>
}

export default async function GizlilikPage({ params }: Props) {
  const { lang } = await params
  redirect(`/${lang}/politikalar`)
}
