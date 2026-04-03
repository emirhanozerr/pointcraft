'use client'

import { Box, Container, Typography, Chip, Grid, Button } from '@mui/material'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'
import { projects, Project } from '@/data/portfolio'
import type { Locale } from '@/app/[lang]/dictionaries'

interface PortfolioSectionProps {
  dict: {
    portfolio: { 
      badge: string; title: string; description: string; viewAll: string; viewProject: string 
    }
  }
  lang: Locale
}

function ProjectCard({ project, index, dict, lang }: { project: Project, index: number, dict: any, lang: Locale }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const accentColor = project.glowColor.replace('0.3', '1').replace('rgba', 'rgb')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.01 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        height: '100%',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        className="glass-premium card-hover holographic-border"
        sx={{
          borderRadius: '32px',
          overflow: 'hidden',
          height: '100%',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transformStyle: 'preserve-3d',
          '--glow-color': project.glowColor,
          '--border-hover-color': accentColor.replace(')', ', 0.4)'),
        }}
      >
        {/* Project Header / Image Area */}
        <Box sx={{
          height: { xs: 200, md: 240 },
          position: 'relative',
          overflow: 'hidden',
          background: project.gradient, // Fallback gradient
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
        }}>
          {/* Main Project Image */}
          <Box 
            component="img"
            src={project.image}
            alt={lang === 'tr' ? project.titleTr : project.titleEn}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              '.card-hover:hover &': { transform: 'scale(1.1)' },
            }}
            onError={(e: any) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Decorative Noise / Pattern */}
          <Box className="noise-texture" sx={{ position: 'absolute', inset: 0, opacity: 0.2, mixBlendMode: 'overlay', pointerEvents: 'none' }} />
          
          {/* Overlay for better contrast and "View Project" button visibility */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
            opacity: 0.4,
            transition: 'opacity 0.3s ease',
            '.card-hover:hover &': { opacity: 0.7 },
          }} />

          {/* Hover View Project Button */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,26,0.3)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            transform: 'translateZ(60px)',
            '.card-hover:hover &': { opacity: 1 },
          }}>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                background: '#fff', 
                color: '#1A1A1A', 
                borderRadius: '16px',
                px: 3,
                py: 1.5,
                fontWeight: 800,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                '&:hover': { background: '#f8f8f8', transform: 'scale(1.05)' }
              }}>
              {dict.portfolio.viewProject}
            </Button>
          </Box>
        </Box>

        {/* Project Info */}
        <Box sx={{ 
          p: { xs: 3, md: 4 }, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          transformStyle: 'preserve-3d',
          background: 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 900, 
            mb: 1.5, 
            fontSize: '1.25rem', 
            color: '#1A1A1A',
            letterSpacing: '-0.02em',
            transform: 'translateZ(30px)'
          }}>
            {lang === 'tr' ? project.titleTr : project.titleEn}
          </Typography>
          
          <Typography sx={{ 
            color: 'rgba(0,0,0,0.6)', 
            fontSize: '0.95rem', 
            mb: 3, 
            lineHeight: 1.6,
            flexGrow: 1,
            transform: 'translateZ(20px)'
          }}>
            {lang === 'tr' ? project.descriptionTr : project.descriptionEn}
          </Typography>

          {/* Tags */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            transform: 'translateZ(25px)'
          }}>
            {project.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                sx={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(4px)',
                  color: '#1A1A1A',
                  border: '1px solid rgba(0,0,0,0.05)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  borderRadius: '10px',
                  '&:hover': {
                    background: project.glowColor.replace('0.3', '0.1'),
                    borderColor: project.glowColor.replace('0.3', '0.2'),
                  }
                }} 
              />
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}

export default function PortfolioSection({ dict, lang }: PortfolioSectionProps) {
  const featured = projects.slice(0, 4)

  return (
    <Box component="section" id="portfolio-section" className="section-padding" sx={{ position: 'relative', overflowX: 'hidden', background: '#FDFDFD' }}>
      {/* Background Decorative Blurs */}
      <Box sx={{
        position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.05), transparent 70%)', filter: 'blur(100px)',
        zIndex: 0, pointerEvents: 'none'
      }} />
      <Box sx={{
        position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(246, 188, 13, 0.05), transparent 70%)', filter: 'blur(80px)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
              <Box sx={{ 
                px: 2, py: 0.5, borderRadius: 'full', background: 'rgba(255,107,53,0.05)', 
                border: '1px solid rgba(255,107,53,0.15)', backdropFilter: 'blur(10px)'
              }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF6B35', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {dict.portfolio.badge}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h2" sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              fontWeight: 900, 
              mb: 2.5, 
              color: '#1A1A1A',
              letterSpacing: '-2px',
              lineHeight: 1.1
            }}>
              {dict.portfolio.title}
            </Typography>
            <Typography sx={{ 
              color: 'rgba(0,0,0,0.5)', 
              fontSize: { xs: '1.1rem', md: '1.25rem' }, 
              maxWidth: 700, 
              mx: 'auto',
              lineHeight: 1.5,
              fontWeight: 500
            }}>
              {dict.portfolio.description}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {featured.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={project.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <ProjectCard project={project} index={index} dict={dict} lang={lang} />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  )
}
