'use client'

import { Box, Container, Typography, Chip, Grid, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import DiamondIcon from '@mui/icons-material/Diamond'
import VisibilityIcon from '@mui/icons-material/Visibility'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import { IconButton } from '@mui/material'
import { team } from '@/data/team'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  dict: {
    about: {
      badge: string; title: string; description: string
      mission: { title: string; description: string }
      vision: { title: string; description: string }
      values: {
        title: string
        items: Record<string, { title: string; description: string }>
      }
      team: { title: string; description: string }
    }
  }
  lang: Locale
}

const valueIcons: Record<string, React.ReactNode> = {
  innovation: <LightbulbIcon />,
  quality: <DiamondIcon />,
  transparency: <VisibilityIcon />,
  results: <TrackChangesIcon />,
}

const valueGradients: Record<string, string> = {
  innovation: 'linear-gradient(135deg, #6C3CE1, #8B5CF6)',
  quality: 'linear-gradient(135deg, #00D4AA, #34E8C4)',
  transparency: 'linear-gradient(135deg, #FF6B35, #FF8F6B)',
  results: 'linear-gradient(135deg, #00B4D8, #48CAE4)',
}

export default function AboutPageClient({ dict, lang }: Props) {
  return (
    <Box sx={{ pt: 14 }}>
      {/* Header */}
      <Box className="section-padding" sx={{ pb: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label={dict.about.badge} sx={{
              mb: 2, background: 'rgba(108,60,225,0.1)', color: '#8B5CF6',
              border: '1px solid rgba(108,60,225,0.25)', fontWeight: 600,
            }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A' }}>
              {dict.about.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              {dict.about.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid container spacing={4}>
          {[
            { data: dict.about.mission, gradient: 'rgba(108,60,225,0.08)', border: 'rgba(108,60,225,0.2)' },
            { data: dict.about.vision, gradient: 'rgba(0,212,170,0.08)', border: 'rgba(0,212,170,0.2)' },
          ].map((item, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Box sx={{
                  p: 5, borderRadius: '20px', height: '100%',
                  background: item.gradient, border: `1px solid ${item.border}`,
                }}>
                  <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 2, color: '#1A1A1A' }}>
                    {item.data.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    {item.data.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Values */}
      <Box sx={{ py: 10, background: 'rgba(240,240,245,0.5)' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{
            fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, textAlign: 'center', mb: 6, color: '#1A1A1A'
          }}>
            {dict.about.values.title}
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(dict.about.values.items).map(([key, value], i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Box className="glass card-hover" sx={{
                    p: 4, borderRadius: '20px', textAlign: 'center', height: '100%',
                  }}>
                    <Box sx={{
                      width: 56, height: 56, borderRadius: '14px',
                      background: valueGradients[key], display: 'flex',
                      alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3,
                      color: '#fff',
                    }}>
                      {valueIcons[key]}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem', color: '#1A1A1A' }}>
                      {value.title}
                    </Typography>
                    <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team */}
      <Box className="section-padding">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{
              fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A'
            }}>
              {dict.about.team.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.1rem' }}>
              {dict.about.team.description}
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {team.map((member, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Box className="glass card-hover" sx={{
                    p: 4, borderRadius: '20px', textAlign: 'center',
                  }}>
                    <Avatar sx={{
                      width: 80, height: 80, mx: 'auto', mb: 2,
                      border: '3px solid rgba(108,60,225,0.3)',
                      background: 'linear-gradient(135deg, #6C3CE1, #00D4AA)',
                      fontSize: '2rem', fontWeight: 700,
                    }}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0.5, color: '#1A1A1A' }}>
                      {member.name}
                    </Typography>
                    <Typography sx={{ color: '#8B5CF6', fontSize: '0.88rem', mb: 2 }}>
                      {lang === 'tr' ? member.roleTr : member.roleEn}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      {member.socials.linkedin && (
                        <IconButton size="small" sx={{ color: 'rgba(0,0,0,0.4)', '&:hover': { color: '#0077B5' } }}>
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                      )}
                      {member.socials.twitter && (
                        <IconButton size="small" sx={{ color: 'rgba(0,0,0,0.4)', '&:hover': { color: '#1DA1F2' } }}>
                          <TwitterIcon fontSize="small" />
                        </IconButton>
                      )}
                      {member.socials.github && (
                        <IconButton size="small" sx={{ color: 'rgba(0,0,0,0.4)', '&:hover': { color: '#1A1A1A' } }}>
                          <GitHubIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
