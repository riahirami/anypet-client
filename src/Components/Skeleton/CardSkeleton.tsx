import React from 'react'
import {
  Box,
  Skeleton
} from "@mui/material"
const CardSkeleton = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={160} />
      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}

export default CardSkeleton