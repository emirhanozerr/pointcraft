'use client'

import { Box, Container, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import VerifiedIcon from '@mui/icons-material/Verified'
import Link from 'next/link'
import type { Locale } from '@/app/[lang]/dictionaries'

interface ContactCTAProps {
  dict: { cta: { title: string; description: string; button: string; stats1: string; stats2: string; stats3: string } }
  lang: Locale
}

export default function ContactCTA({ dict, lang }: ContactCTAProps) {
  return (
    <Box component="section" id="cta-section" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{
            borderRadius: '28px', position: 'relative', overflow: 'hidden',
            p: { xs: 5, md: 8 }, textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid rgba(246, 188, 13, 0.2)',
          }}>
            {/* Soft Background Image (Pure Abstract Design) */}
            <Box sx={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'url(/images/home/cta-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.6,
              mixBlendMode: 'multiply'
            }} />
            
            {/* Decorative elements */}
            <Box sx={{
              position: 'absolute', top: -80, right: -80, width: 200, height: 200,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(246, 188, 13, 0.3), transparent)', filter: 'blur(40px)',
              zIndex: 1, pointerEvents: 'none'
            }} />
            <Box sx={{
              position: 'absolute', bottom: -60, left: -60, width: 180, height: 180,
              borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.25), transparent)', filter: 'blur(40px)',
              zIndex: 1, pointerEvents: 'none'
            }} />

            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, mb: 2, position: 'relative', color: '#1A1A1A'
            }}>
              {dict.cta.title}
            </Typography>
            <Typography sx={{
              color: 'rgba(0,0,0,0.6)', fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: 600, mx: 'auto', mb: 5, lineHeight: 1.8, position: 'relative',
            }}>
              {dict.cta.description}
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/${lang}/iletisim`} style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #F6BC0D, #FDCB35)',
                    boxShadow: '0 8px 30px rgba(246, 188, 13, 0.4)',
                    color: '#000',
                    borderRadius: '14px', py: 2, px: 5, fontSize: '1.05rem', fontWeight: 700,
                    position: 'relative',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #D9A70F, #F6BC0D)',
                      boxShadow: '0 12px 40px rgba(246, 188, 13, 0.5)',
                    },
                  }}
                >
                  {dict.cta.button}
                </Button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <Box sx={{
              display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',
              justifyContent: 'center', gap: { xs: 3, md: 6 }, mt: 6,
              flexWrap: 'wrap', position: 'relative',
            }}>
              {[
                { icon: <SupportAgentIcon />, text: dict.cta.stats1 },
                { icon: <RocketLaunchIcon />, text: dict.cta.stats2 },
                { icon: <VerifiedIcon />, text: dict.cta.stats3 },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(0,0,0,0.6)' }}>
                  <Box sx={{ color: '#F6BC0D' }}>{item.icon}</Box>
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
