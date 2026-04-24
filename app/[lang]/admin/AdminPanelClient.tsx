'use client'

import { useState, useEffect } from 'react'
import {
  Box, Typography, Container, Card, CircularProgress, 
  Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Tabs, Tab, Alert
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '@/lib/axios'
import CoreInput from '@/components/ui/CoreInput'
import Loading from '@/components/ui/Loading'

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

interface Subscriber {
  id: string
  email: string
  createdAt: string
}

export default function AdminPanelClient() {
  const queryClient = useQueryClient()
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const { register, handleSubmit } = useForm({ defaultValues: { password: '' } })

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const { data: submissionsData, isLoading: submissionsLoading, error: submissionsError } = useQuery<{ submissions: Submission[] }>({
    queryKey: ['submissions'],
    queryFn: () => api.get('/admin/submissions').then(res => res.data),
    enabled: isAuthenticated,
  })

  const { data: subscribersData, isLoading: subscribersLoading } = useQuery<Subscriber[]>({
    queryKey: ['subscribers'],
    queryFn: () => api.get('/admin/subscribers').then(res => res.data),
    enabled: isAuthenticated,
  })

  const updateSubmissionMutation = useMutation({
    mutationFn: ({ id, read }: { id: string, read: boolean }) => 
      api.patch('/admin/submissions', { id, read }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] })
  })

  const deleteSubmissionMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/submissions?id=${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] })
  })

  const deleteSubscriberMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/subscribers?id=${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscribers'] })
  })

  const handleLogin = (data: { password: string }) => {
    if (data.password === 'admin123') {
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth', 'true')
    } else {
      alert('Hatalı şifre')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  const markAsRead = (id: string, currentStatus: boolean) => {
    updateSubmissionMutation.mutate({ id, read: !currentStatus })
  }

  const deleteSubmission = (id: string) => {
    if (confirm('Silmek istediğinize emin misiniz?')) {
      deleteSubmissionMutation.mutate(id)
    }
  }

  const openDetails = (sub: Submission) => {
    setSelectedSubmission(sub)
    if (!sub.read) markAsRead(sub.id, false)
  }

  const deleteSubscriber = (id: string) => {
    if (confirm('Bu aboneyi silmek istediğinize emin misiniz?')) {
      deleteSubscriberMutation.mutate(id)
    }
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Card sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Admin Paneli Girişi</Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CoreInput
              type="password"
              label="Şifre"
              placeholder="admin123"
              registration={register('password', { required: true })}
            />
            <Button variant="contained" type="submit" fullWidth sx={{ background: '#F6BC0D', color: '#000', fontWeight: 'bold' }}>
              Giriş Yap
            </Button>
          </Box>
        </Card>
      </Container>
    )
  }

  const submissions = submissionsData?.submissions || []
  const subscribers = subscribersData || []

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1A1A' }}>
          Admin Paneli
        </Typography>
        <Button onClick={handleLogout} variant="outlined" color="error">Çıkış Yap</Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} TabIndicatorProps={{ style: { background: '#F6BC0D' } }}>
          <Tab label="Gelen Mesajlar" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#F6BC0D' } }} />
          <Tab label="Bülten Aboneleri" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#F6BC0D' } }} />
        </Tabs>
      </Box>

      <Loading isLoading={submissionsLoading || subscribersLoading}>
        {tabIndex === 0 && (
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {submissionsError ? (
              <Alert severity="error" sx={{ m: 2 }}>Hata: {(submissionsError as Error).message}</Alert>
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
                    {submissions.map((sub: Submission) => (
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
        )}

        {tabIndex === 1 && (
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {subscribers.length === 0 ? (
              <Typography sx={{ p: 4, textAlign: 'center', color: 'gray' }}>Henüz abone olan kimse yok.</Typography>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead sx={{ background: '#f8f9fa' }}>
                    <TableRow>
                      <TableCell><strong>E-posta</strong></TableCell>
                      <TableCell><strong>Kayıt Tarihi</strong></TableCell>
                      <TableCell align="right"><strong>İşlem</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {subscribers.map((sub: Subscriber) => (
                      <TableRow key={sub.id}>
                        <TableCell sx={{ fontWeight: 'bold' }}>{sub.email}</TableCell>
                        <TableCell>{new Date(sub.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => deleteSubscriber(sub.id)} color="error" title="Sil">
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
        )}
      </Loading>

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
