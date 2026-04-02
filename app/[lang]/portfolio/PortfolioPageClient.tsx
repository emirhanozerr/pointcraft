'use client'

import { Box, Container, Typography, Chip, Grid, Button } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { projects } from '@/data/portfolio'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks'
import { setActiveFilter } from '@/lib/store/slices/portfolioSlice'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  dict: {
    portfolio: {
      badge: string; title: string; description: string
      viewProject: string
      filters: Record<string, string>
    }
  }
  lang: Locale
}

const filterKeys = ['all', 'socialMedia', 'software', 'video', 'seo', 'ads']

export default function PortfolioPageClient({ dict, lang }: Props) {
  const dispatch = useAppDispatch()
  const activeFilter = useAppSelector((state) => state.portfolio.activeFilter)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <Box sx={{ pt: 14 }}>
      <Box className="section-padding" sx={{ pb: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label={dict.portfolio.badge} sx={{
              mb: 2, background: 'rgba(246, 188, 13, 0.1)', color: '#B88E00',
              border: '1px solid rgba(246, 188, 13, 0.25)', fontWeight: 600,
            }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A' }}>
              {dict.portfolio.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              {dict.portfolio.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        {/* Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, mb: 6 }}>
          {filterKeys.map((key) => (
            <Button
              key={key}
              onClick={() => dispatch(setActiveFilter(key))}
              sx={{
                borderRadius: '10px',
                px: 3,
                py: 1,
                fontSize: '0.88rem',
                fontWeight: 600,
                background: activeFilter === key ? 'linear-gradient(135deg, #F6BC0D, #FDCB35)' : 'rgba(0,0,0,0.04)',
                color: activeFilter === key ? '#000' : 'rgba(0,0,0,0.6)',
                border: `1px solid ${activeFilter === key ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: activeFilter === key ? '0 4px 15px rgba(246, 188, 13, 0.3)' : 'none',
                '&:hover': {
                  background: activeFilter === key
                    ? 'linear-gradient(135deg, #D9A70F, #F6BC0D)'
                    : 'rgba(246, 188, 13, 0.08)',
                },
              }}
            >
              {dict.portfolio.filters[key]}
            </Button>
          ))}
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={project.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Box className="glass card-hover" sx={{
                    borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                  }}>
                    <Box sx={{
                      height: 200, position: 'relative',
                      background: `linear-gradient(135deg, ${
                        index % 6 === 0 ? 'rgba(246, 188, 13, 0.3), rgba(253,203,53,0.15)' :
                        index % 6 === 1 ? 'rgba(0,212,170,0.3), rgba(52,232,196,0.15)' :
                        index % 6 === 2 ? 'rgba(255,107,53,0.3), rgba(255,143,107,0.15)' :
                        index % 6 === 3 ? 'rgba(233,30,140,0.3), rgba(255,105,180,0.15)' :
                        index % 6 === 4 ? 'rgba(0,180,216,0.3), rgba(72,202,228,0.15)' :
                        'rgba(244,162,97,0.3), rgba(233,196,106,0.15)'
                      })`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography sx={{ fontSize: '2.5rem', opacity: 0.3 }}>
                        {['🎯', '💻', '🎬', '🔍', '📢', '🎥'][index % 6]}
                      </Typography>
                      <Box sx={{
                        position: 'absolute', inset: 0, background: 'rgba(10,10,26,0.7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 1 },
                      }}>
                        <Button variant="outlined" endIcon={<ArrowForwardIcon />}
                          sx={{ borderColor: '#fff', color: '#fff', borderRadius: '10px' }}>
                          {dict.portfolio.viewProject}
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '1rem', color: '#1A1A1A' }}>
                        {lang === 'tr' ? project.titleTr : project.titleEn}
                      </Typography>
                      <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.85rem', mb: 2, lineHeight: 1.6 }}>
                        {lang === 'tr' ? project.descriptionTr : project.descriptionEn}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {project.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" sx={{
                            background: 'rgba(246, 188, 13, 0.1)', color: '#B88E00',
                            border: '1px solid rgba(246, 188, 13, 0.2)', fontSize: '0.72rem',
                          }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
    </Box>
  )
}
