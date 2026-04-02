import Link from 'next/link'
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Divider } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
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
        width: 600, height: 2, background: 'linear-gradient(90deg, transparent, rgba(108,60,225,0.5), transparent)',
      }} />

      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand Column */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Link href={`/${lang}`} style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6C3CE1, #00D4AA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', fontWeight: 800, color: '#fff',
                }}>P</Box>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: '"Outfit"', color: '#1A1A1A' }}>
                  Point<Box component="span" sx={{ color: '#6C3CE1' }}>craft</Box>
                </Typography>
              </Box>
            </Link>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, mb: 3, maxWidth: 350, mx: { xs: 'auto', md: 0 } }}>
              {dict.footer.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {[
                { icon: <InstagramIcon />, color: '#E1306C' },
                { icon: <LinkedInIcon />, color: '#0077B5' },
                { icon: <TwitterIcon />, color: '#1DA1F2' },
                { icon: <YouTubeIcon />, color: '#FF0000' },
              ].map((social, i) => (
                <IconButton key={i} sx={{
                  color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '10px', transition: 'all 0.3s',
                  '&:hover': { color: social.color, borderColor: social.color, background: `${social.color}15` },
                }}>
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
                <Link key={key} href={`/${lang}/hizmetler`} style={{ textDecoration: 'none' }}>
                  <Typography sx={{
                    color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem',
                    transition: 'all 0.2s', '&:hover': { color: '#6C3CE1', pl: 0.5 },
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
              {dict.footer.company}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {(['home', 'about', 'portfolio', 'blog', 'contact'] as const).map((key) => {
                const hrefMap: Record<string, string> = {
                  home: '', about: '/hakkimizda', portfolio: '/portfolio', blog: '/blog', contact: '/iletisim',
                }
                return (
                  <Link key={key} href={`/${lang}${hrefMap[key]}`} style={{ textDecoration: 'none' }}>
                    <Typography sx={{
                      color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem',
                      transition: 'all 0.2s', '&:hover': { color: '#6C3CE1', pl: 0.5 },
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
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem', mb: 2.5 }}>
              {dict.footer.newsletter.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                placeholder={dict.footer.newsletter.placeholder}
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.04)',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(108,60,225,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#6C3CE1' },
                    '& input': { color: '#1A1A1A', fontSize: '0.88rem' },
                    '& input::placeholder': { color: 'rgba(0,0,0,0.4)' },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  minWidth: 48, borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6C3CE1, #8B5CF6)',
                  '&:hover': { background: 'linear-gradient(135deg, #5521C4, #6C3CE1)' },
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(0,0,0,0.08)', mt: 6, mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, textAlign: 'center' }}>
          <Typography sx={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.82rem' }}>
            {dict.footer.copyright}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[dict.footer.privacy, dict.footer.terms, dict.footer.cookies].map((item, i) => (
              <Typography key={i} component="a" href="#" sx={{
                color: 'rgba(0,0,0,0.5)', fontSize: '0.82rem', textDecoration: 'none',
                '&:hover': { color: '#6C3CE1' },
              }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
