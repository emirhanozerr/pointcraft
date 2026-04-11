import { Metadata } from 'next'
import AdminPanelClient from './AdminPanelClient'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Pointcraft',
  description: 'Admin paneli üzerinden gelen iletişim mesajlarını yönetin.',
}

export default function AdminPage() {
  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      <AdminPanelClient />
    </div>
  )
}
