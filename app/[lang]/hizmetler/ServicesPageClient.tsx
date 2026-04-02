'use client'

import { Box, Container, Typography, Chip, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  dict: {
    services: {
      badge: string; title: string; description: string
      items: Record<string, { title: string; description: string; features: string[] }>
    }
  }
  lang: Locale
}

export default function ServicesPageClient({ dict, lang }: Props) {
  return (
    <Box sx={{ pt: 14 }}>
      {/* Page Header */}
      <Box className="section-padding" sx={{ pb: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label={dict.services.badge} sx={{
              mb: 2, background: 'rgba(0,212,170,0.1)', color: '#00D4AA',
              border: '1px solid rgba(0,212,170,0.25)', fontWeight: 600,
            }} />
            <Typography variant="h1" sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A'
            }}>
              {dict.services.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              {dict.services.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Service Details */}
      <Container maxWidth="lg" sx={{ pb: 12 }}>
        {services.map((service, index) => {
          const Icon = service.icon
          const content = dict.services.items[service.id]
          const isEven = index % 2 === 0

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box className="service-card-hover" sx={{
                mb: 6, borderRadius: '24px', overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'all 0.4s',
                '&:hover': {
                  borderColor: 'rgba(108,60,225,0.3)',
                  boxShadow: `0 20px 60px ${service.glowColor.replace('0.3', '0.1')}`,
                },
              }}>
                <Grid container>
                  {/* Visual Side */}
                  <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 0, md: isEven ? 0 : 1 }, position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{
                      height: { xs: 240, md: '100%' }, minHeight: { md: 350 },
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Box
                        component="img"
                        src={service.image}
                        alt={content?.title}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          opacity: 0.9,
                          transition: 'transform 0.6s ease',
                          '.service-card-hover:hover &': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                      {/* Gradient overlay to stylize the image */}
                      <Box sx={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(135deg, ${service.glowColor.replace('0.3', '0.6')} 0%, rgba(0,0,0,0) 100%)`,
                        mixBlendMode: 'overlay',
                        zIndex: 1,
                        pointerEvents: 'none'
                      }} />
                    </Box>
                  </Grid>

                  {/* Content Side */}
                  <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 1, md: isEven ? 1 : 0 } }}>
                    <Box sx={{ p: { xs: 4, md: 6 } }}>
                      <Box sx={{
                        width: 48, height: 48, borderRadius: '12px', background: service.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                      }}>
                        <Icon sx={{ fontSize: 24, color: '#fff' }} />
                      </Box>

                      <Typography variant="h3" sx={{ fontWeight: 700, fontSize: '1.8rem', mb: 2, color: '#1A1A1A' }}>
                        {content?.title}
                      </Typography>
                      <Typography sx={{
                        color: 'rgba(0,0,0,0.65)', fontSize: '1rem', lineHeight: 1.8, mb: 4,
                      }}>
                        {content?.description}
                      </Typography>

                      <Grid container spacing={2}>
                        {content?.features.map((feature, i) => (
                          <Grid size={{ xs: 6 }} key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon sx={{ fontSize: 18, color: '#00D4AA' }} />
                              <Typography sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.65)' }}>
                                {feature}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          )
        })}
      </Container>
    </Box>
  )
}
