import React from 'react'
import {
  Box,
  Skeleton
} from "@mui/material"


export const ContainerSkeleton = () => {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    </Box>
  )
}
