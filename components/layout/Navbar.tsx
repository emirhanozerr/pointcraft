'use client'

import { useState, useLayoutEffect, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LanguageIcon from '@mui/icons-material/Language'
import type { Locale } from '@/app/[lang]/dictionaries'

interface NavbarProps {
  dict: {
    nav: {
      home: string
      services: string
      about: string
      portfolio: string
      blog: string
      contact: string
      getQuote: string
    }
  }
  lang: Locale
}

const navItems = [
  { key: 'home', href: '' },
  { key: 'services', href: '/hizmetler' },
  { key: 'about', href: '/hakkimizda' },
  // { key: 'portfolio', href: '/portfolio' }, // Gizlendi: Zamanı geldiğinde açılacak
  // { key: 'blog', href: '/blog' }, // Gizlendi: Zamanı geldiğinde açılacak
  { key: 'contact', href: '/iletisim' },
]

export default function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const theme = useTheme()
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('md'))
  // On the server and before hydration, always render desktop nav to avoid mismatch
  const isMobile = mounted ? isMobileQuery : false
  const otherLang = lang === 'tr' ? 'en' : 'tr'

  useLayoutEffect(() => {
    // This is necessary for hydration mismatch handling in SSR/SSG
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getLocalizedPath = (targetLang: string) => {
    const pathWithoutLang = pathname.replace(/^\/(tr|en)/, '')
    return `/${targetLang}${pathWithoutLang || ''}`
  }

  const isActive = (href: string) => {
    const fullPath = `/${lang}${href}`
    if (href === '') return pathname === `/${lang}` || pathname === `/${lang}/`
    return pathname.startsWith(fullPath)
  }

  return (
    <>
      <AppBar
        position="fixed"
        id="main-navbar"
        sx={{
          top: 0,
          background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
          transition: mounted ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          boxShadow: 'none',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1536px', mx: 'auto', px: { xs: 2, md: 0 } }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1, pt: { xs: 2.5, md: 1 }, px: 0 }}>
            {/* Logo */}
            <Link href={`/${lang}`}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src="/images/logo.png"
                  alt="Pointcraft Logo"
                  sx={{ height: { xs: 32, md: 45 }, width: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </Box>
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={`/${lang}${item.href}`}
                  >
                    <Button
                      sx={{
                        color: isActive(item.href) ? '#F6BC0D' : 'rgba(0,0,0,0.7)',
                        fontWeight: isActive(item.href) ? 700 : 500,
                        fontSize: '0.9rem',
                        position: 'relative',
                        '&:hover': {
                          color: '#000',
                          background: 'rgba(246, 188, 13, 0.08)',
                        },
                        '&::after': isActive(item.href)
                          ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 20,
                            height: 2,
                            borderRadius: 1,
                            background: 'linear-gradient(90deg, #F6BC0D, #00D4AA)',
                          }
                          : {},
                      }}
                    >
                      {dict.nav[item.key as keyof typeof dict.nav]}
                    </Button>
                  </Link>
                ))}

                {/* Language Switcher */}
                <Link href={getLocalizedPath(otherLang)}>
                  <Button
                    startIcon={<LanguageIcon sx={{ fontSize: '18px !important' }} />}
                    sx={{
                      color: 'rgba(0,0,0,0.7)',
                      fontSize: '0.85rem',
                      minWidth: 'auto',
                      ml: 1,
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      px: 1.5,
                      '&:hover': {
                        borderColor: 'rgba(246, 188, 13, 0.5)',
                        background: 'rgba(246, 188, 13, 0.08)',
                        color: '#000',
                      },
                    }}
                  >
                    {otherLang.toUpperCase()}
                  </Button>
                </Link>

                {/* CTA */}
                <Link href={`/${lang}/iletisim`}>
                  <Button
                    variant="contained"
                    sx={{
                      ml: 1,
                      background: 'linear-gradient(135deg, #F6BC0D 0%, #FDCB35 100%)',
                      color: '#000',
                      boxShadow: '0 4px 15px rgba(246, 188, 13, 0.3)',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #D9A70F 0%, #F6BC0D 100%)',
                        boxShadow: '0 6px 20px rgba(246, 188, 13, 0.5)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {dict.nav.getQuote}
                  </Button>
                </Link>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Link href={getLocalizedPath(otherLang)}>
                  <IconButton sx={{ color: 'rgba(0,0,0,0.7)' }}>
                    <LanguageIcon />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  sx={{ color: '#000' }}
                  id="mobile-menu-toggle"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 360,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(30px)',
            borderLeft: '1px solid rgba(0,0,0,0.08)',
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#1A1A1A' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Pointcraft Logo"
              sx={{ height: 45, width: 'auto', display: 'block', objectFit: 'contain', margin: '0 auto' }}
            />
          </Box>

          <List sx={{ width: '100%' }}>
            {navItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <Link
                  href={`/${lang}${item.href}`}
                  onClick={() => setMobileOpen(false)}
                  style={{ width: '100%' }}
                >
                  <ListItemButton
                    sx={{
                      borderRadius: '10px',
                      mb: 0.5,
                      justifyContent: 'center',
                      color: isActive(item.href) ? '#F6BC0D' : 'rgba(0,0,0,0.7)',
                      background: isActive(item.href) ? 'rgba(246, 188, 13, 0.1)' : 'transparent',
                      '&:hover': {
                        background: 'rgba(246, 188, 13, 0.08)',
                        color: '#000',
                      },
                    }}
                  >
                    <ListItemText
                      primary={dict.nav[item.key as keyof typeof dict.nav]}
                      primaryTypographyProps={{
                        fontWeight: isActive(item.href) ? 700 : 500,
                        fontSize: '1.05rem',
                        textAlign: 'center',
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 3 }}>
            <Link href={`/${lang}/iletisim`} onClick={() => setMobileOpen(false)} style={{ width: '100%' }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #F6BC0D 0%, #FDCB35 100%)',
                  color: '#000',
                  borderRadius: '10px',
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #D9A70F 0%, #F6BC0D 100%)',
                  }
                }}
              >
                {dict.nav.getQuote}
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
