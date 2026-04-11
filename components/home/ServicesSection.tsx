'use client'

import { Box, Container, Typography, Chip, Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import { useTilt3D } from '@/lib/hooks/useTilt3D'

interface ServicesSectionProps {
  dict: {
    services: {
      badge: string; title: string; description: string
      items: Record<string, { title: string; description: string; features: string[] }>
      learnMore: string
    }
  }
}

interface ServiceCardProps {
  service: typeof services[number]
  content: { title?: string; description?: string; features?: string[] }
  index: number
}

function ServiceCard({ service, content, index }: ServiceCardProps) {
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt3D({ maxDeg: 10 })
  const Icon = service.icon
  const accentColor = service.glowColor.replace('0.3', '1').replace('rgba', 'rgb')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ ...tiltStyle, height: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        className="glass-premium card-hover holographic-border"
        sx={{
          p: { xs: 4, md: 5 },
          borderRadius: '32px',
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transformStyle: 'preserve-3d',
          '--glow-color': service.glowColor,
          '--border-hover-color': accentColor.replace(')', ', 0.4)'),
        }}
      >
        {/* Visual Background Area (Image + Overlay) */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: service.gradient,
          overflow: 'hidden',
          zIndex: 0,
        }}>
          {/* Main Service Image */}
          <Box
            component="img"
            src={service.image}
            alt={content?.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.7,
              transition: 'all 0.6s ease',
              '.card-hover:hover &': { transform: 'scale(1.1)' }
            }}
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).style.opacity = '0.7' }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          {/* Gradient Overlay for text readability */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${service.glowColor.replace('0.3', '0.8')} 100%)`,
            zIndex: 1,
          }} />
        </Box>

        {/* Shine Effect */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          '.card-hover:hover &': { opacity: 1 },
          pointerEvents: 'none',
          zIndex: 2
        }} />

        {/* Decorative Card Background Glow */}
        <Box sx={{
          position: 'absolute', top: -40, right: -40, width: 140, height: 140,
          borderRadius: '50%', background: service.glowColor, filter: 'blur(50px)', opacity: 0.2,
          transition: 'all 0.4s ease',
          '.card-hover:hover &': { opacity: 0.5, transform: 'scale(1.5) translateZ(20px)' },
          transform: 'translateZ(0px)',
        }} />

        {/* Icon Container (Floating over image) */}
        <Box sx={{
          width: 64, height: 64, borderRadius: '20px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          mb: 4, mt: 10, position: 'relative',
          boxShadow: `0 15px 30px -8px ${service.glowColor.replace('0.3', '0.5')}`,
          transform: 'translateZ(40px)',
          transition: 'all 0.4s ease',
          zIndex: 3,
          '&:hover': { background: '#fff' }
        }}>
          <Icon sx={{ fontSize: 32, color: accentColor }} />
        </Box>

        <Typography variant="h5" sx={{
          fontWeight: 900,
          mb: 2,
          fontSize: '1.5rem',
          color: '#1A1A1A',
          letterSpacing: '-0.02em',
          transform: 'translateZ(30px)',
          position: 'relative',
          zIndex: 3,
        }}>
          {content?.title}
        </Typography>

        <Typography sx={{
          color: 'rgba(0,0,0,0.55)',
          fontSize: '1rem',
          lineHeight: 1.7,
          mb: 4,
          flexGrow: 1,
          transform: 'translateZ(20px)',
          position: 'relative',
          zIndex: 3,
        }}>
          {content?.description}
        </Typography>

        {/* Feature tags */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.2,
          mb: 4,
          width: '100%',
          transform: 'translateZ(25px)',
          position: 'relative',
          zIndex: 3,
        }}>
          {content?.features?.map((feature: string, i: number) => (
            <Chip
              key={i}
              label={feature}
              size="small"
              sx={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)',
                color: '#1A1A1A',
                border: '1px solid rgba(0,0,0,0.05)',
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: '10px',
                px: 0.5,
                '&:hover': {
                  background: service.glowColor.replace('0.3', '0.1'),
                  borderColor: service.glowColor.replace('0.3', '0.2'),
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  )
}

export default function ServicesSection({ dict }: ServicesSectionProps) {
  return (
    <Box component="section" id="services-section" className="section-padding" sx={{ position: 'relative', overflow: 'hidden', background: '#F8F9FA' }}>
      {/* Background Decorative Elements */}
      <Box sx={{
        position: 'absolute', top: '-10%', left: '-5%', width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <Box sx={{
          position: 'absolute', top: '10%', left: '5%', width: 600, height: 600,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(246, 188, 13, 0.05), transparent 70%)', filter: 'blur(120px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: '10%', right: '5%', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.05), transparent 70%)', filter: 'blur(100px)',
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{
                px: 2, py: 0.5, borderRadius: 'full', background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)'
              }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#F6BC0D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {dict.services.badge}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 900,
              mb: 3,
              color: '#1A1A1A',
              letterSpacing: '-3px',
              lineHeight: 1
            }}>
              {dict.services.title}
            </Typography>
            <Typography sx={{
              color: 'rgba(0,0,0,0.5)',
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.5,
              fontWeight: 500
            }}>
              {dict.services.description}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={service.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <ServiceCard
                service={service}
                content={dict.services.items[service.id]}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
