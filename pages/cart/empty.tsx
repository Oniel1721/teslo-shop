import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'

const CartEmptyPage = () => {
  return (
    <ShopLayout title="Carrito vacío" pageDescription="No hay artículos en el carrito de compras">
        <Box
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
            <Box display='flex' alignItems='center' flexDirection='column'>
                <Typography>Su carrito está vacío</Typography>
                <NextLink href='/' passHref>
                    <Link typography='h4' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default CartEmptyPage
