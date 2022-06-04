import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useCallback } from 'react'
import { FC } from '../../interfaces'

interface Props {
  currentValue: number,
  onQuatityChange: (quantity: number)=>void,
  maxValue: number
}

export const ItemCounter:FC<Props> = ({ currentValue, onQuatityChange, maxValue }) => {
  const onRemove = useCallback(() => {
    (currentValue > 1) && onQuatityChange(currentValue - 1)
  }, [currentValue, onQuatityChange])

  const onAdd = useCallback(() => {
    (currentValue < maxValue) && onQuatityChange(currentValue + 1)
  }, [currentValue, onQuatityChange, maxValue])

  return (
    <Box display='flex' alignItems='center'>
        <IconButton disabled={currentValue <= 1} onClick={onRemove}>
            <RemoveCircleOutline />
        </IconButton>

        <Typography sx={{ width: 40, textAlign: 'center' }} >{currentValue}</Typography>

        <IconButton disabled={currentValue >= maxValue} onClick={onAdd}>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
