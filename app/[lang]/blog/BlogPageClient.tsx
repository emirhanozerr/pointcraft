'use client'

import { useState } from 'react'
import { Box, Container, Typography, Chip, Grid, Button } from '@mui/material'
import { motion } from 'framer-motion'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { blogPosts } from '@/data/blog'
import type { Locale } from '@/app/[lang]/dictionaries'

interface Props {
  dict: {
    blog: {
      badge: string; title: string; description: string
      readMore: string; readTime: string
      categories: Record<string, string>
    }
  }
  lang: Locale
}

const categoryKeys = ['all', 'socialMedia', 'seo', 'technology', 'marketing']

export default function BlogPageClient({ dict, lang }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <Box sx={{ pt: 14 }}>
      <Box className="section-padding" sx={{ pb: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip label={dict.blog.badge} sx={{
              mb: 2, background: 'rgba(0,180,216,0.1)', color: '#48CAE4',
              border: '1px solid rgba(0,180,216,0.25)', fontWeight: 600,
            }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, mb: 2, color: '#1A1A1A' }}>
              {dict.blog.title}
            </Typography>
            <Typography sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.15rem', lineHeight: 1.8 }}>
              {dict.blog.description}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        {/* Category Filters */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5, mb: 6 }}>
          {categoryKeys.map((key) => (
            <Button
              key={key}
              onClick={() => setActiveCategory(key)}
              sx={{
                borderRadius: '10px', px: 3, py: 1, fontSize: '0.88rem', fontWeight: 600,
                background: activeCategory === key ? 'linear-gradient(135deg, #6C3CE1, #8B5CF6)' : 'rgba(0,0,0,0.04)',
                color: activeCategory === key ? '#fff' : 'rgba(0,0,0,0.6)',
                border: `1px solid ${activeCategory === key ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
                '&:hover': {
                  background: activeCategory === key ? 'linear-gradient(135deg, #5521C4, #6C3CE1)' : 'rgba(108,60,225,0.08)',
                },
              }}
            >
              {dict.blog.categories[key]}
            </Button>
          ))}
        </Box>

        <Grid container spacing={3}>
          {filtered.map((post, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box className="glass card-hover" sx={{
                  borderRadius: '20px', overflow: 'hidden', height: '100%',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column',
                }}>
                  {/* Image Placeholder */}
                  <Box sx={{
                    height: 200,
                    background: `linear-gradient(135deg, ${
                      index % 4 === 0 ? 'rgba(108,60,225,0.25), rgba(139,92,246,0.1)' :
                      index % 4 === 1 ? 'rgba(0,212,170,0.25), rgba(52,232,196,0.1)' :
                      index % 4 === 2 ? 'rgba(255,107,53,0.25), rgba(255,143,107,0.1)' :
                      'rgba(0,180,216,0.25), rgba(72,202,228,0.1)'
                    })`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <Typography sx={{ fontSize: '2.5rem', opacity: 0.3 }}>
                      {['📱', '🔍', '🤖', '📊'][index % 4]}
                    </Typography>
                    <Chip
                      label={dict.blog.categories[post.category] || post.category}
                      size="small"
                      sx={{
                        position: 'absolute', top: 12, left: 12,
                        background: 'rgba(10,10,26,0.7)', backdropFilter: 'blur(10px)',
                        color: '#8B5CF6', fontWeight: 600, fontSize: '0.72rem',
                        border: '1px solid rgba(108,60,225,0.3)',
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Meta */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(0,0,0,0.6)' }}>
                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: '0.78rem' }}>
                          {new Date(post.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(0,0,0,0.6)' }}>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: '0.78rem' }}>
                          {post.readTime} {dict.blog.readTime}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 1.5, lineHeight: 1.4, color: '#1A1A1A' }}>
                      {lang === 'tr' ? post.titleTr : post.titleEn}
                    </Typography>
                    <Typography sx={{
                      color: 'rgba(0,0,0,0.65)', fontSize: '0.88rem', lineHeight: 1.7, mb: 3, flex: 1,
                    }}>
                      {lang === 'tr' ? post.excerptTr : post.excerptEn}
                    </Typography>

                    <Button endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important' }} />} sx={{
                      alignSelf: 'flex-start', color: '#8B5CF6', fontWeight: 600, fontSize: '0.88rem', p: 0,
                      '&:hover': { background: 'transparent', color: '#6C3CE1' },
                    }}>
                      {dict.blog.readMore}
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
