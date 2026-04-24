'use client'

import { Box, Container, Typography, Chip, Grid, Button, Alert } from '@mui/material'
import { motion } from 'framer-motion'
import SendIcon from '@mui/icons-material/Send'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import CoreInput from '@/components/ui/CoreInput'
import CoreSelect from '@/components/ui/CoreSelect'
import type { Locale } from '@/app/[lang]/dictionaries'

interface FormValues {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

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

const SERVICE_KEYS = ['socialMedia', 'aiVideo', 'software', 'videoProduction', 'seo', 'ads']

const CONTACT_INFO = [
  { icon: <LocationOnIcon />, key: 'address', color: '#F6BC0D' },
  { icon: <PhoneIcon />, key: 'phone', color: '#00D4AA' },
  { icon: <EmailIcon />, key: 'email', color: '#FF6B35' },
  { icon: <AccessTimeIcon />, key: 'hours', color: '#48CAE4' },
] as const

export default function ContactPageClient({ dict, lang }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>()

  const { mutate, status } = useMutation({
    mutationFn: (data: FormValues) => api.post('/contact', data),
    onSuccess: () => setTimeout(reset, 5000),
  })

  const serviceOptions = SERVICE_KEYS.map((key) => ({
    value: key,
    label: dict.services.items[key]?.title ?? key,
  }))

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
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Box
                component="form"
                onSubmit={handleSubmit((data) => mutate(data))}
                className="glass"
                sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px' }}
              >
                {status === 'success' && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: '12px', background: 'rgba(0,212,170,0.1)', color: '#00D4AA', '& .MuiAlert-icon': { color: '#00D4AA' } }}>
                    {dict.contact.form.success}
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}>
                    {dict.contact.form.error}
                  </Alert>
                )}

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CoreInput
                      fullWidth label={dict.contact.form.name} required
                      registration={register('name', { required: true })}
                      error={!!errors.name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CoreInput
                      fullWidth label={dict.contact.form.email} type="email" required
                      registration={register('email', { required: true, pattern: /^\S+@\S+$/i })}
                      error={!!errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CoreInput
                      fullWidth label={dict.contact.form.phone}
                      registration={register('phone')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CoreInput
                      fullWidth label={dict.contact.form.company}
                      registration={register('company')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CoreSelect
                      label={dict.contact.form.service}
                      registration={register('service')}
                      options={serviceOptions}
                      defaultLabel={dict.contact.form.selectService}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CoreInput
                      fullWidth multiline rows={5}
                      label={dict.contact.form.message}
                      placeholder={dict.contact.form.messagePlaceholder}
                      required
                      registration={register('message', { required: true })}
                      error={!!errors.message}
                    />
                  </Grid>
                </Grid>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={status === 'pending'}
                    endIcon={<SendIcon />}
                    sx={{
                      mt: 3, py: 1.8, fontSize: '1rem', fontWeight: 700,
                      background: 'linear-gradient(135deg, #F6BC0D, #FDCB35)',
                      color: '#000', borderRadius: '14px',
                      boxShadow: '0 8px 30px rgba(246, 188, 13, 0.3)',
                      '&:hover': { background: 'linear-gradient(135deg, #D9A70F, #F6BC0D)' },
                    }}
                  >
                    {status === 'pending' ? dict.contact.form.sending : dict.contact.form.submit}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {CONTACT_INFO.map(({ icon, key, color }) => (
                  <Box
                    key={key}
                    className="glass card-hover"
                    sx={{ p: 3, borderRadius: '16px', display: 'flex', alignItems: 'center', gap: 3 }}
                  >
                    <Box sx={{
                      width: 48, height: 48, borderRadius: '12px',
                      background: `${color}20`, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      color, flexShrink: 0,
                    }}>
                      {icon}
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.82rem', mb: 0.3 }}>
                        {dict.contact.info[key as keyof typeof dict.contact.info]}
                      </Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#1A1A1A' }}>
                        {dict.contact.info[`${key}Value` as keyof typeof dict.contact.info]}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, borderRadius: '16px', height: { xs: 300, md: 350 }, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.6705838212197!2d29.087695476925845!3d41.03246237134712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac856701d7865%3A0x1cff39ef5c1a6fd7!2sExen%20Residence!5e0!3m2!1str!2str!4v1775137371334!5m2!1str!2str"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
