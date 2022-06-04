import { Box, Button } from '@mui/material'
import { FC, ISize } from '../../interfaces'

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
    onSelectedSize: (size: ISize)=>void
}

export const SizeSelector:FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map((size) => (
                <Button
                    onClick={() => {
                      if (size !== selectedSize) {
                        onSelectedSize(size)
                      }
                    }}
                    color={size === selectedSize ? 'primary' : 'info'}
                    size='small'
                    key={size}
                    >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
