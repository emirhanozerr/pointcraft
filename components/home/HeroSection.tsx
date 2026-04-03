'use client'

import React, { useState, useEffect } from 'react'
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
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(window.innerWidth < 900 ? '/videos/hero1.mp4' : '/videos/hero.mp4')
    }
    
    // Set initial value
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
        {videoSrc && (
          <Box
            component="video"
            key={videoSrc} // Anahtar ekleyerek React'in video elementini yeniden oluşturmasını ve yeni kaynağı yüklemesini sağlıyoruz
            autoPlay
            muted
            loop
            playsInline
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={videoSrc} type="video/mp4" />
          </Box>
        )}

        {/* 
        <Box sx={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: {
            xs: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.15) 100%), radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.15) 100%)',
            md: 'radial-gradient(ellipse at 0% 40%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 35%, transparent 70%), radial-gradient(ellipse at 85% -10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 30%, transparent 50%), radial-gradient(ellipse at 50% -10%, rgba(255,255,255,0.8) 0%, transparent 35%), radial-gradient(ellipse at 70% 60%, rgba(0,212,170,0.15) 0%, transparent 60%)'
          }
        }} /> 
        */}
      </Box>

      {/* Overlay */}
      {/* <Box className="hero-overlay" /> */}

      {/* Floating Decorative Elements */}
      <Box sx={{ position: 'absolute', top: '15%', left: '8%', zIndex: 2, opacity: 0.15 }}>
        <motion.div animate={{ y: [-20, 20, -20] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '20px', border: '2px solid rgba(246,188,13,0.5)', transform: 'rotate(45deg)' }} />
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
          <Box sx={{ width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(246, 188, 13, 0.3), transparent)' }} />
        </motion.div>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pt: { xs: 12, md: 0 } }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: { xs: '45vh', md: '55vh' } }}>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href={`/${lang}/iletisim`} style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #F6BC0D, #FDCB35)',
                      color: '#000',
                      boxShadow: '0 8px 30px rgba(246, 188, 13, 0.4)',
                      borderRadius: '14px',
                      py: 1.8,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 700,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #D9A70F, #F6BC0D)',
                        boxShadow: '0 12px 40px rgba(246, 188, 13, 0.5)',
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
                        borderColor: 'rgba(246, 188, 13, 0.5)',
                        background: 'rgba(246, 188, 13, 0.08)',
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
