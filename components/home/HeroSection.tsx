'use client'

import { Box, Container, Typography, Button, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Link from 'next/link'
import type { Locale } from '@/app/[lang]/dictionaries'

interface HeroSectionProps {
  dict: {
    hero: {
      badge: string; title1: string; titleHighlight: string; title2: string
      description: string; cta1: string; cta2: string; scrollText: string
    }
  }
  lang: Locale
}

export default function HeroSection({ dict, lang }: HeroSectionProps) {
  return (
    <Box
      id="hero-section"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Video Background */}
      <Box className="hero-video-container" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <Box sx={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: {
            xs: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.15) 100%), radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.15) 100%)',
            md: 'radial-gradient(ellipse at 0% 40%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 35%, transparent 70%), radial-gradient(ellipse at 85% -10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 30%, transparent 50%), radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.8) 0%, transparent 35%), radial-gradient(ellipse at 70% 60%, rgba(0,212,170,0.15) 0%, transparent 60%)'
          }
        }} />
      </Box>

      {/* Overlay */}
      <Box className="hero-overlay" />

      {/* Floating Decorative Elements */}
      <Box sx={{ position: 'absolute', top: '15%', left: '8%', zIndex: 2, opacity: 0.15 }}>
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '20px', border: '2px solid rgba(108,60,225,0.5)', transform: 'rotate(45deg)' }} />
        </motion.div>
      </Box>
      <Box sx={{ position: 'absolute', top: '25%', right: '12%', zIndex: 2, opacity: 0.12 }}>
        <motion.div animate={{ y: [15, -15, 15], rotate: [0, 180, 360] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
          <Box sx={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(0,212,170,0.6)' }} />
        </motion.div>
      </Box>
      <Box sx={{ position: 'absolute', bottom: '20%', left: '15%', zIndex: 2, opacity: 0.1 }}>
        <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <Box sx={{ width: 40, height: 40, background: 'linear-gradient(135deg, rgba(255,107,53,0.3), transparent)', borderRadius: '8px', transform: 'rotate(30deg)' }} />
        </motion.div>
      </Box>
      <Box sx={{ position: 'absolute', bottom: '30%', right: '8%', zIndex: 2, opacity: 0.08 }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <Box sx={{ width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,60,225,0.3), transparent)' }} />
        </motion.div>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pt: { xs: 12, md: 0 } }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
            {/* Badge */}
            <Chip
              label={dict.hero.badge}
              sx={{
                mb: 3,
                background: 'rgba(108, 60, 225, 0.15)',
                color: '#8B5CF6',
                border: '1px solid rgba(108, 60, 225, 0.3)',
                fontWeight: 600,
                fontSize: '0.85rem',
                px: 1,
                '& .MuiChip-label': { px: 1.5 },
              }}
            />

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                maxWidth: 900,
                color: '#1A1A1A'
              }}
            >
              {dict.hero.title1}{' '}
              <Box
                component="span"
                className="gradient-text"
                sx={{
                  display: 'inline',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 4s ease infinite',
                  '@keyframes gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                {dict.hero.titleHighlight}
              </Box>
              <br />
              {dict.hero.title2}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: 'rgba(0,0,0,0.6)',
                lineHeight: 1.8,
                maxWidth: 640,
                mb: 5,
                mx: { xs: 'auto', md: 0 },
              }}
            >
              {dict.hero.description}
            </Typography>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href={`/${lang}/iletisim`} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #6C3CE1, #8B5CF6)',
                      boxShadow: '0 8px 30px rgba(108,60,225,0.4)',
                      borderRadius: '14px',
                      py: 1.8,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 700,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5521C4, #6C3CE1)',
                        boxShadow: '0 12px 40px rgba(108,60,225,0.5)',
                      },
                    }}
                  >
                    {dict.hero.cta1}
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href={`/${lang}/hizmetler`} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                      borderColor: 'rgba(0,0,0,0.15)',
                      color: '#1A1A1A',
                      borderRadius: '14px',
                      py: 1.8,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'rgba(108,60,225,0.5)',
                        background: 'rgba(108,60,225,0.08)',
                      },
                    }}
                  >
                    {dict.hero.cta2}
                  </Button>
                </Link>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <Box sx={{
        position: 'absolute', bottom: { xs: 16, md: 40 }, left: '50%', transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
      }}>
        <Typography sx={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          {dict.hero.scrollText}
        </Typography>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <KeyboardArrowDownIcon sx={{ color: 'rgba(0,0,0,0.4)', fontSize: 28 }} />
        </motion.div>
      </Box>
    </Box>
  )
}
