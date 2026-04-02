'use client'

import { useState, useEffect } from 'react'
import {
  Box, Typography, Container, Card, CardContent, CircularProgress, 
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Submission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  message: string
  read: boolean
  createdAt: string
}

export default function AdminPanelClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  // Basic authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/admin/submissions')
      if (!res.ok) throw new Error('API hatası')
      const data = await res.json()
      setSubmissions(data.submissions)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Very simple pseudo-login for demonstration purposes
    if (password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Hatalı şifre')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentStatus })
      })
      fetchSubmissions()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    
    try {
      await fetch(`/api/admin/submissions?id=${id}`, { method: 'DELETE' })
      fetchSubmissions()
    } catch (err) {
      console.error(err)
    }
  }

  const openDetails = (sub: Submission) => {
    setSelectedSubmission(sub)
    if (!sub.read) markAsRead(sub.id, false)
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Card sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Admin Paneli Girişi</Typography>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Şifre (admin123)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <Button variant="contained" type="submit" fullWidth sx={{ background: '#F6BC0D', color: '#000', fontWeight: 'bold' }}>
              Giriş Yap
            </Button>
          </form>
        </Card>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A1A' }}>
          Gelen Mesajlar
        </Typography>
        <Button onClick={handleLogout} variant="outlined" color="error">Çıkış Yap</Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress sx={{ color: '#F6BC0D' }} /></Box>
        ) : error ? (
          <Typography sx={{ color: 'red', p: 4, textAlign: 'center' }}>Hata: {error}</Typography>
        ) : submissions.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>Henüz hiç mesajınız yok.</Typography>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ background: '#f8f9fa' }}>
                <TableRow>
                  <TableCell><strong>Durum</strong></TableCell>
                  <TableCell><strong>Tarih</strong></TableCell>
                  <TableCell><strong>Ad Soyad</strong></TableCell>
                  <TableCell><strong>Konu/Hizmet</strong></TableCell>
                  <TableCell><strong>E-posta</strong></TableCell>
                  <TableCell align="right"><strong>İşlem</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id} sx={{ background: sub.read ? 'transparent' : 'rgba(246, 188, 13, 0.05)' }}>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={sub.read ? "Okundu" : "Yeni"} 
                        sx={{ 
                          fontWeight: 'bold',
                          background: sub.read ? '#e0e0e0' : '#F6BC0D',
                          color: sub.read ? '#666' : '#000'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{new Date(sub.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                    <TableCell sx={{ fontWeight: sub.read ? 'normal' : 'bold' }}>{sub.name}</TableCell>
                    <TableCell>{sub.service || '-'}</TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => markAsRead(sub.id, sub.read)} color={sub.read ? 'default' : 'success'} title="Okunma Durumunu Değiştir">
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton onClick={() => openDetails(sub)} color="primary" title="Mesajı Görüntüle">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteSubmission(sub.id)} color="error" title="Sil">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Dialog open={!!selectedSubmission} onClose={() => setSelectedSubmission(null)} maxWidth="sm" fullWidth>
        {selectedSubmission && (
          <>
            <DialogTitle sx={{ fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
              Mesaj Detayı
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Gönderen</Typography>
                  <Typography variant="body1" fontWeight="bold">{selectedSubmission.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">E-posta</Typography>
                    <Typography variant="body2">{selectedSubmission.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Telefon</Typography>
                    <Typography variant="body2">{selectedSubmission.phone || '-'}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Şirket</Typography>
                    <Typography variant="body2">{selectedSubmission.company || '-'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">İlgilenilen Hizmet</Typography>
                    <Typography variant="body2">{selectedSubmission.service || '-'}</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, p: 2, background: '#f8f9fa', borderRadius: 2, border: '1px solid #eee' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Mesaj</Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{selectedSubmission.message}</Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, borderTop: '1px solid #eee' }}>
              <Button onClick={() => setSelectedSubmission(null)} variant="contained" sx={{ background: '#1A1A1A', color: '#fff', '&:hover': { background: '#333' } }}>
                Kapat
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  )
}
