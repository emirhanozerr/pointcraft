'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider, CircularProgress, Alert } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import SendIcon from '@mui/icons-material/Send'
import type { Locale } from '@/app/[lang]/dictionaries'

interface FooterProps {
  dict: {
    nav: { home: string; services: string; about: string; portfolio: string; blog: string; contact: string }
    services: { items: { socialMedia: { title: string }; aiVideo: { title: string }; software: { title: string }; videoProduction: { title: string }; seo: { title: string }; ads: { title: string } } }
    footer: {
      description: string; services: string; company: string; legal: string;
      privacy: string; terms: string; cookies: string; copyright: string
      newsletter: { title: string; description: string; placeholder: string; button: string }
    }
  }
  lang: Locale
}

export default function Footer({ dict, lang }: FooterProps) {
  const serviceKeys = ['socialMedia', 'aiVideo', 'software', 'videoProduction', 'seo', 'ads'] as const
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setStatus('success')
      setMessage(data.message || 'Başarıyla abone oldunuz!')
      setEmail('')
      
      // 3 saniye sonra mesajı gizle
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (err: unknown) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Bir hata oluştu')
    }
  }

  return (
    <Box
      component="footer"
      id="site-footer"
      sx={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(248,249,250,1) 10%)',
        pt: 10,
        pb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Glow */}
      <Box sx={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 2, background: 'linear-gradient(90deg, transparent, rgba(246, 188, 13, 0.5), transparent)',
      }} />

      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Link href={`/${lang}`} prefetch={false}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', mb: 2 }}>
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="Pointcraft Logo"
                  sx={{ height: 45, width: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </Box>
            </Link>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, mb: 3, maxWidth: 350, mx: { xs: 'auto', md: 0 } }}>
              {dict.footer.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {[
                { icon: <InstagramIcon />, color: '#E1306C', href: 'https://www.instagram.com/pointcrafttr/' },
                { icon: <FacebookIcon />, color: '#1877F2', href: 'https://tr-tr.facebook.com/61578396466024/' },
                { icon: <LinkedInIcon />, color: '#0077B5', href: 'https://www.linkedin.com/company/pointcraft' },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '10px', transition: 'all 0.3s',
                    '&:hover': { color: social.color, borderColor: social.color, background: `${social.color}15` },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Services Column */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2.5, color: '#1A1A1A' }}>
              {dict.footer.services}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {serviceKeys.map((key) => (
                <Link key={key} href={`/${lang}/hizmetler#${key}`} prefetch={false} style={{ textDecoration: 'none' }}>
                  <Typography sx={{
                    color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem',
                    transition: 'all 0.2s', '&:hover': { color: '#F6BC0D', pl: 0.5 },
                  }}>
                    {dict.services.items[key].title}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Company Column */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 2.5, color: '#1A1A1A' }}>
              Hızlı Erişim
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {(['home', 'about', 'contact'] as const).map((key) => {
                const hrefMap: Record<string, string> = {
                  home: '', about: '/hakkimizda', portfolio: '/portfolio', blog: '/blog', contact: '/iletisim',
                }
                return (
                  <Link key={key} href={`/${lang}${hrefMap[key]}`} prefetch={false} style={{ textDecoration: 'none' }}>
                    <Typography sx={{
                      color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem',
                      transition: 'all 0.2s', '&:hover': { color: '#F6BC0D', pl: 0.5 },
                    }}>
                      {dict.nav[key]}
                    </Typography>
                  </Link>
                )
              })}
            </Box>
          </Grid>

          {/* Newsletter Column */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 1, color: '#1A1A1A' }}>
              {dict.footer.newsletter.title}
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder={dict.footer.newsletter.placeholder}
                  type="email"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      background: 'rgba(0,0,0,0.04)',
                      '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                      '&:hover fieldset': { borderColor: 'rgba(246, 188, 13, 0.4)' },
                      '&.Mui-focused fieldset': { borderColor: '#F6BC0D' },
                      '& input': { color: '#1A1A1A', fontSize: '0.88rem' },
                      '& input::placeholder': { color: 'rgba(0,0,0,0.4)' },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={status === 'loading'}
                  sx={{
                    minWidth: 48, borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F6BC0D, #FDCB35)',
                    color: '#000',
                    '&:hover': { background: 'linear-gradient(135deg, #D9A70F, #F6BC0D)' },
                    '&.Mui-disabled': { background: '#e0e0e0' }
                  }}
                >
                  {status === 'loading' ? <CircularProgress size={18} color="inherit" /> : <SendIcon sx={{ fontSize: 18 }} />}
                </Button>
              </Box>
              {message && (
                <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mt: 1, py: 0, borderRadius: '8px' }}>
                  {message}
                </Alert>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)', mt: 6, mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, textAlign: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.82rem' }}>
            {dict.footer.copyright}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/${lang}/politikalar`} prefetch={false} style={{ textDecoration: 'none' }}>
              <Typography sx={{
                color: 'rgba(0,0,0,0.5)', fontSize: '0.82rem',
                transition: 'all 0.2s',
                '&:hover': { color: '#F6BC0D' },
              }}>
               Gizlilik, KVKK ve Çerez Politikası
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
