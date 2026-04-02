// Root page - redirects to default locale via proxy.ts
// This file should not normally be reached since proxy.ts redirects / to /tr
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/tr')
}
