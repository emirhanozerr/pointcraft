'use client'

import { Box, Container, Typography, Chip, Grid, TextField, Button, MenuItem, Alert } from '@mui/material'
import { motion } from 'framer-motion'
import SendIcon from '@mui/icons-material/Send'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { updateField, setStatus, resetForm } from '@/lib/store/slices/contactSlice'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  dict: {
    contact: {
      badge: string; title: string; description: string
      form: {
        name: string; email: string; phone: string; company: string
        service: string; selectService: string; message: string
        messagePlaceholder: string; submit: string; sending: string
        success: string; error: string
      }
      info: {
        address: string; addressValue: string
        phone: string; phoneValue: string
        email: string; emailValue: string
        hours: string; hoursValue: string
      }
    }
    services: { items: Record<string, { title: string }> }
  }
  lang: Locale
}

const serviceKeys = ['socialMedia', 'aiVideo', 'software', 'videoProduction', 'seo', 'ads']

export default function ContactPageClient({ dict, lang }: Props) {
  const dispatch = useAppDispatch()
  const { formData, status } = useAppSelector((state) => state.contact)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(setStatus('sending'))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        dispatch(setStatus('success'))
        setTimeout(() => dispatch(resetForm()), 5000)
      } else {
        dispatch(setStatus('error'))
      }
    } catch {
      dispatch(setStatus('error'))
    }
  }

  const contactInfoItems = [
    { icon: <LocationOnIcon />, label: dict.contact.info.address, value: dict.contact.info.addressValue, color: '#F6BC0D' },
    { icon: <PhoneIcon />, label: dict.contact.info.phone, value: dict.contact.info.phoneValue, color: '#00D4AA' },
    { icon: <EmailIcon />, label: dict.contact.info.email, value: dict.contact.info.emailValue, color: '#FF6B35' },
    { icon: <AccessTimeIcon />, label: dict.contact.info.hours, value: dict.contact.info.hoursValue, color: '#48CAE4' },
  ]

  return (
    <Box sx={{ pt: 14 }}>
      <Box className="section-padding" sx={{ pb: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label={dict.contact.badge} sx={{
              mb: 2, background: 'rgba(0,212,170,0.1)', color: '#00D4AA',
              border: '1px solid rgba(0,212,170,0.25)', fontWeight: 600,
            }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A' }}>
              {dict.contact.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              {dict.contact.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                className="glass"
                sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px' }}
              >
                {status === 'success' && (
                  <Alert severity="success" sx={{
                    mb: 3, borderRadius: '12px',
                    background: 'rgba(0,212,170,0.1)', color: '#00D4AA',
                    '& .MuiAlert-icon': { color: '#00D4AA' },
                  }}>
                    {dict.contact.form.success}
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert severity="error" sx={{
                    mb: 3, borderRadius: '12px',
                    background: 'rgba(255,107,53,0.1)', color: '#FF6B35',
                  }}>
                    {dict.contact.form.error}
                  </Alert>
                )}

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label={dict.contact.form.name} required
                      value={formData.name}
                      onChange={(e) => dispatch(updateField({ field: 'name', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label={dict.contact.form.email} type="email" required
                      value={formData.email}
                      onChange={(e) => dispatch(updateField({ field: 'email', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label={dict.contact.form.phone}
                      value={formData.phone}
                      onChange={(e) => dispatch(updateField({ field: 'phone', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth label={dict.contact.form.company}
                      value={formData.company}
                      onChange={(e) => dispatch(updateField({ field: 'company', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      select fullWidth label={dict.contact.form.service}
                      value={formData.service}
                      onChange={(e) => dispatch(updateField({ field: 'service', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    >
                      <MenuItem value="">{dict.contact.form.selectService}</MenuItem>
                      {serviceKeys.map((key) => (
                        <MenuItem key={key} value={key}>
                          {dict.services.items[key]?.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth multiline rows={5} label={dict.contact.form.message}
                      placeholder={dict.contact.form.messagePlaceholder} required
                      value={formData.message}
                      onChange={(e) => dispatch(updateField({ field: 'message', value: e.target.value }))}
                      sx={{ '& .MuiInputLabel-root': { color: 'rgba(0,0,0,0.6)' } }}
                    />
                  </Grid>
                </Grid>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={status === 'sending'}
                    endIcon={<SendIcon />}
                    sx={{
                      mt: 3, py: 1.8, fontSize: '1rem', fontWeight: 700,
                      background: 'linear-gradient(135deg, #F6BC0D, #FDCB35)',
                      color: '#000',
                      borderRadius: '14px',
                      boxShadow: '0 8px 30px rgba(246, 188, 13, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #D9A70F, #F6BC0D)',
                      },
                    }}
                  >
                    {status === 'sending' ? dict.contact.form.sending : dict.contact.form.submit}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactInfoItems.map((item, i) => (
                  <Box
                    key={i}
                    className="glass card-hover"
                    sx={{ p: 3, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    <Box sx={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${item.color}20`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color: item.color, flexShrink: 0,
                    }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.82rem', mb: 0.3 }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A' }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{
                mt: 3, borderRadius: '16px', height: { xs: 300, md: 350 }, overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.6705838212197!2d29.087695476925845!3d41.03246237134712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac856701d7865%3A0x1cff39ef5c1a6fd7!2sExen%20Residence!5e0!3m2!1str!2str!4v1775137371334!5m2!1str!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
