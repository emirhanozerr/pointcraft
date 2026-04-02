'use client'

import { useState } from 'react'
import { Box, Container, Typography, Chip, Avatar, Rating, IconButton } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { testimonials } from '@/data/testimonials'
import type { Locale } from '@/app/[lang]/dictionaries'

interface TestimonialsSectionProps {
  dict: { testimonials: { badge: string; title: string; description: string } }
  lang: Locale
}

export default function TestimonialsSection({ dict, lang }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const t = testimonials[current]

  return (
    <Box component="section" id="testimonials-section" className="section-padding" sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(246, 188, 13, 0.04), transparent)', filter: 'blur(60px)',
      }} />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip label={dict.testimonials.badge} sx={{
              mb: 2, background: 'rgba(246, 188, 13, 0.1)', color: '#B88E00',
              border: '1px solid rgba(246, 188, 13, 0.25)', fontWeight: 600,
            }} />
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A' }}>
              {dict.testimonials.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.1rem' }}>
              {dict.testimonials.description}
            </Typography>
          </Box>
        </motion.div>

        {/* Testimonial Card */}
        <Box sx={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Box
                className="glass"
                sx={{ p: { xs: 4, md: 6 }, borderRadius: '24px', textAlign: 'center', position: 'relative' }}
              >
                <FormatQuoteIcon sx={{
                  fontSize: 48, color: 'rgba(246, 188, 13, 0.2)', position: 'absolute',
                  top: 20, left: { xs: '50%', md: 24 }, transform: { xs: 'translateX(-50%)', md: 'none' }
                }} />

                <Avatar
                  sx={{
                    width: 72, height: 72, mx: 'auto', mb: 3, mt: { xs: 5, md: 0 },
                    border: '3px solid rgba(246, 188, 13, 0.4)',
                    background: 'linear-gradient(135deg, #F6BC0D, #00D4AA)',
                    fontSize: '1.5rem', fontWeight: 700,
                    color: '#000',
                  }}
                >
                  {t.name.charAt(0)}
                </Avatar>

                <Rating value={t.rating} readOnly sx={{
                  mb: 3, '& .MuiRating-iconFilled': { color: '#F4A261' },
                  '& .MuiRating-iconEmpty': { color: 'rgba(0,0,0,0.15)' },
                }} />

                <Typography sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' }, lineHeight: 1.8,
                  color: 'rgba(0,0,0,0.7)', mb: 4, fontStyle: 'italic', maxWidth: 600, mx: 'auto',
                }}>
                  &ldquo;{lang === 'tr' ? t.contentTr : t.contentEn}&rdquo;
                </Typography>

                <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#1A1A1A' }}>{t.name}</Typography>
                <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.88rem' }}>
                  {t.role}, {t.company}
                </Typography>
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, alignItems: 'center' }}>
            <IconButton onClick={prev} sx={{
              border: '1px solid rgba(0,0,0,0.1)', color: '#1A1A1A',
              '&:hover': { borderColor: '#F6BC0D', background: 'rgba(246, 188, 13, 0.1)' },
            }}>
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {testimonials.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setCurrent(i)}
                  sx={{
                    width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === current ? 'linear-gradient(90deg, #F6BC0D, #00D4AA)' : 'rgba(0,0,0,0.15)',
                    transition: 'all 0.3s', cursor: 'pointer',
                  }}
                />
              ))}
            </Box>

            <IconButton onClick={next} sx={{
              border: '1px solid rgba(0,0,0,0.1)', color: '#1A1A1A',
              '&:hover': { borderColor: '#F6BC0D', background: 'rgba(246, 188, 13, 0.1)' },
            }}>
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
