'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import FolderIcon from '@mui/icons-material/Folder'
import GroupsIcon from '@mui/icons-material/Groups'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PersonIcon from '@mui/icons-material/Person'

interface StatsSectionProps {
  dict: { stats: { projects: string; clients: string; experience: string; team: string } }
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}</span>
}

const stats = [
  { key: 'projects', value: 100, suffix: '+', icon: FolderIcon, gradient: 'linear-gradient(135deg, #F6BC0D, #FDCB35)' },
  { key: 'clients', value: 100, suffix: '+', icon: GroupsIcon, gradient: 'linear-gradient(135deg, #00D4AA, #34E8C4)' },
  { key: 'experience', value: 8, suffix: '+', icon: CalendarMonthIcon, gradient: 'linear-gradient(135deg, #FF6B35, #FF8F6B)' },
  { key: 'team', value: 15, suffix: '+', icon: PersonIcon, gradient: 'linear-gradient(135deg, #E91E8C, #FF69B4)' },
]

export default function StatsSection({ dict }: StatsSectionProps) {
  return (
    <Box component="section" id="stats-section" sx={{ py: 10, position: 'relative' }}>
      <Box sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(246, 188, 13, 0.04) 50%, transparent 100%)',
      }} />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Grid size={{ xs: 6, md: 3 }} key={stat.key}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{
                      width: 56, height: 56, borderRadius: '14px', background: stat.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2,
                      boxShadow: `0 8px 25px ${stat.gradient.includes('F6BC0D') ? 'rgba(246, 188, 13, 0.3)' : stat.gradient.includes('00D4AA') ? 'rgba(0,212,170,0.3)' : stat.gradient.includes('FF6B35') ? 'rgba(255,107,53,0.3)' : 'rgba(233,30,140,0.3)'}`,
                    }}>
                      <Icon sx={{ fontSize: 28, color: stat.gradient.includes('F6BC0D') ? '#000' : '#fff' }} />
                    </Box>
                    <Typography sx={{
                      fontSize: { xs: '2.5rem', md: '3rem' }, fontWeight: 800,
                      lineHeight: 1,
                    }}>
                      <AnimatedCounter target={stat.value} />
                      {stat.suffix}
                    </Typography>
                    <Typography sx={{ color: 'rgba(0,0,0,0.6)', mt: 1, fontSize: '0.9rem' }}>
                      {dict.stats[stat.key as keyof typeof dict.stats]}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
