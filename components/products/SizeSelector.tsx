import { Box, Button } from '@mui/material'
import { FC, ISize } from '../../interfaces'

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector:FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
        {
            sizes.map((size) => (
                <Button
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
