'use client'

import { Box, Skeleton } from '@mui/material'

interface PageSkeletonProps {
  rows?: number
}

const PageSkeleton = ({ rows = 4 }: PageSkeletonProps) => (
  <Box sx={{ pt: 14, px: { xs: 2, md: 8 }, maxWidth: 1200, mx: 'auto' }}>
    <Skeleton variant="text" width="30%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="60%" height={56} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="80%" height={24} sx={{ mb: 6 }} />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} variant="rounded" height={80} sx={{ mb: 2, borderRadius: '16px' }} />
    ))}
  </Box>
)

interface LoadingProps {
  children: React.ReactNode
  isLoading: boolean
  rows?: number
}

const Loading = ({ children, isLoading, rows }: LoadingProps) =>
  isLoading ? <PageSkeleton rows={rows} /> : <>{children}</>

export { PageSkeleton }
export default Loading
