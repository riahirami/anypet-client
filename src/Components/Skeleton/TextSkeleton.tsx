import React from 'react'
import {
  Box,
  Skeleton
} from "@mui/material"
const TextSkeleton = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}

export default TextSkeleton